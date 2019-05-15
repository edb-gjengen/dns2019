import React from 'react'
import { Link, graphql } from 'gatsby'
import map1 from '../img/map/neuf-kart.svg'
import map2 from '../img/map/neuf-kart2.svg'

const Map = () => (
  <div className="neuf-map">
    <img src={map1} alt="Kart over Chateau Neuf, kjelleren og første etasje" />
    <img src={map2} alt="Kart over Chateau Neuf, andre og tredje etasje" />
  </div>
)

export default Map
