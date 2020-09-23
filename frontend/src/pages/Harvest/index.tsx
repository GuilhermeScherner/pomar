import React, {useState, useEffect} from 'react';
import CardHarverst from '../../components/CardHarverst';
import CardInsertHarvest from '../../components/CardInsertHarvest';
import api from '../../services/api';

import { Container } from '../styles';



function Harvest(){
  const [harvest,setHarvest] = useState([])

  const [cod, setCod] = useState<number>(1)

  const [dateH, setDateH] = useState("")

  const [tree, setTree] = useState("")

  function handleClickSearchCod(){
    api.get(`harvest/${cod}`).then(response => {
      setHarvest([])
        if(response.data){
          setHarvest(harvests => harvests.concat(response.data))
        }

      })
  }

  function handleClickSearchDate(){
    api.get(`harvest/date/${dateH}`).then(response => {
      setHarvest([])
      if(response.data){
        setHarvest(harvests => harvests.concat(response.data))
      }
    })
  }

  function handleClickSearchTree(){
    api.get(`harvest/tree/${tree}`).then(response => {
      setHarvest([])
      if(response.data){
        setHarvest(harvests => harvests.concat(response.data))
      }
    })
  }

  function handleGetAllHarvest(){
    api.get('harvest/').then(response => {
      setHarvest([])
      setHarvest(harvests => harvests.concat(response.data))
    })
  }

  useEffect(() => {
    handleGetAllHarvest()
  }, [])

  function removeHarvest(id: number){
    api.delete(`harvest/${id}`).then(reponse => {
      handleGetAllHarvest()
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
          <label>Desde: </label>
          <input value={dateH} onChange={(e) => {setDateH(e.target.value)}} type="date"/>
          <button onClick={() => handleClickSearchDate()}>OK</button>
        </div>
        <div>
          <label>Árvore: </label>
          <input value={tree} onChange={(e) => {setTree(e.target.value)}} type="text"/>
          <button onClick={() => handleClickSearchTree()}>OK</button>
        </div>
        <button onClick={() => handleGetAllHarvest()} className="all">Todas as Colheitas</button>
      </div>
      <div className="cards">
        {harvest.map((value: any) => (
        <CardHarverst update={() =>handleGetAllHarvest()} deleteComponent={removeHarvest} info={value} key={value.id}></CardHarverst>
        ))}
        <CardInsertHarvest  update={() =>handleGetAllHarvest()}></CardInsertHarvest>
      </div>
    </Container>
  );
}

export default Harvest;