import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import Header from "../common/Header"

const CreateRoom = ({ logOut }) => {
  const [roomDetails, setRoomDetails] = useState({
    name: "",
    accessCode: "",
  })
  const history = useHistory()
  const setDetails = (e) => {
    const name = e.target.name
    const value = e.target.value
    setRoomDetails({
      ...roomDetails,
      [name]: value,
    })
  }
  const createRoom = async (e) => {
    e.preventDefault()
    const data = { ...roomDetails }
    setRoomDetails({
      name: "",
      accessCode: "",
    })
    let response = await fetch(
      "https://funchat-vikas.herokuapp.com/api/rooms",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Authorization: localStorage.getItem("access-token"),
          "Content-Type": "application/json",
        },
      }
    )
    response = await response.json()
    if (response.stat === "S") {
      history.push(`/room/${response.room.roomID}/${response.room.accessCode}`)
    }
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
            <form onSubmit={createRoom}>
              <input
                type="text"
                className="form-control my-3 w-90 w-md-50"
                name="name"
                placeholder="room name"
                value={roomDetails.name}
                onChange={setDetails}
              />
              <input
                type="text"
                className="form-control my-3 w-90 w-md-50"
                name="accessCode"
                placeholder="access code"
                value={roomDetails.accessCode}
                onChange={setDetails}
              />
              <button type="submit" className="btn btn-primary">
                Create Room
              </button>
            </form>

            <button
              onClick={logOut}
              className="btn btn-danger my-3"
              style={{ width: "17%" }}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateRoom
