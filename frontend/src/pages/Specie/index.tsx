import React, {useState, useEffect} from 'react';
import CardInsertSpecie from '../../components/CardInsertSpecie';
import CardSpecie from '../../components/CardSpecie';
import api from '../../services/api';

import { Container } from '../styles';



function Specie(){
  const [specie, setSpecie] = useState([])
  
  const [cod, setCod] = useState<number>(1)

  const [name, setName] = useState("")

  function handleClickSearchCod(){
    api.get(`specie/${cod}`).then(response => {
      setSpecie([])
      if(response.data){
        setSpecie(species => species.concat(response.data))
      }
    })
  }

  function handleClickSearchName(){
    api.get(`specie/name/${name}`).then(response => {
      setSpecie([])
      if(response.data){
        setSpecie(species => species.concat(response.data))
      }
    })
  }

  function handleGetAllSpecie(){
    api.get('specie/').then(response => {
      setSpecie([])
      setSpecie(species => species.concat(response.data))
    })
  }

  useEffect(() => {
    handleGetAllSpecie()
  }, [])

  function removeSpecie(id: number){
    api.delete(`specie/${id}`).then(reponse => {
      handleGetAllSpecie()
    })
  }

  

  return (
    <Container>
      <div className="inputs-field">
        <div>
          <label>Código: </label>
          <input value={cod} onChange={(e) => {setCod(Number(e.target.value))}} type="number"/>
          <button onClick={() => handleClickSearchCod()}>OK</button>
        </div>
        <div>
          <label>Nome: </label>
          <input value={name} onChange={(e) => {setName(e.target.value)}} type="text"/>
          <button onClick={() => handleClickSearchName()}>OK</button>
        </div>
        <button onClick={() => handleGetAllSpecie()} className="all">Todas as Espécies</button>
      </div>
      <div className="cards">
        {specie.map((value : any) => (
          <CardSpecie info={value} update={() => handleGetAllSpecie()} deleteComponent={removeSpecie} key={value.id} ></CardSpecie>
        ))}
        <CardInsertSpecie update={handleGetAllSpecie}></CardInsertSpecie>
      </div>
    </Container>
  );
}

export default Specie;