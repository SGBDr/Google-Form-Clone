let init = function(){
    $('.dele').click(function(){
        $(this).parent().parent().replaceWith('');
    })
    $('.add').click(function(){
        $(this).parent().parent().find('.reponses').append('&rarr; <input type="text" placeholder="Reponses" class="reponse"><br>')
    })
}
let z;
init()

$('#ajouteQ').click(function(){
    $('#add-q').removeClass('off')
})

$('#viderQ').click(function(){
    $('.question').replaceWith('')
})

$('#type').click(function(){
    let a = $(this).val();
    (a == 'Q/R') ? $('.in1').addClass('off') : $('.in1').removeClass('off')
})

$("#addbb").click(function(){
    if($('.in2').val() !== ""){
        if($('#type').val() === 'Q/R'){
            let temp = '<div class="question">' +
             '<h2 class="ques">'+ $('.in2').val() +'</h2>' +
                '<div align="right">'+
                    '<hr>'+
                    '<button class="dele">Supprimer</button>'+
                    '<button class="add">Ajouter Questions</button>'+
                '</div>'+
                '<hr>'+
            '</div>'
            $('#questions').append(temp)
            init()
            $('#add-q').addClass('off')
        }else{
            if($('.in1').val() !== ""){
                let temp = '<div class="question">'+
                '<h2 class="ques">'+ $('.in2').val() +'</h2>'+
                '<div class="reponses">'
                for(let i = 1 ; i <= parseInt($('.in1').val()) ; i++)temp += '&rarr; <input type="text" placeholder="Reponses" class="reponse"><br>'
                temp += '</div>'+
                '<div align="right">'+
                    '<hr>'+
                    '<button class="dele">Supprimer</button>'+
                    '<button class="add">Ajouter Questions</button>'+
                '</div>'+
                '<hr>'+
                '</div>'
                $('#questions').append(temp)
                init()
                $('#add-q').addClass('off')
            }
        }
    }
    $('.in2').val("")
})

let vQ = function(list){
    for(let i = 0 ; i < list.length ; i++)if(list[i].value.trim() === "")return false;
    return true;
}

$('.b1').click(function(){
    $('#error')[0].innerText = ""
    if($('#f-titre').val() !== ""){
        if(vQ($('.reponse'))){
            if($('.question').length >= 1){
                let form = $('#f-titre').val() + '!!!' + $('#f-stitre').val() + '!!!';
                for(let i = 0 ; i < $('.question').length ; i++){
                    form += $('.question:eq('+i+')').find('.ques')[0].innerText + ((0 === $('.question:eq('+i+')').find('.reponse').length) ? "" : "---")
                    let q  = ""
                    for(let j = 0 ; j < $('.question:eq('+i+')').find('.reponse').length ; j++)q += $('.question:eq('+i+')').find('.reponse')[j].value + ((j === $('.question:eq('+i+')').find('.reponse').length - 1) ? "" : "%%%")
                    form += q + ((i === $('.question').length - 1) ? "" : "///")
                }
                $.ajax({
                    url : "../php/AddForm.php",
                    type : "POST",
                    data : "form=" + form + "&name=" + $('#f-titre').val(),
                    success : function(html){
                        $('body').append(html)
                        location.href = "../html/Manager.html?" + $('#f-titre').val()
                    }
                })
            }else{
                $('#error')[0].innerText = "Le Formulaire Doit Avoir Au Moins Quatres Questions"
            }
        }else{
            $('#error')[0].innerText = "Une Ou Plusieurs Questions N'ont Pas Ete Renseigner"
        }
    }else{
        $('#error')[0].innerText = "Le Titre Doit Etre Renseigner !"
    }
})
