import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Overview from './components/overview';
import './css/style.css';
import './App.css';
import Manga from './components/Manga';
import Chapter from './components/Chapter';

function App() {

  return (
    <>
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Overview />} />
            <Route path='/read/:manga/:chapter' element={<Chapter />} />
            <Route path='/read/:manga' element={<Manga />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
    </>
  )
}

export default App
