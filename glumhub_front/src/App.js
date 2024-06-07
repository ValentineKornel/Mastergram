import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import MainLayout from './layouts/MainLaout';
import HomePageClient from './pages/HomePageClient/HomePageClient';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import EditProfilePage from './pages/EditProfilePage/EditProfilePage';
import HomePageMaster from './pages/HomePageMaster/HomePageMaster';
import MyProfilePageClient from './pages/MyProfilePage/Client/MyProfilePageClient';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/auth/login' element={<LoginPage/>}/>
          <Route path='/auth/sign-up' element={<RegisterPage></RegisterPage>}></Route>
          <Route path='/' element={<MainLayout></MainLayout>}>
            <Route path='/client/home' element={<HomePageClient></HomePageClient>}></Route>
            <Route path='/master/home' element={<HomePageMaster></HomePageMaster>}></Route>
            <Route path='/editProfile' element={<EditProfilePage/>}></Route>
            <Route path='/client/myProfile' element={<MyProfilePageClient></MyProfilePageClient>}></Route>
          </Route>
          <Route path='/error' element={<ErrorPage/>}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
