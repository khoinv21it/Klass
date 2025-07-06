import React from 'react'
import ExerciseAfternoon from './ExerciseAfternoon'
import Calculator from './HomeWork/Calculator'
import RegistrationForm from './HomeWork/RegistrationForm'
import App from './HomeWork/ShoppingCart/App'

type Props = {}

export default function Day05({}: Props) {
  return (
    <div>
      {/* <ExerciseAfternoon /> */}
      <Calculator />
      <RegistrationForm />
      <App />
    </div>
  )
}