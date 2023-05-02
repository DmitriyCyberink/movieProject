import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import { MoviePage } from '../components/Content/MoviePage';

import Navbar from '../components/Nav/Navbar';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }
  return {
    props: {}
  };
}

export default function Home () {
  return (
    <div className="relative h-full w-full bg-[url('/images/background.avif')] bg-no-repeat bg-center- bg-fixed bg-cover">
        <div className='bg-black w-full h-full lg:bg-opacity-20'>
        <Navbar />
        {/* <Billboard />  */}
        <MoviePage />
      
        </div>
     </div>
   
  )
}
