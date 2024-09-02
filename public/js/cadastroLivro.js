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

document.getElementById('addGenero').addEventListener('click', function() {
    
    let novoSelect = document.createElement('select');
    novoSelect.className = 'form-select genero';
    novoSelect.setAttribute('aria-label', 'Select gênero');
    
    let option = document.createElement('option');
    option.value = '';
    option.disabled = true;
    option.selected = true;
    option.textContent = 'Selecione o gênero';
    novoSelect.appendChild(option);
    
    for (let i = 0; i < genero.length; i++) {
        let option = document.createElement('option');
        option.value = 'genero[i].IDGenero';
        option.textContent = 'genero[i].Tipo';
        novoSelect.appendChild(option);
    };
    
    document.getElementById('generoFields').appendChild(novoSelect);
});
