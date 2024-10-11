import '../../mainStyle/index.css'
import { Outlet } from "react-router-dom"
import Header from "../header/header"
import Footer from "../footer/Footer"

function Layout(){
  return (
    <div className='layout'>
        <Header />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Layout