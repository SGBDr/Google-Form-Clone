function LancerMForm(){
    location.href = "../html/Form.html"
}

function ManagerMForm(){
    location.href = "../html/Manager.html"
}

let init = function(){
    let string = '{"title" : "nom", "description" : "decription", "questions" : []}';
    json = JSON.parse(string)
    question = JSON.parse('{"intitulé" : "votre nom ?", "type" : "QR" , "aws" : []}')
    json.questions.push(question)
    console.log(json)
}

init()