import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-bootstrap'
import axios from 'axios'
const Banner = () => {
  const [banner, setBanner] = useState([])
  useEffect(() => {
    async function logodata() {
      const { data } = await axios.get("http://localhost:8000/banner")
      setBanner(data)
    }
    logodata()
  }, [])
  return (
    <>
      <Carousel>
        {
          banner.map(item => (
            <Carousel.Item interval={3000} key={item.id}>
              <div className="bann-slider" style={{ background: `url(${item.img}) no-repeat center / cover ` }}>
                <div className="banner-text">
                  <p>{item.subheading}</p>
                  <h1>{item.heading}</h1>
                  <a href="#home">{item.button}</a>
                </div>
              </div>
            </Carousel.Item>
          ))
        }
      </Carousel>
    </>
  )
}

export default Banner
