/* eslint-disable multiline-ternary */
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { login } from '../../features/userSlice'
import Swal from 'sweetalert2'

const Login = (email, password, dispatch) => {
  const auth = getAuth()
  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
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
        case 'auth/user-not-found':
          title = 'No existe el usuario'
          break
        case 'auth/wrong-password':
          title = 'Contraseña Incorrecta'
          break
        case 'auth/invalid-email':
          title = 'Correo Incorrecto'
          break
        default:
          title = 'Hubo un error'
          break
      }
      Toast.fire({
        icon: 'error',
        title: title
      })
    })
}

export default Login
