/* eslint-disable space-before-function-paren */
/* eslint-disable react/display-name */
import React, { forwardRef } from 'react'
import './post.scss'
import PropTypes from 'prop-types'
import Avatar from '@mui/material/Avatar'
import InputOption from '../InputOption/input-option'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebase'

const Post = forwardRef(
  ({ postId, name, description, message, photoUrl, reactions }, ref) => {
    const {
      user: { uid }
    } = useSelector(selectUser)
    const { usersLikes } = reactions

    const removeItemOnce = (arr, value) => {
      const index = arr.indexOf(value)
      if (index > -1) {
        arr.splice(index, 1)
      }
      return arr
    }

    const addLiketoPost = async () => {
      if (usersLikes.includes(uid)) {
        await updateDoc(doc(db, 'posts', postId), {
          reactions: {
            ...reactions,
            usersLikes: removeItemOnce(usersLikes, uid)
          }
        })
      } else {
        await updateDoc(doc(db, 'posts', postId), {
          reactions: {
            ...reactions,
            usersLikes: usersLikes.concat(uid)
          }
        })
      }
    }
    return (
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
          <span>{`Likes: ${reactions.usersLikes.length}`}</span>
          <div>
            <span>{`Comentarios: ${reactions.comments}`}</span>
            <span>{`Compartidas: ${reactions.shares}`}</span>
          </div>
        </div>

        <div className="post__buttons">
          <InputOption
            Icon={usersLikes.includes(uid) ? ThumbUpIcon : ThumbUpAltOutlinedIcon}
            title="Like"
            color={usersLikes.includes(uid) ? 'blue' : ''}
            onClick={addLiketoPost}
            active={usersLikes.includes(uid) ? 'blue' : ''}
          />
          <InputOption Icon={InsertCommentOutlinedIcon} title="Comentar" />
          <InputOption Icon={ShareOutlinedIcon} title="Compartir" />
          {/* <InputOption Icon={SendOutlinedIcon} title="Enviar" /> */}
        </div>
      </div>
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
  reactions: PropTypes.object
}
