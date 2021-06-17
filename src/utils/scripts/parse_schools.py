import firebase_admin
from firebase_admin import credentials, firestore, auth
import requests
import time
from random import randrange
import csv
from tqdm import tqdm
import os
THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))
my_file = os.path.join(THIS_FOLDER, 'education-equation-firebase-adminsdk-hs319-976bea1c50.json')
csvPath = os.path.join(THIS_FOLDER, 'csv/uk_schools.csv')

cred = credentials.Certificate(my_file)
firebase_admin.initialize_app(cred)


db = firestore.client()

# Read csv
def run():
    data = list(csv.reader(open(csvPath)))
    count = 0
    for i in tqdm(range(1,len(data))):
        # If for some reason the school ID or name is empty
        if not data[i][0] or not data[i][5]:
            continue
        # Avoid overloading
        if i%50 == 0:
        	time.sleep(5)
        saveToFireStore(id=data[i][0], school_name=data[i][5])
        
def saveToFireStore(id, school_name):
	doc_ref = db.collection(u'schools').document(u'{}'.format(id))
	result = doc_ref.set({
		u'id': id,
		u'name': school_name
	})
    
# Run script
run()

