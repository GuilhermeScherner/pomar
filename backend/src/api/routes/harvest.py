from fastapi import APIRouter
from src.services.harvest import RequestsHarvest
from src.schemas.harvest import Harvest, HarvestCreate
from typing import List

requests = RequestsHarvest()

router = APIRouter()

@router.get("/harvest/",  response_model=List[Harvest])
def read_harvests():
    return requests.get_all_harvest()

@router.get("/harvest/{harvest_id}", response_model=Harvest)
def read_harvest_id(harvest_id: int):
    return requests.get_harvest_id( harvest_id= harvest_id)

@router.get("/harvest/date/{date}", response_model=Harvest)
def read_harvest_date(date: str):
    return requests.get_harvest_date( date= date)

@router.post("/harvest/", response_model=Harvest)
def create_harvest(harvest: HarvestCreate):
    return requests.create_harvest( harvest=harvest)

@router.put("/harvest/{harvest_id}",  response_model=Harvest)
def update_harvest(harvest_id: int, harvest: HarvestCreate):
    return requests.update_harvest( harvest_id=harvest_id, harvest=harvest)

@router.delete("/harvest/{harvest_id}")
def remove_harvest(harvest_id: int):
    return requests.remove_harvest( harvest_id=harvest_id)