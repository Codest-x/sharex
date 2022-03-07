/* eslint-disable space-before-function-paren */
import React, { useEffect, useState } from 'react'
import CreateIcon from '@mui/icons-material/Create'
import ImageIcon from '@mui/icons-material/Image'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import ArticleIcon from '@mui/icons-material/Article'
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
      try {
        await addDoc(collection(db, 'posts'), {
          name: user.user.displayName,
          message: input,
          description: 'this is a test',
          photoUrl: user.user.photoUrl || '',
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
          <CreateIcon />
          <form>
            <input
              type="text"
              className=""
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={sendPost} type="submit" className="">
              Send
            </button>
          </form>
        </div>
        <div className="feed__inputOptions">
          <InputOption title="Foto" Icon={ImageIcon} color="red" />
          <InputOption title="Video" Icon={VideoLibraryIcon} color="orange" />
          <InputOption title="Articulo" Icon={ArticleIcon} color="green" />
          {/* <InputOption title="Evento" Icon={EventIcon} color="green" /> */}
        </div>
      </div>
      <FlipMove>
        {posts.map(({ id, data: { name, description, message, photoUrl } }) => (
          <Post
            key={id}
            name={name}
            description={description}
            photoUrl={photoUrl}
            message={message}
          />
        ))}
      </FlipMove>
    </div>
  )
}
