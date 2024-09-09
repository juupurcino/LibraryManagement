let photo = document.getElementById('imgFoto');
let file = document.getElementById('flImage');

// Add Livro
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
    select.innerHTML = copy;
    
    generoFields.appendChild(select);
}

function ClickUpdateLivro(id_Updated, id_genero) {
    let form = document.getElementById('Updatelivro');

    let foto = document.getElementById(`livroFoto${id_Updated}`).src;
    let titulo = document.getElementById(`livroTitulo${id_Updated}`).innerHTML;
    let desc = document.getElementById(`livroDesc${id_Updated}`).innerHTML;
    let autor = document.getElementById(`livroAutor${id_Updated}`).innerHTML;
    let ano = document.getElementById(`livroAno${id_Updated}`).innerHTML;
    let isbn = document.getElementById(`livroIsbn${id_Updated}`).innerHTML;
    let destaque = document.getElementById(`destaque${id_Updated}`).innerHTML;

    document.getElementById('Foto').src = foto;
    document.getElementById('updateTitulo').value = titulo;
    document.getElementById('updateAno').value = ano.substring(4);
    document.getElementById('updateAutor').value = autor.substring(7);
    document.getElementById('updateDesc').value = desc.substring(11);
    document.getElementById('UpdateIsbn').value = isbn.substring(5);

    if (destaque.trim() == "0") {
        document.getElementById('nao').checked = true;
        document.getElementById('sim').checked = false;
    } else {
        document.getElementById('sim').checked = true;
        document.getElementById('nao').checked = false;
    }

    form.action = `/UpdateLivro/${id_Updated}`;
}

function ClickDeleteLivro(id_Delete){
    
    let button = document.getElementById('delLivro');
    
    button.href = `/DeleteLivro/${id_Delete}`;
}

