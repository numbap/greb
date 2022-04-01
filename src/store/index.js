import { createStore } from "redux";

const initialState = {
  credits: -1,
  userName: null,
  sub: null,
  stripeClient: "dddd",
  territory: { name: null, title: null, error: "", text: "ffff", url: "ffff", image: "fff", locations: { items: [] } },
  locationCount: 0,
  latLonStats: {
    latMean: 0,
    lonMean: 0,
    lonSd: 0,
    degrees: 0,
    stdDevKms: 0,
    percentage: 10,
    tStat: 0,
    distance: 0,
    territoryName: "...",
  },
  centroids: [],
  clusteredLocations: {
    features: []
  },
  percentage: 95,
  cluster: 0,
};

const reducer = (state = initialState, action) => {
  // Don't reset credits or username
  if (action.type === "INIT_STATE") {
    return {
      ...state,
      ...initialState,
      credits: state.credits || 0,
      userName: state.userName || "Loading...",
    };
  }

  if (action.type === "SET_CLUSTER") {
    return { ...state, cluster: action.payload };
  }

  if (action.type === "UPDATE_CREDITS") {
    return { ...state, ...action.payload };
  }

  if (action.type === "DELETE_TERRITORY") {
    return {
      ...state,
      territories: state.territories.filter((x) => x.id !== action.payload),
    };
  }

  if (action.type === "DELETE_LOCATION") {
    let tmpTerritory = state.territory;
    tmpTerritory.locations.items = [
      ...state.territory.locations.items.filter((l) => l.id != action.payload),
    ];

    return {
      ...state,
      territory: {
        ...state.territory,
        locations: {
          ...state.territory.locations,
          items: [
            ...state.territory.locations.items.filter(
              (l) => l.id != action.payload
            ),
          ],
        },
      },
    };
  }

  if (action.type === "UPDATE_LLS") {
    return { ...state, latLonStats: action.payload };
  }

  if (action.type === "UPDATE_CENTROIDS") {
    return { ...state, centroids: action.payload };
  }

  if (action.type === "UPDATE_CLUSTEREDLOCATIONS") {
    return { ...state, clusteredLocations: action.payload };
  }

  if (action.type === "UPDATE_TERRITORIES") {
    const tmpTerritories = action.payload.map((x) => {
      return { ...x, locations: null };
    });
    return { ...state, territories: action.payload };
  }

  if (action.type === "UPDATE_PERCENTAGE") {
    return { ...state, percentage: action.payload };
  }

  if (action.type === "RESET_LOCATIONS_TERRITORY") {
    return { ...state, territory: null };
  }

  if (action.type === "SET_TERRITORY") {
    return { ...state, territory: action.payload };
  }

  if (action.type === "RESET_LLS") {
    return {
      ...state,
      latLonStats: { ...state.latLonStats, latLonStats: action.payload },
    };
  }

  if (action.type === "RESET_LOCATIONS") {
    return {
      ...state,
      territory: {
        ...state.territory,
        locations: { ...state.territory.locations, items: [] },
      },
    };
  }

  if (action.type === "UPDATE_LOCATIONS") {
    return {
      ...state,
      territory: {
        ...state.territory,
        locations: { ...state.territory.locations, items: action.payload },
      },
    };
  }

  if (action.type === "UPDATE_TERRITORY") {
    return {
      ...state,
      territory: action.payload,
      locationCount: action.payload.locations.items.length
    };
  }

  if (action.type === "UPDATE_LOCATIONS_TERRITORY_LATLONSTATS") {
    return {
      ...state,
      locations: action.payload.locations,
      territory: action.payload.territory,
      latLonStats: action.payload.latLonStats,
    };
  }

  return state;
};

const store = createStore(reducer);

export default store;
