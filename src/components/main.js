import React from "react"
import { useState } from "react"
import NavBar from "./NavBar/navbar"
import { Route, Switch } from "react-router-dom"
import Home from "./Home/home"
import Login from "./Auth/login"
import Signup from "./Auth/signup"

const Main = () => {
    const [logged, setLogged] = useState(true)
    return (
        <>
            <NavBar logged={logged} setLogged={setLogged} />
            <Switch>
                <Route exact path="/">
                    <Home logged={logged} />
                </Route>
                <Route exact path="/login">
                    <Login logged={logged} />
                </Route>
                <Route exact path="/signup">
                    <Signup logged={logged} />
                </Route>
            </Switch>
        </>
    )
}

export default Main
