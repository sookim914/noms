import React, { useState, Fragment, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Link } from 'react-router-dom'
import PlaceSearchForm from './PlaceSearchForm'
import { Card, CardTitle, CardText, Row, Col } from 'reactstrap'

const style = {
  // boxShadow: '1px -1px 1px 1px rgba(0,0,0,0.75)',
  height: '23vh',
  margin: '6px',
  fontFamily: 'Maven Pro',
  fontSize: '15px'
}

const Home = ({ user, alert, history }) => {
  const [places, setplaces] = useState([])
  const [latlong, setlatlong] = useState('')
  const [query, setQuery] = useState({
    query: ''
  })
  // dependency list -> we can run dependency list and anytime it changes, I would like you to run this function. Use this effect and treated as componentdidmount

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(response => {
      setlatlong(response.coords.latitude + ',' + response.coords.longitude)
    }, err => {
      console.log(err)
    }, { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 })
  }, [])

  const handleChange = event => {
    event.persist()
    setQuery(query => ({ ...query, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/places`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
      data: { query, latlong }
    })
      .then(data => setplaces(data.data))
      .then(() => setQuery({ query: '' }))
      .catch(() => alert({ heading: 'Rut roh', message: 'Something went wrong', variant: 'danger' }))
  }

  const placesJsx =
    places.map(place => (
      <Col md="3" sm="6" key={place._id}>
        <Card body style={style}>
          <CardTitle><Link to={`/places/${place._id}`}>{place.name}</Link></CardTitle>
          <CardText>{place.address}</CardText>
        </Card>
      </Col>
    ))

  return (
    <Fragment>
      <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', padding: '20px' }}>
        <PlaceSearchForm
          query={query}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        /> </div> <br />
      <div style={{ textAlign: 'center', fontStyle: 'italic' }}> <Link to={'/places/5db70218a5cd9e0017c06960'}>Check Out the Most-Reviewed Restuarant!</Link></div>
      <Row>{placesJsx}</Row>
    </Fragment>
  )
}

export default Home
