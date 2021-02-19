import React from 'react'

export default function Products({products,setProducts, cart, setCart}) {



  function handleAddCart(prod){

    const cart_item = cart.find((item) => item.id == prod.id);
    if (!cart_item) {

      if (prod.available > 0){
        setCart([...cart, {
          "id": prod.id,
          "name": prod.name, 
          "price": prod.price,
          "quantity": 1
        }])
  
        setProducts(products.map(x => (x.id === prod.id ? { ...x, 
          "available": x.available -1
        } : x)))

      }
     

      console.log("Lado 1")
    } else {
      console.log("Lado 2")

      if (prod.available > 0){

        setCart(cart.map(x => (x.id === prod.id ? { ...x, 
          "quantity": x.quantity + 1
        } : x)))

        setProducts(products.map(x => (x.id === prod.id ? { ...x, 
          "available": x.available -1
        } : x)))

      } 
    
      

    }

    
  }


  return (
    <div className="productList" >
      {
        products.map(prod => (

          <div className="product" key={prod.id}>
            
            <div className="image"></div>
            <div className="body">
              <div className="title">
                {prod.name}
              </div>
              <div className="price">
                $ {prod.price} - {prod.available} left
              </div>
            </div>
            <div className="footer">
              <button onClick={() => handleAddCart(prod)}>Buy</button>
            </div>
            
          </div>

        ))
      }
    </div>)
}
