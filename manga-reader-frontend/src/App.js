import './css/style.css';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Overview from './components/Overview';
import Chapter from './components/Chapter';
import Manga from './components/Manga';


function App() {
  return (
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
  );
}

export default App;
