import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const style = {
  alignItem: 'center',
  textAlign: 'center'
}

const ItemForm = ({ item, handleChange, handleSubmit, match }) => {
  const cancelPath = item.id ? `#/items/${item._id}` : '#/'

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="item">
        <Form.Control
          type="text"
          placeholder="name of the dish"
          name="name"
          onChange={handleChange}
          value={item.name}
        />
      </Form.Group>
      <Button style={{ style }} variant="danger" type="submit">Submit</Button>
      <Button style={{ style }} variant="secondary" href={cancelPath} className="ml-2">Cancel</Button>
    </Form>
  )
}

export default ItemForm
