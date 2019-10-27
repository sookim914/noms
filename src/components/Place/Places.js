// import React, { useState, useEffect, Fragment } from 'react'
// import axios from 'axios'
// import apiUrl from '../../apiConfig'
// import { Link } from 'react-router-dom'
// import PlaceSearchForm from './PlaceSearchForm'
//
// const Places = ({ user, alert, history }) => {
//   const [places, setplaces] = useState([])
//   // const [latlong, setlatlong] = useState('')
//   const [query, setQuery] = useState({
//     query: ''
//   })
// dependency list -> we can run dependency list and anytime it changes, I would like you to run this function. Use this effect and treated as componentdidmount

// const getLocation = () => {
//   navigator.geolocation.getCurrentPosition(response => {
//     setlatlong(response.coords.latitude + ',' + response.coords.longitude)
//   })
// }
// console.log(latlong)

//   const handleChange = event => {
//     event.persist()
//     setQuery(query => ({ ...query, [event.target.name]: event.target.value }))
//   }
//
//   const handleSubmit = event => {
//     event.preventDefault()
//     axios({
//       url: `${apiUrl}/places`,
//       method: 'POST',
//
//       data: query
//     })
//       .then(data => setplaces(data.data))
//       .catch(() => alert({ heading: 'Rut roh', message: 'Something went wrong', variant: 'danger' }))
//   }
//
//   // useEffect(() => getLocation())
//
//   useEffect(() => {
//     axios({
//       method: 'GET',
//       url: `${apiUrl}/places/`
//     })
//       .then(responseData => setplaces(responseData.data.places))
//       .catch(() => alert({ heading: 'Rut roh', message: 'Something went wrong', variant: 'danger' }))
//   }, [])
//
//   const placesJsx =
//     places.map(place => (
//       <p key={place._id}>
//         <Link to={`/places/${place._id}`}>{place.name}</Link> <br />
//         {place.address}
//       </p>
//     ))
//
//   return (
//     <Fragment>
//       <PlaceSearchForm
//         query={query}
//         handleChange={handleChange}
//         handleSubmit={handleSubmit}
//       />
//       <h1>Restuarants</h1>
//       {placesJsx}
//     </Fragment>
//   )
// }
//
// export default Places
