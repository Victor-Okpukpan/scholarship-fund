import { Routes, Route } from 'react-router-dom';
import { Apply, Home, NotFound } from './pages';
import { NavBar } from './components';
import Admin from './pages/Admin';
function App() {
  const shouldDisplayNavBar =
    location.pathname === '/' || location.pathname === '/apply';
  return (
    <>
      <div className='relative'>
        {shouldDisplayNavBar && <NavBar />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/apply' element={<Apply />} />
          <Route path={'/admin'} element={<Admin />} />
          <Route path={'/admin/applications'} element={<Admin />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
