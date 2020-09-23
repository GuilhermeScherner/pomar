import pytest
from fastapi.testclient import TestClient
from src.main import app 


client = TestClient(app)


def test_specie_reponse_get_all():
    response = client.get("/api/specie/")
    assert response.status_code == 200
    assert response.json() == []

def test_specie_reponse_get_id_error():
    response = client.get("/api/specie/100")
    assert response.status_code == 404
    assert response.json() == {'detail': 'ID não encontrado'}

def test_specie_reponse_get_id():
    response = client.get("/api/specie/7")
    assert response.status_code == 200
    assert response.json() == {"name": "Laranjeira", "description": "A copa é compacta, arredondada..",  "id": 22}

def test_specie_reponse_post():
    response = client.post("/api/specie/",  json={"name": "Laranjeira", "description": "A copa é compacta, arredondada.."})
    assert response.status_code == 200
    assert response.json() == {"name": "Laranjeira", "description": "A copa é compacta, arredondada..",  "id":23}

def test_specie_reponse_put_error():
    response = client.put("/api/specie/00", json={ "name": "Limoeiro", "description": "A copa é compacta, arredondada."})
    assert response.status_code == 404
    assert response.json() =={'detail': "ID não encontrado"}

def test_specie_reponse_put():
    response = client.put("/api/specie/23", json={"name": "Limoeiro", "description": "A copa é compacta, arredondada.."})
    assert response.status_code == 200
    assert response.json() =={ "name": "Limoeiro", "description": "A copa é compacta, arredondada..",  "id": 23}

def test_specie_reponse_delete():
    response = client.delete("/api/specie/22")
    assert response.status_code == 200
    assert response.json() == True

def test_specie_reponse_delete_error():
    response = client.delete("/api/specie/00")
    assert response.status_code == 400
    assert response.json() == False