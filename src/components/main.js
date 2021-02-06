import React, { useState } from "react"
import NavBar from "./NavBar/navbar"
import { Route, Switch } from "react-router-dom"
import Home from "./Home/home"
import Login from "./Auth/login"
import Signup from "./Auth/signup"
import { auth } from "../services/firebase"
import Loading from "./loading"
const Main = () => {
    const [logged, setLogged] = useState(false)
    const [loading, setLoading] = useState(true)

    auth.onAuthStateChanged((user) => {
        if (user) {
            setLogged(true)
            setTimeout(() => {
                setLoading(false)
            }, 1000)
        } else {
            setLogged(false)
            setTimeout(() => {
                setLoading(false)
            }, 1000)
        }
    })

    return loading ? (
        <Loading />
    ) : (
        <>
            <NavBar logged={logged} />
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
