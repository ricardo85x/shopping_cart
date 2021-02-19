import React from 'react'

export default function Cart({products,setProducts, cart, setCart, prices}) {


  function handleAdd(item){

    
    const current_prod = products.find((prod) => prod.id == item.id)

    if (current_prod.available > 0) {

      setCart(cart.map(x => (x.id === item.id ? { ...x, 
        "quantity": x.quantity + 1
      } : x)))
  
      setProducts(products.map(x => (x.id === item.id ? { ...x, 
        "available": x.available -1
      } : x)))

    }


  }

  function handleRemove(item){

   
    if (item.quantity > 1) {
      setCart(cart.map(x => (x.id === item.id ? { ...x, 
        "quantity": x.quantity - 1
      } : x)))
    } else {

      setCart(cart.filter((x) => x.id != item.id))

    }
   
    setProducts(products.map(x => (x.id === item.id ? { ...x, 
      "available": x.available +1
    } : x)))

  }


  return (
    <div className="cartList" >
      <div className="header">
        <h3>Shopping Cart</h3>
      </div>

      <div className="products">

      {
        cart.map(item => (

          <div className="cart" key={item.id}>

            <div className="image"></div>


            <div className="body">
           
              <div className="title">{item.name}</div>
              <div className="info">
                
                <div>Quantity: {item.quantity}</div>
                <div>$ {item.price}</div>
               
              </div>
            </div>

            <div className="buttons">
              <button onClick={() => handleAdd(item)}>+</button>
              <button onClick={() => handleRemove(item)}>-</button>
            </div>
            
          </div>

        ))
      }

      </div>

      <div className="cupom">

        <input type="text" name="cupom" placeholder="Discont Code"/>
        <button> APPLY </button>
      </div>

      <div className="cart-item">
        <div>Subtotal</div>
        <div>$ {prices.subtotal}</div>
      </div>

      <div className="cart-item">
        <div>Shipping</div>
        <div>$ {prices.shipping}</div>
      </div>

      <div className="cart-item">
        <div>Discount</div>
        <div>$ {prices.discount}</div>
      </div>
  
      <div className="cart-item total">
        <div>Total</div>
        <div>$ {prices.total}</div>
      </div>



      <div className="checkout">
          <button>Checkout</button>
      </div>

      
    </div>)
}
