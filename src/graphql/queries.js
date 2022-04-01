/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTerritory = /* GraphQL */ `
  query GetTerritory(
      $id: ID!     
      $nextToken: String
      ) {
    getTerritory(id: $id) {
      id
      name
      text
      image
      urlString
      title
      cluster
      source
      seo2
      seo
      locations(nextToken: $nextToken){
        items {
          id
          territoryId
          name
          lat
          lon
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      owner
      createdAt
      updatedAt
    }
  }
`;
export const listTerritories = /* GraphQL */ `
  query ListTerritories(
    $filter: ModelTerritoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTerritories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        text
        image
        urlString
        title
        cluster
        source
        seo2
        seo
        locations {
          nextToken
        }
        owner
        createdAt
        updatedAt
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
      updatedAt
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
        updatedAt
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
      createdAt
      updatedAt
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
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
