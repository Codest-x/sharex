/* eslint-disable no-unused-vars */
import React from 'react'
import './header-option.scss'
import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'

export default function HeaderOption({ Icon, title, avatar, path, onClick }) {
  const currentPath = useLocation()
  const { user } = useSelector(selectUser)
  return (
    <>
      {path ? (
        <Link
          to={path}
          onClick={onClick}
          className="headerOption"
          style={
            currentPath.pathname === path ? { color: 'red' } : { color: '' }
          }
        >
          {avatar && (
            <Avatar
              className="headerOption__icon"
              src={user?.photoUrl}
              style={
                currentPath.pathname === path ? { backgroundColor: 'red' } : { backgroundColor: '' }
              }
              alt={`${user?.displayName}-Avatar`}
            >
              {user?.displayName[0]}
            </Avatar>
          )}
          {Icon && <Icon className="headerOption__icon" />}
          <h3 className="headerOption__title">{title}</h3>
        </Link>
      ) : (
        <div
          className="headerOption"
          onClick={onClick}
          style={
            currentPath.pathname === path ? { color: 'red' } : { color: '' }
          }
        >
          {avatar && (
            <Avatar
              className="headerOption__icon"
              src={user?.photoUrl}
              alt={`${user?.displayName}-Avatar`}
            >
              {user?.displayName[0]}
            </Avatar>
          )}
          {Icon && <Icon className="headerOption__icon" />}
          <h3 className="headerOption__title">{title}</h3>
        </div>
      )}
    </>
  )
}

HeaderOption.propTypes = {
  title: PropTypes.string,
  avatar: PropTypes.bool,
  Icon: PropTypes.object,
  path: PropTypes.string,
  active: PropTypes.string,
  onClick: PropTypes.func
}
