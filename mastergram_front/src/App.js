import './App.css';
import { BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import MainLayout from './layouts/MainLaout';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import EditProfilePage from './pages/EditProfilePage/EditProfilePage';
import MyProfilePage from './pages/MyProfilePage/MyProfilePage';
import HomePage from './pages/HomePage/HomePage';
import MasterPage from './pages/masterPage/MasterPage';
import MyMastersPage from './pages/myMastersPage/MyMastersPage';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/auth/login' element={<LoginPage/>}/>
          <Route path='/auth/sign-up' element={<RegisterPage></RegisterPage>}></Route>
          <Route path='/' element={<MainLayout></MainLayout>}>
            <Route path='/home' element={<HomePage></HomePage>}></Route>
            <Route path='/editProfile' element={<EditProfilePage/>}></Route>
            <Route path='/myProfile' element={<MyProfilePage></MyProfilePage>}></Route>
            <Route path='/master/:id' element={<MasterPage></MasterPage>}></Route>
            <Route path='/myMasters' element={<MyMastersPage></MyMastersPage>}></Route>
          </Route>
          
          <Route path='/error' element={<ErrorPage/>}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
