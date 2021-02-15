import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/scss/main.scss"
import Main from "./components/main"
import { HashRouter } from "react-router-dom"

function App() {
    return (
        <div className="App">
            <HashRouter basename="/">
                <Main />
            </HashRouter>
        </div>
    )
}

export default App
