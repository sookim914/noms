import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import ReviewForm from './ReviewForm'

const EditReview = ({ user, match, alert, history }) => {
  const reviewObject = {
    rating: '',
    url: ''
  }
  const [review, setReview] = useState(reviewObject)
  // const [update, setUpdate] = useState(false)

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${apiUrl}/items/${match.params.id}/reviews/${match.params.rid}`,
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
      // .then(responseData => {
      //   setReview(responseData.data.review)
      // })
      .catch(console.error)
  }, [])

  const handleChange = event => {
    event.persist()
    setReview(() => ({ ...review, [event.target.name]: event.target.value })
    )
  }

  const handleSubmit = event => {
    event.preventDefault()
    const formData = new FormData(event.target)
    axios({
      url: `${apiUrl}/items/${match.params.id}/reviews/${match.params.rid}`,
      method: 'PATCH',
      data: formData,
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
      .then(() => alert({ heading: 'Success', message: 'You updated a review', variant: 'success' }))
      // .then(() => setUpdate(true))
      .then(() => history.replace('/reload'))
    // history.replace('/reload')
    // history.replace(`/items/${match.params.id}`)

      .then(() => history.replace(`/items/${match.params.id}`))
      .catch(() => alert({ heading: 'Rut roh', message: 'Something went wrong', variant: 'danger' }))
  }

  // if (update) {
  //   return <Redirect to={`/items/${match.params.id}`}/>
  // }

  return (
    <ReviewForm
      review={review}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      cancelPath={`/items/${match.params.id}`}
    />)
}

export default withRouter(EditReview)
