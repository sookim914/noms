import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Link } from 'react-router-dom'

const places = ({ user, alert }) => {
  const [places, setplaces] = useState([])

  // dependency list -> we can run dependency list and anytime it changes, I would like you to run this function. Use this effect and treated as componentdidmount
  useEffect(() => {
    axios({
      method: 'GET',
      url: `${apiUrl}/places/`
    })
      .then(responseData => setplaces(responseData.data.places))
      .catch(console.error)
  }, [])

  const placesJsx = places.map(place => (
    <p key={place._id}>
      <Link to={`/places/${place._id}`}>{place.name}</Link>
    </p>
  ))
  return (
    <Fragment>
      <h1>places</h1>
      {placesJsx}
    </Fragment>
  )
}

export default places
