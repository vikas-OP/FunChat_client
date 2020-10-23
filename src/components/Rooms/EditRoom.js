import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import Header from "../common/Header"
import AlertDismissable from "../common/Dismissable"

const EditRoom = ({ logOut }) => {
  const [userMessage, setUserMessage] = useState("")
  const [roomName, setRoomName] = useState("")
  const [accessCode, setAccessCode] = useState("")
  const history = useHistory()
  const { id } = useParams()

  useEffect(() => {
    const getRoomDetails = async (id) => {
      let response = await fetch(`http://localhost:5000/api/rooms/${id}`, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("access-token"),
        },
      })
      response = await response.json()
      console.log(response)
      if (response.stat === "S") {
        setRoomName(response.room.name)
        return
      }
      setUserMessage(response.message)
    }
    getRoomDetails(id)
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      name: roomName,
      accessCode,
    }
    let response = await fetch(`http://localhost:5000/api/rooms/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
    })
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
                placeholder="room name"
                value={roomName || ""}
                onChange={(e) => setRoomName(e.target.value)}
                required
                className="form-control w-90 w-md-50 mb-4"
              />
              <input
                type="text"
                placeholder="access code"
                value={accessCode || ""}
                onChange={(e) => setAccessCode(e.target.value)}
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

export default EditRoom
