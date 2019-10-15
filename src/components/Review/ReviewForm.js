import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const ReviewForm = ({ review, handleChange, handleSubmit }) => {
  const cancelPath = review.id ? `#/reviews/${review._id}` : '#reviews'

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="rating">
        <Form.Control
          type="number"
          placeholder="Rating"
          name="rating"
          onChange={handleChange}
          value={review.rating}
        />
      </Form.Group>
      <Button variant="primary" type="submit">Submit</Button>
      <Button variant="secondary" href={cancelPath} className="ml-2">Cancel</Button>
    </Form>
  )
}

export default ReviewForm
