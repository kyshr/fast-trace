import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/scss/main.scss";
import Main from "./components/main";
import { BrowserRouter } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Main />
            </BrowserRouter>
        </div>
    );
}

export default App;