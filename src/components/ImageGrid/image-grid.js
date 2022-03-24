import React from 'react'
import PropTypes from 'prop-types'
import ClearIcon from '@mui/icons-material/Clear'
import './image-grid.scss'

const ImageGrid = ({ images, children }) => {
  return (
    <div
      className={`grid__images ${images.length === 3 ? 'cols__3' : ''} ${
        images.length === 2 || images.length === 4 ? 'cols__2' : ''
      }`}
      style={{
        gridTemplateRows: `repeat(${Math.floor(images.length / 2)},1fr)`
      }}
    >
      {children}
    </div>
  )
}

const ImageItem = ({ imageURL, onClick, title, inputOption }) => {
  return (
    <div key={imageURL}>
      {inputOption ? <ClearIcon onClick={onClick} /> : null}
      <img src={imageURL} alt={title} />
    </div>
  )
}

export { ImageGrid, ImageItem }

ImageItem.propTypes = {
  imageURL: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string,
  inputOption: PropTypes.bool
}

ImageGrid.propTypes = {
  images: PropTypes.array,
  inputOption: PropTypes.bool,
  children: PropTypes.array
}
