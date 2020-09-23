from pydantic import BaseModel, Field
import datetime

class HarvestBase(BaseModel):
  info: str =  Field(..., example="Empty")
  date_harvest: datetime.date
  weight: float
  tree_id: int

class HarvestCreate(HarvestBase):
  pass

class Harvest(HarvestCreate):
  id: int
  class  Config :
    orm_mode  =  True
