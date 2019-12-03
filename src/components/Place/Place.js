import React, { useState, useEffect, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Card, CardTitle, Row, Col } from 'reactstrap'
import StarRatings from 'react-star-ratings'

const style = {
  // boxShadow: '1px -1px 1px 1px rgba(0,0,0,0.75)',
  height: '18vh',
  margin: '6px',
  fontFamily: 'Maven Pro',
  fontSize: '15px'
}

const Place = ({ user, alert, match, history }) => {
  const [menu, setmenu] = useState([])
  // const [deleted, setDeleted] = useState(false)
  // dependency list -> we can run dependency list and anytime it changes, I would like you to run this function. Use this effect and treated as componentdidmount
  useEffect(() => {
    axios({
      method: 'GET',
      url: `${apiUrl}/places/${match.params.id}`
    })
      .then(responseData => {
        setmenu(responseData.data.place.items)
      })
      .catch(() => alert({ heading: 'Rut roh', message: 'Something went wrong', variant: 'danger' }))
  }, [])

  if (!menu) {
    return <p>Loading...</p>
  }
  // {item.reviews.length > 1 ? item.reviews.reduce((accReview, currReview) => {
  //   return parseInt(accReview['rating']) + parseInt(currReview['rating'])
  // }) : 1 }
  const itemJsx = menu.map(item => (
    <Col md="3" sm="6" key={item._id}>
      <Card body style={style}>
        <CardTitle><Link to={`/items/${item._id}`}>{item.name}</Link></CardTitle>
        <StarRatings
          rating = {item.reviews.length > 0 ? (item.reviews.map(review => parseInt(JSON.stringify(review['rating']))).reduce((acc, curr) => acc + curr, 0)) / item.reviews.length : 0}
          starDimension="25px"
          starRatedColor="gold"
          starSpacing="2px"
        />
      </Card>
    </Col>
  ))

  return (
    <Fragment>
      <p style={{ textAlign: 'center', fontFamily: 'Cabin Condensed', color: '#6c6258', fontSize: '20px' }}>
        {'Can\'t find your dish? Be the first to review!'} <br/>
        <Button style={{ backgroundColor: 'white', borderColor: 'white' }}><Link to={`/places/${match.params.id}/items`}> Click here to add your dish and write a review</Link></Button>
      </p>
      <Row>{itemJsx}</Row>
    </Fragment>
  )
}
// function that will that wrap component that will send child prop
export default withRouter(Place)
