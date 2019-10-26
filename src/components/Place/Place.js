import React, { useState, useEffect, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Card, CardTitle, CardText, Row, Col } from 'reactstrap'

const style = {
  // boxShadow: '1px -1px 1px 1px rgba(0,0,0,0.75)',
  height: '18vh',
  margin: '6px',
  fontFamily: 'Maven Pro',
  fontSize: '15px'
}

const Place = ({ user, alert, match, history }) => {
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
      .catch(() => alert({ heading: 'Rut roh', message: 'Something went wrong', variant: 'danger' }))
  }, [])

  if (!place) {
    return <p>Loading...</p>
  }

  const itemJsx = place.items.map(item => (
    <Col md="3" sm="6" key={item._id}>
      <Card body style={style}>
        <CardTitle><Link to={`/items/${item._id}`}>{item.name}</Link></CardTitle>
        <CardText></CardText>
      </Card>
    </Col>
  ))

  return (
    <Fragment>
      <h1 style={{ textAlign: 'center', fontFamily: 'Cabin Condensed', fontSize: '25px', margin: '10px' }}>{place.name}</h1>
      <p style={{ textAlign: 'center', fontFamily: 'Cabin Condensed', fontSize: '20px' }}>
        {'Can\'t find your dish? Be the first to review!'} <br/>
        <Button style={{ backgroundColor: 'white', borderColor: 'white' }}><Link to={`/places/${match.params.id}/items`}> Write a review</Link></Button>
      </p>
      <Row>{itemJsx}</Row>
    </Fragment>
  )
}
// function that will that wrap component that will send child prop
export default withRouter(Place)
