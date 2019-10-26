import React, { useState, useEffect, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Emoji from 'react-emoji-render'
import { Card, CardImg, CardTitle, CardText, Row, Col } from 'reactstrap'
import noms from './noms.png'
// import Container from 'react-bootstrap/Container'

const style = {
  // boxShadow: '1px -1px 1px 1px rgba(0,0,0,0.75)',
  height: '40vh',
  margin: '6px',
  fontFamily: 'Maven Pro',
  fontSize: '15px'
}

const styleButton = {
  backgroundColor: 'white',
  borderColor: 'white',
  color: 'blue'
}

const Reviews = ({ user, match, alert, history }) => {
  const [reviews, setreviews] = useState([])

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${apiUrl}/items/${match.params.id}`
    })
      .then(responseData => {
        setreviews(responseData.data.item.reviews)
        return responseData
      })
      .then((responseData) => {
        if (responseData.data.item.reviews.length === 0) {
          alert({ heading: 'Uh oh', message: 'No reviews yet! Be the first to review', variant: 'success' })
        }
      })
      .catch(() => alert({ heading: 'Rut roh', message: 'Something went wrong', variant: 'danger' }))
  }, [])

  const destroy = (id) => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/items/${match.params.id}/reviews/${id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
      .then(() => alert({ heading: 'Success', message: 'You deleted a review', variant: 'success' }))
      .then(() => {
        history.replace('/reload')
        history.replace(`/items/${match.params.id}`)
      })
      .catch(() => alert({ heading: 'Rut roh', message: 'Something went wrong', variant: 'danger' }))
  }

  const repeat = (n) => {
    return ':star:'.repeat(n)
  }

  const reviewJsx = reviews.map(review => (
    <Col md="3" sm="6" xs="12" key={review._id}>
      <Card body style={style} >
        <CardImg src={review.url ? review.url : noms }/>
        <CardTitle style={{ height: '10%' }}>{review.owner.email}</CardTitle>
        <CardText><Emoji text= {repeat(review.rating)}/><br/>
          {review.owner.token === user.token && <Link to={`/items/${match.params.id}/reviews/${review._id}`}><Button style={styleButton}>Edit</Button></Link>}
          { review.owner.token === user.token && <Button style={styleButton} onClick={ () => destroy(review._id) }>Delete</Button>}</CardText>
      </Card>
    </Col>
  ))

  return (
    <Fragment>
      <br />
      <Link to={`/items/${match.params.id}/reviews`}><Button style={{ backgroundColor: '#E58932', color: '#6c6258', margin: '6px', fontFamily: 'Muli' }}>Add your review</Button></Link> <br />
      <Row>{reviewJsx}</Row>
    </Fragment>
  )
}
// function that will that wrap component that will send child prop
export default withRouter(Reviews)
