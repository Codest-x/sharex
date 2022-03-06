/* eslint-disable eqeqeq */
import React from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice'
import Feed from './components/Feed/feed-component'
import Header from './components/Header/header-component'
import Sidebar from './components/Sidebar/sidebar-component'
import { Home } from './pages'
import Login from './pages/Login/login'

function App() {
  const location = useLocation()
  const user = useSelector(selectUser)
  return (
    <div className="app">
      {location.pathname != '/login' ? <Header /> : null}
      <div className="app__body">
        {location.pathname != '/login' ? <Sidebar /> : null}
        {location.pathname != '/login' ? <Feed /> : null}
      </div>
      <Routes>
        <Route path="/" element={!user ? <Navigate to="/login" /> : <Home />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      </Routes>
    </div>
  )
}

export default App
