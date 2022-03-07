/* eslint-disable eqeqeq */
import React, { useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, login, logout } from './features/userSlice'
import Header from './components/Header/header-component'
import { Home } from './pages'
import Login from './pages/Login/login'
import { onAuthStateChanged, getAuth } from 'firebase/auth'

function App() {
  const dispatch = useDispatch()
  const auth = getAuth()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            email: user.email,
            uid: user.uid,
            displayName: user.displayName,
            photoUrl: user.photoURL
          })
        )
        // ...
      } else {
        dispatch(logout())
      }
    })
  }, [])
  const location = useLocation()
  const user = useSelector(selectUser)
  return (
    <div className="app">
      {location.pathname != '/login' ? <Header /> : null}
      <Routes>
        <Route
          path="/login"
          element={user.user ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/"
          element={!user.user ? <Navigate to="/login" /> : <Home />}
        />
      </Routes>
    </div>
  )
}

export default App
