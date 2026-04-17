import React from 'react'
import Banner from '../components/Banner/Banner.jsx'
import PopularSection from '../components/PopularSection/PopularSection'
import MenuButton from '../components/Button/Button.jsx'
import API from '../api';

const Front = () => {
  return (
    <>
      <Banner/>

      <PopularSection/>
    
      <MenuButton/>
    
    </>
  )
}

export default Front