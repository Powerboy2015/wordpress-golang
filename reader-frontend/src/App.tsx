import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/style.css";
import "./App.css";
import HomePage from "./pages/HomePage";

function App() {
    return (
        <>
            <div className="App">
                <header className="App-header">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                        </Routes>
                    </BrowserRouter>
                </header>
            </div>
        </>
    );
}

export default App;
