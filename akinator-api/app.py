import akinator
from googletrans import Translator
from flask import *
import json
import pickle
import os.path


#FUNCTION
def dumpSession(session) :
    with open('./akinator_session.s','wb') as f:
        mon_pickle = pickle.Pickler(f)
        mon_pickle.dump(session)

def loadSession() :
    session = dict()
    if os.path.exists('./akinator_session.s') :
        with open('./akinator_session.s','rb') as f:
            mon_depickle = pickle.Unpickler(f)
            session = mon_depickle.load()
    else :
        dumpSession(session)
    return session

def trans(translator,text,lang) :
    return translator.translate(text, dest=lang).text

#FIN FUNCTIONS


translator = Translator()

response_suggs = json.dumps([
            " - 'yes' or 'y' or '0' for YES",
            " - 'no' or 'n' or '1' for NO " ,
            " - 'i' or 'idk' or 'i dont know' or 'i don't know' or '2' for I DON'T KNOW",
            " - 'probably' or 'p' or '3'  PROBABLY",
            " - 'probably not' or 'pn' or '4' for PROBABLY NOT",
            " - 'back'  or 'b' or '5' for BACK"
        ])

app = Flask(__name__)

@app.route('/')
def index():
    return 'Akinator api '


@app.route('/start',methods=['GET','POST'])
def start():
    if request.method == "POST"  :
        data = request.form
        print(request.form)
        user = data['userId']
        lang = data['lang']        
        aki = akinator.Akinator()
        akinator_request = dict(loadSession())    
        akinator_request[user] = aki
        q = translator.translate(aki.start_game(), dest=lang).text
        akinator_request[user] = aki
        dumpSession(akinator_request)
        return json.dumps({'userId':user,'question':q,'lang':lang,'suggestion':response_suggs})
    else :
        return json.dumps('Akinator api')
        
@app.route('/games',methods=['GET','POST']) 
def run_game() :
    if request.method == "POST"  :
        data = request.form
        user = data['userId']
        lang = data['lang']
        answer = data['answer']
        win = False
        akinator_request = dict(loadSession())
        aki = akinator_request[user]
        progression = aki.progression
        if aki.progression >= 90 :
            aki.win()
            win = True
            name = translator.translate(aki.name, dest=lang).text
            picture = aki.picture
            del akinator_request[user]
            dumpSession(akinator_request)
            description = translator.translate(aki.description, dest=lang).text
            return json.dumps({'userId':user,'win':win,'name':name,'progression':aki.progression,'picture':aki.picture,'description':description})
        if answer.lower() == 'b' or answer.lower() == "back" or answer.lower() == "5":
            q = translator.translate(aki.back(), dest=lang).text
        else :
            q = translator.translate(aki.answer(answer), dest=lang).text
        akinator_request[user] = aki
        dumpSession(akinator_request)
        return json.dumps({'userId':user,'question':q,'suggestion':response_suggs,'lang':lang,'progression':aki.progression,'win':win})
    else :
        return json.dumps('Akinator api')

if __name__ == '__main__' :
    app.run(debug=True,port=8080,threaded=True) 