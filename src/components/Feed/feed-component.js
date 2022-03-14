/* eslint-disable space-before-function-paren */
import React, { useEffect, useState } from 'react'
import CreateIcon from '@mui/icons-material/Create'
import ImageIcon from '@mui/icons-material/Image'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import ArticleIcon from '@mui/icons-material/Article'
import SendIcon from '@mui/icons-material/Send'
import './feed.scss'
import InputOption from '../InputOption/input-option'
import Post from '../Post/post-component'
import FlipMove from 'react-flip-move'
import { db } from '../../firebase/firebase'
import { useSelector } from 'react-redux'
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  orderBy,
  query
} from 'firebase/firestore'
import { selectUser } from '../../features/userSlice'

export default function Feed() {
  const [posts, setPosts] = useState([])
  const [input, setInput] = useState('')
  const user = useSelector(selectUser)

  const sendPost = (e) => {
    e.preventDefault()
    const addData = async () => {
      if (!input) return
      try {
        await addDoc(collection(db, 'posts'), {
          name: user.user.displayName,
          message: input,
          description: user.user.email,
          photoUrl: user.user.photoUrl || '',
          usersLikes: [],
          usersShares: 0,
          comments: [],
          timestamp: serverTimestamp()
        })
        setInput('')
      } catch (e) {
        console.error('Error adding document: ', e)
      }
    }

    addData()
  }

  useEffect(() => {
    onSnapshot(
      query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
      (snapshot) => {
        // eslint-disable-next-line array-callback-return
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data()
          }))
        )
      }
    )
  }, [])

  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          {/* <CreateIcon /> */}
          <form>
            <textarea
              type="text"
              className=""
              value={input}
              onChange={({ target }) => {
                setInput(target.value)
                target.style.height = '20px'
                target.style.height = target.scrollHeight + 'px'
              }}
            />
            <button onClick={sendPost} type="submit" className="">
              Send
            </button>
          </form>
        </div>
        <div className="feed__inputOptions">
          <InputOption
            onClick={sendPost}
            title="Enviar"
            Icon={SendIcon}
            color="red"
          />
          <InputOption title="Foto" Icon={ImageIcon} color="#0074FF" />
          <InputOption title="Video" Icon={VideoLibraryIcon} color="orange" />
          <InputOption title="Articulo" Icon={ArticleIcon} color="green" />
          {/* <InputOption title="Evento" Icon={EventIcon} color="green" /> */}
        </div>
      </div>
      <FlipMove>
        {posts.map(
          ({
            id,
            data: {
              name,
              description,
              message,
              photoUrl,
              usersLikes,
              usersShares,
              comments
            }
          }) => (
            <Post
              key={id}
              postId={id}
              name={name}
              description={description}
              photoUrl={photoUrl}
              message={message}
              usersLikes={usersLikes}
              usersShares={usersShares}
              comments={comments}
            />
          )
        )}
      </FlipMove>
    </div>
  )
}
