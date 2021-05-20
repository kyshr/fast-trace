import React, { useState, useEffect } from "react"
import { Route, Switch } from "react-router-dom"
import NavBar from "./NavBar/navbar"
import NavBarEstablishment from "./NavBar/navbar_establishment"
import NavBarIndex from "./NavBar/navbar_landing"
import Home from "./Individual/Home/home"
import Login from "./Individual/Auth/login"
import Signup from "./Individual/Auth/signup"
import Profile from "./Individual/Home/profile"
import Logs from "./Individual/Home/logs"
import HomeEstablishment from "./Establishment/Home/home"
import LoginEstablishment from "./Establishment/Auth/login"
import SignupEstablishment from "./Establishment/Auth/signup"
import ProfileEstablishment from "./Establishment/Home/profile"
import LogsEstablishment from "./Establishment/Home/logs"
import Footer from "./Footer/footer"
import Landing from "./Individual/Landing/landing"
import Loading from "./loading"
import { checkIndividualLoggedIn } from "../services/auth"
import { checkEstablishmentLoggedIn } from "../services/auth_establishment"
import { checkAdminLoggedIn } from "../services/auth_admin"
import LoginAdmin from "./Admin/Auth/login"
import AdminHome from "./Admin/Home/home"
import NavBarAdmin from "./NavBar/navbar_admin"
import AdminUserLogs from "./Admin/Home/logs"
import AdminEstablishments from "./Admin/Home/establishments"

const Main = () => {
    const [logged, setLogged] = useState(false)
    const [establishmentLogged, setEstablishmentLogged] = useState(false)
    const [adminLogged, setAdminLogged] = useState(false)
    const [loading, setLoading] = useState(true)
    const [userId, setUserId] = useState("")
    const [establishmentId, setEstablishmentId] = useState("")
    const [username, setUsername] = useState("")

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
    const EstablishmentCheckLoggedIn = async () => {
        setLoading(true)
        const login = await checkEstablishmentLoggedIn("x", "x")
        if (login.success) {
            setEstablishmentLogged(true)
            setEstablishmentId(login.establishmentId)
            setTimeout(() => {
                setLoading(false)
            }, 1000)
        }
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }

    const AdminCheckLoggedIn = async () => {
        setLoading(true)
        const login = await checkAdminLoggedIn("x", "x")
        if (login.success) {
            setAdminLogged(true)
            setUsername(login.username)
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

    useEffect(() => {
        EstablishmentCheckLoggedIn()
    }, [establishmentLogged])

    useEffect(() => {
        AdminCheckLoggedIn()
    }, [adminLogged])

    return loading ? (
        <Loading />
    ) : (
        <>
            <div className="main-wrapper d-flex flex-column justify-content-between">
                <Switch>
                    {/* Individual Routes */}
                    <Route exact path="/">
                        <NavBarIndex />
                        <Landing />
                        <Footer />
                    </Route>
                    <Route exact path="/individual">
                        <NavBar logged={logged} setLogged={setLogged} />
                        <Home logged={logged} userId={userId} />
                        <Footer />
                    </Route>
                    <Route exact path="/individual/profile">
                        <NavBar logged={logged} setLogged={setLogged} />
                        <Profile logged={logged} userId={userId} />
                        <Footer />
                    </Route>
                    <Route exact path="/individual/logs">
                        <NavBar logged={logged} setLogged={setLogged} />
                        <Logs logged={logged} userId={userId} />
                        <Footer />
                    </Route>
                    <Route exact path="/individual/login">
                        <NavBar logged={logged} setLogged={setLogged} />
                        <Login logged={logged} setLogged={setLogged} />
                        <Footer />
                    </Route>
                    <Route exact path="/individual/signup">
                        <NavBar logged={logged} setLogged={setLogged} />
                        <Signup logged={logged} setLogged={setLogged} />
                        <Footer />
                    </Route>

                    {/* Establishment Routes */}
                    <Route exact path="/establishment">
                        <NavBarEstablishment
                            logged={establishmentLogged}
                            setLogged={setEstablishmentLogged}
                        />
                        <HomeEstablishment
                            logged={establishmentLogged}
                            establishmentId={establishmentId}
                        />
                        <Footer />
                    </Route>
                    <Route exact path="/establishment/profile">
                        <NavBarEstablishment
                            logged={establishmentLogged}
                            setLogged={setEstablishmentLogged}
                        />
                        <ProfileEstablishment
                            logged={establishmentLogged}
                            establishmentId={establishmentId}
                        />
                        <Footer />
                    </Route>
                    <Route exact path="/establishment/logs">
                        <NavBarEstablishment
                            logged={establishmentLogged}
                            setLogged={setEstablishmentLogged}
                        />
                        <LogsEstablishment
                            logged={establishmentLogged}
                            establishmentId={establishmentId}
                        />
                        <Footer />
                    </Route>
                    <Route exact path="/establishment/login">
                        <NavBarEstablishment
                            logged={establishmentLogged}
                            setLogged={setEstablishmentLogged}
                        />
                        <LoginEstablishment
                            logged={establishmentLogged}
                            setLogged={setEstablishmentLogged}
                        />
                        <Footer />
                    </Route>
                    <Route exact path="/establishment/signup">
                        <NavBarEstablishment
                            logged={establishmentLogged}
                            setLogged={setEstablishmentLogged}
                        />
                        <SignupEstablishment
                            logged={establishmentLogged}
                            setLogged={setEstablishmentLogged}
                        />
                        <Footer />
                    </Route>
                    {/* Admin Routes */}
                    <Route exact path="/backend">
                        <NavBarAdmin setLogged={setAdminLogged} />
                        <AdminHome logged={adminLogged} username={username} />
                    </Route>
                    <Route exact path="/backend/logs">
                        <NavBarAdmin setLogged={setAdminLogged} />
                        <AdminUserLogs
                            logged={adminLogged}
                            username={username}
                        />
                    </Route>
                    <Route exact path="/backend/establishments">
                        <NavBarAdmin setLogged={setAdminLogged} />
                        <AdminEstablishments
                            logged={adminLogged}
                            username={username}
                        />
                    </Route>
                    <Route exact path="/backend/login">
                        <LoginAdmin
                            logged={adminLogged}
                            setLogged={setAdminLogged}
                        />
                    </Route>
                </Switch>
            </div>
        </>
    )
}

export default Main
