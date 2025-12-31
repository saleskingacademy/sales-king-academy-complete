from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def health():
    return {
        "status": "LIVE",
        "system": "Sales King Academy",
        "mode": "production"
    }
