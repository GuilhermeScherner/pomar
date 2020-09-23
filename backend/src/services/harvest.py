from src.schemas.harvest import HarvestBase, HarvestCreate, Harvest
from src.models.harvest import HarvestModel
from src.models.tree import TreeModel
from fastapi import HTTPException
from sqlalchemy.exc import InvalidRequestError
from fastapi_sqlalchemy import db
import time
import datetime


class RequestsHarvest():

  def get_all_harvest(self ):
    return db.session.query(HarvestModel).all()

  def get_harvest_id(self,  harvest_id: int):
    db_harvest = db.session.query(HarvestModel).filter(HarvestModel.id == harvest_id).first()
    if(not db_harvest):        
      raise HTTPException(status_code=404, detail="ID não encontrado")
    return db_harvest 

  def get_harvest_date(self,  date: str):
    timestamp = time.mktime(datetime.datetime.strptime(date, "%Y-%m-%d").timetuple())
    db_harvest =db.session.query(HarvestModel).all()
    db_date = []
    for harvest in db_harvest:
      db_timestamp = time.mktime(datetime.datetime.strptime(harvest.date_harvest, "%Y-%m-%d").timetuple())
      if(db_timestamp >= timestamp):
        db_date.append(harvest)
    return db_date
  

  def create_harvest(self,  harvest: HarvestCreate):
    db_tree = db.session.query(TreeModel).filter(TreeModel.id == harvest.tree_id).first()
    if(not db_tree):
      raise HTTPException(status_code=404, detail="ID da árvore não encontrado")
    db_harvest = HarvestModel(info=harvest.info, date_harvest = harvest.date_harvest, weight=harvest.weight, tree_id=harvest.tree_id)
    db.session.add(db_harvest)
    db.session.commit()
    db.session.refresh(db_harvest)
    return db_harvest

  def update_harvest(self, harvest_id: int, harvest: HarvestCreate):
    db_tree = db.session.query(TreeModel).filter(TreeModel.id == harvest.tree_id).first()
    if(not db_tree):
      raise HTTPException(status_code=404, detail="ID da árvore não encontrado")
    db_harvest = db.session.query(HarvestModel).filter(HarvestModel.id == harvest_id).first()
    if(not db_harvest):
      raise HTTPException(status_code=404, detail="ID não encontrado")
    db_harvest.info = harvest.info
    db_harvest.date_harvest = harvest.date_harvest
    db_harvest.weight = harvest.weight
    db_harvest.tree_id = harvest.tree_id
    db.session.commit()
    db.session.refresh(db_harvest)
    return db_harvest

  def remove_harvest(self,  harvest_id: int):
    db_harvest = db.session.query(HarvestModel).filter(HarvestModel.id == harvest_id).first()
    try:
      db.session.delete(db_harvest)
      db.session.commit()
      return True
    except InvalidRequestError:
      db.session.rollback()
      return False