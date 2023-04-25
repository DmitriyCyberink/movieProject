import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Billboard from '../components/Billboard';

import Navbar from '../components/Navbar';

interface Movies {
  rank: string;
  s: string;
  i: any;
  id: number;
  l: string;
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
        <div className='px-4 md:px-12 mt-4 space-y-8'>
       
         <div className='grid grid-cols-4 gap-2 pt-28'>
          {movies.map(movie => (
            <div className='mb-10' key={movie.id}>
                <div className='cursor-pointer'>
                    <p className='text-white text-md md:text-xl lg:text-2xl font-semibold mb-4'>
                      {movie.l}
                    </p>
                <div className='relative group bg-zinc-900 col-span '>
                    <img src={movie.i.imageUrl} alt="" />

                      <div className='text-white bg-black/75 absolute inset-0  opacity-0 hover:opacity-100 px-2'>
                      Actors: {movie.s}
                      </div>
              </div>
             </div>
            </div>
          ))}
          </div>
        </div>

        </div>
     </div>
   
  )
}
