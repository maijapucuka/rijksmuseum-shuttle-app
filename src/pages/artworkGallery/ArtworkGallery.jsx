import React from "react"
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

    // const numberOfArtworksToBeFetched = 3;
    const numberOfArtworksToBeFetched = 1;

    const fetchArtWorks = () => {

        setLoading(true);
        setError(null);

        // Calculate the maximum number of pages
        const maxPages = Math.floor(10000 / numberOfArtworksToBeFetched) - 1;
        const randomPage = Math.floor(Math.random() * maxPages);

         // Create an array of 3 promises, each fetching one artwork from a different random page
         const promises = [...Array(3)].map(() => {
            const randomPage = Math.floor(Math.random() * maxPages);
            return fetch(`https://www.rijksmuseum.nl/api/en/collection?key=${RIJKSMUSEUM_API_KEY}&ps=${numberOfArtworksToBeFetched}&p=${randomPage}`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error("Failed to fetch data. Please try again later!");
                    }
                    return res.json()
                })
                // Get the first artwork from the results
                .then(data => data.artObjects[0]);
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

                // Update Art Gallery state with data from API call, stop loading state
                setArtGallery(results);
                setLoading(false);
            })

            //If there is error, update error state with message
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
            
            {/* ERROR STATE */}
            <div className={`wrapper ${error ? "error" : ""}`}>

                {error &&
                    <div className="errorWrapper">
                        <h1>{error}</h1>
                    </div>
                }
                
                {/* LOADING STATE */}
                {loading ? (
                    [...Array(3)].map((_, index) => (
                        <div key={index} className="loadingPlaceholder">
                            <FontAwesomeIcon icon={faSpinner} className="loadingIcon" />
                        </div>
                    ))
                ) : (
                    // If no errors and 
                    !loading && !error && artGallery && artGallery.map((item) => (
                        
                        // Link to artworks detail page
                        <Link to={{
                            pathname: `/artwork/${item.objectNumber}`,
                            state: {artwork: item}
                        }} 
                            className="artworkWrapper"
                            aria-label={`View details about ${item.webImage ? item.webImage.longTitle : 'this artwork'}`}

                            onMouseEnter={() => setHover(true)}
                            onFocus={() => setHover(true)}
                            onBlur={() => setHover(false)}
                        >
                            
                            {/* If artwork has image, display it */}
                            {item.webImage ? (
                                <img
                                    key={item.webImage.url} src={item.webImage.url} alt={item.webImage.longTitle}
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