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
  const [prices, setPrices] = useState( {
    "subtotal": 0,
    "shipping": 0,
    "discount": 0,
    "total": 0,
    "weight": 0
  })

  const [apiError, setApiError] = useState(1)


 
  // load product and vouchers from api
  useEffect(
    () => {
      api.get('products.json')
      
      .then(response => {
        console.log('response', response)
        if (response.status == 200){
          setProducts(response.data.products.filter((item) => (isNaN(item.available) == false && isNaN(item.price) == false)))
        }
        
        api.get('vouchers.json').then(response => {
          console.log('response vouchers', response)
          if (response.status == 200){
            setVouchers(response.data.vouchers)
          }
        }).catch(error => {
          console.log("Error 3", error)
          setApiError(0)
        })


      }).catch(error => {
        console.log("Errr 3", error)
        setApiError(0)
      })

      

    }, 
    [apiError] // array watchers
  )

  async function handleSubtotal() {

    if (cart.length > 0){
      let subtotal = 0;
      if (cart.length > 1){

        subtotal = cart.map(
          item => item.price * item.quantity)
          .reduce((prev, next) => {
            return prev + next ; 
           })
      } else {
        subtotal = cart[0].price * cart[0].quantity
      }

      setPrices({...prices, subtotal: subtotal })
     

    } else {
      console.log("DEB 3")
      setPrices({
        "subtotal": 0,
        "shipping": 0,
        "discount": 0,
        "total": 0,
        "weight":0
      })

    }
  }

  function handleShipping() {



    if (prices.subtotal > 0){

      let weight = 0

      for (var item of cart) {
        console.log(item);
        weight = weight + item.quantity
      }

      setPrices({...prices, weight: weight })

      if (prices.subtotal > 400) {
        setPrices({...prices, shipping: 0 })
      } else {

        if (weight <= 10){
          setPrices({...prices, shipping: 30 })

        } else {
          setPrices({...prices, shipping: 30 + Math.floor((weight -10) /5) * 7 })

        }
      }




      console.log(weight)


    }
  }

  function handleVourcher() {


  }

  // update price
  useEffect( () => {
    handleSubtotal()
  }, [cart])

  useEffect( () => {
    handleShipping()    
  }, [prices.subtotal])

  useEffect( () => {
    handleVourcher()    
  }, [prices.shipping])

  





  









  
  return (
    <div className="container">
      <Header />
      
      <div className="main">

        { 
          apiError === 1 && <>
            <Products products={products} setProducts={setProducts} cart={cart} setCart={setCart}/>
            <Cart 
              products={products} setProducts={setProducts} cart={cart} setCart={setCart} 
              prices={prices}
            />
          </>
        }

        { 
          apiError !== 1 && (
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