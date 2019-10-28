import React, { useState, useEffect } from 'react'
import StarRatings from 'react-star-ratings'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { Card } from 'reactstrap'
import apiUrl from '../../apiConfig'
import ReviewForm from './ReviewForm'

const style = { textAlign: 'center', margin: '10px' }

const EditReview = ({ user, match, alert, history }) => {
  const reviewObject = {
    rating: 0,
    url: '',
    comment: ''
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
      .catch(() => alert({ heading: 'Rut roh', message: 'Something went wrong', variant: 'danger' }))
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
    <Card style={{ display: 'flex', justifyContent: 'center', height: '100%', alignItems: 'center', margin: '50px' }}>
      <div style={style}>
        <div style={{ fontFamily: 'Muli', fontSize: '16px', color: '#6c6258' }}>Edit your review</div>
        <StarRatings
          starRatedColor="gold"
          starHoverColor="gold"
          starDimension="25px"
          starSpacing="8px"
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
      </div>
    </Card>
  )
}

export default withRouter(EditReview)
