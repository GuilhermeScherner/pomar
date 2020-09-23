from pydantic import BaseModel, Field

class SpeciesBase(BaseModel):
  name: str = Field(..., example="Empty")
  description: str = Field(..., example="Empty")

class SpeciesCreate(SpeciesBase):
  pass

class Species(SpeciesCreate):
  id: int
  class  Config :
    orm_mode  =  True