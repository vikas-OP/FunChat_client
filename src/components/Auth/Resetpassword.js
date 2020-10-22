import React, { useState } from "react"
import { useHistory, useParams } from "react-router-dom"

const ResetPassword = () => {
  const [userMessage, setUserMessage] = useState("")
  const [password, setPassword] = useState("")
  const [showLoginButton, setShowLoginButton] = useState(false)
  const history = useHistory()
  const { id } = useParams()

  const handleLogin = () => {
    history.push("/login")
  }

  const handleResetPassword = async () => {
    const data = {
      resetPasswordLink: id,
      password,
    }
    setPassword("")
    let response = await fetch("http://localhost:5000/reset-password", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
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
    <div className="bg-dark d-flex flex-column container-fluid text-white main-contain">
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
      {userMessage ? <h3>{userMessage}</h3> : null}
      {showLoginButton ? (
        <div className="d-flex justify-content-start">
          <button className="btn btn-primary" onClick={handleLogin}>
            Login
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default ResetPassword
