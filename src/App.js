import React, { useState, useEffect } from 'react'
import api from './services/api'

import Header from './components/Header'
import Products from './components/Products'

import './App.css'

function App() {

  const [products, setProducts] = useState([])
  const [vouchers, setVouchers] = useState([])


  useEffect(
    () => {
      api.get('products.json').then(response => {
        console.log('response', response)
        if (response.status == 200){
          setProducts(response.data.products)
        }
      })

      api.get('vouchers.json').then(response => {
        console.log('response vouchers', response)
        if (response.status == 200){
          setVouchers(response.data.vouchers)
        }
      })

    }, 
    [] // array watchers
  )

  
  return (
    <>
      <Header />
      <hr/>
      <Products prods={products}/>

    </>
  )
}

export default App;