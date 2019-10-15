import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import ReviewForm from './ReviewForm'

const EditReview = ({ user, match, alert, history }) => {
  const reviewObject = {
    rating: '',
    url: '',
    fileType: ''
  }

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${apiUrl}/items/${match.params.id}/reviews/${match.params.rid}`,
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
      .then(responseData => setreview(responseData.data.review))
      .catch(console.error)
  }, [])

  const [review, setreview] = useState(reviewObject)
  const handleChange = event => {
    event.persist()
    setreview(() => ({ ...review, [event.target.name]: event.target.value })
    )
  }

  const handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/items/${match.params.id}/reviews/${match.params.rid}`,
      method: 'PATCH',
      data: { review },
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
      .then(() => alert({ heading: 'Success', message: 'You updated a review', variant: 'success' }))
      .then(() => history.push(`/items/${match.params.id}`))
      .catch(() => alert({ heading: 'Rut roh', message: 'Something went wrong', variant: 'danger' }))
  }

  return (
    <ReviewForm
      review={review}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      cancelPath={`/items/${match.params.id}`}
    />)
}

export default withRouter(EditReview)
