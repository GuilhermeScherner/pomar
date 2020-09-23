from fastapi import APIRouter, HTTPException
from src.services.group import RequestsGroup
from src.schemas.group import Group, GroupCreate
from typing import List

requests = RequestsGroup()

router = APIRouter()


@router.get("/tree_group/", response_model=List[Group])
def read_tree_group():
    return requests.get_tree_group()

@router.get("/tree_group/{tree_group_id}", response_model=Group)
def read_tree_group_id(tree_group_id: int):
    return requests.get_tree_group_id(tree_group_id=tree_group_id)

@router.post("/tree_group/", response_model=Group)
def create_tree_group(tree_group: GroupCreate):
    return requests.create_tree_group(tree_group=tree_group)

@router.put("/tree_group/{tree_group_id}",  response_model=Group)
def update_tree_group(tree_group_id: int, tree_group: GroupCreate):
    return requests.update_tree_group(tree_group_id=tree_group_id, tree_group=tree_group)

@router.delete("/tree_group/{tree_group_id}")
def remove_tree_group(tree_group_id: int):
    return requests.remove_tree_group(tree_group_id=tree_group_id)

