import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification
} from 'firebase/auth'
import Swal from 'sweetalert2'
import { login } from '../../features/userSlice'
import { DataValidation } from './data-validation'

const Register = (fullname, email, password, confirmpassword, dispatch) => {
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
  if (DataValidation(email, password)) {
    if (!password || !confirmpassword) {
      Toast.fire({
        icon: 'error',
        title: 'Los campos de contraseña deben estar llenos'
      })
    } else {
      if (password !== confirmpassword) {
        Toast.fire({
          icon: 'error',
          title: 'No coinciden las contraseñas'
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
                sendEmailVerification(userCredential.user).then(() => {
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
            Toast.fire({
              icon: 'error',
              title: title
            })
          })
      }
    }
  } else {
    return null
  }
}

export default Register
