import React from 'react'
import './input-option.scss'
import PropTypes from 'prop-types'

export default function InputOption({ Icon, title, color, onClick }) {
  return (
    <div className="inputOption" onClick={onClick}>
      <Icon style={{ color: color }} />
      <h4>{title}</h4>
    </div>
  )
}

InputOption.propTypes = {
  Icon: PropTypes.object,
  title: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func
}
