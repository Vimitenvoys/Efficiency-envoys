

# Importing flask module in the project is mandatory
# An object of Flask class is our WSGI application.
from flask import Flask, render_template, request,jsonify,url_for
import pandas as pd
import numpy as np
import networkx as nx
from node2vec import Node2Vec
import joblib
from io import StringIO
import joblib
import matplotlib.pyplot as plt
import sys
import ipaddress
sys.modules['sklearn.externals.joblib'] = joblib
from sklearn.externals.joblib import load
# Flask constructor takes the name of 
# current module (__name__) as argument.
app = Flask(__name__)

model_pca = joblib.load('pca_model.joblib')
model_voting = joblib.load('new_ensemble_model.joblib')
names = [
        "txId1", "txId2", "ts","2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18",
        "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38",
        "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58",
        "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78",
        "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98",
        "99", "100", "101", "102", "103", "104", "105", "106", "107", "108", "109", "110", "111", "112", "113", "114", "115",
        "116", "117", "118", "119", "120", "121", "122", "123", "124", "125", "126", "127", "128", "129", "130", "131", "132",
        "133", "134", "135", "136", "137", "138", "139", "140", "141", "142", "143", "144", "145", "146", "147", "148", "149",
        "150", "151", "152", "153", "154", "155", "156", "157", "158", "159", "160", "161", "162", "163", "164", "165", "166",
        'Sender IP','Receiver IP','Transaction Amount (BTC)'
    ]
 
# The route() function of the Flask class is a decorator, 
# which tells the application which URL should call 
# the associated function.
@app.route('/')
# ‘/’ URL is bound with index() function.
def index():
     return render_template("index.html")

@app.route('/dashboard')
def analytics():
     return render_template("dashboard.html",trans=trans)


@app.route('/download',methods=['GET'])
def download_page():
    # print('i came',df.head(5))
    df.to_csv('static/files/results.csv',index=False,encoding='utf-8')
    return render_template("modelStatus.html")

import ipaddress

def ip_to_int(ip_address):
    try:
        # Parse the IP address
        ip_obj = ipaddress.IPv4Address(ip_address)

        # Convert the IP address to an integer
        ip_int = int(ip_obj)

        return ip_int
    except ValueError as e:
        print(f"Error: {e}")
        return None


def int_to_ip(ip_integer):
    try:
        # Convert the integer to an IPv4Address object
        ip_obj = ipaddress.IPv4Address(ip_integer)

        # Get the string representation of the IP address
        ip_address = str(ip_obj)

        return ip_address
    except ValueError as e:
        print(f"Error: {e}")
        return None

@app.route('/upload',methods=['GET', 'POST'])
def upload_page():
    if request.method=='POST':
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'})

        file = request.files['file']
        
        # print(type(file_content),file_content[0])
        # print(type(file_content.decode('utf-8')))

        if file.filename == '':
            return jsonify({'error': 'No selected file'})

        if file:
            file_content = file.read()
            # Save the uploaded file to a temporary location
            data=StringIO(file_content.decode('utf-8'))
            global df 
            df=pd.read_csv(data)
            df.columns=names
            print('sdsd')
            columns=df.columns[3:168]
            print(columns)
            df=df.dropna()
            X_pca = model_pca.transform(df.iloc[:,3:168])
            columns=df.columns[3:168]
            print('fsfafa')
            df.drop(columns=columns, axis=1,inplace=True)
            df[['pca_1','pca_2','pca_3','pca_4','pca_5','pca_6','pca_7','pca_8','pca_9','pca_10']]=X_pca
            print(df.head())
            # for index,data in df.iterrows():
            #     try:
            #         df.at[index,'Receiver IP']=int(ipaddress.IPv4Address(data['Receiver IP'].strip()))
            #     except Exception as e:
            #         df.at[index,'Receiver IP']=0000000000
            #         continue
            #     try:
            #         df.at[index,'Sender IP']=int(ipaddress.IPv4Address(data['Sender IP'].strip()))
            #     except Exception as e:
            #         df.at[index,'Sender IP']=0000000000
            #         continue
            df['Receiver IP']=df['Receiver IP'].map(ip_to_int)
            df['Sender IP']=df['Sender IP'].map(ip_to_int)
            predictions = model_voting.predict(df)
           
            df['prediction']=predictions
            
            total_transaction=len(predictions)
            legal_transaction=len(df[df['prediction']==2])
            illegal_transaction=len(df[df['prediction']==1])
            df['Receiver IP']=df['Receiver IP'].map(int_to_ip)
            df['Sender IP']=df['Sender IP'].map(int_to_ip)
            global trans
            trans={'total':total_transaction,'legal':legal_transaction,'illegal':illegal_transaction}
            print('*'*80)
            print(trans)
            print(df.head())
            #df = df.astype(str)

            # You can now use 'predictions' as needed

            return render_template("modelStatus.html")
    return  render_template("upload.html")   

def save_graph():
    columnNames = [
        "txId1", "txId2", "ts","2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18",
        "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38",
        "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58",
        "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78",
        "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98",
        "99", "100", "101", "102", "103", "104", "105", "106", "107", "108", "109", "110", "111", "112", "113", "114", "115",
        "116", "117", "118", "119", "120", "121", "122", "123", "124", "125", "126", "127", "128", "129", "130", "131", "132",
        "133", "134", "135", "136", "137", "138", "139", "140", "141", "142", "143", "144", "145", "146", "147", "148", "149",
        "150", "151", "152", "153", "154", "155", "156", "157", "158", "159", "160", "161", "162", "163", "164", "165", "166",
        "Prediction"
    ]
    df.columns=columnNames

    # Create a graph from the DataFrame
   # Create a graph from the DataFrame
    G = nx.from_pandas_edgelist(df, 'txId1', 'txId2')


 
# main driver function
if __name__ == '__main__':
    app.run(debug=True)
