import Amplify, { API, graphqlOperation } from "aws-amplify";

import { createTerritory, deleteTerritory } from "../../graphql/mutations.js";
import {
  listLocations,
  listTerritories,
  getTerritory,
} from "../../graphql/queries";

import { v4 as uuidv4 } from 'uuid';

export async function fetchTerritorys() {
  const territorys = await API.graphql(graphqlOperation(listTerritories));
  return territorys.data.listTerritories.items;
}

export async function fetchLocations(territory) {

  const locations = await API.graphql(
    graphqlOperation(listLocations, {
      filter: {
        territoryId: {
          eq: territory,
        },
      },
      limit: 100000, 
    })
  );
  return locations.data.listLocations.items;
}

export async function getTerritoryDetails(id, nextToken) {
  try {

    const territoryData = await API.graphql(
      graphqlOperation(getTerritory, { id: id, nextToken: nextToken } )
    );
    // const territoryName = territoryData.data.getTerritory.name;
    // console.log(territoryName, "Territory name");
    return territoryData.data.getTerritory;

  } catch (err) {
    console.log("error fetching territory name", err);
  }
}

export async function addTerritory(formState) {
  console.log("adding...");
  try {
    if (!formState.name) return;
    const territory = {
      ...formState,
      archived: "false",
    };
    await API.graphql( graphqlOperation(createTerritory, { input: {id: uuidv4(), name: formState.name}} ));
    await fetchTerritorys();
  } catch (err) {
    console.log("error creating territory", err);
  }
}

export async function deleteT(id) {
  try {

    await API.graphql(graphqlOperation(deleteTerritory, { input: { id } }));
    // await fetchTerritorys();

  } catch (err) {
    console.log("error deleting territory");
  }
}

// export async function getTerritoryDetails(id) {
//   try {
//     console.log("getting territory details", id);
//     const territoryData = await API.graphql(
//       graphqlOperation(getTerritory, { id: id })
//     );
//     const territoryName = territoryData.data.getTerritory.name;
//     console.log(territoryName, "Territory name");
//     return territoryName;
//   } catch (err) {
//     console.log("error fetching territory name", err);
//   }
// }

// export async function addTerritory(formState) {
//   try {
//     if (!formState.name) return;
//     const territory = { ...formState, archived: false };
//     console.log(territory);
//     await API.graphql(
//       graphqlOperation(createTerritory, {
//         input: { name: territory.name, archived: false },
//       })
//     );
//     await fetchTerritorys();
//   } catch (err) {
//     console.log("error creating territory", err);
//   }
// }

// import {
//   createProfile,
//   deleteLocation,
//   createTerritory,
//   createLocation,
//   deleteTerritory,
// } from "../../graphql/mutations.js";
// import {
//   listProfiles,
//   getProfile,
//   listLocations,
//   getLocation,
//   listTerritorys,
//   getTerritory,
// } from "../../graphql/queries";


















// import {
//   listLocations,
//   listTerritorys,
//   getTerritory,
// } from "../../graphql/queries";