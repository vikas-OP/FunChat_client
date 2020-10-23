const checkIfUserIsLoggedIn = async () => {
  if (!localStorage.getItem("access-token")) {
    return
  }
  let response = await fetch("https://funchat-vikas.herokuapp.com/home", {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("access-token"),
    },
  })
  response = await response.json()
  if (response.stat === "S") {
    return response.user
  }
  return
}

export default checkIfUserIsLoggedIn
