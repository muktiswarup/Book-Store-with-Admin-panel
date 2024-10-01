import React from 'react'
import Hero from '../Components/Home/Hero'
import RecentlyAdded from '../Components/Home/RecentlyAdded'

const Home = () => {
  return (
    <div className='bg-zinc-900 text-white'>
      <Hero/>
      <RecentlyAdded/>
    </div>
  )
}

export default Home