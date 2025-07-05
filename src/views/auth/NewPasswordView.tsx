import NewPasswordToken from '@/components/auth/NewPasswordToken'
import NewPasswordForm from '@/components/auth/NewPasswordForm'

import React, { useState } from 'react'
import type { ConfirmToken } from '@/types/index'

export default function NewPasswordView() {
  const [token, setToken] = useState<ConfirmToken['token']>('')
  const [isValidToken, setIsValidToken] = useState(false)

  return (
    <>
      <h1 className="text-3xl font-semibold text-black">Reestablecer Password</h1>
      <p className="text-xl font-normal text-black mt-1">
        Ingresa el codigo que recibiste por email
      </p>

      {!isValidToken ? <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken} /> : 
      <NewPasswordForm token={token} /> }

    </>
  )
}
