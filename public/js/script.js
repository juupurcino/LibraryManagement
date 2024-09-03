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