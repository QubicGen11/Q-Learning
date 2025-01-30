import React, { useRef } from 'react'
import Newnavbar from '../New Landingpage/New Navbar Components/Newnavbar'
import CategoriesTopsec from './CategoriesTopsec'
import Footer from '../New Landingpage/Footer/Footer'
import EducationAspiration from '../New Landingpage/Education Aspiraton Componenst/EducationAspiration'
import Featuredsection from './Featuredsection'
import PopularTopics from './PopularTopics'
import AllCourses from './AllCourses'
import PopularInstructors from './PopularInstructors'

const Categoriesmain = () => {
  const allCoursesRef = useRef(null);
  return (
    <div>
        <Newnavbar/>
        <div className='mt-5'>
        <CategoriesTopsec scrollToCourses={() => allCoursesRef.current?.scrollIntoView({ behavior: 'smooth' })} />
        <Featuredsection/>
        <EducationAspiration/>
        <PopularTopics/>
        <div ref={allCoursesRef}>
          <AllCourses />
        </div>
        <PopularInstructors/>
        <Footer/>
        </div>
      
    </div>
  )
}

export default Categoriesmain
