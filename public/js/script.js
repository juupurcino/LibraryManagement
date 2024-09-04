function verSenha() {
    let input = document.getElementById("inpute");
    let span = document.getElementById("span");

    if(input.type == "text"){
        input.type = "password";
        span.innerHTML = "visibility_off";
    }else{
        input.type = "text";
        span.innerHTML = "visibility";
    }
}

function verSenha2() {
    let input = document.getElementById("inpute2");
    let span = document.getElementById("span2");

    if(input.type == "text"){
        input.type = "password";
        span.innerHTML = "visibility_off";
    }else{
        input.type = "text";
        span.innerHTML = "visibility";
    }
}

function favoritar(id) {
    let img = document.getElementById("img"+id);
    
    console.log(img.src);
    
    if(img.src == "http://localhost:3000/img/starv.png"){
        img.src = "/img/star.png";
    }else{
        img.src = "/img/starv.png";
    }
    
    var form = document.getElementById('favoritosForm' + id);
    form.submit();
}