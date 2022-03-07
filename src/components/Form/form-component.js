/* eslint-disable multiline-ternary */
import React, { useState } from 'react'
import './form.scss'
import Button from '../../components/Button/button-component'

export default function Form() {
  const [loginState, setLoginState] = useState({
    current: 'register',
    title: 'Iniciar Sesion'
  })
  const changeForm = (e) => {
    e.target.innerHTML === 'Iniciar Sesion'
      ? setLoginState({ current: 'login', title: 'Registarme' })
      : setLoginState({ current: 'register', title: 'Iniciar Sesion' })
  }
  return (
    <div className="form__container">
      <form
        style={
          loginState.current === 'login' ? { display: 'none' } : { display: '' }
        }
      >
        <div className="text__box" style={{ gap: '0px' }}>
          <h1 className="anim-typewriter" style={{ padding: '0 5px' }}>
            Regis
          </h1>
          <h1>trarme</h1>
        </div>
        <input type="text" placeholder="Nombre Completo" />
        <input type="text" placeholder="Correo Electronico" />
        <input type="text" placeholder="Contraseña" />
        <input type="text" placeholder="Confirmar Contraseña" />
        <Button type="primary" size="medium" width="150px">
          Registrarme
        </Button>
      </form>
      <form
        style={
          loginState.current === 'register'
            ? { display: 'none' }
            : { display: '' }
        }
      >
        <div className="text__box">
          <h1 className="anim-typewriter">Iniciar</h1>
          <h1>Sesion</h1>
        </div>
        <input type="text" placeholder="Correo Electronico" />
        <input type="text" placeholder="Contraseña" />
        <Button type="primary" size="medium" width="150px">
          Iniciar Sesion
        </Button>
      </form>
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
