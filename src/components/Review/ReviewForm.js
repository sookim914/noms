import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { withRouter } from 'react-router-dom'

const ReviewForm = ({ match, review, handleChange, handleSubmit }) => {
  const cancelPath = review.id ? `#/reviews/${review._id}` : `#/items/${match.params.id}`

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group style={{ fontFamily: 'Muli', fontSize: '16px', color: '#6c6258' }} controlId="file" encType="multipart/form-data">
        <Form.Label></Form.Label>
        <Form.Control style={{ marginLeft: '100px', fontFamily: 'Muli', fontSize: '16px', color: '#6c6258' }}
          type="file"
          placeholder="Upload"
          name="upload"
          onChange={handleChange}
          value={review.upload}
        />
      </Form.Group>
      <Form.Group controlId="comment">
        <Form.Control
          type="text"
          placeholder="comment"
          name="comment"
          onChange={handleChange}
          value={review.comment}
        />
      </Form.Group>
      <Button style={{ fontFamily: 'Muli', fontSize: '16px' }} variant="danger" type="submit">Submit</Button>
      <Button style={{ fontFamily: 'Muli', fontSize: '16px' }}variant="secondary" href={cancelPath} className="ml-2">Cancel</Button>
    </Form>
  )
}

export default withRouter(ReviewForm)
