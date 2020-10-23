import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import Header from "../common/Header"

const EnterRoom = ({ logOut }) => {
  const [roomDetails, setRoomDetails] = useState({
    roomID: "",
    accessCode: "",
  })
  const { id } = useParams()
  const history = useHistory()

  useEffect(() => {
    if (id) {
      setRoomDetails({
        ...roomDetails,
        roomID: id,
      })
    }
    // eslint-disable-next-line
  }, [])

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
    history.push(`/room/${roomDetails.roomID}/${roomDetails.accessCode}`)
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
            <form onSubmit={enterRoom}>
              <input
                type="text"
                placeholder="room ID"
                name="roomID"
                className="form-control my-3 w-90 w-md-50"
                value={roomDetails.roomID}
                onChange={setDetails}
                required
              />

              <input
                type="text"
                placeholder="access code"
                name="accessCode"
                className="form-control my-3 w-90 w-md-50"
                value={roomDetails.accessCode}
                onChange={setDetails}
                required
              />
              <button type="submit" className="btn btn-primary">
                Enter
              </button>
            </form>
            <button
              onClick={logOut}
              className="btn btn-danger my-4"
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

export default EnterRoom
