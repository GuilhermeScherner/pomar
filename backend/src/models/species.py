from sqlalchemy import  Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from src.models.base import Base



class SpeciesModel(Base):
  __tablename__ = "species"

  id = Column(Integer, primary_key=True, index=True)
  name = Column(String,  unique=True, index=True)
  description = Column(String)