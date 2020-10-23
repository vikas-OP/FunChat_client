import React from "react"
import Register from "./components/Auth/Signup"
import Login from "./components/Auth/Login"
import Home from "./components/Apps/Home"
import Forgotpassword from "./components/Auth/Forgotpassword"
import Resetpassword from "./components/Auth/Resetpassword"
import ActivateRegisteration from "./components/Auth/Activate"
import Room from "./components/Apps/Room"
import CreateRoom from "./components/Apps/CreateRoom"
import EnterRoom from "./components/Apps/EnterRoom"
import EditUser from "./components/Users/EditUser"
import EditRoom from "./components/Rooms/EditRoom"
import WithLogin from "./components/HOC/WithLogin"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

const CreateRoomWithLogin = WithLogin(CreateRoom)
const EnterRoomWithLogin = WithLogin(EnterRoom)
const RoomWithLogin = WithLogin(Room)
const HomeWithLogin = WithLogin(Home)
const EditUserWithLogin = WithLogin(EditUser)
const EditRoomWithLogin = WithLogin(EditRoom)

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/forgot-password" component={Forgotpassword} />
        <Route path="/reset-password/:id" component={Resetpassword} />
        <Route path="/activate/:id" component={ActivateRegisteration} />
        <Route path="/create-room" component={CreateRoomWithLogin} />
        <Route path="/enter-room/:id" component={EnterRoomWithLogin} />
        <Route path="/enter-room" component={EnterRoomWithLogin} />
        <Route path="/edit-user" component={EditUserWithLogin} />
        <Route path="/edit-room/:id" component={EditRoomWithLogin} />
        <Route path="/room/:roomID/:accessCode" component={RoomWithLogin} />
        <Route path="/" component={HomeWithLogin} />
      </Switch>
    </Router>
  )
}

export default App
