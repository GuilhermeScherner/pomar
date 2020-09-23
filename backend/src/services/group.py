from src.schemas.group import  GroupBase, GroupCreate, Group
from src.models.group import GroupModel
from sqlalchemy.exc import InvalidRequestError
from fastapi_sqlalchemy import db
from fastapi import HTTPException

from src.models.tree import TreeModel
from src.services.tree import RequestsTree

requestsTree = RequestsTree()

class RequestsGroup():
  def get_tree_group(self):
    return db.session.query(GroupModel).all()

  def get_tree_group_id(self, tree_group_id: int):
    db_tree_group = db.session.query(GroupModel).filter(GroupModel.id == tree_group_id).first()
    if(not db_tree_group):        
      raise HTTPException(status_code=404, detail="ID não encontrado")
    return db_tree_group 

  def create_tree_group(self, tree_group: GroupCreate):
    db_tree_group_name =  db.session.query(GroupModel).filter(GroupModel.name == tree_group.name).first()
    if db_tree_group_name:
      raise HTTPException(detail="Nome já registrado",status_code=400)
    db_tree_group = GroupModel(name= tree_group.name, description=tree_group.description)
    db.session.add(db_tree_group)
    db.session.commit()
    db.session.refresh(db_tree_group)
    return db_tree_group

  def update_tree_group(self, tree_group_id: int, tree_group: GroupCreate):
    db_tree_group = db.session.query(GroupModel).filter(GroupModel.id == tree_group_id).first()
    if(not db_tree_group):        
      raise HTTPException(status_code=404, detail="ID não encontrado")
    db_tree_group.name = tree_group.name
    db_tree_group.description = tree_group.description
    db.session.commit()
    db.session.refresh(db_tree_group)
    return db_tree_group

  def remove_tree_group(self, tree_group_id: int):
    db_tree_group = db.session.query(GroupModel).filter(GroupModel.id == tree_group_id).first()
    try:
      if(len(db_tree_group.trees) > 0):
        for tree in db_tree_group.trees:
          requestsTree.remove_tree(tree.id)
          db.session.commit()
      db.session.delete(db_tree_group)
      db.session.commit()
      return True
    except InvalidRequestError:
      db.session.rollback()
      return False

  def name_already_register(self, name_tree_group: int):
    return db.session.query(GroupModel).filter(GroupModel.name == name_tree_group).first()
