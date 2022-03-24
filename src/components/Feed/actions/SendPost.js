import {
  collection,
  addDoc,
  serverTimestamp
} from 'firebase/firestore'
import { db } from '../../../firebase/firebase'

const SendPost = (input, user, images) => {
  const addData = async() => {
    if (!input) return
    try {
      await addDoc(collection(db, 'posts'), {
        name: user.user.displayName,
        message: input,
        description: user.user.email,
        photoUrl: user.user.photoUrl || '',
        usersLikes: [],
        images: images,
        usersShares: 0,
        comments: [],
        timestamp: serverTimestamp()
      })
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  addData()
}

export default SendPost
