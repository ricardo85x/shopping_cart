import React, { useState, useEffect } from 'react'
import api from './services/api'

import Header from './components/Header'
import Products from './components/Products'
import Cart from './components/Cart'

import './App.css'

function App() {

  const [products, setProducts] = useState([])
  const [vouchers, setVouchers] = useState([])
  const [cart, setCart] = useState([])


  useEffect(
    () => {
      api.get('products.json')
      
      .then(response => {
        console.log('response', response)
        if (response.status == 200){
          setProducts(response.data.products)

          setCart(
            response.data.products.map(
              (x) => { 
                return { 
                  "id": x.id,
                  "name": x.name, 
                  "price": x.price,
                  "quantity": 1
                }
              }
            )
          )

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
    <div className="container">
      <Header />
      
      <div className="main">

        <Products prods={products}/>

        <Cart cart={cart} />
        

      </div>

    </div>
  )
}

export default App;