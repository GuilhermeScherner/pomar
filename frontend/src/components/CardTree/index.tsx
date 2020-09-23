import React, { FormEvent, useEffect, useState } from 'react';
import api from '../../services/api';
import Modal from 'react-modal';

import { Card, customStyles, ContainerModal } from '../styles';

export interface CardTreeProps {
  info : {
    description: string;
    age: number;
    id: number;
    specie: string;
  };
  deleteComponent: (cod: number) => void;
  update: () => void;
}


Modal.setAppElement('body')

const CardTree: React.FC <CardTreeProps> = ({info, update, deleteComponent}) => {


  const [age,setAge] = useState<number>(0)
  const [description,setDescription] = useState("")
  const [allSpecies, setAllSpecies] = useState<any[]>([])
  const [modalIsOpen,setIsOpen] = useState(false);
  const [specie, setSpecie] = useState("select")


  useEffect(()=>{
      api.get('specie/').then(response => {
        setAllSpecies(response.data )
      })
    }, [])



    function openModal() {
      setAge(info.age)
      setSpecie(info.specie)
      setDescription(info.description)
      setIsOpen(true);
    }
  
   
    function closeModal(){
      setIsOpen(false);
    }

    function updateTree(event: FormEvent){
      event.preventDefault()
      

      api.put(`tree/${info.id}`,{
        description,
        age,
        specie,
      }).then(response => {
        alert("Atualização Sucesso")
        closeModal()
        update()        
      })
      .catch(response => {
        alert("Tente novamente")
      })

    }


  return (
    <div>
      <Card>
        <h3>A Árvore de código {info.id}</h3>
        <div className="info">
          <p>Idade: <span>{info.age}</span></p>
          <p>Espécie: <span>{info.specie}</span></p>
      </div>
      <p>{info.description}</p>
      <div className="buttons">
        <button onClick={() => openModal()}>Editar</button>
        <button onClick={() => deleteComponent(info.id)}>Excluir</button>
      </div>
      </Card>
      <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Modal"
        >
          <ContainerModal>
            <div>
              <button onClick={closeModal}>close</button>
            </div>
            <form onSubmit={updateTree}>
              <div>
                <label>Idade</label>
                <input value={age} onChange={(e) => setAge(Number(e.target.value))} type="number"></input>
              </div> 
              <div>
              <label>Espécie</label>
              <select name="species" value={specie}
                onChange={(e) => setSpecie(e.target.value)}>
                <option value="select">Selecione</option>
                {allSpecies ? allSpecies.map((value, index) => (
                  <option value={value.name} key={index}>{value.name}</option>
                )) : null}
            </select>
            </div>
              <div>
                <label>Descrição</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
              </div>
              <button type="submit">Salvar</button>
          </form>
          </ContainerModal>
        </Modal>
    </div>
  )}

export default CardTree;