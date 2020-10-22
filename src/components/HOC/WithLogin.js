import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import checkLogin from "../../common/checkLogin"

const WithLogin = (WrappedComponent) => {
  const WithLoginComponent = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState({})
    const history = useHistory()
    useEffect(() => {
      checkLogin().then((user) => {
        if (!user) {
          history.push("/login")
          return
        }
        setIsLoading(false)
        setUser(user)
      })
    }, [history])
    return (
      <div>{isLoading ? "Loading..." : <WrappedComponent user={user} />}</div>
    )
  }
  return WithLoginComponent
}

export default WithLogin
