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

  const [apiError, setApiError] = useState(false)


  useEffect(
    () => {
      api.get('products.json')
      
      .then(response => {
        console.log('response', response)
        if (response.status == 200){
          setProducts(response.data.products)

          // setCart(
          //   response.data.products.map(
          //     (x) => { 
          //       return { 
          //         "id": x.id,
          //         "name": x.name, 
          //         "price": x.price,
          //         "quantity": 1
          //       }
          //     }
          //   )
          // )

        }
      }).catch(error => {
        console.log("Errr 3", error)
        setApiError(true)
      })
      

      api.get('vouchers.json').then(response => {
        console.log('response vouchers', response)
        if (response.status == 200){
          setVouchers(response.data.vouchers)
        }
      }).catch(error => {
        console.log("Error 3", error)
        setApiError(true)
      })

    }, 
    [] // array watchers
  )









  
  return (
    <div className="container">
      <Header />
      
      <div className="main">

        { apiError && <>
            <Products products={products} setProducts={setProducts} cart={cart} setCart={setCart}/>
            <Cart products={products} setProducts={setProducts} cart={cart} setCart={setCart} />
          </>
        }
        { !apiError && (
          <div>
            <h1>Oups something went wrong</h1>
            <h2>Wait some seconds and reload the page</h2>
          </div>
        )}

        

      </div>

    </div>
  )
}

export default App;