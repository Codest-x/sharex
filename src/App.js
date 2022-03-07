/* eslint-disable eqeqeq */
import React from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice'
import Header from './components/Header/header-component'
import { Home } from './pages'
import Login from './pages/Login/login'

function App() {
  const location = useLocation()
  const user = useSelector(selectUser)
  return (
    <div className="app">
      {location.pathname != '/login' ? <Header /> : null}
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/" element={!user ? <Navigate to="/login" /> : <Home />} />
      </Routes>
    </div>
  )
}

export default App
