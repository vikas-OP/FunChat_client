import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import AlertDismissable from "../common/Dismissable"
import Header from "../common/Header"
import checkLogin from "../../common/checkLogin"

const Login = () => {
  const [user, setUser] = useState({
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

  const loginUser = async () => {
    const data = user
    setUser({
      email: "",
      password: "",
    })
    let response = await fetch("https://funchat-vikas.herokuapp.com/login", {
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
                name="email"
                value={user.email}
                onChange={setDetails}
                placeholder="email"
                required
                className="form-control w-90 w-md-50 mb-2"
              />
              <input
                type="password"
                name="password"
                placeholder="password"
                value={user.password}
                onChange={setDetails}
                required
                className="form-control w-90 w-md-50 mb-3"
              />
              <button className="btn btn-primary mb-3" type="submit">
                Login
              </button>
            </form>
            <h6 className="mb-3">
              New user? &nbsp; &nbsp;
              <button
                onClick={goToRegisterPage}
                className="btn btn-success btn-sm"
              >
                Register
              </button>
            </h6>
            <div>
              <h6 className="mb-3">
                Forgot Password? &nbsp; &nbsp;
                <button
                  className="btn btn-danger btn-sm mt-sm-0 mt-3"
                  onClick={handleForgotPassword}
                >
                  Forgot Password
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

export default Login
