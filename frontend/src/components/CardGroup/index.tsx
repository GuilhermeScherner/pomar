import React, { FormEvent, useState } from 'react';
import api from '../../services/api';
import Modal from 'react-modal';

import { Card, customStyles, ContainerModal } from '../styles';

interface CardGroupProps {
  info : {
    description: string;
    name: string;
    id: number;
    trees: [{
      description: string;
      age: number;
      id: number;
      specie: string;
    }];
  }
  deleteComponent: (cod: number) => void;
  update: () => void;
}
Modal.setAppElement('body')


const CardGroup: React.FC <CardGroupProps> = ({info, update, deleteComponent}) => {
  
  const [name,setName] = useState("")
  const [description,setDescription] = useState("")
  const [modalIsOpen,setIsOpen] = useState(false);

  function openModal() {
    setName(info.name)
    setDescription(info.description)
    setIsOpen(true);
  }
  

 
  function closeModal(){
    setIsOpen(false);
  }

  function updateGroup(event: FormEvent){
    event.preventDefault()
    

    api.put(`tree_group/${info.id}`,{
      description,
      name,
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
        <h3>O grupo de código {info.id}</h3>
        <div className="info">
          <p>Nome: <span>{info.name}</span></p>
          <p>Arvores id: {info.trees.map(value => (<span>{value.id}</span>))}</p>
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
            <form onSubmit={updateGroup}>
              <div>
                <label>Nome</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text"></input>
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

export default CardGroup;