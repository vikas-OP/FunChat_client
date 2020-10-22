import React, { useState } from "react"
import { useHistory } from "react-router-dom"

const Login = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  })
  const [userMessage, setUserMessage] = useState("")
  const history = useHistory()

  const setDetails = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUser((user) => {
      return {
        ...user,
        [name]: value,
      }
    })
  }

  const loginUser = async () => {
    const data = user
    setUser({
      email: "",
      password: "",
    })
    let response = await fetch("http://localhost:5000/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
    response = await response.json()
    if (response.stat === "S") {
      localStorage.setItem("access-token", response.accessToken)
      history.push("/")
      return
    }
    setUserMessage(response.message)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    loginUser()
  }

  const goToRegisterPage = () => {
    history.push("/register")
  }

  const handleForgotPassword = () => {
    history.push("/forgot-password")
  }

  return (
    <div className="bg-dark d-flex flex-column container-fluid text-white main-contain">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={user.email}
          onChange={setDetails}
          required
          className="form-control w-50 mb-2"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={user.password}
          onChange={setDetails}
          required
          className="form-control w-50 mb-3"
        />
        <button className="btn btn-primary mb-3" type="submit">
          Login
        </button>
      </form>
      {userMessage ? <h3>{userMessage}</h3> : null}
      <div>
        <h6>New user? </h6>
        <button onClick={goToRegisterPage} className="btn btn-success mb-3">
          Register
        </button>
      </div>
      <div>
        <h6>Forgot Password? </h6>
        <button className="btn btn-danger" onClick={handleForgotPassword}>
          Forgot Password
        </button>
      </div>
    </div>
  )
}

export default Login
