from app import db
from app.models import Credential



db.drop_all()
db.create_all()
