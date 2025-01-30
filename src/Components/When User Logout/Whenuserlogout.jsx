import { useEffect } from 'react';
import usePreLoginFeedStore from '../../stores/preLoginFeedStore';
import Latestdeals from '../New Landingpage/LatestDeals Componnets/Latestdeals';
import Newnavbar from '../New Landingpage/New Navbar Components/Newnavbar';
import LearnersChoice from '../New Landingpage/Learners Choice/LearnersChoice';

import Logoutskillsforyou from './Logoutskillsforyou';
import Footer from '../New Landingpage/Footer/Footer';
import Logoutherosec from './Logoutherosec';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Learnerchoiceafterlogout from './Learnerchoiceafterlogout';
const Whenuserlogout = () => {
  const { learnersChoice, isLoading, error, fetchPreLoginFeed } = usePreLoginFeedStore();

  useEffect(() => {
    fetchPreLoginFeed(); // Ensure data is fetched
  }, [fetchPreLoginFeed]);

  if (isLoading) {
    return <Skeleton height={40} count={5} style={{ marginBottom: '10px' }}  />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log("LearnersChoice data in Whenuserlogout:", learnersChoice);

  return (
    <div className='overflow-hidden'>
      <Latestdeals />
      <Newnavbar />
      <Logoutherosec />
      <Logoutskillsforyou />
      <Learnerchoiceafterlogout courses={learnersChoice}/>
      
      <Footer />
    </div>
  );
};

export default Whenuserlogout;
