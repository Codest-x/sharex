import React from 'react'
import './input-option.scss'
import PropTypes from 'prop-types'

export default function InputOption({ Icon, title, color, onClick, active }) {
  return (
    <div
      className="inputOption"
      onClick={onClick}
      style={active ? { color: active } : { color: 'black' }}
    >
      <Icon style={{ color: color }} />
      <h4>{title}</h4>
    </div>
  )
}

InputOption.propTypes = {
  Icon: PropTypes.object,
  title: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  active: PropTypes.string
}
