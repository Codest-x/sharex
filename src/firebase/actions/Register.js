import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth'
import Swal from 'sweetalert2'
import { login } from '../../features/userSlice'

const Register = (fullname, email, password, confirmpassword, dispatch) => {
  const auth = getAuth()
  if (!password || !confirmpassword) {
    Swal.fire({
      position: 'top',
      icon: 'error',
      title: 'Los campos de contraseña deben estar llenos',
      showConfirmButton: false,
      timer: 2000
    })
  } else {
    if (password !== confirmpassword) {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Las contraseñas deben coincidir',
        showConfirmButton: false,
        timer: 2000
      })
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          updateProfile(userCredential.user, {
            displayName:
              fullname ||
              'User-' +
                userCredential.user.uid.slice(0, 3) +
                userCredential.user.uid.slice(-3),
            photoUrl: ''
          })
            .then(() => {
              dispatch(
                login({
                  email: userCredential.user.email,
                  uid: userCredential.user.uid,
                  displayName:
                    fullname ||
                    'User-' +
                      userCredential.user.uid.slice(0, 3) +
                      userCredential.user.uid.slice(-3),
                  photoUrl: ''
                })
              )
            })
            .catch((error) => {
              Swal.fire({
                position: 'top',
                icon: 'error',
                title: error.message,
                showConfirmButton: false,
                timer: 1500
              })
            })
        })
        .catch((error) => {
          const errorCode = error.code
          let title
          switch (errorCode) {
            case 'auth/invalid-email':
              title = 'Invalid Email'
              break
            case 'auth/weak-password':
              title = 'Minimun password character 6'
              break
            case 'auth/email-already-in-use':
              title = 'Email already in use'
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
            timer: 2000
          })
        })
    }
  }
}

export default Register
