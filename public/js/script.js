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