import React from 'react'
import Banner from '../components/banner/Banner'
import PopularSection from '../components/PopularSection/PopularSection'
import MenuButton from '../components/button.jsx/Button'
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