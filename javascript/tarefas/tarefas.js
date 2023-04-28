const tarefasPendentes = document.querySelector("tarefas-pendentes");
const cards = document.getElementById("cards");
const submitTarefas = document.getElementById("submitTarefas");
      submitTarefas.disabled= true;
      submitTarefas.style.cursor = "not-allowed";
const alertTarefas = document.getElementById("novatarefasalert");
const novaTarefa = document.getElementById("novaTarefa");
const closeApp = document.getElementById("closeApp");
//let quantidadeTarefas = document.getElementById("skeleton");


let jwt;
let nome;
let sobreNome;

onload = function(){
    //skeleton
    renderizarSkeletons(3, ".tarefas-pendentes");
    renderizarSkeletons(3, ".tarefas-terminadas");

    //console.log("A página carregou automáticamente.");
    jwt = sessionStorage.getItem("jwt");
    
    //console.log(jwt);
   
    buscarCadastroAPI();
    buscarTarefasApi();
    
}

closeApp.addEventListener('click', function(){

    nome = sessionStorage.getItem("nome");
    sobreNome = sessionStorage.getItem("sobreNome");

    Swal.fire({
        title: 'Realmente deseja sair da página ',
        text: ` ${nome} ${sobreNome}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
    }).then((result) => {
        if (result.isConfirmed) {
            sessionStorage.removeItem("jwt");
            window.location.href = "index.html";
        }else {
            window.location.href='./tarefas.html';
        }
  })
})

novaTarefa.addEventListener('keyup', function(){
    if (novaTarefa.value.length == ' ' || novaTarefa.value == 0){
        Swal.fire(
            'Campo tarefas não pode ser vazio!',
            '',
            'error'
            )
         
         setTimeout(() => {
            window.location.href ="tarefas.html";
          }, "2000");
    }else if(validarTextoTarefas(novaTarefa.value)!== true){
        Swal.fire(
            'Campo tarefas só aceita textos, por favor revise!',
            '',
            'error'
            )
         
         setTimeout(() => {
            window.location.href ="tarefas.html";
          }, "2000");

        
    }else{
        normalizaStringUsandoTrim(novaTarefa.value);
        submitTarefas.disabled= false;
        submitTarefas.style.cursor = "";
        
        
    }
})


submitTarefas.addEventListener("click",async function(e){
    
    let novaTarefaValue = novaTarefa.value;

    if(validaTarefas(novaTarefaValue)){
        
        e.preventDefault();
        novaTarefaValue = normalizaStringUsandoTrim(novaTarefaValue);
    
    let tarefaJs = {
        description: "",
        completed: false
    }

    tarefaJs.description = novaTarefa.value;
//    tarefaJs.completed = 

    let tarefaJson = JSON.stringify(tarefaJs);
    console.log(tarefaJson);
    CadastrarTarefasApi(tarefaJson);

    }else {
        alert('Tarefa não cadastrada!');
    }
})



function renderizaTarefasUsuario(listaTarefas) {


    /// Remover os skeletons da tela
    removerSkeleton(".tarefas-pendentes");
    removerSkeleton(".tarefas-terminadas");


    listaTarefasGlobal = listaTarefas;

    //Elemento pai
    let tarefasTerminadas = document.querySelector(".tarefas-terminadas");
    let tarefasPendentesDom = document.querySelector(".tarefas-pendentes");

    for (let tarefa of listaTarefas) {
        //console.log(tarefa);

        if (tarefa.completed) {
            const date = new Date();
      let timestamp = date.toLocaleDateString();
      let novaDiv = document.createElement("li");
      novaDiv.classList.add("tarefa");

      novaDiv.innerHTML = `   <div class ="done"/></div>
                                <div class="descricao">
                                <p class="nome">${tarefa.description}</p>
                                <div>
                              <button onclick="retornaTarefa(${tarefa.id})">
                                <i id="${tarefa.id}" class="fas fa-undo-alt change"></i>
                              <button>
                              <button onclick="deletarTarefa(${tarefa.id})">
                                <i id="${tarefa.id}" class="far fa-trash-alt"></i>
                              </button >
                              <p class="timestamp"> Finalizad em: ${timestamp}</p>
                              </div>                              
                              </div>                            
                             </div>
      `;
      tarefasTerminadas.appendChild(novaDiv);
        } else {
            // Tarefas pendentes
            //console.log("Tarefa pendente");
            const date = new Date();
            let timestamp = date.toLocaleDateString();
            // Criando um novo item <li>
            let li = document.createElement("li");
            li.classList.add("tarefa");

            li.innerHTML = `
                            <div class="not-done" id="${tarefa.id}" onclick="editarTarefa(${tarefa.id})"></div>
                            <div class="descricao">
                                <p class="nome">${tarefa.description}</p>
                                <p class="timestamp">Criado em: <i class="far fa-calendar-alt"></i> ${timestamp}</p>
                            </div>
                         `;

            tarefasPendentesDom.appendChild(li);
        }
    }
}
