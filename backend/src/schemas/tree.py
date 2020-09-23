from pydantic import BaseModel, Field

class TreeBase(BaseModel):
  description: str =  Field(..., example="Empty")
  age: int
  specie: str =  Field(..., example="Empty")
  
class TreeCreate(TreeBase):
  group_id: int
  pass

class Tree(TreeCreate):
  id: int
  class  Config :
    orm_mode  =  True
