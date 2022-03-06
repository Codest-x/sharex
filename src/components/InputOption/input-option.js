import React from 'react'
import './input-option.scss'
import PropTypes from 'prop-types'

export default function InputOption({ Icon, title, color }) {
  return (
    <div className="inputOption">
      <Icon style={{ color: color }} />
      <h4>{title}</h4>
    </div>
  )
}

InputOption.propTypes = {
  Icon: PropTypes.element,
  title: PropTypes.string,
  color: PropTypes.string
}
