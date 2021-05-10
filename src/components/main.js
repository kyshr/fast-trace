import React, { useState, useEffect } from "react"
import { Route, Switch } from "react-router-dom"
import NavBar from "./NavBar/navbar"
import NavBarIndex from "./NavBar/navbar_landing"
import Home from "./Home/home"
import Login from "./Auth/login"
import Signup from "./Auth/signup"
import Footer from "./Footer/footer"
import Landing from "./Landing/landing"
import Forgot from "./ForgotPassword/forgot"
import Loading from "./loading"
import { checkIndividualLoggedIn } from "../services/auth"

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
                        <Home logged={logged} />
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
