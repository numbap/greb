import Stats from "js-stats";
import calculate from "geodistance-super";
import * as turf from "@turf/turf"
import { a } from "@aws-amplify/ui";
import clustersDbscan from '@turf/clusters-dbscan'
import { first } from "lodash-es";
import continuousColorLegend from "react-vis/dist/legends/continuous-color-legend";


// Convert DynamoDB record to GeoJSON
export const geoJSONConvert = (dynamoLocations) => {
    let template = {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [
            0,
            0
          ]
        }
      }

    if(dynamoLocations){
        return {
            "type": "FeatureCollection",
            "features": dynamoLocations.map(x => {
                return {...template, 
                  geometry: { ...template.geometry,coordinates: [x.lon, x.lat]},
                  id: x.id,
                  name: x.name
                }
            })}
    }else{
        return []
    }
}

export const getCentroids = async (clusteredLocations, percent, callback) => {
  var i;
  let centroids = [];
  try
  {
    let centroidCount = await countCentroids(JSON.parse(JSON.stringify(clusteredLocations)))
    for(i=0; i <= centroidCount; i++ )
    {
      centroids[i] = await getCentroidLatLonSD(JSON.parse(JSON.stringify(clusteredLocations)), percent, i)
    }
    // callback(centroids.sort((a, b) => b.count - a.count))
    return centroids.sort((a, b) => b.count - a.count);
  }
  catch(e)
  {
    console.log(e)
  }

}

// Standard deviation
let getSD = function (data) {
  let m = getMean(data);
  return Math.sqrt(
    data.reduce(function (sq, n) {
      return sq + Math.pow(n - m, 2);
    }, 0) /
      (data.length - 1)
  );
};


const getMean = function (data) {
  return (
    data.reduce(function (a, b) {
      return Number(a) + Number(b);
    }) / data.length
  );
};

// Input clustered GeoJson and return highest centroid number
export const countCentroids = (clusteredLocations) => {
  return Math.max(...clusteredLocations.filter(x => x.properties.dbscan == 'core').map(x => x.properties.cluster))
}

// Input clustered GeoJson, and a centroid.
// Return center of mass and standard deviation for that centroid
const getCentroidLatLonSD = async (clusteredLocations, percent, index) => {

  const currentCluster = clusteredLocations.filter(x => x.properties.dbscan == 'core').filter(x => x.properties.cluster === index)

  // Filter for specified cluster
  let COM = await turf.centerOfMass(
      {
        "type": "FeatureCollection",
        "features":currentCluster
    })


  if(currentCluster.length > 0){
  let stats = {centroid: {lat: COM.geometry.coordinates[1], lon: COM.geometry.coordinates[0] }, id: index, count: currentCluster.length}

    try{
  
      let distances = await Promise.all(currentCluster.map(async (x) => {
        let tmp = await calculate(
        x.geometry.coordinates[1],
        x.geometry.coordinates[0],
        stats.centroid.lat,
        stats.centroid.lon)
        
        return tmp.number;
      }))
  
      // Calculate Standard Deviation for this centroid
      stats.SD = await getSD(distances);
      stats.mean = await getMean(distances);
      stats.radius = await calculateRadius(currentCluster.length, stats.SD, stats.mean, percent)
      stats.outliers = await clusteredLocations.filter(x => x.properties.dbscan != 'core').length
      return stats;
  
    }catch(e){
      console.log(e)
    }
  }
  else{
      return {
        "centroid": {
            "lat": 0,
            "lon": 0
        },
        "id": index,
        "count": currentCluster.length,
        "SD": 0,
        "mean": 0
    }
  }


}

export const calculateRadius = async (count, SD, mean, percentage) => {
    var t_distribution = new Stats.TDistribution(count - 1);
    let adjustment = 0;
    try{
        adjustment = await t_distribution.invCumulativeProbability(percentage / 100) * SD;
        let tmp = (mean + adjustment) * 1000
        return tmp > 0 ? tmp : 0;
    }catch(e){
        console.log(e)
        return(0)
    }
}

export const checkIfNumber = (string) => {
  if(!isNaN(string) && !isNaN(parseFloat(string))){
      return true
  }else{
    return false
  }
}

export const predictionStrenght = (number) => {
  if(number < 20){
    return { strength: "Weak", color: "#B81D13"}
  }else if (number >= 15 && number < 40) {
    return { strength: "Medium", color: "#EFB700"}
  } else {
    return { strength: "Strong", color: "#008450"}
  }
}

// Find furthest point
const farthestPoint = async (lat, lon, locations, iStart) => {
  try{
    let hit = {geometry: {coordinates: [0, 0]}, distance: 0, index: -1}

    let furthestPoint = locations.map(async (x, i) => {
      try{
        let tmp = await calculate(
          x.geometry.coordinates[1],
          x.geometry.coordinates[0],
          lat,
          lon)

        if(tmp.number > hit.distance && (i != iStart) && x.properties.dbscan == "core"){
            hit.distance = tmp.number
            hit.geometry.coordinates = x.geometry.coordinates
            hit.index = i
        }
      }catch(e){
        console.log(e)
      }

    })

    await Promise.all(furthestPoint)
    return hit

  }catch(e){
    console.log(e)
    return {point: [0, 0], distance: 0}
  }
}

const distantPoint = async (reference, pointZero, pointOne, newClusterId, midPoint) => {

    try {
      let distanceZero = await calculate(
      reference.geometry.coordinates[1],
      reference.geometry.coordinates[0],
      pointZero.geometry.coordinates[1],
      pointZero.geometry.coordinates[0])

    let distanceOne = await calculate(
      reference.geometry.coordinates[1],
      reference.geometry.coordinates[0],
      pointOne.geometry.coordinates[1],
      pointOne.geometry.coordinates[0])

    // If there's a midpoint, evaluate
    if(midPoint){
      let distanceMidpoint = await calculate(
        reference.geometry.coordinates[1],
        reference.geometry.coordinates[0],
        midPoint.geometry.coordinates[1],
        midPoint.geometry.coordinates[0])

      if(distanceMidpoint.number < distanceZero.number && distanceMidpoint.number < distanceOne.number){
        return {
          ...reference,
          properties: {...reference.properties, cluster: newClusterId + 1}  
         }
      }
    }

    if(distanceZero.number > distanceOne.number){
      return {
       ...reference,
       properties: {...reference.properties, cluster: newClusterId}  
      }
    }
    else {
      return reference
    }

    }catch(e){
      console.log(e, reference, pointOne, pointZero)
    }



}

// Split up the dominant cluster. 
// An artifact of DBScan is that over half of all locations often end up in a single cluster. 
// Split the cluster into 2
export const dePareto2 = async (clusteredLocations, cluster, clusterCount) => {

  try{
    
    let tmpCohort = clusteredLocations.features.filter(x => (x.properties.dbscan == "core") && (x.properties.cluster == cluster))
    // // Find 2 most distant points
    let randomPoint = await farthestPoint(tmpCohort[0].geometry.coordinates[1], tmpCohort[0].geometry.coordinates[0], tmpCohort, 0)
    console.log("Point One")
    let firstPoint = await farthestPoint(tmpCohort[randomPoint.index].geometry.coordinates[1], tmpCohort[randomPoint.index].geometry.coordinates[0], tmpCohort, randomPoint.index)
    let secondPoint = await farthestPoint(tmpCohort[firstPoint.index].geometry.coordinates[1], tmpCohort[firstPoint.index].geometry.coordinates[0], tmpCohort, firstPoint.index)
    

    // // Reclassify according to points
    tmpCohort = tmpCohort.map(async x => {
      try{
        return await distantPoint(x, firstPoint, secondPoint, clusterCount)
      }catch(e){
        console.log(e)
      }
    })
    tmpCohort = await Promise.all(tmpCohort)


    // Rebuild original object
    let tmpClusteredLocations = clusteredLocations
    tmpCohort.map(x => tmpClusteredLocations.features[x.index] = x)

    // // // Get centroids for both clusters
    let COM1 = await turf.centerOfMass(
      {
        "type": "FeatureCollection",
        "features":await tmpClusteredLocations.features.filter(x => x.properties.cluster == cluster)
    })


    let COM2 = await turf.centerOfMass(
      {
        "type": "FeatureCollection",
        "features":await tmpClusteredLocations.features.filter(x => x.properties.cluster == clusterCount)
    })

    tmpCohort = tmpCohort.map(async x => {
      try{
        return await distantPoint(x, COM1, COM2, clusterCount, null)
      }catch(e){
        console.log(e)
      }
    })
    tmpCohort = await Promise.all(tmpCohort)

    // Rebuild original object
    tmpClusteredLocations = clusteredLocations
    tmpCohort.map(x => tmpClusteredLocations.features[x.index] = x)

    return (tmpClusteredLocations)

  }catch(e){
    console.log(e, clusteredLocations)
  }

}



// Split the cluster into 3
export const dePareto3 = async (clusteredLocations, cluster, clusterCount) => {

  try{
    
    let tmpCohort = clusteredLocations.features.filter(x => (x.properties.dbscan == "core") && (x.properties.cluster == cluster))

    // // Find 2 most distant points
    let randomPoint = await farthestPoint(tmpCohort[0].geometry.coordinates[1], tmpCohort[0].geometry.coordinates[0], tmpCohort, 0)
    console.log("Point One")
    let firstPoint = await farthestPoint(tmpCohort[randomPoint.index].geometry.coordinates[1], tmpCohort[randomPoint.index].geometry.coordinates[0], tmpCohort, randomPoint.index)
    let secondPoint = await farthestPoint(tmpCohort[firstPoint.index].geometry.coordinates[1], tmpCohort[firstPoint.index].geometry.coordinates[0], tmpCohort, firstPoint.index)
 
    // Find Midpoint
    let midPoint = turf.midpoint(turf.point(firstPoint.geometry.coordinates), turf.point(firstPoint.geometry.coordinates))

    // // Reclassify according to points
    tmpCohort = tmpCohort.map(async x => {
      try{
        return await distantPoint(x, firstPoint, secondPoint, clusterCount, midPoint)
      }catch(e){
        console.log(e)
      }
    })
    tmpCohort = await Promise.all(tmpCohort)


    // Rebuild original object
    let tmpClusteredLocations = clusteredLocations
    tmpCohort.map(x => tmpClusteredLocations.features[x.index] = x)

    // // // Get centroids for both clusters
    let COM1 = await turf.centerOfMass(
      {
        "type": "FeatureCollection",
        "features":await tmpClusteredLocations.features.filter(x => x.properties.cluster == cluster)
    })


    let COM2 = await turf.centerOfMass(
      {
        "type": "FeatureCollection",
        "features":await tmpClusteredLocations.features.filter(x => x.properties.cluster == clusterCount)
    })

    // Find Midpoint
    midPoint = turf.midpoint(turf.point(COM1.geometry.coordinates), turf.point(COM2.geometry.coordinates))


    tmpCohort = tmpCohort.map(async x => {
      try{
        return await distantPoint(x, COM1, COM2, clusterCount, midPoint)
      }catch(e){
        console.log(e)
      }
    })
    tmpCohort = await Promise.all(tmpCohort)

    // Rebuild original object
    tmpClusteredLocations = clusteredLocations
    tmpCohort.map(x => tmpClusteredLocations.features[x.index] = x)

    return (tmpClusteredLocations)

  }catch(e){
    console.log(e, clusteredLocations)
  }

}

export const clusterAll = async (items, cluster, percentage) => {

  if(items.length > 1){
    
    try{
      let clusterSize = ( (items.length / 60) > 7 ) ? Math.floor((items.length / 60)) : 7;
  
      // Label with indexes
      let tmpClusteredLocations 
  
      if(cluster === 0){
        tmpClusteredLocations = await zeroCluster(items)
      } else {
        let tmpLocations = await geoJSONConvert(items)
        tmpLocations.features = tmpLocations.features.map((x, i) => { return {...x, index: i}})
        tmpClusteredLocations = await clustersDbscan(tmpLocations, cluster == 0 ? 10000000 : cluster, {minPoints: clusterSize})
      }
  
  
      tmpClusteredLocations.centerOfMass = await turf.centerOfMass(tmpClusteredLocations)
  
  
  
      let xxx = await countCentroids(tmpClusteredLocations.features)
  
      let tmpCentroids = await getCentroids(tmpClusteredLocations.features, percentage)
      
      if(tmpCentroids.length > 1 && tmpCentroids[0].count > 200){
        tmpClusteredLocations = await dePareto3(tmpClusteredLocations, tmpCentroids[0].id, tmpCentroids.length)
      } else if (tmpCentroids.length > 1 && tmpCentroids[0].count > 100){
        tmpClusteredLocations = await dePareto2(tmpClusteredLocations, tmpCentroids[0].id, tmpCentroids.length)
      }
  
      let FFFFFFF = await tmpClusteredLocations.features.map(async x => {
        try{
          const tmpDistance = await turf.distance(
            tmpClusteredLocations.centerOfMass.geometry.coordinates,
            x.geometry.coordinates
            )
            return {...x, distance: tmpDistance }
        }catch(e){
  
        }
      })
      FFFFFFF = await Promise.all(FFFFFFF)
      FFFFFFF = await FFFFFFF.sort((a, b) => a.distance - b.distance);
  
      tmpClusteredLocations.features = FFFFFFF
  
      // console.log(FFFFFFF, "New set with distances")
  
  
      console.log("Find Cluster Centroids")
      tmpCentroids = await getCentroids(tmpClusteredLocations.features, percentage)
  
      return [tmpClusteredLocations, tmpCentroids]
    }catch(e){
      console.log(e)
    }
  }
  else{

    const tmpClusteredLocations = 
    {
        "features": [
            {
                "type": "Feature",
                "index": 0,
                "properties": {
                    "cluster": 0,
                    "dbscan": "core"
                },
                "id": items[0].id,
                "name": items[0].name,
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        items[0].lat,
                        items[0].lon
                    ]
                },
                "distance": 0
            }
        ],
        "type": "FeatureCollection",
        "centerOfMass": {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [
                    items[0].lat,
                    items[0].lon
                ]
            }
        }
    }
    
    
    
    const tmpCentroids = [
        {
            "centroid": {
                lat: items[0].lat,
                lon: items[0].lon
            },
            "id": 0,
            "count": 3,
            "SD": 0,
            "mean": 0,
            "radius": 0,
            "outliers": 0
        }
    ]
    
    return[tmpClusteredLocations, tmpCentroids]
  }


}



const zeroCluster = (locations) => {
    let tmpCluster = locations.map((x, i) => {
      return {
        "type": "Feature",
        "index": i,
        "properties": {
            "cluster": 0,
            "dbscan": "core"
        },
        "id": x.id,
        "name": x.name,
        "geometry": {
            "type": "Point",
            "coordinates": [
                x.lon,
                x.lat
            ]
        }
      }
    })

    return {
      features: tmpCluster,
      type: "FeatureCollection"
    }
}

export const areaCalc = (radius) => {
  return ( ( radius ^ 2 ) * Math.PI ) / 1000
}