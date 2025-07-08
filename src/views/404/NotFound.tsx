import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <>
        <h1 className='font-black text-center text-4xl text-black'>Pagina no Encontrada</h1>
        <p className='mt-10 text-center text-black'>Tal vez quieras volver a {' '}<Link className='text-black hover:text-blue-900' to={'/'}>Proyectos</Link></p>
    </>
  )
}
