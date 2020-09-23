import React, { useEffect, useState } from 'react';
import api from '../../services/api';

import { Card } from '../styles';

interface CardInsertHarvestProps{
  update: () => void;
}

const CardInsertHarvest: React.FC<CardInsertHarvestProps> = ({update}) => {
  const [idTree,setIdTree] = useState<number>(0)
  const [weight, setWeight] = useState(0.1)
  const [dateH, setDateH] = useState<any>(new Date(Date.now()))
  const [allTree, setAllTree] = useState<any[]>([])
  const [description,setDescription] = useState("")


  useEffect(()=>{
      api.get('tree/').then(response => {
        setAllTree(response.data )
      })
    }, [])

  function handleAddNewHarvest(){
    if(idTree === 0){
      alert("Selecione uma árvore, se não houver adicione na aba Árvore")
      return 
    }
    api.post('harvest/', {
      info: description,
      date_harvest: dateH,
      weight,
      tree_id: idTree
      })
    .then( response => {
      alert("Cadastrado com Sucesso");
      update()
    })
    .catch( error => {
      alert("ERRO! Tente mais tarde");
    });
  }
  return (
    <Card>

    <h3>Adicione uma Colheita</h3>
    

    <div>
      <label>Id</label>
      <select name="idTree" value={idTree}
      onChange={(e) => setIdTree(Number(e.target.value))}>
        <option value={0}>Selecione</option>
        {allTree ? allTree.map((value, index) => (
          <option value={value.id} key={index}>{value.id}</option>
        )) : null}
      </select>
    </div>
   
    <div>
    <label>Colheita</label>
    <input type="date" value={dateH} onChange={(e) => setDateH(e.target.value)}></input>
    </div>
    <div>
    <label>Peso</label>
    <input type="number" step="0.01" value={weight} onChange={(e) => setWeight(Number(e.target.value))}></input>
    </div>
    <div>
    <label>Descrição</label>
    <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
    </div>
    <button onClick={() => handleAddNewHarvest()}>Adicionar</button>

  </Card>
   
    );
}

export default CardInsertHarvest;