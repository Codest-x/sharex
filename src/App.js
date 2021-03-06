/* eslint-disable multiline-ternary */
/* eslint-disable eqeqeq */
import React, { useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, login, logout } from './features/userSlice'
import Header from './components/Header/header-component'
import { Home } from './pages'
import Login from './pages/Login/login'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import Message from './components/Messages/VerificationMessage/verification-message'

function App() {
  const dispatch = useDispatch()
  const auth = getAuth()
  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName:
              userAuth.displayName === null
                ? 'User-' + userAuth.uid.slice(0, 3) + userAuth.uid.slice(-3)
                : userAuth.displayName,
            photoUrl: userAuth.photoURL === null ? '' : userAuth.photoURL,
            isVerified: userAuth.emailVerified
          })
        )
        // ...
      } else {
        dispatch(logout())
      }
    })
  }, [])
  const location = useLocation()
  const { user } = useSelector(selectUser)

  return (
    <div className="app">
      {location.pathname != '/login' ? (
        user?.isVerified === false ? (
          <Message email={user?.email} />
        ) : null
      ) : null}
      {location.pathname != '/login' ? <Header /> : null}
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/" element={!user ? <Navigate to="/login" /> : <Home />} />
      </Routes>
    </div>
  )
}

export default App
