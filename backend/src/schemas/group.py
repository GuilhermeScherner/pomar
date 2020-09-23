from pydantic import BaseModel, Field
from typing import List
from src.schemas.tree import Tree

class GroupBase(BaseModel):
  name: str =  Field(..., example="Empty")
  description: str =  Field(..., example="Empty")

class GroupCreate(GroupBase):
  pass

class Group(GroupCreate):
  id: int
  trees: List[Tree] = []
  class Config:
    orm_mode = True