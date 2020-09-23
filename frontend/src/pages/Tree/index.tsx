import React, {useState, useEffect} from 'react';
import CardInsertTree from '../../components/CardInsertTree';
import CardTree from '../../components/CardTree';
import api from '../../services/api';

import { Container } from '../styles';



function Tree(){
  const [tree,setTree] = useState([])

  const [cod, setCod] = useState<number>(1)

  const [specie, setSpecie] = useState("")

  const [group, setGroup] = useState("")


  function handleClickSearchCod(){
    api.get(`tree/${cod}`).then(response => {
      setTree([])
        if(response.data){
          setTree(trees => trees.concat(response.data))
        }
      })
  }

  function handleClickSearchSpecie(){
    api.get(`tree/specie/${specie}`).then(response => {
      setTree([])
      if(response.data){
        setTree(trees => trees.concat(response.data))
      }
    })
  }

  function handleClickSearchGroup(){
    api.get(`tree/group/${group}`).then(response => {
      setTree([])
      if(response.data){
        setTree(trees => trees.concat(response.data))
      }
    })
  }

  function handleGetAllTree(){
    api.get('tree/').then(response => {
      setTree([])
      setTree(trees => trees.concat(response.data))
    })
  }

  useEffect(() => {
    handleGetAllTree()
  }, [])


  function removeTree(id: number){
    api.delete(`tree/${id}`).then(reponse => {
      handleGetAllTree()
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
          <label>Espécie: </label>
          <input value={specie} onChange={(e) => {setSpecie(e.target.value)}} type="text"/>
          <button onClick={() => handleClickSearchSpecie()}>OK</button>
        </div>
        <div>
          <label>Grupo: </label>
          <input value={group} onChange={(e) => {setGroup(e.target.value)}} type="text"/>
          <button onClick={() => handleClickSearchGroup()}>OK</button>
        </div>
        <button onClick={() => handleGetAllTree()} className="all">Todas as Árvores</button>
      </div>
      <div className="cards">
        {tree.map((value : any) => (
          <CardTree info={value} update={() => handleGetAllTree()} key={value.id} deleteComponent={removeTree} ></CardTree>
        ))}
        <CardInsertTree update={()=> handleGetAllTree()}></CardInsertTree>
      </div>
    </Container>
  );
}

export default Tree;