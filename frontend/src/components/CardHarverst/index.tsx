import React, { FormEvent, useState } from 'react';
import api from '../../services/api';
import Modal from 'react-modal';

import { Card, customStyles, ContainerModal } from '../styles';

interface CardHarverstProps {
  info: {
    tree_id: number;
    info: string;
    id: number;
    date_harvest: Date;
    weight: number;
  },
  deleteComponent: (cod: number) => void;
  update: () => void;
}

Modal.setAppElement('body')


const CardHarverst: React.FC <CardHarverstProps> = ({info, update, deleteComponent}) => {
  const [idTree,setIdTree] = useState<number>(0)
  const [description,setDescription] = useState("")
  const [allTree, setAllTree] = useState<any[]>([])
  const [modalIsOpen,setIsOpen] = useState(false);
  const [weight, setWeight] = useState(0.1)
  const [dateH, setDateH] = useState<any>(new Date(Date.now()))

  function openModal() {
    api.get('tree/').then(response => {
      setAllTree(response.data)
    })

    setDateH(info.date_harvest)
    setWeight(info.weight)
    setIdTree(info.tree_id)
    setDescription(info.info)    
    setIsOpen(true);
  }

 
  function closeModal(){
    setIsOpen(false);
  }

  function updateHarvest(event: FormEvent){
    event.preventDefault()

    api.put(`harvest/${info.id}`,{
      info: description,
      weight,
      tree_id: idTree,
      date_harvest: dateH
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
          <h3>Colheita de código {info.id}</h3>
          <div className="info">
          <p>Id da árvore: <span>{info.tree_id}</span></p>
          <p>Colheita: <span>{info.date_harvest}</span></p>
          <p>Peso: <span>{info.weight}</span></p>
          </div>
          <p>{info.info}</p>
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
            <form onSubmit={updateHarvest}>
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
              <button type="submit">Salvar</button>
          </form>
          </ContainerModal>
        </Modal>

       </div>


  )}

export default CardHarverst;