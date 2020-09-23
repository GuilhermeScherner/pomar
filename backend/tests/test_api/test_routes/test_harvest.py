import pytest
from fastapi.testclient import TestClient
from src.main import app 


client = TestClient(app)


def test_harvest_reponse_get_all():
    response = client.get("/api/harvest/")
    assert response.status_code == 200
    assert response.json() == [{"info": "Melhor colheita", "date_harvest": "2020-09-23", "weight": 10, "tree_id": 22, "id": 3}]

def test_harvest_reponse_get_id_error():
    response = client.get("/api/harvest/100")
    assert response.status_code == 404
    assert response.json() == {'detail': 'ID não encontrado'}

def test_harvest_reponse_get_id():
    response = client.get("/api/harvest/22")
    assert response.status_code == 200
    assert response.json() == {"info": "Melhor colheita", "date_harvest": "2020-09-23", "weight": 10, "tree_id": 22, "id": 3}

def test_harvest_reponse_post_error():
    response = client.post("/api/harvest/",  json={"info": "Melhor colheita", "date_harvest": "2020-09-23", "weight": 10, "tree_id": 00})
    assert response.status_code == 404
    assert response.json() == {'detail': "ID da árvore não encontrado"}

def test_harvest_reponse_post():
    response = client.post("/api/harvest/",  json={"info": "Melhor colheita", "date_harvest": "2020-09-23", "weight": 10, "tree_id": 22})
    assert response.status_code == 200
    assert response.json() == {"info": "Melhor colheita", "date_harvest": "2020-09-23", "weight": 10, "tree_id": 22, "id": 3}

def test_harvest_reponse_put_error():
    response = client.put("/api/harvest/00", json={"info": "Melhor colheita", "date_harvest": "2020-09-23", "weight": 10, "tree_id": 22})
    assert response.status_code == 404
    assert response.json() =={'detail': "ID não encontrado"}

def test_harvest_reponse_put():
    response = client.put("/api/harvest/22", json={"info": "Melhor colheita", "date_harvest": "2020-09-23", "weight": 10, "tree_id": 22})
    assert response.status_code == 200
    assert response.json() =={"info": "Melhor colheita", "date_harvest": "2020-09-23", "weight": 10, "tree_id": 22, "id": 3}

def test_harvest_reponse_delete():
    response = client.delete("/api/harvest/22")
    assert response.status_code == 200
    assert response.json() == True

def test_harvest_reponse_delete_error():
    response = client.delete("/api/harvest/00")
    assert response.status_code == 400
    assert response.json() == False