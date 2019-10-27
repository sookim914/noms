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

const button = {
  fontFamily: 'Muli',
  fontSize: '16px',
  margin: '6px'
}

const Reviews = ({ user, match, alert, history }) => {
  const [reviews, setreviews] = useState([])
  const [item, setItem] = useState([])

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${apiUrl}/items/${match.params.id}`
    })
      .then(responseData => {
        setItem(responseData.data.item.name)
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
      .then(() => alert({ zIndex: 1, heading: 'Success', message: 'You deleted a review', variant: 'success' }))
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
        <div style={{ color: '#6c6258', fontSize: '12px' }}>{review.owner.email}</div>
        <CardImg style={{ height: '60%' }} src={review.url ? review.url : noms }/>
        <CardTitle style={{ fontStyle: 'italic', color: 'black' }}>{review.comment ? '"' + review.comment + '"' : null} </CardTitle>
        <CardText style={{ textAlign: 'center' }}><Emoji text= {repeat(review.rating)}/><br/>

          {review.owner.token === user.token && <Link to={`/items/${match.params.id}/reviews/${review._id}`}><Button style={button} variant='danger'>Edit</Button></Link>}

          { review.owner.token === user.token && <Button variant='secondary'style={button} onClick={ () => destroy(review._id) }>Delete</Button>}</CardText>
      </Card>
    </Col>
  ))

  return (
    <Fragment>
      <div style={{ fontFamily: 'Candal', textAlign: 'left', margin: '6px', fontSize: '25px', color: '#6c6258' }}>{item}</div>
      <Link to={`/items/${match.params.id}/reviews`}><Button style={{ backgroundColor: 'white', borderColor: '#E58932', color: '#6c6258', margin: '6px', fontFamily: 'Muli' }}>Add your review</Button></Link> <br />
      <Row>{reviewJsx}</Row>
    </Fragment>
  )
}
// function that will that wrap component that will send child prop
export default withRouter(Reviews)
