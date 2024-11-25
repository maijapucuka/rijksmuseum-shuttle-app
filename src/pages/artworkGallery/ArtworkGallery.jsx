import React from "react";
import "./artworkGallery.css"
import { Link } from "react-router-dom"
// Font Awesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

// Rijksmuseum API key
const RIJKSMUSEUM_API_KEY = process.env.REACT_APP_RIJKSMUSEUM_API_KEY;

function ArtworkGallery() {

    const [artGallery, setArtGallery] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [hover, setHover] = React.useState(false);

    // Cache expiry time
    const cacheExpirationTime = 60 * 10000;

    const numberOfArtworksToBeFetched = 3;

    const fetchArtWorks = () => {

        setLoading(true);
        setError(null);

         // Create an array of 3 promises, each fetching one artwork from a different random page
         const promises = [...Array(3)].map(() => {

            // Get a random page from the max allowed number of pages
            const randomPage = Math.floor((Math.random() * 1000) + 1);
            
            return fetch(`https://www.rijksmuseum.nl/api/en/collection?key=${RIJKSMUSEUM_API_KEY}&p=${randomPage}`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error("Failed to fetch data. Please try again later!");
                    }
                    return res.json();
                })
                // Get the one of ten artworks from the result page
                .then(data => data.artObjects[Math.floor((Math.random() * 10) + 1)]);       
        });

        // Wait for all the API calls to complete
        Promise.all(promises)
            .then(results => {
                // Save results to cache
                const cacheData = {
                    artworks: results,
                    timestamp: new Date().getTime(),
                };
                localStorage.setItem("cachedArtworks", JSON.stringify(cacheData));

                // Update Art Gallery state with data from API call; stop loading state
                setArtGallery(results);
                setLoading(false);
            })

            //If there is an error, update error state with message; stop loading stage
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    };

    // Get results from cache
    const loadFromCache = () => {
        const cache = localStorage.getItem("cachedArtworks");
        if (cache) {
            const cacheData = JSON.parse(cache);
            const currentTime = new Date().getTime();

            // Check if cache is still valid
            if (currentTime - cacheData.timestamp < cacheExpirationTime) {
                setArtGallery(cacheData.artworks);
                setLoading(false);
                return true;
            }
        }
        return false;
    };

    React.useEffect(() => {
         // Try loading from cache first
         if (!loadFromCache()) {
            // If no valid cache, fetch new data
            fetchArtWorks();
        }
    }, [])

    return (

        <div className="artworkGallery">
            
            {/* If there is an error, add error className */}
            <div className={`wrapper ${error ? "error" : ""}`}>

                {/* If there is an error, display error message*/}
                {error &&
                    <div className="errorWrapper">
                        <h1>{error}</h1>
                    </div>
                }
                
                {/* Loading state */}
                {loading ? (
                    [...Array(numberOfArtworksToBeFetched)].map((_, index) => (
                        <div key={index} className="loadingPlaceholder">
                            <FontAwesomeIcon icon={faSpinner} className="loadingIcon" />
                        </div>
                    ))
                ) : (
                    // If no errors and 
                    !loading && !error && artGallery && artGallery.map((item) => (
                        
                        // Link to artworks detail page
                        <Link to={{
                            pathname: `/artwork/${item?.objectNumber}`,
                            state: {artwork: item}
                        }}  
                            key={item?.objectNumber}
                            className="artworkWrapper"
                            aria-label={`View details about ${item?.longTitle ? item?.longTitle : 'this artwork'}`}

                            onMouseEnter={() => setHover(true)}
                            onFocus={() => setHover(true)}
                            onBlur={() => setHover(false)}
                        >
                            
                            {/* Check if artwork img is available, if yes: display it */}
                            {item?.webImage ? (
                                <img
                                    src={item?.webImage.url} alt={item?.longTitle}
                                />
                            ) : (
                                <h2>Image not available</h2>
                             )}

                            {/* Artwork img hover text */}
                            {hover && (
                                <h1 className="learnMoreText" aria-live="polite">
                                    Learn More
                                </h1>
                            )}
                        </Link>
                    ))
                )}
            </div>
            {/* Button with text depending if artworks are loading / not loading */}
            <button onClick={fetchArtWorks} className="fetchArtworksBtn">
                {loading ? "Loading...": "Get New Artworks"}
            </button>
        </div>
    )
}

export default ArtworkGallery;