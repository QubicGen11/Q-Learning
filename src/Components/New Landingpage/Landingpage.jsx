import React from 'react'
import Latestdeals from './LatestDeals Componnets/Latestdeals'
import Newnavbar from './New Navbar Components/Newnavbar'

const Landingpage = () => {
  return (
    <div>
      <Latestdeals />
      <div className='w-screen'>

         <Newnavbar />
        
      </div>
    </div>
  )
}

export default Landingpage
