import React, { useState } from 'react'
import ReviewForm from './ReviewForm'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect, withRouter } from 'react-router-dom'

const CreateReview = ({ user, match, alert }) => {
  const reviewObject = {
    rating: '',
    url: '',
    fileType: ''
  }
  const [created, setCreated] = useState(false)
  const [review, setreview] = useState(reviewObject)

  const handleChange = event => {
    event.persist()
    setreview(review => ({ ...review, [event.target.name]: event.target.value
    }))
  }

  // const handleChange = event => {
  //   event.persist()
  //   const editedreview = { ...review }
  //   editedreview[event.target.name] = event.target.value
  //   setreview(editedreview)
  // }

  const handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/items/${match.params.id}/reviews`,
      method: 'POST',
      data: { review },
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
      .then(res => setCreated(res.data.review._id))
      .then(() => alert({ heading: 'Success', message: 'You created a review', variant: 'success' }))
      .catch(() => alert({ heading: 'Rut roh', message: 'Something went wrong', variant: 'danger' }))
  }

  if (created) {
    return <Redirect to={`/items/${match.params.id}`}/>
  }

  return (
    <ReviewForm
      review={review}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      cancelPath={`/${match.params.id}`}
    />
  )
}

export default withRouter(CreateReview)
