import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import Beautician from './pages/Beautician'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'


// import Header from './Components/Header'
// import ServiceMenu from './Components/ServiceMenu'


 
const App=()=>{
  return(
    // <div className='mx-4 sm:mx-[10%]'>
    <div>


      <Navbar/>
      {/* <Header/>
      <ServiceMenu/> */}
      <Routes>




        <Route path='/' element={<Home/>}/>
        <Route path='/beautician' element={<Beautician/>}/>
        <Route path='/beautician/:service' element={<Beautician/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/my-profile' element={<MyProfile/>}/>
        <Route path='/my-appointments' element={<MyAppointments/>}/>
        <Route path='/appointment/:artistId' element={<Appointment/>}/>


     



      </Routes>
      <Footer/>
      </div>
  )
}
export default App