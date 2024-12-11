import React from 'react'
import Newnavbar from '../New Landingpage/New Navbar Components/Newnavbar'
import CategoriesTopsec from './CategoriesTopsec'
import Footer from '../New Landingpage/Footer/Footer'
import EducationAspiration from '../New Landingpage/Education Aspiraton Componenst/EducationAspiration'
import Featuredsection from './Featuredsection'
import PopularTopics from './PopularTopics'
import AllCourses from './AllCourses'

const Categoriesmain = () => {
  return (
    <div>
        <Newnavbar/>
        <div className='mt-5'>
        <CategoriesTopsec/>
        <Featuredsection/>
        <EducationAspiration/>
        <PopularTopics/>
        <AllCourses/>
        <Footer/>
        </div>
      
    </div>
  )
}

export default Categoriesmain
