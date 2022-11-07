import React from 'react'

import Navbar from './Navbar'
import HeaderBanner from './HeaderBanner'
import './MainPage.css'

const MainPage = () => {
  return (
    <>
    <div className="mainPageContainer">
        <Navbar />
        <HeaderBanner />
    </div>
    </>
  )
}

export default MainPage