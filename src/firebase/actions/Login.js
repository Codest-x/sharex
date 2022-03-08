import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { login } from '../../features/userSlice'
import Swal from 'sweetalert2'

const Login = (email, password, dispatch) => {
  const auth = getAuth()
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      dispatch(
        login({
          email: userCredential.user.email,
          uid: userCredential.user.uid,
          displayName: userCredential.user.displayName,
          photoUrl: userCredential.user.photoURL
        })
      )
    })
    .catch((error) => {
      const errorCode = error.code
      let title
      switch (errorCode) {
        case 'auth/wrong-password':
          title = 'Contraseña Incorrecta'
          break
        case 'auth/invalid-email':
          title = 'Invalid Email'
          break
        default:
          title = 'Hubo un error'
          break
      }
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: title,
        showConfirmButton: false,
        timer: 1500
      })
    })
}

export default Login
