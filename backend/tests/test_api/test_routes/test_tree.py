import pytest
from fastapi.testclient import TestClient
from src.main import app 


client = TestClient(app)


def test_tree_reponse_get_all():
    response = client.get("/api/tree/")
    assert response.status_code == 200
    assert response.json() == [{"description": "Árvore recém plantada", "age": 0, "specie": "Laranjeira", "group_id": 5, "id": 22}]

def test_tree_reponse_get_id_error():
    response = client.get("/api/tree/100")
    assert response.status_code == 404
    assert response.json() == {'detail': 'ID não encontrado'}

def test_tree_reponse_get_id():
    response = client.get("/api/tree/22")
    assert response.status_code == 200
    assert response.json() == {"description": "Árvore recém plantada", "age": 0, "specie": "Laranjeira", "group_id": 5, "id": 22}

def test_tree_reponse_post_error_specie():
    response = client.post("/api/tree/?name_group=Laranjeiras",  json={ "description": "Nogueira mais antiga", "age": 53, "specie": "notExist"})
    assert response.status_code == 404
    assert response.json() == {'detail': "Espécie não encontrado"}

def test_tree_reponse_post():
    response = client.post("/api/tree/?name_group=Laranjeiras",  json={ "description": "Grande Laranjeira", "age": 10, "specie": "Laranjeira"})
    assert response.status_code == 200
    assert response.json() == { "description": "Grande Laranjeira", "age": 10, "specie": "Laranjeira", "id":23}

def test_tree_reponse_put_error_specie():
    response = client.put("/api/tree/22", json={ "description": "Bergamoteira de produtividade mediana", "age": 5, "specie": "notExist"})
    assert response.status_code == 404
    assert response.json() =={'detail': "Espécie não encontrado"}

def test_tree_reponse_put():
    response = client.put("/api/tree/22", json={ "description": "Laranjeira mais velha ", "age": 100, "specie": "Laranjeira"})
    assert response.status_code == 200
    assert response.json() =={ "description": "Laranjeira mais velha ", "age": 100, "specie": "Laranjeira",  "id":22}

def test_tree_reponse_delete():
    response = client.delete("/api/tree/22")
    assert response.status_code == 200
    assert response.json() == True

def test_tree_reponse_delete_error():
    response = client.delete("/api/tree/00")
    assert response.status_code == 400
    assert response.json() == False