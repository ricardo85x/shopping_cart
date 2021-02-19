import React from 'react'

export default function Products({prods}) {
  return (
    <div className="productList" >
      {
        prods.map(prod => (

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
              <button>Buy</button>
            </div>
            
          </div>

        ))
      }
    </div>)
}
