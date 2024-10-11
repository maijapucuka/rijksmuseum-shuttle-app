import React from "react"
import "./artworkGallery.css"
import { Link,  useHistory, useParams } from "react-router-dom"
import Artwork from "../artwork/Artwork";

export default function ArtworkGallery() {

    const [artGallery, setArtGallery] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [hover, setHover] = React.useState(false);

    const fetchArtWorks = () => {

        setLoading(true);
        setError(null);

        const randomPage = Math.floor(Math.random() * 100) + 1;

        const numberOfArtworks = 3;

        fetch(`https://www.rijksmuseum.nl/api/en/collection?key=7FJzMjG0&ps=${numberOfArtworks}&p=${randomPage}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to fetch data. Please try again later.");
                }

                return res.json()
            })

            .then(data  => {
                // console.log(data);
                setArtGallery(data.artObjects);
                setLoading(false)
            })

            .catch((err) => {
                setError(err.message);
                setLoading(false);
            })
    };

    React.useEffect(() => {
        fetchArtWorks();
    }, [])

    // console.log(artGallery)

    return (

        <div className="artworkGallery">
            {loading &&
                <div className="loading">
                    Loading your artworks...
                </div>
            }
            {error &&
                <div className="error">
                    {error}
                </div>
            }
            
            {/* {!loading && !error && artGallery &&  */}
                <div className="wrapper">
                    {!loading && !error && artGallery && artGallery.map((item) => (
                        // <div>
                        //     <Link to={`/artwork/${item.id}`}>
                        //         <img key={item.webImage.url} src={item.webImage.url} alt={item.webImage.longTitle} />
                        //     </Link>
                        // </div>
                        <Link to={{
                            pathname: `/artwork/${item.objectNumber}`,
                            state: {artwork: item}
                        }} className="artworkWrapper">
                            <img key={item.webImage.url} src={item.webImage.url} alt={item.webImage.longTitle} onMouseEnter={() => setHover(true)} />
                            {hover && <h1>Learn More</h1>}
                        </Link>
                    ))}
                </div>
            {/* } */}

            <button onClick={fetchArtWorks}>
                {loading ? "Loading...": "Get New Artworks"}
                {/* Get New Artworks */}
            </button>
        </div>
    )

}


{/* <img src={artGallery[0].webImage.url} alt="" />
                        <img src={artGallery[1].webImage.url} alt="" />
                        <img src={artGallery[2].webImage.url} alt="" /> */}

{/*const [artGallery, setArtGallery] = React.useState();

    const fetchArtWorks = () => {

        const randomPage = Math.floor(Math.random() * 100) + 1;

        console.log(randomPage)

        fetch(`https://www.rijksmuseum.nl/api/en/collection?key=7FJzMjG0&ps=3&p=${randomPage}`)
            .then(res => res.json())

            .then(data  => {
                console.log(data);
                setArtGallery(data.artObjects);
            })

            .catch((err) => console.log(err));
    };

    React.useEffect(() => {
        console.log("test")
        fetchArtWorks();
    }, [])

    console.log(artGallery)

  return (

    <div>
        {artGallery && 
            <div className='artworkDetail'>
            {artGallery.map((item) => (
                <div>
                    <img key={item.webImage.url} src={item.webImage.url} alt={item.webImage.longTitle} />
                </div>
            ))}
            <button>Back to Gallery</button>
        </div>}
    </div>
  ) */}