import React, { useState } from 'react';
import api from '../../services/api';

import { Card } from '../styles';

interface CardInsertGroupProps{
  update: () => void;
}

const CardInsertGroup: React.FC<CardInsertGroupProps> = ({update}) => {

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")


  function handleAddNewGroup(){
    api.post('tree_group/', {
        name,
        description
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
    <h3>Adicione uma nova árvore</h3>
    <div>
      <label>Nome</label>
      <input value={name} type="text"onChange={(e) => setName(e.target.value)}></input>
    </div>
    <div>
      <label>Descrição</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
    </div>
    <button onClick={() => handleAddNewGroup()}>Adicionar</button>
  </Card>
   
    );
}

export default CardInsertGroup;