import React, { useState, useEffect, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const reviews = ({ match }) => {
  const [reviews, setreviews] = useState([])
  // const [deleted, setDeleted] = useState(false)

  // dependency list -> we can run dependency list and anytime it changes, I would like you to run this function. Use this effect and treated as componentdidmount
  useEffect(() => {
    axios({
      method: 'GET',
      url: `${apiUrl}/items/${match.params.id}`
    })
      .then(responseData => {
        setreviews(responseData.data.item.reviews)
      })
      .catch(console.error)
  }, [])

  const reviewJsx = reviews.map(review => (
    <p key={review._id}>
      rating: {review.rating} <br/>
      <img src={review.url}/>
    </p>
  ))

  return (
    <Fragment>
      {reviewJsx} <br />
      <Link to={`/items/${match.params.id}/reviews`}><Button>Write a review!</Button></Link>
    </Fragment>
  )
}
// function that will that wrap component that will send child prop
export default withRouter(reviews)
