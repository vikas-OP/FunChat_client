import React, { useState, useEffect } from "react"
import AlertDismissable from "../common/Dismissable"
import Header from "../common/Header"
import { useHistory } from "react-router-dom"
import checkLogin from "../../common/checkLogin"

const Signup = () => {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
  })
  const [userMessage, setUserMessage] = useState("")
  const history = useHistory()

  useEffect(() => {
    checkLogin().then((user) => {
      if (user) {
        history.push("/")
      }
    })
  }, [history])

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
    let response = await fetch("https://funchat-vikas.herokuapp.com/register", {
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
                name="userName"
                placeholder="username"
                value={user.userName}
                onChange={setDetails}
                required
                className="form-control w-90 w-md-50 mb-2"
              />
              <input
                type="text"
                name="email"
                value={user.email}
                onChange={setDetails}
                placeholder="email"
                required
                className="form-control w-md-50 w-90 mb-2"
              />
              <input
                type="password"
                name="password"
                placeholder="password"
                value={user.password}
                onChange={setDetails}
                required
                className="form-control w-md-50 w-90 mb-2"
              />
              <button type="submit" className="btn btn-success my-3">
                Register
              </button>
            </form>
            <div>
              <h6>
                Login user &nbsp; &nbsp;{" "}
                <button className="btn btn-primary" onClick={goToLoginPage}>
                  Login
                </button>
              </h6>
            </div>
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

export default Signup
