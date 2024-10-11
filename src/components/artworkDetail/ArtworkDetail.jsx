import './artworkDetail.css'
import React from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom";

function ArtworkDetail() {

    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [artwork, setArtwork] = React.useState(location.state || null);
    const [loading, setLoading] = React.useState(!artwork);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {

        if (!artwork) {

            fetch(`https://www.rijksmuseum.nl/api/en/collection/${id}?key=7FJzMjG0`)
                .then(res => res.json())

                .then(data  => {
                    console.log(data);
                    setArtwork(data);
                    setLoading(false);
                })

                .catch((err) => {
                    setError(err.message);
                    setLoading(false)
                });
        }   
    }, [artwork, id])

    console.log(artwork)

  return (

    
    <div className='artworkDetail'>
        {/* <div className="wrapper"> */}
            <button onClick={() => navigate("/")}>Back to Gallery</button>
            {artwork && <div className='artworkWrapper'>
                <div className='artworkImg'>
                    <img src={artwork.artObject.webImage.url} alt={artwork.title} />
                </div>
                <div className='artworkText'>
                    <h1>{artwork.artObject.longTitle}</h1>
                    <h2>Description of the artwork in Dutch</h2>
                    <p>{artwork.artObject.description}</p>
                    <h2>Description of the artwork in English</h2>
                    <p>{artwork.artObjectPage.plaqueDescription ? artwork.artObjectPage.plaqueDescription : "Not Found"}</p>
                </div>
            </div>}
        {/* </div> */}
    </div>
  )
}

export default ArtworkDetail