import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (notification === null) {
    return null
  }
  if (notification.type === 'error') {
    return (
      <div>
        {(notification.message &&
          <Alert severity="error">
            {notification.message}
          </Alert>
        )}
      </div>
    )
  } else {
    return (
      <div>
        {(notification.message &&
          <Alert severity="success">
            {notification.message}
          </Alert>
        )}
      </div>
    )
  }

}

export default Notification