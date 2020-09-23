from sqlalchemy import Column, ForeignKey, Float, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.types import  Date

from src.models.base import Base


class HarvestModel(Base):
  __tablename__ = "harvest"
  
  id = Column(Integer, primary_key=True, index=True )
  tree_id = Column(Integer, ForeignKey("tree.id"), index=True)
  info = Column(String)
  date_harvest = Column(Date)
  weight = Column(Float)
