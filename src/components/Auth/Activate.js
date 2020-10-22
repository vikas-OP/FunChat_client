import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import Header from "../common/Header"
import AlertDismissable from "../common/Dismissable"
import checkLogin from "../../common/checkLogin"

const Activate = () => {
  const { id } = useParams()
  const history = useHistory()
  const [userMessage, setUserMessage] = useState("")

  useEffect(() => {
    checkLogin().then((user) => {
      if (user) {
        history.push("/")
      }
    })
  }, [history])

  useEffect(() => {
    const activateAccount = async (activationLink) => {
      const data = {
        activationLink,
      }
      let response = await fetch("http://localhost:5000/activate", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
      response = await response.json()
      if (response.stat === "S") {
        history.push("/login")
        return
      }
      setUserMessage(response.message)
    }
    activateAccount(id)
  }, [id, history])

  return (
    <div
      className="container-fluid text-white vh-100"
      style={{ background: "#1d3557" }}
    >
      <Header />
      <div className="container">
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
  )
}

export default Activate
