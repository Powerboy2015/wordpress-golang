import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './css/style.css';
import './App.css';
import HomePage from './pages/HomePage';
import RecentsPage from './pages/RecentsPage';
import FavoritesPage from './pages/FavoritesPage';
import CategoriesPage from './pages/CategoriesPage';
import NavUI from './components/NavUI';
import MangaPage from './pages/MangaPage';
import ReadMangaPage from './pages/ReadMangaPage';

function App() {

  return (
    <>
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<NavUI><HomePage/></NavUI>} />
            <Route path='/categories' element={<NavUI><CategoriesPage/></NavUI>} />
            <Route path='/favorites' element={<NavUI><FavoritesPage/></NavUI>} />
            <Route path='/recentRead' element={<NavUI><RecentsPage/></NavUI>} />
            <Route path='/manga/:title' element={<NavUI><MangaPage/></NavUI>} />
            <Route path='manga/:title/:chapter' element={<ReadMangaPage/>}/>
          </Routes>
        </BrowserRouter>
      </header>
    </div>
    </>
  )
}

export default App
