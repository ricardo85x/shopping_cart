import React from 'react'

export default function Cart({products,setProducts, cart, setCart}) {


  function handleAdd(){

  }

  function handleRemove(){

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
              <button>+</button>
              <button>-</button>
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
        <div>$10.99</div>
      </div>

      <div className="cart-item">
        <div>Shipping</div>
        <div>$10.99</div>
      </div>

      <div className="cart-item">
        <div>Discount</div>
        <div>$10.99</div>
      </div>
  
      <div className="cart-item total">
        <div>Total</div>
        <div>$10.99</div>
      </div>



      <div className="checkout">
          <button>Checkout</button>
      </div>

      
    </div>)
}
