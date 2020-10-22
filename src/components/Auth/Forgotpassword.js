import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import Header from "../common/Header"
import checkLogin from "../../common/checkLogin"
import AlertDismissable from "../common/Dismissable"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [userMessage, setUserMessage] = useState("")
  const history = useHistory()

  useEffect(() => {
    checkLogin().then((user) => {
      if (user) {
        history.push("/")
      }
    })
  }, [history])

  const handleForgotPassword = async () => {
    const data = {
      email,
    }
    setEmail("")
    let response = await fetch("http://localhost:5000/forgot-password", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
    response = await response.json()
    setUserMessage(response.message)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleForgotPassword()
  }

  return (
    <div
      className="container-fluid text-white vh-100"
      style={{ background: "#1d3557" }}
    >
      <Header />
      <div className="container">
        <div className="row h-100">
          <div className="col-md-8 col-12 d-flex flex-column h-100 justify-content-center">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control w-90 w-md-50 mb-4"
              />
              <button type="submit" className="btn btn-danger">
                Submit
              </button>
            </form>
          </div>
          <div className="col-md-4 col-12 order-first order-md-last d-flex justify-content-center">
            {userMessage ? (
              <AlertDismissable
                heading="Error"
                text={userMessage}
                handleClose={() => setUserMessage("")}
                background="danger"
                scroll={() => null}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
