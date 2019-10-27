import React, { useState, useEffect } from 'react'
import StarRatings from 'react-star-ratings'
import ReviewForm from './ReviewForm'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect, withRouter } from 'react-router-dom'
import { Card, CardTitle } from 'reactstrap'

const style = { textAlign: 'center', margin: '10px' }

const CreateReview = ({ user, match, alert }) => {
  const reviewObject = {
    rating: 0,
    url: '',
    comment: ''
  }
  const [created, setCreated] = useState(false)
  const [review, setReview] = useState(reviewObject)
  const [item, setItem] = useState([])

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

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${apiUrl}/items/${match.params.id}`
    })
      .then(responseData => {
        setItem(responseData.data.item.name)
      })
  }, [])

  if (created) {
    return <Redirect to={`/items/${match.params.id}`}/>
  }

  return (
    <Card style={{ display: 'flex', justifyContent: 'center', height: '100%', alignItems: 'center', margin: '50px' }}>
      <div style={style}>
        <CardTitle style={{ fontFamily: 'Candal', fontSize: '25px', margin: '10px', color: '#6c6258' }} >{item}</CardTitle>
        <div style={{ fontFamily: 'Muli', fontSize: '16px', color: '#6c6258' }}>Rate your dish</div>
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
          cancelPath={`/${match.params.id}`}
        />
      </div>
    </Card>
  )
}

export default withRouter(CreateReview)
