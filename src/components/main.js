import React, { useState, useEffect } from "react"
import NavBar from "./NavBar/navbar"
import { Route, Switch } from "react-router-dom"
import Home from "./Home/home"
import Login from "./Auth/login"
import Signup from "./Auth/signup"
import Footer from "./Footer/footer"
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
            console.log(login.userId)
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
            <NavBar logged={logged} setLogged={setLogged} />
            <div className="main-wrapper d-flex flex-column justify-content-between">
                <Switch>
                    <Route exact path="/">
                        <Home logged={logged} />
                    </Route>
                    <Route exact path="/login">
                        <Login logged={logged} setLogged={setLogged} />
                    </Route>
                    <Route exact path="/signup">
                        <Signup logged={logged} />
                    </Route>
                    <Route exact path="/forgot">
                        <Forgot logged={logged} />
                    </Route>
                </Switch>
                <Footer />
            </div>
        </>
    )
}

export default Main
