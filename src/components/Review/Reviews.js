import React, { useState, useEffect, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Emoji from 'react-emoji-render'
// import Container from 'react-bootstrap/Container'

const Reviews = ({ user, match, alert, history }) => {
  const [reviews, setreviews] = useState([])

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${apiUrl}/items/${match.params.id}`
    })
      .then(responseData => {
        setreviews(responseData.data.item.reviews)
        return responseData
      })
      .then((responseData) => {
        if (responseData.data.item.reviews.length === 0) {
          alert({ heading: 'Uh oh', message: 'No reviews yet!', variant: 'success' })
        }
      })
      .catch(console.error)
  }, [])

  const styles = {
    fontWeight: 'bold'
  }

  const destroy = (id) => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/items/${match.params.id}/reviews/${id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
      .then(() => alert({ heading: 'Success', message: 'You deleted a review', variant: 'success' }))
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
    <div key={review._id}>
      <div style={styles}> {review.owner.email} </div>
      rating: <Emoji text= {repeat(review.rating)}/> <br/>
      <img src={review.url}/> <br/>
      { review.owner.token === user.token && <Link to={`/items/${match.params.id}/reviews/${review._id}`}><Button>Edit the review</Button></Link>}
      { review.owner.token === user.token && <Button onClick={ () => destroy(review._id) }>Delete</Button>}
    </div>
  ))

  return (
    <Fragment>
      <br />
      <Link to={`/items/${match.params.id}/reviews`}><Button>Write a review!</Button></Link> <br />
      {reviewJsx}
    </Fragment>
  )
}
// function that will that wrap component that will send child prop
export default withRouter(Reviews)
