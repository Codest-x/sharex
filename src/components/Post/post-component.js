/* eslint-disable multiline-ternary */
/* eslint-disable react/display-name */
import React, { forwardRef, useState } from 'react'
import './post.scss'
import PropTypes from 'prop-types'
import Avatar from '@mui/material/Avatar'
import InputOption from '../InputOption/input-option'
import { ImageGrid, ImageItem } from '../ImageGrid/image-grid'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
// import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import { addLiketoPost, addComment } from './actions'
import Fade from 'react-reveal/Fade'

const Post = forwardRef(
  (
    {
      postId,
      name,
      description,
      message,
      photoUrl,
      usersLikes,
      usersShares,
      comments,
      images
    },
    ref
  ) => {
    const { user } = useSelector(selectUser)
    const [showCommentInput, setShowCommentInput] = useState(false)
    const [commentInput, setCommentInput] = useState('')
    const [showComments, setShowComments] = useState(false)

    return (
      <>
        <div ref={ref} className="post">
          <div className="post__header">
            <Avatar alt={`${user?.displayName}-Avatar`} src={photoUrl}>
              {name[0]}
            </Avatar>
            <div className="post__info">
              <h2>{name}</h2>
              <p>{description}</p>
            </div>
          </div>
          <div className="post__body">
            <p>{message}</p>
          </div>
          {images ? (
            <ImageGrid images={images}>
              {images.map((image) => (
                <ImageItem
                  key={image.imageURL}
                  title={image.title}
                  imageURL={image.imageURL}
                />
              ))}
            </ImageGrid>
          ) : null}

          <div className="post__reactions">
            <span>{`${usersLikes.length} Likes`}</span>
            <div>
              <span
                onClick={() => {
                  comments.length > 0 && setShowComments(!showComments)
                }}
                className="postReactions__comments"
              >{`${comments.length} Comentarios`}</span>
              <span>{`${usersShares} Compartidas`}</span>
            </div>
          </div>

          <div className="post__buttons">
            <InputOption
              Icon={
                usersLikes.includes(user.uid)
                  ? ThumbUpIcon
                  : ThumbUpAltOutlinedIcon
              }
              title="Like"
              color={usersLikes.includes(user.uid) ? 'red' : ''}
              onClick={() => {
                addLiketoPost(user, usersLikes, postId)
              }}
              active={usersLikes.includes(user.uid) ? 'red' : ''}
            />
            <InputOption
              Icon={InsertCommentOutlinedIcon}
              onClick={() => {
                setShowCommentInput(!showCommentInput)
              }}
              title="Comentar"
            />
            {/* <InputOption Icon={ShareOutlinedIcon} title="Compartir" /> */}
            {/* <InputOption Icon={SendOutlinedIcon} title="Enviar" /> */}
          </div>
          <div
            className="post__comments"
            style={showComments ? { display: 'flex' } : { display: 'none' }}
          >
            {comments.map(({ displayName, comment, photoUrl, publishedAt }) => (
              <div key={`${publishedAt}-comment`} className="post__comment">
                <Avatar
                  sx={{ width: 30, height: 30 }}
                  alt={`${user?.displayName}-Avatar`}
                  src={photoUrl}
                >
                  {displayName[0]}
                </Avatar>
                <div className="postComment__body">
                  <span>{displayName}</span>
                  <p>{comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Fade top when={showCommentInput}>
          <div
            className="postInput__comment"
            style={showCommentInput ? { display: 'flex' } : { display: 'none' }}
          >
            <Avatar src={user.photoUrl} alt={`${user?.displayName}-Avatar`}>
              {user?.displayName[0]}
            </Avatar>
            <div>
              <form>
                <input
                  placeholder="Escribir comentario"
                  value={commentInput}
                  onChange={({ target }) => setCommentInput(target.value)}
                />
                <button
                  onClick={(e) => {
                    addComment(e, user, commentInput, comments, postId)
                    setCommentInput('')
                    setShowComments(!showComments)
                  }}
                  type="submit"
                  className=""
                >
                  Send Comment
                </button>
              </form>
            </div>
          </div>
        </Fade>
      </>
    )
  }
)

export default Post

Post.propTypes = {
  postId: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  message: PropTypes.string,
  photoUrl: PropTypes.string,
  usersLikes: PropTypes.array,
  usersShares: PropTypes.number,
  comments: PropTypes.array,
  images: PropTypes.array
}
