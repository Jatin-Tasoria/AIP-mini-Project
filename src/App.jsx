
import Front from './Pages/Fronttemp.jsx'
import './App.css'
import Navbar from './components/Navbartemp/Navbar.jsx'
import Footer from './components/Footertemp/Footer.jsx'
import MenuPage from './Pages/Menutemp.jsx'
import AboutPage from './Pages/Abouttemp.jsx'
import AuthPage from './Pages/LoginTemp.jsx'
import Cart from './Pages/Carttemp.jsx'
import ReviewSection from './components/Commentstemp/Comments.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import API from './api';


function App() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <>
        <Navbar />
        <Routes>
          <Route path='/' element={
            <>
              <Front />
              <ReviewSection user={user} /> 
            </>} />
          <Route path='/menu' element={<MenuPage />} />
          <Route path='/about' element={<AboutPage/>}/>
          <Route path='/login' element={<AuthPage/>}/>
          <Route path='/cart' element={<Cart/>}/>
        </Routes>
        <Footer />
    </>
  )
}

export default App
