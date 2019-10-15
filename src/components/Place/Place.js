import React, { useState, useEffect, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
// import Button from 'react-bootstrap/Button'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const Place = ({ user, alerts, match }) => {
  const [place, setplace] = useState({ items: [], name: '' })
  // const [deleted, setDeleted] = useState(false)

  // dependency list -> we can run dependency list and anytime it changes, I would like you to run this function. Use this effect and treated as componentdidmount
  useEffect(() => {
    axios({
      method: 'GET',
      url: `${apiUrl}/places/${match.params.id}`
    })
      .then(responseData => {
        setplace(responseData.data.place)
      })
      .catch(console.error)
  }, [])

  if (!place) {
    return <p>Loading...</p>
  }

  const itemJsx = place.items.map(item => (
    <p key={item._id}>
      <Link to={`/items/${item._id}`}><li>{item.name}</li></Link>
    </p>
  ))

  return (
    <Fragment>
      <h1>{place.name}</h1>
      {itemJsx}
    </Fragment>
  )
}
// function that will that wrap component that will send child prop
export default withRouter(Place)
