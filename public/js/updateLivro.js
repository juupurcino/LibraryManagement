
function UpdateLivro(IDLivro) {
    
    let form = document.getElementById('Updatelivro')
    let 

}

<div class="modal fade" id="Update" tabindex="-1">
<div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
            <h2 class="modal-title" id="UpdataTitle">Editar</h2>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <form method="post" id="UpdateForm" action="/InsertBenefit/<%=login.IDUser%>">
                <div class="mb-3">
                    <label for="Email" class="form-label">Descrição:</label>
                    <input type="text" class="form-control" id="UpdateInput"  name="Description">
                </div>
                <button type="submit" class="btn btn-primary fw-bold text-uppercase">Editar</button>
            </form>
        </div>
    </div>
</div>
</div>