import React, {useState, useEffect} from 'react';
import CardGroup from '../../components/CardGroup';
import CardInsertGroup from '../../components/CardInsertGroup';
import api from '../../services/api';

import { Container } from '../styles';



function Group(){
  const [group,setGroup] = useState([])

  const [cod, setCod] = useState<number>(1)

  const [name, setName] = useState("")

  function handleClickSearchCod(){
    api.get(`tree_group/${cod}`).then(response => {
      setGroup([])
        if(response.data){
          setGroup(groups => groups.concat(response.data))
        }

      })
  }

  function handleClickSearchName(){
    api.get(`tree_group/name/${name}`).then(response => {
      setGroup([])
      if(response.data){
        setGroup(groups => groups.concat(response.data))
      }
    })
  }

  function handleGetAllGroup(){
    api.get('tree_group/').then(response => {
      setGroup([])
      setGroup(groups => groups.concat(response.data))
    })
  }

  useEffect(() => {
    handleGetAllGroup()
  }, [])

  function removeGroup(id: number){
    api.delete(`tree_group/${id}`).then(reponse => {
      handleGetAllGroup()
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
        <button onClick={() => handleGetAllGroup()} className="all">Todas as Grupos</button>
      </div>
      <div className="cards">
        {group.map((value: any) => (
          <CardGroup update={() => handleGetAllGroup()} deleteComponent={removeGroup} info={value}key={value.id} ></CardGroup>
        ))}
        <CardInsertGroup update={() => handleGetAllGroup()}></CardInsertGroup>
      </div>
    </Container>
  );
}

export default Group;