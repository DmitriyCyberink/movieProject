const MovieRating = ({vote}: any) => {
  
    const dashArray = Math.PI * 100;
    const dashOffSet = Math.PI * (100 - vote)

    const bar = {
      low:'#db2360',
      medium:'#d2d531',
      high:'#21d07a',
      none:''
    }

    const track = {
      low:'#571435',
      medium:'#423d0f',
      high:'#024529',
      none:'#666666'
    }

const getColor = (rating: number) => {
  if (rating >= 70) return 'high';
  if (rating >= 40) return 'medium';
  if (rating > 0) return 'low';
  return 'none'
}

return (

  <div className='w-[38px] h-[38px] bg-blue-950 rounded-full flex justify-center items-center'>
      <svg width='34px' height='34px' viewBox='0 0 100 100' className='rotate-[90deg]'>
          <circle
            cx='52.2px'
            cy='52.2px'
            r='50'
            fill='transparent'
            stroke={track[getColor(vote)]}
            strokeWidth={6}
            strokeDasharray={dashArray}
            className='scale-[0.95]'
          />
          <circle
            cx='52.2px'
            cy='52.2px'
            r='50'
            fill='transparent'
            stroke={bar[getColor(vote)]}
            strokeWidth={6}
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffSet}
            className='scale-[0.95]'
            strokeLinecap='round'
          />
          
      </svg>
      <div className='font-semibold absolute text-white'>
        {vote? <div {...vote}> <span className='absolute text-[4px] top-[5px]'>0</span> </div> : "0"}
      </div>
  </div>
)

}

export default MovieRating;
