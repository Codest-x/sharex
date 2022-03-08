import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { provider } from '../firebase'
import { login } from '../../features/userSlice'

const GoogleLogin = (dispatch) => {
  const auth = getAuth()
  signInWithPopup(auth, provider)
    .then((result) => {
      /* const credential = GoogleAuthProvider.credentialFromResult(result) */
      const user = result.user

      dispatch(
        login({
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          photoUrl: user.photoURL
        })
      )
    })
    .catch((error) => {
      /* const credential = GoogleAuthProvider.credentialFromError(error) */
      console.log(error)
      // ...
    })
}

export default GoogleLogin
