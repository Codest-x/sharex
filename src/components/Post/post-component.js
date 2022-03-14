/* eslint-disable multiline-ternary */
/* eslint-disable react/display-name */
import React, { forwardRef, useState } from 'react'
import './post.scss'
import PropTypes from 'prop-types'
import Avatar from '@mui/material/Avatar'
import InputOption from '../InputOption/input-option'
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
      comments
    },
    ref
  ) => {
    const { user } = useSelector(selectUser)
    const [showCommentInput, setShowCommentInput] = useState(false)
    const [commentInput, setCommentInput] = useState('')

    return (
      <>
        <div ref={ref} className="post">
          <div className="post__header">
            <Avatar src={photoUrl}>{name[0]}</Avatar>
            <div className="post__info">
              <h2>{name}</h2>
              <p>{description}</p>
            </div>
          </div>
          <div className="post__body">
            <p>{message}</p>
          </div>
          <div className="post__reactions">
            <span>{`${usersLikes.length} Likes`}</span>
            <div>
              <span className="postReactions__comments">{`${comments.length} Comentarios`}</span>
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
            <InputOption Icon={ShareOutlinedIcon} title="Compartir" />
            {/* <InputOption Icon={SendOutlinedIcon} title="Enviar" /> */}
          </div>
        </div>
        <Fade top when={showCommentInput}>
          <div
            className="postInput__comment"
            style={showCommentInput ? { display: 'flex' } : { display: 'none' }}
          >
            <Avatar src={user.photoUrl}>{user?.displayName[0]}</Avatar>
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
  comments: PropTypes.array
}
