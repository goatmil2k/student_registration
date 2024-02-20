import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import RegisterationForm from './pages/Register';
import InfoTable  from './pages/InfoTable';
import { Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NotFound from './pages/NotFound';

function App() {
  const location = useLocation();
  const pathname = location.pathname;
  const id = pathname.split('/infopage/').join('');
  
  return (
    <main>
      <Header pathname={pathname} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={< RegisterationForm />} />
        <Route path={`/infopage/${id}`} element={<InfoTable  />} />
        <Route path='notfound' element={<NotFound/>}/>
      </Routes>
    </main>
  )
}

export default App
