import React, { useState } from 'react'
import ReviewForm from './ReviewForm'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect } from 'react-router-dom'

const CreateReview = ({ user }) => {
  const reviewObject = {
    rating: ''
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
    console.log('here')

    axios({
      url: `${apiUrl}/items/:id`,
      method: 'POST',
      data: { review },
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
      .then(res => setCreated(res.data.review._id))
      .catch(console.error)
  }

  if (created) {
    return <Redirect to={`/reviews/${created}`}/>
  }

  return (
    <ReviewForm
      review={review}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      cancelPath='/'
    />
  )
}

export default CreateReview
