import React from 'react'
import Newnavbar from '../New Landingpage/New Navbar Components/Newnavbar'
import Latestdeals from '../New Landingpage/LatestDeals Componnets/Latestdeals'
import Logoutherosec from './Logoutherosec'
import Logoutskillsforyou from './Logoutskillsforyou'
import LearnersChoice from '../New Landingpage/Learners Choice/LearnersChoice'
import Footer from '../New Landingpage/Footer/Footer'

const Whenuserlogout = () => {
  return (
    <div className='overflow-hidden'>
      <Latestdeals/>
        <Newnavbar/>
        <Logoutherosec/>
        <Logoutskillsforyou/>
        <LearnersChoice/>
      <Footer/>
    </div>
  )
}

export default Whenuserlogout
