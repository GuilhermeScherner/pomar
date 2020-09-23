from src.schemas.tree import TreeCreate, TreeBase, Tree
from src.models.tree import TreeModel
from sqlalchemy.exc import InvalidRequestError
from fastapi_sqlalchemy import db
from src.models.group import GroupModel
from src.models.harvest import HarvestModel
from fastapi import HTTPException
from src.models.species import SpeciesModel


class RequestsTree():
  def get_all_tree(self):
    return db.session.query(TreeModel).all()

  def get_tree_id(self, tree_id: int):
      db_tree = db.session.query(TreeModel).filter(TreeModel.id == tree_id).first()
      if(not db_tree):        
        raise HTTPException(status_code=404, detail="ID não encontrado")
      return db_tree 
  
  def create_tree(self, tree: TreeCreate, name_group: str):
    group_id = db.session.query(GroupModel).filter(GroupModel.name == name_group).first()
    db_specie =db.session.query(SpeciesModel).filter(SpeciesModel.name == tree.specie).first()
    if(not db_specie):
      raise HTTPException(status_code=404, detail="Espécie não encontrado")
    if(not group_id):
      raise HTTPException(status_code=404, detail="Grupo não encontrado")
    db_tree = TreeModel(age=tree.age, description=tree.description, specie=tree.specie, group_id=group_id.id)
    db.session.add(db_tree)
    db.session.commit()
    db.session.refresh(db_tree)
    return db_tree


  def update_tree(self, tree_id: int, tree: TreeCreate):
    db_tree = db.session.query(TreeModel).filter(TreeModel.id == tree_id).first()
    db_specie =db.session.query(SpeciesModel).filter(SpeciesModel.name == tree.specie).first()
    if(not db_specie):
      raise HTTPException(status_code=404, detail="Espécie não encontrado")
    if(not db_tree):        
      raise HTTPException(status_code=404, detail="ID não encontrado")
    db_tree.age = tree.age
    db_tree.description = tree.description
    db.session.commit()
    db.session.refresh(db_tree)
    return db_tree

  def remove_tree(self, tree_id: int):
    db_tree = db.session.query(TreeModel).filter(TreeModel.id == tree_id).first()
    db_harvest = db.session.query(HarvestModel).filter(HarvestModel.tree_id == tree_id).first()
    try:
      if db_harvest :
        db.session.query(HarvestModel).filter(HarvestModel.tree_id == tree_id).delete()
        db.session.commit()
      db.session.delete(db_tree)
      db.session.commit()
      return True
    except InvalidRequestError:
      db.session.rollback()
      raise HTTPException(status_code=400, detail="Error")

