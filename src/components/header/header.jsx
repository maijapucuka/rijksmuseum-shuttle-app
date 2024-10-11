// import './header.css'
import '../../mainStyle/index.css'
import logo from "./Logo_Rijksmuseum.svg.png"

function Header(){
  return (
    <header>
      <img src={logo} />
      <h1>Artwork shuffle page</h1>
    </header>
  )
}

export default Header