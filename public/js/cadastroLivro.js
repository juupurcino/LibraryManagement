let photo = document.getElementById('imgFoto');
let file = document.getElementById('flImage');

photo.addEventListener('click', () => {
    file.click();
});

file.addEventListener('change', () => {
    // Sem essa verificação, ele irá dar erro quando o usuário clicar em cancelar

    // pois enviará uma "imagem" vazia
    if (file.files.length == 0) {
        return;
    }

    // Inicializando a função que pega o caminho da imagem
    let reader = new FileReader();

    // Está pegando o caminho da imagem
    reader.readAsDataURL(file.files[0]);

    // Coloca o caminho da imagem no Source da tag IMG
    reader.onload = () => {
        photo.src = reader.result
    }
});

var count = 1;

    function adcgenero() {
        count += 1;

        const generoFields = document.getElementById('generoFields');
        const copy = document.getElementById('genero').innerHTML;
        const select = document.createElement('select');
        select.className = 'form-select genero';
        select.name = 'genero';
        // select.className = 'form-select genero';
        // select.setAttribute('aria-label', 'Select gênero');
        // select.name = 'genero';
        select.innerHTML = copy;

        generoFields.appendChild(select);
    }
