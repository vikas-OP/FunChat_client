import React, { useState, useEffect, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faUser,
  faComment,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons"
import AlertDismissable from "../common/Dismissable"
import "./room.css"
import { useParams, useHistory } from "react-router-dom"
import io from "socket.io-client"

let socket

const Room = ({ user }) => {
  const [message, setMessage] = useState("")
  const [roomName, setRoomName] = useState("")
  const [userMessage, setUserMessage] = useState("")
  const [users, setUsers] = useState([])
  const [allMessages, setAllMessages] = useState([])
  const [showRoomDetails, setShowRoomDetails] = useState(false)
  const inputRef = useRef()
  const scrollRef = useRef()
  const { roomID, accessCode } = useParams()
  const history = useHistory()
  const userName = user.userName

  useEffect(() => {
    fetch(`https://funchat-vikas.herokuapp.com/api/rooms/${roomID}`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("access-token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.stat === "S") {
          setRoomName(res.room.name)
          return
        }
        setUserMessage(res.message)
      })
    socket = io("https://funchat-vikas.herokuapp.com", {
      query: { userName, roomID, accessCode },
    })
    socket.emit("join_room", roomID)
    socket.on("message", (messageDetails) => {
      showMessageInChatBox(messageDetails)
      scrollToBottom()
      messageDetails.users && setUsers(messageDetails.users)
    })
    socket.on("error", (err) => {
      setUserMessage(err)
    })

    return () => {
      socket.disconnect()
    }
  }, [userName, accessCode, roomID, history])

  const showMessageInChatBox = (messageDetails) => {
    setAllMessages((allMessages) => [...allMessages, messageDetails])
  }

  const scrollToBottom = () => {
    scrollRef.current.scrollIntoView({ behaviour: "smooth" })
  }

  const sendMessage = (e) => {
    e.preventDefault()
    if (message) {
      socket.emit("message", message)
      setMessage("")
    }
    inputRef.current.focus()
  }

  const showAlertBox = () => {
    return (
      <AlertDismissable
        heading="Room details"
        text={`room id : ${roomID} \n
            access code : ${accessCode}`}
        scroll={scrollToBottom}
        background="success"
        handleClose={() => {
          setShowRoomDetails(false)
        }}
      />
    )
  }

  return userMessage ? (
    <div>
      <AlertDismissable
        background="danger"
        scroll={() => null}
        handleClose={() => setUserMessage("")}
        heading="Error"
        text={userMessage}
      />
      <button className="btn btn-primary" onClick={() => history.push("/home")}>
        Home
      </button>
    </div>
  ) : (
    <div className="chat-container">
      <header className="chat-header">
        <h4>FunChat</h4>
        <div>
          <button
            onClick={() => history.push("/")}
            className="btn bg-dark text-white"
          >
            Leave
          </button>
          <button
            className="btn bg-success text-white ml-3"
            onClick={() => setShowRoomDetails(true)}
          >
            Details
          </button>
        </div>
      </header>
      <main className="chat-main">
        <div className="chat-sidebar">
          <h6>
            <FontAwesomeIcon icon={faComment} /> Room Name
          </h6>
          <h5 id="room-name">{roomName}</h5>
          <h6 className="mt-3">
            <FontAwesomeIcon icon={faUser} /> Users
          </h6>
          <ul id="users">
            {users.map((user, index) => (
              <li key={index}>{user}</li>
            ))}
          </ul>
        </div>
        <div className="chat-messages">
          {allMessages.map((messageDetails, index) => (
            <div className="message" key={index}>
              <p className="meta">
                {messageDetails.sentBy} &nbsp; &nbsp;
                <span>{messageDetails.time}</span>
              </p>
              <p className="text">{messageDetails.message}</p>
            </div>
          ))}
          {showRoomDetails ? showAlertBox() : null}
          <div ref={scrollRef}></div>
        </div>
      </main>
      <div className="chat-form-container">
        <form id="chat-form">
          <input
            ref={inputRef}
            id="msg"
            type="text"
            placeholder="Enter Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button
            type="submit"
            className="btn text-white"
            onClick={sendMessage}
          >
            <FontAwesomeIcon icon={faPaperPlane} /> Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default Room
