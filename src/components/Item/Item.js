// import React, { useState, useEffect, Fragment } from 'react'
// import { withRouter } from 'react-router-dom'
// // import Button from 'react-bootstrap/Button'
// import axios from 'axios'
// import apiUrl from '../../apiConfig'
//
// const review = ({ user, alerts, match }) => {
//   const [review, setreview] = useState({ fileType: '', rating: '', url: '' })
//   // const [deleted, setDeleted] = useState(false)
//
//   // dependency list -> we can run dependency list and anytime it changes, I would like you to run this function. Use this effect and treated as componentdidmount
//   useEffect(() => {
//     axios({
//       method: 'GET',
//       url: `${apiUrl}/items/${match.params.id}/reviews`
//     })
//       .then(responseData => {
//         console.log(responseData.data.reviews)
//         setreview(responseData.data.reviews)
//       })
//       .catch(console.error)
//   }, [])
//
//   if (!review) {
//     return <p>No reviews yet.</p>
//   }
//   //
//   // const reviewJsx = review.reviews.map(review => (
//   //   <p key={review._id}>
//   //     <Link to={`/reviews/${review._id}`}><li>{review.name}</li></Link>
//   //   </p>
//   // ))
//
//   return (
//     <Fragment>
//       <h1>{review.name}</h1>
//     </Fragment>
//   )
// }
// // function that will that wrap component that will send child prop
// export default withRouter(review)
