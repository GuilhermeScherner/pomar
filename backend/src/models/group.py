from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from src.models.base import Base

class GroupModel(Base):
  __tablename__ = "tree_group"

  id = Column(Integer, primary_key=True, index=True)
  name = Column(String,  unique=True, index=True)
  description =Column(String)
  trees = relationship("TreeModel", backref="tree.id")