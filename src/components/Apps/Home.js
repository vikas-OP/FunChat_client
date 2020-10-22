import React from "react"
import { useHistory } from "react-router-dom"

const Home = ({ user }) => {
  const history = useHistory()

  const createRoom = () => {
    history.push("/create-room")
  }

  const enterRoom = () => {
    history.push("/enter-room")
  }

  return (
    <div>
      <div>
        <h5>Hi {user.userName}</h5>
        <button className="btn btn-primary" onClick={createRoom}>
          create room
        </button>
        <button className="btn btn-warning" onClick={enterRoom}>
          enter room
        </button>
      </div>
    </div>
  )
}

export default Home
