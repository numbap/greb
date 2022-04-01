import React, { useEffect, useState }  from "react";
import ClusterTable from "../charts/clusterTable"
import { connect } from "react-redux";
import { API, graphqlOperation } from "aws-amplify";
import { updateTerritory, deleteLocation } from "../../../graphql/mutations";

const SeoCard = (props) => {
    let [formState, setFormState] = useState({ error: "", title: "", text: "", urlString: "", image: "", cluster: 0, source:"" });

    useEffect(() => {
        // let { title, text, urlString, image, source, cluster } = 
        setFormState({ ...formState, ...props.territory })
    }, []);

    const saveSeo = async (e) => {
        try {
          e.preventDefault();
          let { title, text, urlString, image, source, cluster } = formState
          const territorySeoDetails = {
            id: props.territory.id,
            title: title,
            text: text,
            urlString: urlString,
            image: image,
            source: source,
            cluster: parseFloat(cluster)
          };
          let errorvar = await API.graphql({
            query: updateTerritory,
            variables: { input: territorySeoDetails },
          });
          await setFormState({ ...formState, error: "Successfuly Updated" });
        } catch (e) {
          console.log(e);
          await setFormState({ ...formState, error: "Update Unsuccessful" });

        }
      };

    return (
        <section className="card">
                <header className="card-header card-featured-primary card-featured">
                    <h2 className="card-title">SEO Variables</h2>
                </header>
                <div className="card-body ">
                    <div className="container">
                    <div className="row">
                        <div className="col-md-12">{formState.error && 
                        (<div className="alert alert-warning alert-dismissible fade show" role="alert" onDoubleClick={() => setFormState({...formState, error:""})}>
                             {formState.error}
                        </div>)}</div>
                        <div className="col-md-6">
                            <div>
                                <label htmlFor="seotext">SEO Text</label>
                                <textarea 
                                    className="form-control"
                                    value={formState.text}
                                    id="text" 
                                    placeholder="Enter text..." 
                                    rows="5"
                                    onChange={(e) => setFormState({ ...formState, text: e.target.value })}   
                                    />
                            </div>
                        </div>
                        <div className="col-md-6">

                            <div>
                                <label htmlFor="title" className="form-label">Title</label>
                                <input 
                                    type="text" 
                                    value={formState.title}
                                    className="form-control" 
                                    id="title"
                                    onChange={(e) => setFormState({ ...formState, title: e.target.value })}  
                                    />
                            </div>
                        

                            <div>
                                <label htmlFor="url" className="form-label">URL</label>
                                <input 
                                    type="text" 
                                    value={formState.urlString}
                                    className="form-control" 
                                    id="urlString"
                                    onChange={(e) => setFormState({ ...formState, urlString: e.target.value })}                                      
                                    />
                            </div>

                            <div>
                                <label htmlFor="image" className="form-label">Image</label>
                                <input 
                                    type="text" 
                                    value={formState.image}
                                    className="form-control" 
                                    id="image" 
                                    onChange={(e) => setFormState({ ...formState, image: e.target.value })} 
                                    />
                            </div>

                            <div>
                                <label htmlFor="image" className="form-label">Source</label>
                                <input 
                                    type="text" 
                                    value={formState.source}
                                    className="form-control" 
                                    id="source" 
                                    onChange={(e) => setFormState({ ...formState, source: e.target.value })} 
                                    />
                            </div>

                            <div>
                                <label htmlFor="image" className="form-label">Cluster Level</label>
                                <input 
                                    type="text" 
                                    value={formState.cluster}
                                    className="form-control" 
                                    id="cluster" 
                                    onChange={(e) => setFormState({ ...formState, cluster: e.target.value })} 
                                    />
                            </div>


                        </div>
                        <div className="col-md-12">
                            <button type="button" className="btn btn-primary" onClick={saveSeo}>Submit</button>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

const mapStateToProps = (state) => {
    return { 
        territory: state.territory,
     };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateTerritory: (territory) =>
            dispatch({ type: "UPDATE_TERRITORY", payload: territory }),
        updateLocations: (locations) =>
            dispatch({ type: "UPDATE_LOCATIONS", payload: locations }),
        updateLatLonStats: (latLonStats) =>
            dispatch({ type: "UPDATE_LLS", payload: latLonStats }),
        updateCentroids: (centroids) =>
            dispatch({ type: "UPDATE_CENTROIDS", payload: centroids }),
        updateClusteredLocations: (clusteredLocations) =>
            dispatch({ type: "UPDATE_CLUSTEREDLOCATIONS", payload: clusteredLocations }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SeoCard);