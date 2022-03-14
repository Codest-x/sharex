import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase/firebase'

const addComment = async(e, user, commentInput, comments, postId) => {
  e.preventDefault()
  if (!commentInput) return
  await updateDoc(doc(db, 'posts', postId), {
    comments: [
      ...comments,
      {
        displayName: user.displayName,
        photoUrl: user.photoUrl,
        comment: commentInput
      }
    ]
  })
}

export default addComment
