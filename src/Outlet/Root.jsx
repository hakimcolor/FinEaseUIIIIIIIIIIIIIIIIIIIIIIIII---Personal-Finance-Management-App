import React from 'react'
import Header from '../Componentes/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../Componentes/Footer'

const Root = () => {
  return (
    <div>
      <Header></Header>
      <br /><br /><br /><br /><br />
      <Outlet></Outlet><br /><br />
      <Footer></Footer>
    </div>
  )
}

export default Root
