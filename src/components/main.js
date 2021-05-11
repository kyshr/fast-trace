import React, { useState, useEffect } from "react"
import { Route, Switch } from "react-router-dom"
import NavBar from "./Individual/NavBar/navbar"
import NavBarIndex from "./Individual/NavBar/navbar_landing"
import Home from "./Individual/Home/home"
import Login from "./Individual/Auth/login"
import Signup from "./Individual/Auth/signup"
import Footer from "./Individual/Footer/footer"
import Landing from "./Individual/Landing/landing"
import Forgot from "./Individual/ForgotPassword/forgot"
import Loading from "./loading"
import { checkIndividualLoggedIn } from "../services/auth"
import Profile from "./Individual/Home/profile"
import Logs from "./Individual/Home/logs"

const Main = () => {
    const [logged, setLogged] = useState(false)
    const [loading, setLoading] = useState(true)
    const [userId, setUserId] = useState("")

    const checkLoggedIn = async () => {
        setLoading(true)
        const login = await checkIndividualLoggedIn("x", "x")
        if (login.success) {
            setLogged(true)
            setUserId(login.userId)
            setTimeout(() => {
                setLoading(false)
            }, 1000)
        }
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }

    useEffect(() => {
        checkLoggedIn()
    }, [logged])

    return loading ? (
        <Loading />
    ) : (
        <>
            <div className="main-wrapper d-flex flex-column justify-content-between">
                <Switch>
                    <Route exact path="/">
                        <NavBarIndex />
                        <Landing />
                    </Route>
                    <Route exact path="/individual">
                        <NavBar logged={logged} setLogged={setLogged} />
                        <Home logged={logged} userId={userId} />
                    </Route>
                    <Route exact path="/individual/profile">
                        <NavBar logged={logged} setLogged={setLogged} />
                        <Profile logged={logged} userId={userId} />
                    </Route>
                    <Route exact path="/individual/logs">
                        <NavBar logged={logged} setLogged={setLogged} />
                        <Logs logged={logged} userId={userId} />
                    </Route>
                    <Route exact path="/individual/login">
                        <NavBar logged={logged} setLogged={setLogged} />
                        <Login logged={logged} setLogged={setLogged} />
                    </Route>
                    <Route exact path="/individual/signup">
                        <NavBar logged={logged} setLogged={setLogged} />
                        <Signup logged={logged} setLogged={setLogged} />
                    </Route>
                    <Route exact path="/individual/forgot">
                        <NavBar logged={logged} setLogged={setLogged} />
                        <Forgot logged={logged} />
                    </Route>
                </Switch>
                <Footer />
            </div>
        </>
    )
}

export default Main
