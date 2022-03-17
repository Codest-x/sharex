import { Avatar } from '@mui/material'
import React from 'react'
import './sidebar.scss'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'

export default function Sidebar() {
  const { user } = useSelector(selectUser)
  const recentItem = (topic) => (
    <div className="sidebar__recentItem">
      <span className="sidebar__hash">#</span>
      <p>{topic}</p>
    </div>
  )
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img
          src="https://tecnovortex.com/wp-content/uploads/2019/04/wallpaper-engine.jpg"
          alt="banner-profile"
        />
        <Avatar src={user.photoUrl} className="sidebar__avatar" alt={`${user?.displayName}-Avatar`}>
          {user?.displayName[0]}
        </Avatar>
        <h2>{user.displayName}</h2>
        <h4>{user.email}</h4>
      </div>
      <div className="sidebar__stats">
        <div className="sidebar__stat">
          <p>Quien te ha visto</p>
          <p className="sidebar__statNumber">2,453</p>
        </div>
        <div className="sidebar__stat">
          <p>Vistas de publicaciones</p>
          <p className="sidebar__statNumber">253</p>
        </div>
      </div>

      <div className="sidebar__bottom">
        <p>Reciente</p>
        {recentItem('reactjs')}
        {recentItem('software')}
        {recentItem('programming')}
        {recentItem('javascript')}
      </div>
    </div>
  )
}
