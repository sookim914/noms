import React, { useState } from 'react'
import StarRatings from 'react-star-ratings'
import ReviewForm from './ReviewForm'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect, withRouter } from 'react-router-dom'

const CreateReview = ({ user, match, alert }) => {
  const reviewObject = {
    rating: 0,
    url: ''
  }
  const [created, setCreated] = useState(false)
  const [review, setReview] = useState(reviewObject)

  const handleChange = event => {
    event.persist()
    setReview(review => ({ ...review, [event.target.name]: event.target.value
    }))
  }

  const handleStarChange = event => {
    setReview({ url: review.url, rating: event })
  }

  const handleSubmit = event => {
    event.preventDefault()
    const formData = new FormData(event.target)
    formData.append('rating', review.rating)
    axios({
      url: `${apiUrl}/items/${match.params.id}/reviews`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
      data: formData
    })
      .then(res => setCreated(res.data.review._id))
      .then(() => alert({ heading: 'Success', message: 'You created a review', variant: 'success' }))
      .catch(() => alert({ heading: 'Rut roh', message: 'Something went wrong', variant: 'danger' }))
  }

  if (created) {
    return <Redirect to={`/items/${match.params.id}`}/>
  }

  return (
    <div>
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
        cancelPath={`/${match.params.id}`}
      />
    </div>
  )
}

export default withRouter(CreateReview)
