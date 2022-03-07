/* eslint-disable multiline-ternary */
import React, { useState } from 'react'
import './form.scss'
import Button from '../../components/Button/button-component'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  getAuth
} from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { login } from '../../features/userSlice'

export default function Form() {
  const auth = getAuth()
  const [loginState, setLoginState] = useState({
    current: 'register',
    title: 'Iniciar Sesion'
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
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(auth.currentUser, {
          displayName: fullname,
          photoURL: ''
        })
          .then(() => {
            dispatch(
              login({
                email: userCredential.user.email,
                uid: userCredential.user.uid,
                displayName: fullname,
                photoURL: ''
              })
            )
          })
          .catch((error) => {
            console.log(error)
          })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const Login = (e) => {
    e.preventDefault()
    console.log(email, password)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        dispatch(
          login({
            email: userCredential.user.email,
            uid: userCredential.user.uid,
            displayName: fullname,
            profileUrl: userCredential.user.photoURL
          })
        )
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  return (
    <div className="form__container">
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
          type="text"
          name="password"
          placeholder="Contraseña"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Confirmar Contraseña"
          required
          value={confirmpassword}
          onChange={(e) => setconfirmPassword(e.target.value)}
        />
        <Button type="primary" size="medium" width="150px" onClick={Register}>
          Registrarme
        </Button>
      </div>
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
          type="text"
          name="pwd"
          placeholder="Contraseña"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="primary" size="medium" width="150px" onClick={Login}>
          Iniciar Sesion
        </Button>
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
