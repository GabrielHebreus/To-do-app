function validatorEmail(email) {
  let emailExpress = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  return emailExpress.test(email);
}

function validatorSenha(password) {
  let senhaExpress = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$/;
  return senhaExpress.test(password);
}

function validarTextoTarefas(tarefas) {
  let tarefaExpress = /[a-zA-Z\u00C0-\u00FF ]+/i;
  return tarefaExpress.test(tarefas);
}

// Função para normalizar a string 
function normalizaStringUsandoTrim(string) {
  return string.trim();
}

// Função para validar o login
function validaLogin() {
  return validatorEmail(email.value) !== "" && validatorSenha(password.value) !== "";
}

function validaCadastro() {
  return nome.value !== "" && sobreNome.value !== "" && validatorEmail(email.value) !== "" && validatorSenha(password.value) !== "";
}

function validaTarefas() {
  return novaTarefa.value !== "";
}

// Função apresentação para usuário formato alert caso API for true
function loginSucesso(token) {
  console.log(token);
  sessionStorage.setItem("jwt", token.jwt);
  
  Swal.fire(
    `Login Efetuado com Sucesso!`,
    `Seja Bem Vindo(a)`,
    'success'  
  )
  setTimeout(() => {
    window.location.href = "tarefas.html";
  }, "10000");
  
}

// Função apresentação para usuário formato alert caso API for false
function loginErro(erro) {
  console.log(erro);
  if (erro.status == 400) {
    Swal.fire(
      `E-mail e/ou senha inválidos!`,
      ``,
      'error'  
    )
    setTimeout(() => {
      window.location.href = "index.html";
    }, "5000");
    
  } else if (erro.status == 404) {
    Swal.fire(
      `Não foi possivel encontrar seus dados na nossa base, cliquei em ok para ir para se cadastrar!`,
      ``,
      'info'  
    )
    setTimeout(() => {
      window.location.href = "signup.html";
    }, "10000");
    }
}


async function cadastroAPI(cadastroUsuarioJson) {
  ///Async/Await

  let configRequest = {
    method: "POST",
    body: cadastroUsuarioJson,
    headers: { "Content-Type": "application/json" },
  }

  try { //Tentar executar uma ação/fluxo
    let respostaApi = await fetch(`https://todo-api.ctd.academy/v1/users`, configRequest);
    if (respostaApi.status == 201 || respostaApi.status == 200) {
      let dados = await respostaApi.json();
      cadastroSucesso(dados);
    } else {
      throw respostaApi;
    }
  } catch (error) {
    //Exceção
    cadastroErro(error);

  }
}

// Função apresentação para usuário formato alert caso API for true
function cadastroSucesso(usuario) {
  console.log(usuario);
  sessionStorage.setItem("jwt", usuario.jwt);
  sessionStorage.setItem("nome", nome.value);
  sessionStorage.setItem("sobreNome", sobreNome.value);
  Swal.fire(
    `Cadastro efetuado com sucesso!`,
    `Seja Bem Vindo(a) ${nome.value} ${sobreNome.value}`,
    'success'  
  )
  setTimeout(() => {
    window.location.href = "index.html";
  }, "10000");
  
}


function cadastroErro(erro) {
  console.log(erro);
  if (erro.status == 400) {
    Swal.fire(
      `Email ja cadastrado, clique em ok para fazer login!`,
      ``,
      'info'  
  )
    setTimeout(() => {
      window.location.href = "index.html";
    }, "10000");
  }else if( erro.status == 404){
    Swal.fire(
      `Erro ao Efetuar cadastro, por favor Revise!`,
      ``,
      'info'  
  )
    setTimeout(() => {
      window.location.href = "signup.html";
    }, "10000");
  }
}

async function buscarCadastroAPI() {
  ///Async/Await 
  let configRequest = {
    headers: {
      'Authorization': jwt

    }
  }

  try { //não usamos a função de capturar o caminho relativo pois estava dando erro ai colocamos o caminho direto
    let respostaApi = await fetch(`https://todo-api.ctd.academy/v1/users/getMe`, configRequest);
    if (respostaApi.status == 201 || respostaApi.status == 200) {
      let dados = await respostaApi.json();
      renderizaNomeUsuario(dados);
    } else {
      throw respostaApi;
    }
  } catch (error) {
    //Exceção
    console.log(error);
  }
}

function renderizaNomeUsuario(usuario) {
  const nomeTarefas = document.getElementById("nomeTarefas");
  nomeTarefas.innerText = `${usuario.firstName} ${usuario.lastName}`;
  sessionStorage.setItem("nome", usuario.firstName);
  sessionStorage.setItem("sobreNome", usuario.lastName);
}

async function CadastrarTarefasApi(tarefaJson) {
  ///Async/Await
  let configRequest = {
    method: "POST",
    body: tarefaJson,
    headers: {
      'Authorization': jwt,
      "Content-Type": "application/json"
    }
  }

  try { //Tentar executar uma ação/fluxo
    let respostaApi = await fetch(`https://todo-api.ctd.academy/v1/tasks`, configRequest);
    if (respostaApi.status == 201 || respostaApi.status == 200) {
      let dados = await respostaApi.json();
      cadastraTarefasUsuario(normalizaStringUsandoTrim(dados.description));
      removerSkeleton();
    } else {
      throw respostaApi;
    }
  } catch (error) {
    //Exceção
    console.log(error);
  }
}

function cadastraTarefasUsuario(tarefa) {
  console.log(tarefa);
  localStorage.setItem("jwt", tarefa.jwt);
  Swal.fire(
    `Tarefa Cadastrada com sucesso !`,
    ``,
    'success'  
  )
  setTimeout(() => {
    window.location.href = "tarefas.html";
  }, "3000");
}

async function buscarTarefasApi() {

  let configRequest = {
    headers: {
      'Authorization': jwt,
    }
  }

  try { //Tentar executar uma ação/fluxo
    let respostaApi = await fetch(`https://todo-api.ctd.academy/v1/tasks`, configRequest);
    if (respostaApi.status == 201 || respostaApi.status == 200) {
      let dados = await respostaApi.json();
      setTimeout(() => {
        renderizaTarefasUsuario(dados);
    }, 1500);
    } else {
      throw respostaApi;
    }
  } catch (error) {
    //Exceção
    console.log(error);
  }
}

function renderizaTarefasUsuario(tarefasUsuario) {

  let tarefasTerminadas = document.querySelector(".tarefas-terminadas");

  for (const tarefa of tarefasUsuario) {
    
    if (tarefa.completed) {
      const date = new Date();
      let timestamp = date.toLocaleDateString();
      let novaDiv = document.createElement("li");
      novaDiv.classList.add("tarefa");

      novaDiv.innerHTML = `   <div class ="done"></div>
                              <div class="descricao">
                              <p class="nome">${tarefa.description}</p>
                              <div>
                              <button><i id="${tarefa.id}" class="fas fa-undo-alt change"></i><button>
                              <button><i id="${tarefa.id}" class="far fa-trash-alt"></i></button>
                              </div>
                              </div>                              
                              <p class="timestamp">Criada em: ${timestamp}</p>
                          </div>
      `;
      tarefasTerminadas.appendChild(novaDiv);
    } else {
      const date = new Date();
      let timestamp = date.toLocaleDateString();
      let novaDiv = document.createElement("li");
      novaDiv.classList.add("tarefa");

      novaDiv.innerHTML = `
                              <div id="${tarefa.id}" class="not-done" onclick="editarTarefasUsuario(${tarefa.id})"></div>
                              <div class="descricao">
                              <p class="nome">${tarefa.description}</p>
                              <p class="timestamp">Criada em: ${timestamp}</p>
                          </div>
      `;
      cards.appendChild(novaDiv);
    }

  }

}

let isCancelled = false;

async function editarTarefa(idTarefa) {
  let tarefa = listaTarefasGlobal.find(e => e.id == idTarefa);

  let result = await Swal.fire({
    title: 'Deseja finalizar essa tarefa?',
    text: "Tem certeza?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, Tenho!'
  });

  if (!result.isConfirmed) {
    isCancelled = true;
    Swal.fire(
      'Canceleda!',
      'Sua Tarefa não foi finalizada.',
      'warning'
    )
    return;
  }
  
  let tarefaJs = { completed: !tarefa.completed };
    
  let tarefaJson = JSON.stringify(tarefaJs);
  
  let configRequest = {
    method: "PUT",
    body: tarefaJson,
    headers: {
      'id': idTarefa,
      'Authorization': jwt,
      "Content-Type": "application/json"
    }
  }
  
  try {
    if (isCancelled) return; 
    
    let respostaApi = await fetch(`https://todo-api.ctd.academy/v1/tasks/${idTarefa}`, configRequest);
    if (respostaApi.status == 201 || respostaApi.status == 200) {
      let dados = await respostaApi.json();
      renderizaTarefasUsuario(dados);
      window.location='tarefas.html';
    } else {
      throw respostaApi;
    }
  } catch (error) {
    console.log(error);
  }

  window.location.href = "tarefas.html";
}

async function retornaTarefa(idTarefa) {
  let tarefa = listaTarefasGlobal.find(e => e.id == idTarefa);

  let result = await Swal.fire({
    title: 'Deseja retomar essa tarefa?',
    text: "Tem certeza?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, Tenho!'
  });

  if (!result.isConfirmed) {
    isCancelled = true;
    await Swal.fire(
      'Canceleda!',
      'Sua Tarefa não foi retomada.',
      'warning'
    )
    return;
  }
  
  let tarefaJs = { completed: !tarefa.completed };
    
  let tarefaJson = JSON.stringify(tarefaJs);
  
  let configRequest = {
    method: "PUT",
    body: tarefaJson,
    headers: {
      'id': idTarefa,
      'Authorization': jwt,
      "Content-Type": "application/json"
    }
  }
  
  try {
    if (isCancelled) return; 
    
    let respostaApi = await fetch(`https://todo-api.ctd.academy/v1/tasks/${idTarefa}`, configRequest);
    if (respostaApi.status == 201 || respostaApi.status == 200) {
      let dados = await respostaApi.json();
      renderizaTarefasUsuario(dados);
      window.location='tarefas.html';
    } else {
      throw respostaApi;
    }
  } catch (error) {
    console.log(error);
  }

  window.location.href = "tarefas.html";
}

async function deletarTarefa(idTarefa) {
  let result = await Swal.fire({
    title: 'Deseja realmente excluir essa tarefa?',
    text: "Tem certeza?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, Tenho!'
  });

  if (!result.isConfirmed) {
    return;
  }
  
  let configRequest = {
    method: "DELETE",
    headers: {
      'id': idTarefa,
      'Authorization': jwt,
      "Content-Type": "application/json"
    }
  }
  
  try {
    let respostaApi = await fetch(`https://todo-api.ctd.academy/v1/tasks/${idTarefa}`, configRequest);
    if (respostaApi.status == 204) {
      Swal.fire(
        'Deletada!',
        'Sua Tarefa foi deletada.',
        'success'
      )
      // Atualiza a lista de tarefas na página
      let index = listaTarefasGlobal.findIndex(e => e.id == idTarefa);
      if (index !== -1) {
        listaTarefasGlobal.splice(index, 1);
        renderizaTarefasUsuario(listaTarefasGlobal);
      }
    } else {
      throw respostaApi;
    }
  } catch (error) {
    console.log(error);
  }
  window.location.href = "tarefas.html";
}

function mostrarSpinner() {
  // Selecionamos o corpo. Isso nos ajudará a incorporar nosso spinner
  // dentro de nosso HTML.
  const body = document.querySelector("body");

  // Selecionamos o formulário de registro para poder ocultá-lo durante o carregamento
  const form = document.querySelector("form");

  // Criamos nosso spinner
  const spinnerContainer = document.createElement("div");
  const spinner = document.createElement("div");
  const ingressar = document.getElementById("ingressar");
  ingressar.classList.add("hidden");

  // Atribuímos os IDs a cada novo elemento, para poder manipular
  // seus estilos
  spinnerContainer.setAttribute("id", "container-load");
  spinner.setAttribute("id", "load");

  // Ocultamos o formulário de registro
  form.classList.add("hidden");


  // Adicionamos o Spinner ao nosso HTML.
  spinnerContainer.appendChild(spinner);
  body.appendChild(spinnerContainer);

  return;
}

function ocultarSpinner() {
  // Selecionamos o corpo para poder remover o spinner do HTML.
  const body = document.querySelector("body");

  // Selecionamos o formulário de registro para poder mostrar-lo novamente
  const form = document.querySelector("form");

  // Selecionamos o spinner
  const spinnerContainer = document.querySelector("#conteiner-load");

  // Removemos o spinner do HTML
  body.removeChild(spinnerContainer);

  // Removemos a classe que oculta o formulário
  form.classList.remove("hidden");
  return;
}
