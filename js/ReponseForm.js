let MakeForm = function(form){
    $('.question').replaceWith('')
    let head = form.split('!!!')
    $('#titre')[0].innerText = head[0];
    $('#desc')[0].innerText = head[1];
    let questions = head[2].split('///')
    for(let j = 0 ; j < questions.length ; j++){
        question = questions[j]
        if(question.split('---').length !== 1){
            let qu = question.split('---')[0];
            let r = '<div class="question">'+
                '<h2 class="ques">'+ qu +'</h2>'
            let ques = question.split('---')[1].split('%%%');
            for(let i = 0 ; i < ques.length ; i++)r += '<input type="radio" class="select" name="'+qu+'" value="'+ques[i]+'" required> ' + ques[i] + ' <br>'
            r += '<hr>'+
            '</div>';
            $('#questions').append(r)
        }else{
            let qu = question.split('---')[0];
            let r = '<div class="question">'+
                '<h2 class="ques">'+ qu +'</h2>'+
                '<input type="text" placeholder="Votre Reponse SVP" class="input" name="'+qu+'" required>'+
                '<hr>'+
            '</div>';
            $('#questions').append(r)
        }
    }
    $('#questions').append('<input type="hidden" value="'+head[0]+'" name="naammee">')
}

if(location.href.split('?').length >= 2){
    $.ajax({
        url : "../php/TakeForm.php",
        type : "POST",
        data : "name=" + location.href.split('?')[1],
        success : function(html){
            MakeForm(html)
            $('#lien')[0].innerText = location.href
        }
    })

}else{
    location.href = "../html/index.html" 
}

$('.hh').click(function(){
    $('#hidden').val($('#lien')[0].innerText).select()
    document.execCommand('copy')  
})

$('#lien').click(function(){
    $('#hidden').val($('#lien')[0].innerText).select()
    document.execCommand('copy')
})

$('#rr').click(function(){
    $('#hidden').val($('#lien')[0].innerText).select()
    document.execCommand('copy')
})
