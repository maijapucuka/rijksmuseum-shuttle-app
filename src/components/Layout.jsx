// Main style file
import '../mainStyle/index.css'
import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

function Layout() {
  return (
    <div className='layout'>
        <Header />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Layout