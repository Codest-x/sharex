import React from 'react'
import './message.scss'
import PropTypes from 'prop-types'
import Swal from 'sweetalert2'
import { sendEmailVerification, getAuth } from 'firebase/auth'

export default function VerificationMessage({ email }) {
  const auth = getAuth()
  return (
    <div className="message">
      <p>
        Tu correo <strong>{email + ' '}</strong>no ha sido verificado
      </p>
      <span
        onClick={() => {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Correo Enviado',
                showConfirmButton: false,
                timer: 1500
              })
            })
            .catch((error) => {
              error.code === 'auth/too-many-requests' &&
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title:
                    'Demasiados intentos, intenta mas tarde o mira tu bandeja de SPAM',
                  showConfirmButton: false,
                  timer: 3000
                })
            })
        }}
      >
        (Reenviar Correo)
      </span>
    </div>
  )
}

VerificationMessage.propTypes = {
  email: PropTypes.string
}
