import React, { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import api from '../../services/api';

import { Card, customStyles, ContainerModal } from '../styles';

export interface CardSpecieProps {
  info : {
    description: string;
    name: string;
    id: number;
  };
  update: () => void;
  deleteComponent: (cod: number) => void;
}

Modal.setAppElement('body')


const CardSpecie: React.FC <CardSpecieProps> = ({info, update, deleteComponent}) => {
  const [modalIsOpen,setIsOpen] = useState(false);
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  function openModal() {
    setName(info.name)
    setDescription(info.description)
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
  }

  function updateSpecie(event: FormEvent){
    event.preventDefault()
    api.put(`specie/${info.id}`, {
      name,
      description,
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
          <h3>A Espécie de código {info.id}</h3>
          <div className="info">
          <p>Name: <span>{info.name}</span></p>
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
            <form onSubmit={updateSpecie}>
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

export default CardSpecie;