from src.schemas.species import SpeciesBase, SpeciesCreate, Species
from src.models.species import SpeciesModel
from sqlalchemy.exc import InvalidRequestError
from fastapi_sqlalchemy import db
from src.models.tree import TreeModel
from fastapi import HTTPException

from src.services.tree import RequestsTree

requestsTree = RequestsTree()


class RequestsSpecies():
  def get_all_specie(self):
    return db.session.query(SpeciesModel).all()

  def get_specie_id(self, specie_id: int):
    db_specie= db.session.query(SpeciesModel).filter(SpeciesModel.id == specie_id).first()
    if(not db_specie):        
        raise HTTPException(status_code=404, detail="ID não encontrado")
    return db_specie 

  def create_specie(self, specie: SpeciesCreate):
    db_specie = SpeciesModel(name=specie.name, description=specie.description)
    db.session.add(db_specie)
    db.session.commit()
    db.session.refresh(db_specie)
    return db_specie

  def update_specie(self, specie_id: int, specie: SpeciesCreate):
    db_specie = db.session.query(SpeciesModel).filter(SpeciesModel.id == specie_id).first()
    if(not db_specie):        
      raise HTTPException(status_code=404, detail="ID não encontrado")
    db_specie.name = specie.name
    db_specie.description = specie.description
    db.session.commit()
    db.session.refresh(db_specie)
    return db_specie

  def remove_specie(self, specie_id: int):
    db_specie = db.session.query(SpeciesModel).filter(SpeciesModel.id == specie_id).first()
    db_tree = db.session.query(TreeModel).filter(TreeModel.specie == db_specie.name).all()
    try:
      if(len(db_tree) > 0):
        for tree in db_tree:
          requestsTree.remove_tree(tree.id)
          db.session.commit()
      db.session.delete(db_specie)
      db.session.commit()
      return True
    except InvalidRequestError:
      db.session.rollback()
      return False
