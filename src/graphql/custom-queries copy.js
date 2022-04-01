/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTerritory = /* GraphQL */ `
  query GetTerritory($id: ID!) {
    getTerritory(id: $id) {
      id
      name
      locations(limit: 10000) {
        items {
          id
          territoryId
          name
          lat
          lon
          createdAt
          owner
        }
        nextToken
      }
      archived
      owner
      lat
      lon
      zoom
      distance
    }
  }
`;
export const listTerritorys = /* GraphQL */ `
  query ListTerritorys(
    $filter: ModelTerritoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTerritorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        locations {
          nextToken
        }
        archived
        owner
        lat
        lon
        zoom
        distance
      }
      nextToken
    }
  }
`;
export const getLocation = /* GraphQL */ `
  query GetLocation($id: ID!) {
    getLocation(id: $id) {
      id
      territoryId
      name
      lat
      lon
      createdAt
      owner
    }
  }
`;
export const listLocations = /* GraphQL */ `
  query ListLocations(
    $filter: ModelLocationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLocations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        territoryId
        name
        lat
        lon
        createdAt
        owner
      }
      nextToken
    }
  }
`;
export const getBilling = /* GraphQL */ `
  query GetBilling($id: ID!) {
    getBilling(id: $id) {
      id
      cycleStartDate
      credits
      level
      owner
    }
  }
`;
export const listBillings = /* GraphQL */ `
  query ListBillings(
    $filter: ModelBillingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBillings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        cycleStartDate
        credits
        level
        owner
      }
      nextToken
    }
  }
`;
