import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import NavComponent from "./components/NavComponent";

import {
QueryClient,
QueryClientProvider,
} from '@tanstack/react-query';
import ManwhaOverviewPage from "./pages/ManwhaOverviewPage";
import MangaReaderPage from "./pages/MangaReaderPage";
import { OptionContextProvider } from "./context/OptionContext";

// Create a client
const queryClient = new QueryClient()

function App() {
return (
    <QueryClientProvider client={queryClient}>
        <OptionContextProvider>
            <BrowserRouter>
                <div className="App flex flex-row justify-center gap-2 p-2">
                <div id="pages" className="w-full bg-[#252525] rounded flex flex-col gap-4 relative">
                    <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/manwhas/:slug" element={<ManwhaOverviewPage />} />
                    <Route path="/manwhas/:slug/:chapter" element={<MangaReaderPage/>}/>
                    </Routes>
                </div>
                <NavComponent />
                </div>
            </BrowserRouter>
        </OptionContextProvider>

    </QueryClientProvider>
);
}

export default App;
