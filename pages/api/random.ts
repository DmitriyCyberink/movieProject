import { NextApiRequest, NextApiResponse } from 'next';

import prismadb from '../../lib/prismadb';
import serverAuth from '../../lib/serverAuth';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if(request.method !== 'GET') {
    return response.status(405).end
  }


  try{
    await serverAuth(request);

    const movieCount = await prismadb.movie.count();
    const randomIndex = Math.floor(Math.random() * movieCount);

    const randomMovies = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    return response.status(200).json(randomMovies[0]);
  } catch (error) {
    console.error(error);
    // return response.status(400).end
  }
}
