import React, { useState } from "react"
import { useHistory } from "react-router-dom"

const Signup = (props) => {
  const [user, setUser] = useState({
    userName: "",
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

  const registerUser = async () => {
    const data = { ...user }
    setUser({
      userName: "",
      email: "",
      password: "",
    })
    let response = await fetch("http://localhost:5000/register", {
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
    registerUser()
  }

  const goToLoginPage = () => {
    history.push("/login")
  }

  return (
    <div className="main-contain bg-dark d-flex flex-column text-white container-fluid ">
      <form onSubmit={handleSubmit}>
        <label htmlFor="userName">User name</label>
        <input
          type="text"
          id="userName"
          name="userName"
          value={user.userName}
          onChange={setDetails}
          required
          className="form-control w-50 mb-2"
        />
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
          id="password"
          name="password"
          value={user.password}
          onChange={setDetails}
          required
          className="form-control w-50 mb-2"
        />
        <button type="submit" className="btn btn-success my-3">
          Register
        </button>
      </form>
      <div>
        <h6>Login user</h6>
        <button className="btn btn-primary" onClick={goToLoginPage}>
          Login
        </button>
      </div>
      {userMessage ? <h3>{userMessage}</h3> : null}
    </div>
  )
}

export default Signup
