/* eslint-disable no-unused-vars */
import React from 'react'
import './header-option.scss'
import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'

export default function HeaderOption({ Icon, title, avatar, path }) {
  const currentPath = useLocation()
  return (
    <>
      {path ? (
        <Link
          to={path}
          className="headerOption"
          style={
            currentPath.pathname === path ? { color: 'red' } : { color: '' }
          }
        >
          {avatar && <Avatar className="headerOption__icon" src={avatar} />}
          {Icon && <Icon className="headerOption__icon" />}
          <h3 className="headerOption__title">{title}</h3>
        </Link>
      ) : (
        <div
          className="headerOption"
          style={
            currentPath.pathname === path ? { color: 'red' } : { color: '' }
          }
        >
          {avatar && <Avatar className="headerOption__icon" src={avatar} />}
          {Icon && <Icon className="headerOption__icon" />}
          <h3 className="headerOption__title">{title}</h3>
        </div>
      )}
    </>
  )
}

HeaderOption.propTypes = {
  title: PropTypes.string,
  avatar: PropTypes.string,
  Icon: PropTypes.element,
  path: PropTypes.string,
  active: PropTypes.string
}
