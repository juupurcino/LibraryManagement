var senha = $("#senha");
var click = false;

function mostrar() {

  click = !click;
  
  if (click) {
    senha.attr("type", "text");
  }else{
    senha.attr("type", "password");
  }
}