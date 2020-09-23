from fastapi import APIRouter
from src.services.species import RequestsSpecies
from src.schemas.species import Species, SpeciesCreate
from typing import List

router = APIRouter()

requests = RequestsSpecies()

@router.get("/specie/", response_model=List[Species])
def read_species():
    return requests.get_all_specie()

@router.get("/specie/{specie_id}", response_model=Species)
def read_specie(specie_id: int):
    return requests.get_specie_id( specie_id= specie_id)

@router.post("/specie/", response_model=Species)
def create_specie(specie: SpeciesCreate):
    return requests.create_specie( specie=specie)

@router.put("/specie/{specie_id}",  response_model=SpeciesCreate)
def update_specie(specie_id: int, specie: SpeciesCreate):
    return requests.update_specie( specie_id=specie_id, specie=specie)

@router.delete("/specie/{specie_id}")
def remove_specie(specie_id: int):
    return requests.remove_specie( specie_id=specie_id)