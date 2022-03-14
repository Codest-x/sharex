/* eslint-disable space-before-function-paren */
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase/firebase'

const removeItemOnce = (arr, value) => {
  const index = arr.indexOf(value)
  if (index > -1) {
    arr.splice(index, 1)
  }
  return arr
}

const addLiketoPost = async (user, usersLikes, postId) => {
  if (usersLikes.includes(user.uid)) {
    await updateDoc(doc(db, 'posts', postId), {
      usersLikes: removeItemOnce(usersLikes, user.uid)
    })
  } else {
    await updateDoc(doc(db, 'posts', postId), {
      usersLikes: usersLikes.concat(user.uid)
    })
  }
}

export default addLiketoPost
