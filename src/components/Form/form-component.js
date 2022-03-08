/* eslint-disable multiline-ternary */
import React, { useState } from 'react'
import './form.scss'
import Button from '../../components/Button/button-component'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { login } from '../../features/userSlice'
import { provider } from '../../firebase/firebase'
import GoogleIcon from '@mui/icons-material/Google'
import Swal from 'sweetalert2'

export default function Form() {
  const auth = getAuth()
  const [loginState, setLoginState] = useState({
    current: 'login',
    title: 'Registrarme'
  })
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setconfirmPassword] = useState('')

  const dispatch = useDispatch()

  const changeForm = (e) => {
    setEmail('')
    setFullname('')
    setPassword('')
    setconfirmPassword('')
    e.target.innerHTML === 'Iniciar Sesion'
      ? setLoginState({ current: 'login', title: 'Registarme' })
      : setLoginState({ current: 'register', title: 'Iniciar Sesion' })
  }

  const Register = (e) => {
    e.preventDefault()
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

  const Login = (e) => {
    e.preventDefault()
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

  const GoogleLogin = () => {
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

  return (
    <div className="form__container">
      {/* Register Form */}
      <div
        style={
          loginState.current === 'login' ? { display: 'none' } : { display: '' }
        }
        className="form__content"
      >
        <div className="text__box" style={{ gap: '0px' }}>
          <h1 className="anim-typewriter" style={{ padding: '0 5px' }}>
            Regis
          </h1>
          <h1>trarme</h1>
        </div>
        <input
          type="text"
          placeholder="Nombre Completo (opcional)"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
        <input
          type="email"
          placeholder="Correo Electronico"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirmar Contraseña"
          required
          value={confirmpassword}
          onChange={(e) => setconfirmPassword(e.target.value)}
        />
        <Button type="primary" size="medium" width="150px" onClick={Register}>
          Registrarme
        </Button>
      </div>
      {/* Login Form */}
      <div
        style={
          loginState.current === 'register'
            ? { display: 'none' }
            : { display: '' }
        }
        className="form__content"
      >
        <div className="text__box">
          <h1 className="anim-typewriter">Iniciar</h1>
          <h1>Sesion</h1>
        </div>
        <input
          type="email"
          placeholder="Correo Electronico"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="pwd"
          placeholder="Contraseña"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="login__buttons">
          <Button type="primary" size="medium" width="150px" onClick={Login}>
            Iniciar Sesion
          </Button>
          <span>
            Usa Google
            <GoogleIcon onClick={GoogleLogin} />
          </span>
        </div>
      </div>
      <div className="form__changeform">
        <span>
          {loginState.current === 'register'
            ? '¿ Ya tienes una cuenta ?'
            : '¿ No tienes una cuenta ?'}
        </span>
        <button onClick={changeForm}>{loginState.title}</button>
      </div>
    </div>
  )
}
