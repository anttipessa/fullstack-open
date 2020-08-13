import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
 
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  if (props.state === null) {
    return null
  }
  

  return (
    <div style={style}>
      {props.state}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    state: state.notification, 
  }
}

export default connect(
  mapStateToProps
)(Notification)