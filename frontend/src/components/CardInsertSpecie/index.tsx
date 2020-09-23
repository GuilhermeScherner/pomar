import React, { useState } from 'react';
import api from '../../services/api';

import { Card } from '../styles';

interface CardInsertSpecieProps{
  update: () => void;
}

const CardInsertSpecie: React.FC<CardInsertSpecieProps> = ({update}) => {

  const [name, setName] = useState("")
  const [description,setDescription] = useState("")



  function handleAddNewSpecie(){
    api.post('specie/', {
        name,
        description,
    })
    .then( response => {
      alert("Cadastrado com Sucesso");
      update()
    })
    .catch(error => {
      alert("ERRO! Tente mais tarde");
    });
  }

  return (
    <Card>

    <h3>Adicione uma nova espécie</h3>
    
    <div>
      <label>Nome</label>
      <input value={name} type="text"onChange={(e) => setName(e.target.value)}></input>
    </div>
      
      <label>Descrição</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
    <button onClick={() => handleAddNewSpecie()}>Adicionar</button>
  </Card>
   
    );
}

export default CardInsertSpecie;