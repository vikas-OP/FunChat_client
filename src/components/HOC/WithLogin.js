import React, { useState, useLayoutEffect, useCallback } from "react"
import { useHistory } from "react-router-dom"
import checkLogin from "../../common/checkLogin"

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
          "Loading..."
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
