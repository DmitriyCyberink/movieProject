/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  poster_path: string;
}

interface Actor {
  id: number;
  name: string;
}

interface ActorMovie {
  film_name: string;
}

const getPosterPath = (posterpath: any) => {
  return `https://www.themoviedb.org/t/p/w440_and_h660_face${posterpath}`;
};

const apiKey: string = "a6535dd01d5e04f8e26bbf2794f980f9";

export const MovieList = () => {
  const [totalPages, setTotalPages] = useState<number>();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [movieIds, setMovieIds] = useState<number[]>([]);
  const [activeMovie, setActiveMovie] = useState<number>();

  const [actors, setActors] = useState<Actor[]>([]);
  const [activeActor, setActiveActor] = useState<number>();
  const [actorMovies, setActorMovies] = useState<ActorMovie[]>([]);

  const fetchMovieList = async () => {
    const response = await axios.get(
      "https://api.themoviedb.org/3/discover/movie",
      {
        params: {
          api_key: apiKey,
          "primary_release_date.gte": "2000-01-01",
        },
      }
    );
    const data = response.data;
    console.log(response.data);
    const totalPages = data.total_pages;

    setTotalPages(totalPages);
  };

  const getRandomPage = async (pagesNr: number) => {
    const randomPage: number = Math.floor(Math.random() * 500) + 1;

    const request = await axios.get(
      "https://api.themoviedb.org/3/discover/movie",
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
    setMovieIds(ids);
  };

  const getMovieById = async (id: number) => {
    const request = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}`,
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
    const request = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits`,
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
    const request = await axios.get(
      `https://api.themoviedb.org/3/person/${id}/movie_credits`,
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
    totalPages != undefined && getRandomPage(totalPages);
  }, [totalPages]);

  useEffect(() => {
    const allMoviePromises: any[] = [];
    let tempMovies: Movie[] = [];
    movieIds.map((id: number) => {
      allMoviePromises.push(getMovieById(id));
    });
    Promise.all(allMoviePromises).then((results) => {
      const allMovies: Movie[] = results.map((movie) => movie);
      setMovies(allMovies);
      setActiveActor(undefined);
    });
  }, [movieIds, activeMovie]);

  return (
    <div className=" bg-black">
      <div className="bg-black w-full h-full lg:bg-opacity-20">
        <Navbar />

        <div className="px-4 md:px-12 space-y-8">
          <div className="grid grid-cols-5 gap-4 pt-32">
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
                        <p className="text-blue-900"> Movie Title: </p>
                        {movie.title}

                        <div className="text-white bg-black/75 absolute inset-0  opacity-0 hover:opacity-100 px-2">
        
                          {movieKey === activeMovie ? (
                            <ul>
                              {" "}
                              {actors.map((actor, actorKey) => {
                                return (
                                  <li
                                    key={actorKey}
                                    onClick={() =>
                                      onClickActor(actor.id, actorKey)
                                    }
                                  >
                                    <p className="text-yellow-600 text-center mt-2">
                                      {" "}
                                      Actor:{" "}
                                    </p>
                                    <div className="cursor-pointer font-bold text-center my-2">
                                      {actor.name}
                                    </div>

                                    {activeActor == actorKey &&
                                    activeMovie == movieKey ? (
                                      <ul>
                                        {" "}
                                        {actorMovies.map((movie, movieKey) => {
                                          return (
                                            <li
                                              key={movieKey}
                                              className="border-b-2"
                                            >
                                              Film name:
                                              <div className="text-yellow-600">
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
  );
};
