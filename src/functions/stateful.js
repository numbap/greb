import store from "../store/index";
import { getTerritoryDetails } from "../components/database/database";
import { clusterAll } from "./cluster";
import Amplify, { API, graphqlOperation, Auth } from "aws-amplify";


export const recompile = async (id) => {
 
    let tmpState = store.getState()

    try {
        let currentTerritory = { locations: {items: [], nextToken: null}}
        // = await getTerritoryDetails(id);
        let tmpLocations = []
        do{
 
            currentTerritory = await getTerritoryDetails(id, currentTerritory.locations.nextToken);
            tmpLocations = [...tmpLocations, ...currentTerritory.locations.items]

        }while(currentTerritory.locations.nextToken)

        currentTerritory.locations.items = tmpLocations;

        await store.dispatch({ type: "UPDATE_TERRITORY", payload: currentTerritory })


        if (currentTerritory.locations.items.length > 10) {
            // THIS IS FOR LOCAL STATE ONLY
            // setFormState({ ...formState, collapse: true })
        }


        if (currentTerritory.locations.items.length > 0) {

            const [tmpClusteredLocations, tmpCentroids] = await clusterAll(currentTerritory.locations.items, tmpState.cluster, tmpState.percentage)


            await store.dispatch({ type: "UPDATE_CLUSTEREDLOCATIONS", payload: tmpClusteredLocations })
            // await props.updateClusteredLocations(tmpClusteredLocations);

            await store.dispatch({ type: "UPDATE_CENTROIDS", payload: tmpCentroids })
            // await props.updateCentroids(tmpCentroids)
                               
        }else{
            const tmpClusteredLocations = 
            {
                "features": [],
                "type": "FeatureCollection",
                "centerOfMass": {
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
            }

            const tmpCentroids = [
                {
                    "centroid": {
                        lat: 0,
                        lon: 0
                    },
                    "id": 0,
                    "count": 1,
                    "SD": 0,
                    "mean": 0,
                    "radius": 0,
                    "outliers": 0
                }
            ]
    
            await store.dispatch({ type: "UPDATE_CLUSTEREDLOCATIONS", payload: tmpClusteredLocations })
            await store.dispatch({ type: "UPDATE_CENTROIDS", payload: tmpCentroids })
        }

    } catch (e) {
        console.log(e)
    }
}




export const recompileSEO = async (seoString) => {

    let tmpState = store.getState()

    try {
        // let currentTerritory = { locations: {items: [], nextToken: null}}
        // // = await getTerritoryDetails(id);
        // let tmpLocations = []
        // do{
        //     console.log("Get territory details", currentTerritory.locations)
        //     currentTerritory = await getTerritoryDetails(id, currentTerritory.locations.nextToken);
        //     tmpLocations = [...tmpLocations, ...currentTerritory.locations.items]

        // }while(currentTerritory.locations.nextToken)

        // currentTerritory.locations.items = tmpLocations;

        const currentTerritory = await API.post("locationSEO", "/", { body: {seoString: seoString} });
        await store.dispatch({ type: "UPDATE_TERRITORY", payload: currentTerritory })

        if (currentTerritory.locations.items.length > 0) {

            const [tmpClusteredLocations, tmpCentroids] = await clusterAll(currentTerritory.locations.items, tmpState.cluster, tmpState.percentage)


            await store.dispatch({ type: "UPDATE_CLUSTEREDLOCATIONS", payload: tmpClusteredLocations })
            // await props.updateClusteredLocations(tmpClusteredLocations);

            await store.dispatch({ type: "UPDATE_CENTROIDS", payload: tmpCentroids })
            // await props.updateCentroids(tmpCentroids)
                               
        }else{
            const tmpClusteredLocations = 
            {
                "features": [],
                "type": "FeatureCollection",
                "centerOfMass": {
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
            }

            const tmpCentroids = [
                {
                    "centroid": {
                        lat: 0,
                        lon: 0
                    },
                    "id": 0,
                    "count": 1,
                    "SD": 0,
                    "mean": 0,
                    "radius": 0,
                    "outliers": 0
                }
            ]
    
            await store.dispatch({ type: "UPDATE_CLUSTEREDLOCATIONS", payload: tmpClusteredLocations })
            await store.dispatch({ type: "UPDATE_CENTROIDS", payload: tmpCentroids })
        }

    } catch (e) {
        console.log(e)
    }
}