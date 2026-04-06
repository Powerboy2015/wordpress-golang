import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import NavComponent from "./components/NavComponent";

import {
QueryClient,
QueryClientProvider,
} from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient()

function App() {
    return (
        <>
            <div className="App flex flex-row justify-center gap-2 p-2">
                <div id="pages" className="w-full bg-[#252525] rounded flex flex-col p-4 gap-4">
                    <QueryClientProvider client={queryClient}>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                            </Routes>
                        </BrowserRouter>
                    </QueryClientProvider>
                </div>
                <NavComponent/>
            </div>
        </>
    );
}

export default App;
