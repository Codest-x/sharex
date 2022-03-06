/* eslint-disable eqeqeq */
import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header/header-component'
import { Home } from './pages'

function App() {
  const location = useLocation()
  return (
    <div className="App">
      {location.pathname != '/login' ? <Header /> : null}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
