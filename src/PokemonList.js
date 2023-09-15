import React from 'react'
import './App.css'
export default function PokemonList({pokemon}) {
  return (
    <div className = "main">
        {pokemon.map(p=>(
          <div key={p}>{p}</div>
        ))}
    </div>
  )
}
