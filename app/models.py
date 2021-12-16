from . import db

class Credential(db.Model):
    email = db.Column(db.String(50),primary_key=True)
    password = db.Column(db.String(50))
    dwellAvg = db.Column(db.Float())
    flightAvg = db.Column(db.Float())
    dwellSD = db.Column(db.Float())
    flightSD = db.Column(db.Float())

    def __init__(self,email,password,dwellAvg,flightAvg,dwellSD,flightSD):
        self.email = email
        self.password = password
        self.dwellAvg = dwellAvg
        self.flightAvg = flightAvg
        self.dwellSD = dwellSD
        self.flightSD = flightSD

    def __repr__(self):
        return "("+self.email+","+self.password+","+str(self.dwellAvg)+","+str(self.flightAvg)+","+str(self.dwellSD)+","+str(self.flightSD)+")"
        