import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { withRouter } from 'react-router-dom'

const ReviewForm = ({ match, review, handleChange, handleSubmit }) => {
  const cancelPath = review.id ? `#/reviews/${review._id}` : `#/items/${match.params.id}`

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
      <Form.Group controlId="file" encType="multipart/form-data">
        <Form.Label>Upload</Form.Label>
        <Form.Control
          type="file"
          placeholder="Upload"
          name="url"
          onChange={handleChange}
          value={review.url}
        />
      </Form.Group>
      <Button variant="primary" type="submit">Submit</Button>
      <Button variant="danger" href={cancelPath} className="ml-2">Cancel</Button>
    </Form>
  )
}

export default withRouter(ReviewForm)
