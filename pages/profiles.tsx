import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import useCurrentUser from '../hooks/useCurrentUser';


export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  
  if(!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }
  return {
    props: {}
  }
}

const Profiles = () => {
 const router = useRouter();
 const {data: user} = useCurrentUser();

  return (
    <div className="relative h-full w-full bg-[url('/images/background.avif')] bg-no-repeat bg-center- bg-fixed bg-cover">
          <div className='bg-black w-full h-full lg:bg-opacity-20'>
        
          <nav className='absolute px-16 py-12'>
            <img className='h-16' src="/images/logo.jpeg" alt="Logo" />
          </nav>
          
      <div className='flex items-center h-full justify-center'>
        <div className='flex flex-col'>
           
           <h1 className='animate-bounce text-3xl md:text-6xl text-yellow-500 text-center'>Profiles</h1>
             
             <div className='flex items-center justify-center gap-8 mt-16'>
              <div onClick={() => router.push('/')}>
                <div className='group flex-row w-44 mx-auto'>
                  <div className='
                      w-44
                      h-44
                      rounded-md
                      flex
                      items-center
                      justify-center
                      border-2
                      border-transparent
                      group-hover:border-yellow-500
                      overflow-hidden
                      cursor-pointer
                      transform
                      transition-all
                      hover:scale-110
                      '
                    >
                    <img src="/images/userLogo1.png" alt="" />
                  </div>
                  
                  <div
                    className='
                      mt-4
                      text-white
                      text-2xl
                      text-center
                      group-hover:text-yellow-500
                      cursor-pointer
                    '
                  >
                    {user?.name}
                  </div>
                </div>
              </div>   
             </div>
        </div>    
      </div>
    </div>
  </div>
  );
};
export default Profiles;

