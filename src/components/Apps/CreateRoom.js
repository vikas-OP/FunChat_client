import React, { useState } from "react"
import { useHistory } from "react-router-dom"

const CreateRoom = ({ user }) => {
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
    let response = await fetch("http://localhost:5000/api/rooms", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: localStorage.getItem("access-token"),
        "Content-Type": "application/json",
      },
    })
    response = await response.json()
    if (response.stat === "S") {
      history.push(
        `/room/${response.room.roomID}/${response.room.accessCode}/${user.userName}`
      )
    }
  }
  return (
    <div>
      <div>Hi {user.userName}</div>
      <div className="bg-dark text-light">
        <form onSubmit={createRoom}>
          <input
            type="text"
            className="form-control my-2"
            name="name"
            value={roomDetails.name}
            onChange={setDetails}
          />
          <input
            type="text"
            className="form-control my-2"
            name="accessCode"
            value={roomDetails.accessCode}
            onChange={setDetails}
          />
          <button type="submit" className="btn btn-primary">
            Create Room
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateRoom
