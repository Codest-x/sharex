import Swal from 'sweetalert2'
import validator from 'email-validator'

const DataValidation = (email, password) => {
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
  if (validator.validate(email)) {
    if (!password) {
      Toast.fire({
        icon: 'error',
        title: 'Debe introducir una contraseña'
      })
    } else {
      if (password.length >= 8) {
        if (
          password.match(/[a-z]/g) &&
          password.match(/[A-Z]/g) &&
          password.match(/[0-9]/)
        ) {
          return true
        } else {
          Toast.fire({
            icon: 'error',
            title: 'La contraseña no cumple con los requisitos'
          })
        }
      } else {
        Toast.fire({
          icon: 'error',
          title:
            'La contraseña debe tener minimo 8 caracteres incluyendo minimo 1 mayuscula y 1 numero'
        })
      }
    }
  } else {
    Toast.fire({
      icon: 'error',
      title: 'Email Incorrecto'
    })
    return false
  }
}

export { DataValidation }
