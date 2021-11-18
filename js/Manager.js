let init = function(){
    $.ajax({
        url : '../php/Form.php',
        type : 'POST',
        data : "a=1",
        success : function(html){
            let tab = html.split('###')
            for(let i = 0 ; i < tab.length ; i++){
                let name = tab[i].split('---')[0]
                let description = tab[i].split('---')[1]
                let ch = '<div class="form">'+
                '<h3 class="title">'+ name +'</h3>'+
                '<small>'+ description +'</small>'+
                '</div>'
                $('#lis').append(ch)
            }
            click()
        }
    })
}

init()

let click = function(){
    $('.form').click(function(){
        $('.c-2').replaceWith('<div class="c-2"> </div>')
        let temp = $(this)
        $('#lien').attr('href', '../html/ReponseForm.html?' + $(this).find('.title')[0].innerText)
        $('#titre')[0].innerText = $(this).find('.title')[0].innerText 
        $('#sous-titre')[0].innerText = $(this).find('small')[0].innerText
        $.ajax({
            url : '../php/TakeQ.php',
            type : 'POST',
            data : 'form=' + $(this).find('.title')[0].innerText,
            success : function(html){
                let qs = html.split('###')
                console.log(qs)
                for (let index = 0; index < qs.length; index++) {
                    const q = qs[index];
                    $.ajax({
                        url : '../php/Gform.php',
                        type : 'POST',
                        data : 'form=' + temp.find('.title')[0].innerText + "&q=" + q,
                        success : function(htm){
                            console.log(htm)
                            let div = document.createElement('div')
                            div.classList.add('R-stat')
                            let canvas = document.createElement('canvas')
                            canvas.setAttribute('id', q);
                            canvas.classList.add('canvas')
                            graph(htm, canvas)
                            let h2 = document.createElement('h2')
                            h2.innerText = q
                            div.append(h2)
                            div.append(canvas)
                            $('.c-2').append(div);
                        }
                    })
                }
            }
        })
    })
}

let graph = function (chaine, canvas) {
      
    feather.replace()

    let resultats = chaine.split('###')

    let doc = []
    let cas = []
    let col = []

    for(let i = 0 ; i < resultats.length ; i++){
        let r = resultats[i]
        doc.push(r.split('---')[1])
        cas.push(r.split('---')[0])
        col.push('pink', 'gray', 'brown', 'white', 'black', 'yellow', 'orange', 'blue', 'green', 'whitesmoke', 'purple', 'red')
    }
    var myChart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: doc,
        datasets: [{
          data: cas,
          backgroundColor: col,
          borderColor: '#fff',
          borderWidth: 3,
          pointBackgroundColor: '#007bff'
        }]
      },
      options: {
        legend: {
          display: true
        }
      }
    })
}

