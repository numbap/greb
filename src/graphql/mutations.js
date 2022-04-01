/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTerritory = /* GraphQL */ `
  mutation CreateTerritory(
    $input: CreateTerritoryInput!
    $condition: ModelTerritoryConditionInput
  ) {
    createTerritory(input: $input, condition: $condition) {
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
export const updateTerritory = /* GraphQL */ `
  mutation UpdateTerritory(
    $input: UpdateTerritoryInput!
    $condition: ModelTerritoryConditionInput
  ) {
    updateTerritory(input: $input, condition: $condition) {
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
export const deleteTerritory = /* GraphQL */ `
  mutation DeleteTerritory(
    $input: DeleteTerritoryInput!
    $condition: ModelTerritoryConditionInput
  ) {
    deleteTerritory(input: $input, condition: $condition) {
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
export const createLocation = /* GraphQL */ `
  mutation CreateLocation(
    $input: CreateLocationInput!
    $condition: ModelLocationConditionInput
  ) {
    createLocation(input: $input, condition: $condition) {
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
export const updateLocation = /* GraphQL */ `
  mutation UpdateLocation(
    $input: UpdateLocationInput!
    $condition: ModelLocationConditionInput
  ) {
    updateLocation(input: $input, condition: $condition) {
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
export const deleteLocation = /* GraphQL */ `
  mutation DeleteLocation(
    $input: DeleteLocationInput!
    $condition: ModelLocationConditionInput
  ) {
    deleteLocation(input: $input, condition: $condition) {
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
export const createBilling = /* GraphQL */ `
  mutation CreateBilling(
    $input: CreateBillingInput!
    $condition: ModelBillingConditionInput
  ) {
    createBilling(input: $input, condition: $condition) {
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
export const updateBilling = /* GraphQL */ `
  mutation UpdateBilling(
    $input: UpdateBillingInput!
    $condition: ModelBillingConditionInput
  ) {
    updateBilling(input: $input, condition: $condition) {
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
export const deleteBilling = /* GraphQL */ `
  mutation DeleteBilling(
    $input: DeleteBillingInput!
    $condition: ModelBillingConditionInput
  ) {
    deleteBilling(input: $input, condition: $condition) {
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
