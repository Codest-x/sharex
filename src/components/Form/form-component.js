/* eslint-disable multiline-ternary */
import React, { useState } from 'react'
import './form.scss'
import Button from '../../components/Button/button-component'
import { useDispatch } from 'react-redux'
import GoogleIcon from '@mui/icons-material/Google'
import { Login, Register, GoogleLogin } from '../../firebase/actions'

export default function Form() {
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
        <Button
          type="primary"
          size="medium"
          width="150px"
          onClick={(e) => {
            e.preventDefault()
            Register(fullname, email, password, confirmpassword, dispatch)
          }}
        >
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
          <Button
            type="primary"
            size="medium"
            width="150px"
            onClick={(e) => {
              e.preventDefault()
              Login(email, password, dispatch)
            }}
          >
            Iniciar Sesion
          </Button>
          <span>
            Usa Google
            <GoogleIcon onClick={() => GoogleLogin(dispatch)} />
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
