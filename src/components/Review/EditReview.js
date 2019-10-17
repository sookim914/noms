import React, { useState, useEffect, Fragment } from 'react'
import StarRatings from 'react-star-ratings'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import ReviewForm from './ReviewForm'

const EditReview = ({ user, match, alert, history }) => {
  const reviewObject = {
    rating: 0,
    url: ''
  }
  const [review, setReview] = useState(reviewObject)

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${apiUrl}/items/${match.params.id}/reviews/${match.params.rid}`,
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
      .catch(console.error)
  }, [])

  const handleChange = event => {
    event.persist()
    setReview(() => ({ ...review, [event.target.name]: event.target.value })
    )
  }

  const handleStarChange = event => {
    setReview({ url: review.url, rating: event })
  }

  const handleSubmit = event => {
    event.preventDefault()
    const formData = new FormData(event.target)
    formData.append('rating', review.rating)
    axios({
      url: `${apiUrl}/items/${match.params.id}/reviews/${match.params.rid}`,
      method: 'PATCH',
      data: formData,
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
      .then(() => alert({ heading: 'Success', message: 'You updated a review', variant: 'success' }))
      .then(() => history.replace('/reload'))
      .then(() => history.replace(`/items/${match.params.id}`))
      .catch(() => alert({ heading: 'Rut roh', message: 'Something went wrong', variant: 'danger' }))
  }

  return (
    <Fragment>
      <StarRatings
        starRatedColor="gold"
        starHoverColor="gold"
        changeRating={handleStarChange}
        rating={review.rating}
        name='rating'
      />
      <ReviewForm
        review={review}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`/items/${match.params.id}`}
      />
    </Fragment>
  )
}

export default withRouter(EditReview)
