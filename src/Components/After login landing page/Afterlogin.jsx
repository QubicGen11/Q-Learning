import React from 'react'
import Newnavbar from '../New Landingpage/New Navbar Components/Newnavbar'
import Latestdeals from '../New Landingpage/LatestDeals Componnets/Latestdeals'
import Topcategories from './Topcategories'
import Afterloginhero from './Afterloginhero'
import EnrolledCourses from './EnrolledCourses'
import Whattolearnnext from './Whattolearnnext'
import Footer from '../New Landingpage/Footer/Footer'
import QubinestSuggestionforyou from './QubinestSuggestionforyou'
import Becauseyouhaveviewd from './Becauseyouhaveviewd'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Afterlogin = () => {
  return (
    <div className='overflow-x-hidden'>
        <Latestdeals/>
        <Newnavbar/>
        <div className='mt-5'>

        <Topcategories skeleton={Skeleton}/>
        </div>
        <div className="  shadow-md ">

        <Afterloginhero/>
        </div>
        <EnrolledCourses/>
        <Whattolearnnext/>
        <QubinestSuggestionforyou/>
        <Becauseyouhaveviewd/>
        <Footer/>
    </div>
  )
}

export default Afterlogin
