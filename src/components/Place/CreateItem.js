import React, { useState, Fragment } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { withRouter } from 'react-router-dom'
import ItemForm from './ItemForm'

const style = {
  fontFamily: 'Maven Pro',
  fontSize: '20px',
  textAlign: 'center',
  padding: '15px'
}

const CreateItem = ({ user, match, alert, history }) => {
  const [item, setItem] = useState({
    name: ''
  })

  const handleChange = event => {
    event.persist()
    setItem(() => ({ ...item, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/places/${match.params.id}/items`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
      data: { item }
    })
      .then(response => response.data.item._id)
      .then((id) => {
        history.replace('/reload')
        history.replace('/items/' + id + '/reviews')
      })
  }
  return (
    <Fragment>
      <h1 style={style}>What dish did you have?</h1>
      <div style={{ justifyContent: 'center', textAlign: 'center', padding: '20px' }}>
        <ItemForm
          item ={item}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </Fragment>
  )
}

export default withRouter(CreateItem)
