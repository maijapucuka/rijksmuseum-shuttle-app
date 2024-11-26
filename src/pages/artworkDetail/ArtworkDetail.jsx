import React from 'react';
import './artworkDetail.css'
import { useLocation, useNavigate, useParams } from "react-router-dom";
// Font Awesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// Rijksmuseum API key
const RIJKSMUSEUM_API_KEY = process.env.REACT_APP_RIJKSMUSEUM_API_KEY;

function ArtworkDetail() {

    // Get artworks ID from the url
    const { id } = useParams();
    // Get state from the Link
    const location = useLocation();

    const navigate = useNavigate();

    // States
    const [artwork, setArtwork] = React.useState(location.state || null);
    const [error, setError] = React.useState(null);
    const [fullImg, setFullImg] = React.useState(false)

    // API call
    React.useEffect(() => {

        //If there is no info about artwork from state, make a API call using artworks id
        if (!artwork) {

            fetch(`https://www.rijksmuseum.nl/api/en/collection/${id}?key=${RIJKSMUSEUM_API_KEY}`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error("Failed to fetch data. Please try again later!");
                    }
                    return res.json()
                })

                // Update Art Gallery state with data from API call
                .then(data  => {
                    setArtwork(data);
                })

                //If there is an error, update error state with message
                .catch((err) => {
                    setError(err.message);
                });
        }   
    }, [artwork, id])

  return (

    <div className='artworkDetail'>
        {/* Back to gallery btn */}
        <button onClick={() => navigate("/")} className='backToGalleryBtn'>Back to Gallery</button>

        {/* If there is an error, add error classname */}
        <div className={`artworkWrapper ${error ? "error" : ""}`}>

            {/* Error state displaying error message*/}
            {error &&
                <div className="errorWrapper">
                    <h1>{error}</h1>
                </div>
            }
            
            {/* If artwork successfully gotten from state / API call, display its image and info */}
            {artwork &&
                <>
                    <div 
                        className='artworkImg'
                        role='button' 
                        onClick={() => setFullImg(true)}
                        // Allow using Enter to open Full image
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                setFullImg(true);
                                e.preventDefault(); // Prevent default space scrolling
                            }
                        }}
                        tabIndex={0}
                        aria-label="View full-size image"
                    >
                        {/* Check if artwork img is available, if yes: display it */}
                        {artwork?.artObject?.webImage ? (
                            <img 
                                src={artwork?.artObject?.webImage?.url} 
                                alt={artwork?.artObject?.longTitle}
                                tabIndex={-1}
                            />
                        ) : (
                            <h2>Image not available</h2>
                        )}
                    </div>

                    {/* Info about the artwork */}
                    <div className='artworkText'>
                        
                        <h1>{artwork?.artObject?.longTitle}</h1>

                        <h2>Description of the artwork in Dutch</h2>
                        {/* Check if info about artwork in NL is available, if yes: display it */}
                        <p>{artwork?.artObject?.description ? artwork?.artObject?.description : "Not Found"}</p>

                        <h2>Description of the artwork in English</h2>
                        {/* Check if info about artwork in EN is available, if yes: display it */}
                        <p>{artwork?.artObjectPage?.plaqueDescription ? artwork?.artObjectPage?.plaqueDescription : "Not Found"}</p>
                    </div>
                </>}
        </div>
        {/* Full size img component with img and close btn */}
        {artwork?.artObject?.webImage && fullImg && <div className='fullImg'>
            <button 
                className='close-btn'
                onClick={() => setFullImg(false)}
                ariaLabel="Close"
            >                        
                <FontAwesomeIcon icon={faXmark} ariaHidden="true" />
            </button>

            {/* Check if artwork img is available, if yes: display it */}
            <img src={artwork?.artObject?.webImage?.url} alt={artwork?.artObject?.longTitle} />
        </div>}
    </div>
  )
}

export default ArtworkDetail
