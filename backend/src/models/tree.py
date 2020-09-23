from sqlalchemy import  Column, ForeignKey, Integer, String
from src.models.base import Base


class TreeModel(Base):
  __tablename__ = "tree"

  id = Column(Integer, primary_key=True, index=True)
  description =Column(String)
  age = Column(Integer)
  specie =  Column(String)
  group_id =  Column(Integer, ForeignKey("tree_group.id"))
