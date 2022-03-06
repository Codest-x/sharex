import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './button.scss'

export default function Button({ children, type, path, size, style = '' }) {
  return (
    <>
      {path ? (
        <Link
          to={path}
          className={`button ${type || 'primary'} ${path ? 'link' : ''} ${
            size || 'medium'
          } ${style} `}
        >
          {children}
        </Link>
      ) : (
        <button
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
  children: PropTypes.element,
  type: PropTypes.string,
  path: PropTypes.string,
  size: PropTypes.string,
  style: PropTypes.string
}
