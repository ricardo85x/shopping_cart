import React from 'react'

export default function Products({prods}) {
  return (
    <div >
      <ul>
        {prods.map(prod => <li key={prod.id}>{prod.name}</li>)}
      </ul>
    </div>)
}
