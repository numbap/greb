/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTerritory = /* GraphQL */ `
  subscription OnCreateTerritory($owner: String!) {
    onCreateTerritory(owner: $owner) {
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
export const onUpdateTerritory = /* GraphQL */ `
  subscription OnUpdateTerritory($owner: String!) {
    onUpdateTerritory(owner: $owner) {
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
export const onDeleteTerritory = /* GraphQL */ `
  subscription OnDeleteTerritory($owner: String!) {
    onDeleteTerritory(owner: $owner) {
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
export const onCreateLocation = /* GraphQL */ `
  subscription OnCreateLocation($owner: String!) {
    onCreateLocation(owner: $owner) {
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
export const onUpdateLocation = /* GraphQL */ `
  subscription OnUpdateLocation($owner: String!) {
    onUpdateLocation(owner: $owner) {
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
export const onDeleteLocation = /* GraphQL */ `
  subscription OnDeleteLocation($owner: String!) {
    onDeleteLocation(owner: $owner) {
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
export const onCreateBilling = /* GraphQL */ `
  subscription OnCreateBilling($owner: String!) {
    onCreateBilling(owner: $owner) {
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
export const onUpdateBilling = /* GraphQL */ `
  subscription OnUpdateBilling($owner: String!) {
    onUpdateBilling(owner: $owner) {
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
export const onDeleteBilling = /* GraphQL */ `
  subscription OnDeleteBilling($owner: String!) {
    onDeleteBilling(owner: $owner) {
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
