import React from 'react'
import Newnavbar from '../New Landingpage/New Navbar Components/Newnavbar'
import Latestdeals from '../New Landingpage/LatestDeals Componnets/Latestdeals'
import Topcategories from './Topcategories'
import Afterloginhero from './Afterloginhero'

const Afterlogin = () => {
  return (
    <div>
        <Latestdeals/>
        <Newnavbar/>
        <div className='mt-5'>

        <Topcategories/>
        </div>
        <div className="  shadow-md ">

        <Afterloginhero/>
        </div>
      
    </div>
  )
}

export default Afterlogin
