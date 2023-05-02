/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from '../components/Nav/Navbar';
// import MovieRating from './movieRating';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  poster_path: string;
  release_data: string;
  vote_average: number;
}

interface Actor {
  id: number;
  name: string;
}

interface ActorMovie {
  film_name: string;
}

const getPosterPath = (posterPath: any) => {
  return `https://www.themoviedb.org/t/p/w440_and_h660_face${posterPath}`;
};

const apiKey: string = 'a6535dd01d5e04f8e26bbf2794f980f9'

const MovieDetails = () => {
const [allMovies, setAllMovies] = useState<number>();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [movieList, setMovieList] = useState<number[]>([]);
  const [activeMovie, setActiveMovie] = useState<number>();

  const [actors, setActors] = useState<Actor[]>([]);
  const [activeActor, setActiveActor] = useState<number>();
  const [actorMovies, setActorMovies] = useState<ActorMovie[]>([]);

  const fetchMovieList = async () => {
    const response = await axios.get("https://api.themoviedb.org/3/discover/movie",
      {
        params: {
          api_key: apiKey,
          "primary_release_date.gte": "2000-01-01",
        },
      }
    );
    const data = response.data;
    console.log(response.data);
    const allMovies = data.total_pages;

    setAllMovies(allMovies);
  };
  
  const getRandomPage = async (pagesNr: number) => {
    const randomPage: number = Math.floor(Math.random() * 500) + 1;

    const request = await axios.get("https://api.themoviedb.org/3/discover/movie",
      {
        params: {
          api_key: apiKey,
          "primary_release_date.gte": "2000-01-01",
          page: randomPage,
        },
      }
    );
    const allMovies = request.data;
    const moviesOnPage = allMovies.results;
    const topFiveMovies = moviesOnPage.slice(0, 20);
    const ids: number[] = topFiveMovies.map((movie: Movie) => movie.id);
    setMovieList(ids);
  };

  const getMovieById = async (id: number) => {
    const request = await axios.get(`https://api.themoviedb.org/3/movie/${id}`,
      {
        params: {
          api_key: apiKey,
        },
      }
    );
    const movieData = request.data;
    return movieData;
  };

  const findMovieActors = async (id: number, key: number) => {
    const request = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`,
      {
        params: {
          api_key: apiKey,
        },
      }
    );
    const actorListData = request.data;
    const actorList = actorListData.cast
      .map((actor: any) => ({ id: actor.id, name: actor.name }))
      .slice(0, 3);
    setActors(actorList);
    setActiveMovie(key);
    console.log(actorList);
  };

  const onClickActor = async (id: number, key: number) => {
    const request = await axios.get(`https://api.themoviedb.org/3/person/${id}/movie_credits`,
      {
        params: {
          api_key: apiKey,
        },
      }
    );
    const actorMoviesData = request.data;
    const actorMovieList = actorMoviesData.cast
      .map((movie: any) => ({ film_name: movie.title }))
      .slice(0, 3);
    setActiveActor(key);
    setActorMovies(actorMovieList);
  };

  useEffect(() => {
    fetchMovieList();
  }, []);

  useEffect(() => {
    allMovies != undefined && getRandomPage(allMovies);
  }, [allMovies]);

  useEffect(() => {
    const allMoviePromises: any[] = [];
    let tempMovies: Movie[] = [];
    movieList.map((id: number) => {
      allMoviePromises.push(getMovieById(id));
    });
    Promise.all(allMoviePromises).then((results) => {
      const allMovies: Movie[] = results.map((movie) => movie);
      setMovies(allMovies);
      setActiveActor(undefined);
    });
  }, [movieList, activeMovie]);



  return <div className=" bg-black">
      <div className="bg-black w-full h-full lg:bg-opacity-20">
        <Navbar />
      
        <div className="px-4 md:px-12 space-y-8">
          <div className=" grid grid-cols-5 gap-4 pt-32">
            {movies
              ? movies.map((movie, movieKey) => {
                return (
                  <div
                      key={movieKey}
                      className="text-white text-md md:text-xl lg:text-1xl font-semibold mb-4"
                      onClick={() => findMovieActors(movie.id, movieKey)}
                    >
                      <div className="relative group bg-zinc-900 col-span h-full m-2 px-2 py-2">
                        {movie.poster_path && (
                          <img
                            src={getPosterPath(movie.poster_path)}
                            alt={movie.title}
                            className="w-full h-3/4 object-cover"
                          />
                        )}
                        <div className='absolute bottom-[7rem] right-1'>
                        </div>
                        
                        <p className="text-blue-900"> Movie Title: </p>
                         <p>{movie.title}</p>
                         
                         <p className='text-sm text-green-500 absolute bottom-[7.5rem] left-2'>
                          
                          <div className="flex items-center">
                            <svg 
                            aria-hidden="true" 
                            className="w-5 h-5
                            text-yellow-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                  <title>Rating star</title>
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                  </path>
                                  </svg>
                          <p className="ml-2 text-1xl font-bold text-gray-900 dark:text-white">{Math.round(movie.vote_average)}</p>
                          </div>
                          </p>
                         
                         <div className='absolute bottom-[0.0rem] right-2 text-sm text-yellow-600 '>
                           {movie.release_date}
                          </div>
                          
                        <div 
                        className="
                        bg-black/75
                        text-white
                          cursor-pointer
                          absolute 
                          inset-0
                          opacity-0
                          hover:opacity-100
                          px-2
                        "
                        >
                         
                         <div className='text-xs mt-1 ml-1'> 
                          <p className='text-yellow-600'>Description:</p> 
                                {movie.overview}
                          <p className=''>Rating: {movie.vote_average}</p>
                          </div>

                          {movieKey === activeMovie ? (
                            <ul className='mt-5 ml-3 text-sm font-bold text-yellow-600 absolute'>
                              {" ACTORS "}
                              {actors.map((actor, actorKey) => {
                                return (
                                  <li
                                    key={actorKey}
                                    onClick={() =>
                                      onClickActor(actor.id, actorKey)
                                    }
                                  >
                                    <p className="text-yellow-600 mt-2">
                                      {" "}
                                     {" "}
                                    </p>
                                    <div className="cursor-pointer  my-1 text-white">
                                      {actor.name}
                                    </div>

                                    {activeActor == actorKey &&
                                    activeMovie == movieKey ? (
                                      <ul className='pt-4'>
                                        {"FILM NAME"}
                                        {actorMovies.map((movie, movieKey) => {
                                          return (
                                            <li
                                              key={movieKey}
                                              className="border-b-2"
                                            >
                                              <div className=" text-white">
                                                {movie.film_name}
                                              </div>
                                              
                                            </li>
                                            
                                          );
                                        })}{" "}
                                      </ul>
                                    ) : null}
                                  </li>
                                );
                              })}
                            </ul>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </div>
};

export default MovieDetails;
