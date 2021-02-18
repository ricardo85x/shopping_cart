import React, { useState } from 'react'
import Header from './components/Header'
import Products from './components/Products'

import './App.css'

function App() {

  const [products, setProducts] = useState(['prod 1', 'prod 2', 'prod 3'])
  const [vouchers, setVouchers] = useState([])

  
  return (
    <>
      <Header />
      <hr/>
      <Products prods={products}/>
     

    </>
  )
}

export default App;