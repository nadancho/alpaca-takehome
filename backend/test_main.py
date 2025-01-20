import pytest
from fastapi.testclient import TestClient
from main import app

@pytest.fixture(scope="module")
def client():
    with TestClient(app) as c:
        yield c

class TestNoteGenerationAPI:
    def test_generate_new(self, client):
        input_data = {
            "userInput": "Patient showed improvement in social skills during today's session."
        }
        response = client.post("/generate/new", json=input_data)
        assert response.status_code == 200
        assert "generated_note" in response.json()

    def test_generate_new_empty_input(self, client):
        input_data = {
            "userInput": ""
        }
        response = client.post("/generate/new", json=input_data)
        assert response.status_code == 200
        assert "generated_note" in response.json()

    def test_generate_new_invalid_input(self, client):
        input_data = {
            "invalid_key": "Invalid input"
        }
        response = client.post("/generate/new", json=input_data)
        assert response.status_code == 422  # Unprocessable Entity

    def test_generate_redo(self, client):
        input_data = {
            "userInput": "Patient showed improvement in social skills during today's session.",
            "initialGeneratedResponse": "Initial response"
        }
        response = client.post("/generate/redo", json=input_data)
        assert response.status_code == 200
        assert "generated_note" in response.json()

    def test_generate_redo_empty_input(self, client):
        input_data = {
            "userInput": "",
            "initialGeneratedResponse": ""
        }
        response = client.post("/generate/redo", json=input_data)
        assert response.status_code == 200
        assert "generated_note" in response.json()

    def test_generate_redo_invalid_input(self, client):
        input_data = {
            "invalid_key": "Invalid input"
        }
        response = client.post("/generate/redo", json=input_data)
        assert response.status_code == 422  # Unprocessable Entity

if __name__ == "__main__":
    pytest.main([__file__, "-v"])