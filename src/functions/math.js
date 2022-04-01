import Stats from "js-stats";
import calculate from "geodistance-super";



export async function calcLatlonStats(l, latlonStats, p) {
  // Think hard about the math for this
  // Calculte average distance and standard deviation for distance in locations
  let tmp = await {
    ...latlonStats,
    percentage: p,
    degrees: l.length - 1,
    distMean: await getMean(l.map((x) => x.distance)),
    distSd: await getSD(l.map((x) => x.distance)),
    latMean: await getMean(l.map((x) => x.lat)),
    lonMean: await getMean(l.map((x) => x.lon)),
  };

  tmp = { ...tmp, distance: await radiusCalc(tmp) };
  return tmp;
}

export function probabilityEstimator(Prob, DegFree) {
  var t_distribution = new Stats.TDistribution(DegFree);
  return t_distribution.invCumulativeProbability(Prob);
}

export const getMean = function (data) {
  return (
    data.reduce(function (a, b) {
      return Number(a) + Number(b);
    }) / data.length
  );
};

// Standard deviation
export let getSD = function (data) {
  let m = getMean(data);
  return Math.sqrt(
    data.reduce(function (sq, n) {
      return sq + Math.pow(n - m, 2);
    }, 0) /
      (data.length - 1)
  );
};

export function getCenters(locations) {
  var midLat = 0;
  var midLon = 0;
  locations.map((loc) => {
    midLat += loc.lat;
    midLon += loc.lon;
  });
  return { lat: midLat / locations.length, lon: midLon / locations.length };
}

export async function radiusCalc(stats) {
  try {
    // I have to calculate the distance between each data point and the center of mass

    const finalvar =
      stats.distMean +
      (await probabilityEstimator(stats.percentage / 100, stats.degrees)) *
        stats.distSd;

    return finalvar > stats.distSd * 0.05 ? finalvar : 0;
  } catch (err) {
    console.log(err);
  }
}

export async function locationCalc(tmpLocs, tmpLLS) {
  if (tmpLocs.length > 0) {
    try {
      // Calculate Centroid for all locations
      const centers = await getCenters(tmpLocs);
      // Append centroid to territory

      // Get distance from centroid for each location
      var newLocs = await tmpLocs.map(async (x) => {
        const tmpDistance = await calculate(
          centers.lat,
          centers.lon,
          x.lat,
          x.lon
        );
        const tmpX = await { ...x, distance: tmpDistance.number };
        return tmpX;
      });
      newLocs = await Promise.all(newLocs);

      const newLLS = await calcLatlonStats(newLocs, tmpLLS, tmpLLS.percentage);

      // Sort the new locations by distance to centroid
      //////////////////////////////////////////////////////
      // Sorting does not work for some reason
      //////////////////////////////////////////////////////
      //
      // newLocs = await newLocs.sort(function (a, b) {
      //   return b.distance - a.distance;
      // });

      return { locations: newLocs, latLonStats: newLLS };
    } catch (e) {}
  }
}

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
// Incomplete function. Fix ASAP. 
//////////////////////////////////////////////////
//////////////////////////////////////////////////
export async function scatterData(stats) {
  let tmp = [];
  let i;
  let tmpRadius;

  for(i = 0; i < 100; i = i+0.5){
    tmpRadius = await radiusCalc({...stats, percentage: i});
    tmpRadius > 0 && tmp.push([ i, tmpRadius])
  }

  return tmp;

}