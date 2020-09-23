from fastapi import APIRouter
from src.services.tree import RequestsTree
from src.schemas.tree import Tree, TreeCreate, TreeBase
from typing import List

requests = RequestsTree()

router = APIRouter()

@router.get("/tree/",  response_model=List[Tree])
def read_trees():
    return requests.get_all_tree()

@router.get("/tree/{tree_id}", response_model=Tree)
def read_tree(tree_id: int):
    return requests.get_tree_id(tree_id=tree_id)

@router.post("/tree/", response_model=Tree)
def create_tree(name_group:str, tree: TreeBase):
    return requests.create_tree(tree=tree, name_group=name_group)

@router.put("/tree/{tree_id}",  response_model=Tree)
def update_tree(tree_id: int, tree: TreeBase):
    return requests.update_tree(tree_id=tree_id, tree=tree)

@router.delete("/tree/{tree_id}")
def remove_tree(tree_id: int):
    return requests.remove_tree(tree_id=tree_id)