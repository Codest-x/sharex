import React from 'react'
import './widget.scss'
import InfoIcon from '@mui/icons-material/Info'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import PropTypes from 'prop-types'

export default function Widgets() {
  const NewsArticle = ({ heading, subtitle, url }) => {
    NewsArticle.propTypes = {
      heading: PropTypes.string.isRequired,
      subtitle: PropTypes.string.isRequired,
      url: PropTypes.string
    }
    return !url ? (
      <div className="widgets__article">
        <div className="widgets__articleLeft">
          <FiberManualRecordIcon />
        </div>
        <div className="widgets__articleRight">
          <h4>{heading}</h4>
          <p>{subtitle}</p>
        </div>
      </div>
    ) : (
      <a
        className="widgets__article"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="widgets__articleLeft">
          <FiberManualRecordIcon />
        </div>
        <div className="widgets__articleRight">
          <h4>{heading}</h4>
          <p>{subtitle}</p>
        </div>
      </a>
    )
  }
  return (
    <div className="widgets">
      <div className="widgets__header">
        <h2>ShareX Info</h2>
        <InfoIcon />
      </div>
      <NewsArticle
        heading="Watch My Portfolio"
        subtitle="Works, Projects, and Skills"
        url="https://codest.vercel.app"
      />
      <NewsArticle
        heading="Follow My Twitter"
        subtitle="@Codest_1x"
        url="https://twitter.com/Codest_1x"
      />
      <NewsArticle
        heading="Follow My Instagram"
        subtitle="@Codest.x"
        url="https://www.instagram.com/codest.x/"
      />
    </div>
  )
}
