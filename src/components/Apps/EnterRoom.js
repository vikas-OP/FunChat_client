import React, { useState } from "react"
import { useHistory } from "react-router-dom"
const EnterRoom = ({ user }) => {
  const [roomDetails, setRoomDetails] = useState({
    roomID: "",
    accessCode: "",
  })
  const history = useHistory()

  const setDetails = (e) => {
    const name = e.target.name
    const value = e.target.value
    setRoomDetails((roomDetails) => {
      return {
        ...roomDetails,
        [name]: value,
      }
    })
  }

  const enterRoom = async (e) => {
    e.preventDefault()
    history.push(
      `/room/${roomDetails.roomID}/${roomDetails.accessCode}/${user.userName}`
    )
  }

  return (
    <div>
      <form onSubmit={enterRoom}>
        <input
          type="text"
          placeholder="room id"
          name="roomID"
          value={roomDetails.roomID}
          onChange={setDetails}
        />
        <br />
        <input
          type="text"
          placeholder="access code"
          name="accessCode"
          value={roomDetails.accessCode}
          onChange={setDetails}
        />
        <br />
        <button type="submit" className="btn btn-primary">
          Enter
        </button>
      </form>
    </div>
  )
}

export default EnterRoom
