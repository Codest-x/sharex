import React from 'react'
import './login.scss'
import LoginBg from '../../assets/login-bg.mp4'
import Form from '../../components/Form/form-component'

export default function Login() {
  return (
    <div className="login__container">
      <div className="login__left">
        <video
          src={LoginBg}
          type="video/mp4"
          muted
          autoPlay
          loop
          className="form__video"
        />
        <div className="video__bg" />
        <div className="text__box">
          <h1 className="anim-typewriter">BOOK</h1>
          <h1>EX</h1>
        </div>
      </div>
      <div className="login__right">
        <Form/>
      </div>
    </div>
  )
}
