import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"

const Activate = () => {
  const { id } = useParams()
  const history = useHistory()
  const [userMsg, setUserMsg] = useState("")

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
      setUserMsg(response.message)
    }
    activateAccount(id)
  }, [id, history])

  return <div>{userMsg ? <h3>{userMsg}</h3> : null}</div>
}

export default Activate
