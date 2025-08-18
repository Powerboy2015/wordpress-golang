import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './css/style.css';
import './App.css';
import HomePage from './components/HomePage';
import NavUI from './components/NavUI';

function App() {

  return (
    <>
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<NavUI><HomePage/></NavUI>} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
    </>
  )
}

export default App
