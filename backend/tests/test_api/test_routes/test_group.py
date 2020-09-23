import pytest
from fastapi.testclient import TestClient
from src.main import app 


client = TestClient(app)


def test_tree_group_reponse_get_all():
    response = client.get("/api/tree_group/")
    assert response.status_code == 200
    assert response.json() == [  { "name": "Laranjeiras Setor Leste", "description": "Árvores de alta produtividade", "id": 5,"trees": []}]

def test_tree_group_reponse_get_id_error():
    response = client.get("/api/tree_group/100")
    assert response.status_code == 404
    assert response.json() == {'detail': 'ID não encontrado'}

def test_tree_group_reponse_get_id():
    response = client.get("/api/tree_group/22")
    assert response.status_code == 200
    assert response.json() == {"name": "Laranjeiras Setor Leste", "description": "Árvores de alta produtividade", "id": 5, "trees": []}

def test_tree_group_reponse_post_error():
    response = client.post("/api/tree_group/",  json={ "name": "Laranjeiras Setor Leste", "description": "Árvores de alta produtividade"})
    assert response.status_code == 404
    assert response.json() == {'detail': "Nome já registrado"}

def test_tree_group_reponse_post():
    response = client.post("/api/tree_group/", json={ "name": "Laranjeiras Setor Oeste", "description": "Árvores de alta produtividade"})
    assert response.status_code == 200
    assert response.json() == {"name": "Laranjeiras Setor Oeste", "description": "Árvores de alta produtividade", "id": 5, "trees": []}

def test_tree_group_reponse_put_error():
    response = client.put("/api/tree_group/00",  json={ "name": "Laranjeiras Setor Oeste", "description": "Árvores de alta produtividade"})
    assert response.status_code == 404
    assert response.json() =={'detail': "ID não encontrado"}

def test_tree_group_reponse_put():
    response = client.put("/api/tree_group/22",   json={ "name": "Laranjeiras Setor Oeste", "description": "Árvores de alta produtividade"})
    assert response.status_code == 200
    assert response.json() ==  {"name": "Laranjeiras Setor Oeste", "description": "Árvores de alta produtividade", "id": 5, "trees": []}

def test_tree_group_reponse_delete():
    response = client.delete("/api/tree_group/22")
    assert response.status_code == 200
    assert response.json() == True

def test_tree_group_reponse_delete_error():
    response = client.delete("/api/tree_group/00")
    assert response.status_code == 400
    assert response.json() == False