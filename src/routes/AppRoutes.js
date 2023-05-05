import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Login from '../components/Login/Login'
import Todos from '../components/Todos/Todos'
import Settings from '../components/Settings/Settings'

const AppRoutes = () => {

  const user = useSelector(state => { return state.auth.authData })

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/todo" element={!user ? <Navigate to='/' /> : <Todos />} />
        <Route path="/settings" element={!user ? <Navigate to='/' /> : <Settings />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
