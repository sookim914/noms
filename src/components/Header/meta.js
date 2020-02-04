import React from 'react'
import MetaTags from 'react-meta-tags'

class Component1 extends React.Component {
  render () {
    return (
      <div className="wrapper">
        <MetaTags>
          <title>Noms</title>
          <meta name="description" content="This is a MERN (MongoDB, ExpressJS, ReactJS, NodeJS) app that lets users to rate the individual dish at the restaurant. It uses AWS S3 to store all the pictures uploaded by the users. It uses Foursquare API to get restaurant information" />
          <meta property="og:title" content="Noms" />
          <meta property="og:image" content="./logo.png" />
        </MetaTags>
        <div className="content"> Some Content </div>
      </div>
    )
  }
}

export default Component1
