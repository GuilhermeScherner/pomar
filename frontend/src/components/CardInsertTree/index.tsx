import React, { useEffect, useState } from 'react';
import api from '../../services/api';

import { Card } from '../styles';

interface CardInsertTreeProps{
  update: () => void;
}

const CardInsertTree: React.FC<CardInsertTreeProps> = ({update}) => {

  const [ageInsert,setAgeInsert] = useState<number>(1)
  const [specieInsert, setSpecieInsert] = useState("select")
  const [descriptionInsert,setDescriptionInsert] = useState("")

  const [group, setGroup] = useState("")

  const [allSpecies, setAllSpecies] = useState<any[]>([])
  const [allGroup, setAllGroup] = useState<any[]>([])

  useEffect(()=>{
      api.get('specie/').then(response => {
        setAllSpecies(response.data )
      })
      api.get('tree_group/').then(response => {
        setAllGroup(response.data )
      })
    }, [])

  function handleAddNewTree(){
    if(specieInsert === "select"){
      alert("Selecione uma espécie, se não houver adicione na aba Espécies")
      return 
    }
    if(group === "select"){
      alert("Selecione um grupo, se não houver adicione na aba Grupos")
      return 
    }
    api.post('tree/', {
        age: ageInsert,
        specie: specieInsert,
        description: descriptionInsert
      },
      {
        params: {
          name_group: group
        }
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
      <label>Idade</label>
      <input value={ageInsert} type="number"onChange={(e) => setAgeInsert(Number(e.target.value))}></input>
    </div>
    
    <div>
      <label>Espécie</label>
      <select name="species" value={specieInsert}
        onChange={(e) => setSpecieInsert(e.target.value)}>
        <option value="select">Selecione</option>
        {allSpecies ? allSpecies.map((value, index) => (
          <option value={value.name} key={index}>{value.name}</option>
        )) : null}
    </select>
    </div>

    <div>
    <label>Grupo</label>
      <select name="gruop" value={group}
         onChange={(e) => setGroup(e.target.value)}>
          <option value="select">Selecione</option>
          {allGroup ? allGroup.map((value, index) => (
            <option value={value.name} key={index}>{value.name}</option>
          )) : null}
      </select>
      </div>
      
      <label>Descrição</label>
      <textarea value={descriptionInsert} onChange={(e) => setDescriptionInsert(e.target.value)}></textarea>
    <button onClick={() => handleAddNewTree()}>Adicionar</button>
  </Card>
   
    );
}

export default CardInsertTree;