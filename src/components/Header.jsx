// Main style file
import '../mainStyle/index.css'
import logo from "../images/Logo_Rijksmuseum.svg.png"

function Header() {
  return (
    <header>
      <img src={logo} alt='Rijksmuseum logo' />
      <h1>Artwork shuffle page</h1>
    </header>
  )
}

export default Header