import React, { useEffect } from "react"
import { Alert } from "react-bootstrap"

function AlertDismissible({ heading, text, handleClose, background, scroll }) {
  useEffect(() => {
    scroll()
  }, [scroll])
  return (
    <Alert variant={background} onClose={handleClose} dismissible>
      <Alert.Heading>{heading}</Alert.Heading>
      <p>{text}</p>
    </Alert>
  )
}

export default AlertDismissible
