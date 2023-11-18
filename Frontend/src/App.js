import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import Loading from './components/Loading';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <ToastContainer autoClose={2000} />
        <AppContent />
      </BrowserRouter>
    </div>
  );
}

function AppContent(props) {
  const location = useLocation();
  const showButton = location.pathname === "/users"||location.pathname==="/accommodationWaitingList";
  const user = window.localStorage.userID;
  const isDarkMode = props.isDarkMode;
  const setIsDarkMode = props.setIsDarkMode;
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </Suspense>
    </>
  );
}


export default App;
