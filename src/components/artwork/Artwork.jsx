// import './artwork.css'
import { Link } from "react-router-dom"

function Artwork( {item} ){
  return (
    <div className='artwork'>
        {/* <Link to={`/artwork/${item.id}`}> */}
            <img key={item.webImage.url} src={item.webImage.url} alt={item.webImage.longTitle} />
        {/* </Link> */}
    </div>
  )
}

export default Artwork