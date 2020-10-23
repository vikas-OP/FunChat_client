import React, { useState, useLayoutEffect, useCallback } from "react"
import { useHistory } from "react-router-dom"
import checkLogin from "../../common/checkLogin"
import { Spinner } from "react-bootstrap"

const WithLogin = (WrappedComponent) => {
  const WithLoginComponent = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState({})
    const history = useHistory()

    const loginFunction = useCallback(() => {
      checkLogin().then((user) => {
        if (!user) {
          history.push("/login")
          return
        }
        setUser(user)
        setIsLoading(false)
      })
    }, [history])

    useLayoutEffect(() => {
      loginFunction()
    }, [loginFunction])
    return (
      <div>
        {isLoading ? (
          <div
            className="container-fluid text-white vh-100 d-flex justify-content-center align-items-center"
            style={{ background: "#1d3557" }}
          >
            <Spinner animation="border" variant="danger" />
          </div>
        ) : (
          <WrappedComponent
            user={user}
            logOut={() => {
              localStorage.removeItem("access-token")
              loginFunction()
            }}
          />
        )}
      </div>
    )
  }
  return WithLoginComponent
}

export default WithLogin
