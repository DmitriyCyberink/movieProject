import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { FilmsSection } from '../components/MovieList';

import Navbar from '../components/Navbar';

interface Movies {
  rank: string;
  s: string;
  i: any;
  id: number;
  l: string;
}


interface Actor {
  id: number;
  name: string;
}

interface ActorMovie {
  film_name: string;
}


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
  const [movies, setMovies] = useState<Movies[]>([]);
  const [actorMovies, setActorMovies] = useState<ActorMovie[]>([]);

  useEffect (() => {
      fetch('https://online-movie-database.p.rapidapi.com/auto-complete?q=friends', {
        method: 'GET',
	    headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '897aa10904msh845e8f193fc9be2p1297eejsna0357312cadb',
        'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com',
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.d);
      setMovies(data.d);
    })
    
  }, []);

  return (
    <div className="relative h-full w-full bg-[url('/images/background.avif')] bg-no-repeat bg-center- bg-fixed bg-cover">
        <div className='bg-black w-full h-full lg:bg-opacity-20'>
        <Navbar />
        {/* <Billboard />  */}
        <FilmsSection />
      
        </div>
     </div>
   
  )
}
