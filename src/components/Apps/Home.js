import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import Header from "../common/Header"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faTrash, faSignInAlt } from "@fortawesome/free-solid-svg-icons"

const Home = ({ user, logOut }) => {
  const [rooms, setRooms] = useState([])
  const history = useHistory()

  const getRooms = () => {
    fetch("https://funchat-vikas.herokuapp.com/api/users/rooms", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("access-token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.stat === "S") {
          setRooms(res.rooms)
        }
      })
  }

  const deleteRoom = async (id) => {
    let res = await fetch(
      `https://funchat-vikas.herokuapp.com/api/rooms/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("access-token"),
        },
      }
    )
    res = await res.json()
    if (res.stat === "S") {
      getRooms()
    }
  }

  useEffect(() => {
    getRooms()
  }, [])

  const createRoom = () => {
    history.push("/create-room")
  }

  const enterRoom = () => {
    history.push("/enter-room")
  }

  const editRoom = (id) => {
    history.push(`/edit-room/${id}`)
  }

  const roomsList = rooms.map((room) => (
    <li key={room._id} className="my-4">
      {room.name}
      &nbsp; &nbsp; &nbsp;
      <button
        className="btn btn-sm btn-light"
        onClick={() => {
          editRoom(room._id)
        }}
      >
        <FontAwesomeIcon icon={faEdit} />
      </button>
      &nbsp; &nbsp;
      <button
        onClick={() => {
          deleteRoom(room._id)
        }}
        className="btn btn-sm btn-light"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
      &nbsp; &nbsp;
      <button
        className="btn btn-sm btn-light"
        onClick={() => {
          history.push(`/enter-room/${room._id}`)
        }}
      >
        <FontAwesomeIcon icon={faSignInAlt} />
      </button>
    </li>
  ))

  return (
    <div
      className="container-fluid text-white vh-100"
      style={{ background: "#1d3557" }}
    >
      <Header />
      <div className="container my-0 py-0">
        <div className="d-flex justify-content-between">
          <h4>
            Hi {user.userName} &nbsp;
            <button
              className="btn btn-light btn-sm"
              onClick={() => {
                history.push(`/edit-user`)
              }}
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </h4>
          <button onClick={logOut} className="btn btn-danger w-10">
            logout
          </button>
        </div>
        <div className="row" style={{ height: "70vh" }}>
          <div
            className="col-md-4 bg-dark col-6 p-3 d-flex flex-column h-100"
            style={{ overflowY: "scroll" }}
          >
            <h5>Rooms</h5>
            <ul style={{ listStyle: "none" }}>{roomsList}</ul>
          </div>
          <div className="col-md-8 col-6 d-flex align-items-center justify-content-center flex-column">
            <button className="btn btn-primary my-3" onClick={createRoom}>
              create room
            </button>
            <button className="btn btn-warning my-3" onClick={enterRoom}>
              enter room
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
