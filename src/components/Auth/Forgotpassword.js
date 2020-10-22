import React, { useState } from "react"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [userMessage, setUserMessage] = useState("")

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
    <div className="main-contain bg-dark d-flex flex-column text-white container-fluid">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" className="mt-3">
          Email
        </label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="form-control w-50 mb-4"
        />
        <button type="submit" className="btn btn-danger">
          Submit
        </button>
      </form>
      {userMessage ? <h3>{userMessage}</h3> : null}
    </div>
  )
}

export default ForgotPassword
