import React from 'react'
import Banner from "../components/Banner"
import Deal from '../components/Deal'
import TopProduct from '../components/TopProduct'
import OfferProduct from '../components/OfferProduct'
const Home = () => {
  return (
    <div>
      <Banner/>
      <Deal/>
      <TopProduct/>
      <OfferProduct/>
    </div>
  )
}

export default Home
