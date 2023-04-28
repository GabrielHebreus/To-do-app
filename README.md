# CheckPointII-AppToDo
Criar um site estilo To Do App

Autores (Contribuições)

Douglas Henrique Ferreira de Oliveira e Bruno Souza
Principais atividades realizadas:
Criação de Funções
Comunicação e Configuração com a API;
Endpoint: /login
Endpoint: /cadastro
Endpoint: /tarefas
Revisões de código;

Gabriel Hebreus
Principais atividades realizadas:
Tela de Tarefas;
Endpoint: /criarCadastro;
Animação das Tarefas

Erick Cardoso
Principais atividades realizadas:
Captura dos componentes via Dom.
Revisões de código;

Fernanda
Principais atividades realizadas:
Alertas e pop-up;
Validações dos campos no Projeto


Checkpoint II - Front End II
To Do App
Ao longo deste assunto, veremos diferentes conceitos e ferramentas que nos permitirão evoluir como desenvolvedores front-end ao longo de nossa carreira profissional.
Mas que melhor maneira de internalizar esses conceitos do que colocá-los em prática?
Para isso, propomos a realização de um projeto que servirá para reforçar os conceitos vistos ao longo do curso e esclarecer eventuais dúvidas. Ao mesmo tempo, permitirá que você tenha um projeto finalizado e funcional em seu portfólio pessoal.
Este projeto consiste em um pequeno aplicativo de gerenciamento de tarefas, dentro do qual podemos realizar as seguintes atividades:
Ver tarefas pendentes.
Ver tarefas terminadas.
Marcar uma tarefa como terminada.
Criar tarefas novas.
Visualizar a data de criação de uma tarefa.
Remover tarefas.
Além do citado acima, implementaremos um sistema de autenticação de usuários, que inclui o processo de registro e login.
Parece difícil?
Não se preocupe, faremos isso ao longo do curso e ajudaremos permanentemente a avançar. Talvez algumas das coisas que mencionamos você ainda não saiba como as faremos, porque estamos apresentando todas as funções que a página terá e algumas ainda não vimos, são spoilers de tópicos das aulas que teremos!
Para começar, apresentamos uma visão inicial de como será nosso aplicativo para você se familiarizar com ele e começar a trabalhar pouco a pouco em cada uma das funcionalidades. Para fazer isso, você pode baixar o código no link a seguir:

Disponível no google drive:
https://drive.google.com/file/d/1ioUwlmPkWQP-olMPFhFwufaGQoO-85_P/view?usp=sharing

Disponível no GitHub:
https://github.com/PedagogiaDHBrasil/DH-FrontEnd2-ToDoApp-ProjetoBase



Cada tela terá sua responsabilidade e funcionalidade. A seguir, falaremos um pouco do que cada tela irá fazer no final do projeto.
Login

	Na tela do login, deve-se desbloquear o botão de login  quando os campos estão preenchidos e o campo de email está validado. Também terá um hiperlink para o usuário ir para a tela de SignUp.


Sign Up

	Na tela de SignUp, como o nome já diz, o usuário deve preencher os dados da sua conta. Campos de Nome e Sobrenome não devem estar vazios e o campo de email deve conter um email válido para que o formulário não apresente erros e a operação seja concluída com sucesso.




Tarefas

	Ao logar, o usuário verá a tela de tarefas. No topo desta tela, deverá ser carregado o nome do usuário logado e também um botão para o logout. Também terá um campo que não pode estar vazio e terá uma quantidade mínima de 5 caracteres, onde a tarefa será descrita. Esses dados da tarefa serão enviados para uma api quando o botão for clicado. O retorno dessa api será exibido nos blocos de Tarefas Pendentes e Tarefas Terminadas. 
Note que as tarefas pendentes poderão ser finalizadas ao clicar no botão roxo à esquerda e as tarefas terminadas podem ser colocadas novamente como pendentes ao clicar no ícone de seta em semicírculo e excluídas ao clicar no ícone da lixeira no canto direito.
Nas aulas finais, essas telas receberão algumas melhorias na qualidade da experiência do usuário como skeleton na hora de carregar as tarefas vindas da API e um ícone de Loading enquanto ocorre o processo de login e de cadastro do usuário.


Por fim teremos uma aplicação completa que conta com Login, Sign Up, Listagem de tarefas, criação e exclusão de tarefas. Novamente, fique tranquilo, pois esses requisitos serão feitos passo a passo durante as mesas de trabalho.
