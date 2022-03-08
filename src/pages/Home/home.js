import React from 'react'
import Feed from '../../components/Feed/feed-component'
import Sidebar from '../../components/Sidebar/sidebar-component'
import Widgets from '../../components/Widgets/widgets-component'

export default function Home() {
  return (
    <div className="app__body">
      {location.pathname === '/login' ? null : <Sidebar />}
      {location.pathname === '/login' ? null : <Feed />}
      {location.pathname === '/login' ? null : <Widgets />}
    </div>
  )
}
