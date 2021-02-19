import React, { useState, useEffect } from 'react'
import api from './services/api'

import Header from './components/Header'
import Products from './components/Products'
import Cart from './components/Cart'

import './App.css'

function App() {

  // define state variables
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

  const [discount, setDiscount] = useState({})

  // valide when api return error
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
    [apiError] 
  )


  // calculate subtotal value
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
      setPrices({
        "subtotal": 0,
        "shipping": 0,
        "discount": 0,
        "total": 0,
        "weight":0
      })

    }
  }

  // calculate shipping and total values
  function handleShipping() {

    if (prices.subtotal > 0){

      let weight = 0

      for (var item of cart) {
        console.log(item);
        weight = weight + item.quantity
      }

      setPrices({...prices, weight: weight })
      let current_shipping = 0


      if (prices.subtotal > 400) {

        setPrices({...prices, 
          shipping: current_shipping, 
          total: (prices.subtotal + current_shipping) - prices.discount
        })

      } else {

        if (weight <= 10){
          current_shipping = 30
          setPrices({...prices, 
            shipping: current_shipping, 
            total: (prices.subtotal + current_shipping) - prices.discount
          })

        } else {
          current_shipping = 30 + Math.floor((weight -10) /5) * 7
          setPrices({...prices, 
            shipping: current_shipping, 
            total: (prices.subtotal + current_shipping) - prices.discount
          })
        }
      }

    }
  }



  // calculate vourcher and total values
  function handleVourcher() {
    if (discount != {}){
      let current_discount = 0

      if (discount.type == "percentual") {

        current_discount = prices.subtotal * (discount.amount/100)
        setPrices({...prices, 
          discount: current_discount,
          total: (prices.subtotal + prices.shipping) - current_discount
        })
        
      } else  if (discount.type == "fixed") {

        // check if total is above the cupoum, if it is lower set the discount to total
        current_discount = 
          (prices.subtotal + prices.shipping) > discount.amount ? 
            discount.amount :  
            (prices.subtotal + prices.shipping)

        setPrices({...prices, 
          discount: current_discount,
          total: (prices.subtotal + prices.shipping) - current_discount
        })

      } else  if (discount.type == "shipping") {

        if (prices.subtotal >= discount.minValue ){

          current_discount = prices.shipping

          setPrices({...prices, 
            discount: current_discount,
            total: (prices.subtotal + prices.shipping) - current_discount
          })

        } else {
          current_discount = 0

          setPrices({...prices, 
            discount: current_discount,
            total: (prices.subtotal + prices.shipping) - current_discount
          })

        }

      }

    }
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
  }, [prices.subtotal, prices.shipping, discount])

  
  return (
    <div className="container">
      <Header />
      
      <div className="main">

        { 
          apiError === 1 && <>
            <Products products={products} setProducts={setProducts} cart={cart} setCart={setCart}/>
            <Cart 
              setDiscount={setDiscount} discount={discount} vouchers={vouchers}
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
