import React, { useState, useEffect, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const Reviews = ({ user, match, alert, history }) => {
  const [reviews, setreviews] = useState([])
  // const [deleted, setDeleted] = useState(false)
  // const [deleted, setDeleted] = useState(false)
  // dependency list -> we can run dependency list and anytime it changes, I would like you to run this function. Use this effect and treated as componentdidmount
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
      // .then(() => setDeleted(true))
      // .then(() => deletefunc(deleted))
      .then(() => alert({ heading: 'Success', message: 'You deleted a review', variant: 'success' }))
      .then(() => {
        history.replace('/reload')
        history.replace(`/items/${match.params.id}`)
      })
      // .then(() => history.push(`/items/${match.params.id}`))
      .catch(() => alert({ heading: 'Rut roh', message: 'Something went wrong', variant: 'danger' }))
  }

  const reviewJsx = reviews.map(review => (
    <div key={review._id}>
      <div style={styles}> {review.owner.email} </div>
      rating: {review.rating} <br/>
      <img src={review.url}/>
      { review.owner.token === user.token && <Link to={`/items/${match.params.id}/reviews/${review._id}`}><Button>Edit the review</Button></Link>}
      { review.owner.token === user.token && <Button onClick={ () => destroy(review._id) }>Delete</Button>}
    </div>
  ))
  //
  // if (deleted) {
  //   return <Redirect to={`/items/${match.params.id}`} />
  // }

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
