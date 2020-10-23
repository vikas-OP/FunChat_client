import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import Header from "../common/Header"
import AlertDismissable from "../common/Dismissable"

const EditUser = ({ user, logOut }) => {
  const [userMessage, setUserMessage] = useState("")
  const [userName, setUserName] = useState(user.userName)
  const history = useHistory()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { userName }
    let response = await fetch(
      `https://funchat-vikas.herokuapp.com/api/users/${user.id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          Authorization: localStorage.getItem("access-token"),
          "Content-Type": "application/json",
        },
      }
    )
    response = await response.json()
    setUserMessage(response.message)
  }

  return (
    <div
      className="container-fluid text-white vh-100"
      style={{ background: "#1d3557" }}
    >
      <Header />
      <div className="container">
        <div className="h-100 row">
          <div className="col-md-8 col-12 d-flex flex-column h-100 justify-content-center">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="username"
                value={userName || ""}
                onChange={(e) => setUserName(e.target.value)}
                required
                className="form-control w-90 w-md-50 mb-4"
              />
              <button type="submit" className="btn btn-warning">
                Update
              </button>
            </form>
            <button
              onClick={() => history.push("/home")}
              className="btn btn-primary w-25 my-5"
            >
              Home
            </button>
            <button onClick={logOut} className="btn btn-danger w-25">
              logout
            </button>
          </div>
          <div className="col-md-4 col-12 order-first order-md-last d-flex justify-content-center">
            {userMessage ? (
              <AlertDismissable
                heading="Message"
                text={userMessage}
                handleClose={() => setUserMessage("")}
                background="success"
                scroll={() => null}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditUser
