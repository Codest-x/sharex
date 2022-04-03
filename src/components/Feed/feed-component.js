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
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { selectUser } from '../../features/userSlice'
import SendPost from './actions/SendPost'
import { ImageGrid, ImageItem } from '../ImageGrid/image-grid'

export default function Feed() {
  const [posts, setPosts] = useState([])
  const [input, setInput] = useState('')
  const [images, setImages] = useState([])
  const user = useSelector(selectUser)

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

  const UploadImage = (files) => {
    const storage = getStorage()

    Array.from(files).forEach(async (file) => {
      const imageRef = ref(storage, `/Images/${file.name}`)

      const metadata = {
        contentType: file.type
      }

      await uploadBytes(imageRef, file, metadata).then(
        ({ ref: { name } }) => {
          getDownloadURL(imageRef).then((downloadURL) => {
            setImages((prevState) => [
              ...prevState,
              { title: name, imageURL: downloadURL }
            ])
          })
        },
        (err) => {
          console.log(err)
        }
      )
    })
  }

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
            <button
              onClick={() => {
                SendPost(input, user)
                setInput('')
              }}
              type="submit"
              className=""
            >
              Send
            </button>
          </form>
        </div>
        {images ? (
          <ImageGrid images={images}>
            {images.map(({ imageURL, title }) => (
              <ImageItem
                key={imageURL}
                title={title}
                imageURL={imageURL}
                inputOption={true}
                onClick={() =>
                  setImages(images.filter((item) => item.title !== title))
                }
              />
            ))}
          </ImageGrid>
        ) : null}
        <div className="feed__inputOptions">
          <InputOption
            onClick={(e) => {
              e.preventDefault()
              SendPost(input, user, images)
              setInput('')
              setImages([])
            }}
            title="Enviar"
            Icon={SendIcon}
            color="red"
          />
          <div>
            <input
              type="file"
              accept="image/png, image/gif, image/jpeg, image/webp"
              id="imgupload"
              style={{ display: 'none' }}
              multiple
              onChange={({ target: { files } }) => {
                UploadImage(files)
              }}
            />
            <InputOption
              title="Imagen"
              Icon={ImageIcon}
              color="#0074FF"
              onClick={() => {
                document.getElementById('imgupload').click()
              }}
            />
          </div>
          {/* <InputOption title="Video" Icon={VideoLibraryIcon} color="orange" />
          <InputOption title="Articulo" Icon={ArticleIcon} color="green" /> */}
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
              comments,
              images
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
              images={images}
            />
          )
        )}
      </FlipMove>
    </div>
  )
}
