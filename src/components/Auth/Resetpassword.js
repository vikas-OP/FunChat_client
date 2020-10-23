import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import Header from "../common/Header"
import checkLogin from "../../common/checkLogin"
import AlertDismissable from "../common/Dismissable"

const ResetPassword = () => {
  const [userMessage, setUserMessage] = useState("")
  const [password, setPassword] = useState("")
  const [showLoginButton, setShowLoginButton] = useState(false)
  const history = useHistory()
  const { id } = useParams()

  useEffect(() => {
    checkLogin().then((user) => {
      if (user) {
        history.push("/")
      }
    })
  }, [history])

  const handleLogin = () => {
    history.push("/login")
  }

  const handleResetPassword = async () => {
    const data = {
      resetPasswordLink: id,
      password,
    }
    setPassword("")
    let response = await fetch(
      "https://funchat-vikas.herokuapp.com/reset-password",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    response = await response.json()
    if (response.stat === "S") {
      setShowLoginButton(true)
    }

    setUserMessage(response.message)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleResetPassword()
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
              <label htmlFor="password" className="mt-3">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control w-50 mb-3"
                required
              />
              <button type="submit" className="btn btn-danger mb-3">
                Reset password
              </button>
            </form>
            {showLoginButton ? (
              <div className="d-flex justify-content-start">
                <button className="btn btn-primary" onClick={handleLogin}>
                  Login
                </button>
              </div>
            ) : null}
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

export default ResetPassword
