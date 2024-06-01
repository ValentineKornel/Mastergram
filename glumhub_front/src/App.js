import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import MainLayout from './layouts/MainLaout';
import HomePageClient from './pages/HomePageClient/HomePageClient';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage></RegisterPage>}></Route>
          <Route path='/' element={<MainLayout></MainLayout>}>
            <Route path='/' element={<HomePageClient></HomePageClient>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
