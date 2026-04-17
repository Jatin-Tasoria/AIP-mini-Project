
import Front from '../src/Pages/Front'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import MenuPage from './Pages/Menu'
import AboutPage from './Pages/About'
import AuthPage from './Pages/login'
import Cart from './Pages/cart'
import ReviewSection from './components/comments/comments'
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
