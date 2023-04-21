export default function Home() {
  return (
    <div className="relative h-full w-full bg-[url('/images/background.avif')] bg-no-repeat bg-center- bg-fixed bg-cover">
        <div className='bg-black w-full h-full lg:bg-opacity-30'>
        <nav className='px-12 py-5'>
          <img src="/images/logo.jpeg" alt="Logo" className='h-32'/>
        </nav>
        <div className='flex justify-center'>
        <div className='px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full'>
          <h1 className='text-4xl text-blue-600' >Movie app</h1>
        </div>
        </div>
        </div>
    </div>
  )
}
