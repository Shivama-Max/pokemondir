import React,{useState, useEffect} from "react";
import PokemonList from "./PokemonList";
import axios from 'axios';
import Pagination from "./Pagination";
import './App.css'

function App() {
  const [pokemon, setPokemon] = useState([])
  const [page,setPage] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPage,setNextPage] = useState()
  const [prevPage,setPrevPage] = useState()
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    setLoading(true)
    let cancel
    axios.get(page,{
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res=>{
      setLoading(false)
      setNextPage(res.data.next)
      setPrevPage(res.data.previous)
      setPokemon(res.data.results.map(p=>p.name))
    })

    return ()=>cancel()
  },[page])

  function gotoNextPage(){
    setPage(nextPage);
  }
  function gotoPrevPage(){
    setPage(prevPage);
  }

  if(loading){
    return "Loading..."
  }
  return (
    <>
      <PokemonList pokemon = {pokemon}/>
      <Pagination 
      gotoNextPage={nextPage ? gotoNextPage : null}
      gotoPrevPage={prevPage ? gotoPrevPage : null}
      />
    </>
  );
}

export default App;
