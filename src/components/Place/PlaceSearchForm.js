import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { withRouter } from 'react-router-dom'
import Emoji from 'react-emoji-render'

const PlaceSearchForm = ({ match, query, handleChange, handleSubmit }) => {
  // const cancelPath = review.id ? `#/reviews/${review._id}` : `#/items/${match.params.id}`

  const style = {
    fontSize: '18px',
    fontFamily: 'Maven Pro'
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="search">
        <Form.Label>
        </Form.Label>
        <Form.Control style={{ textAlign: 'center', fontFamily: 'Maven Pro', color: '#6c6258', width: '50vh', height: '8vh', fontSize: '18px' }}
          type="text"
          placeholder="name of the restaurant"
          name="query"
          onChange={handleChange}
          value={query.query}
        />
      </Form.Group>
      <Button style={style} variant="danger" type="submit">search <Emoji text = ':mag:'/></Button>
    </Form>
  )
}

export default withRouter(PlaceSearchForm)
