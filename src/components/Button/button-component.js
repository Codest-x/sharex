import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './button.scss'

export default function Button({
  children,
  type,
  path,
  size,
  style = '',
  onClick,
  width
}) {
  return (
    <>
      {path ? (
        <Link
          to={path}
          style={width ? { width: width } : { width: '80px' }}
          className={`button ${type || 'primary'} ${path ? 'link' : ''} ${
            size || 'medium'
          } ${style} `}
        >
          {children}
        </Link>
      ) : (
        <button
          onClick={onClick}
          style={width ? { width: width } : { width: '80px' }}
          className={`button ${type} ${path ? 'link' : ''} ${
            size || 'medium'
          } ${style} `}
        >
          {children}
        </button>
      )}
    </>
  )
}

Button.propTypes = {
  children: PropTypes.string,
  type: PropTypes.string,
  path: PropTypes.string,
  size: PropTypes.string,
  style: PropTypes.string,
  onClick: PropTypes.func,
  width: PropTypes.string
}
