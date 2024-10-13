import './notFound.css'
import { Link } from "react-router-dom"

function NotFound() {
  return (
    <div className="notFound">
        <h1>Sorry, the page you were looking for was not found.</h1>
        <Link to="/" className="backToHomeBtn">Return to Home</Link>
    </div>
  )
}

export default NotFound