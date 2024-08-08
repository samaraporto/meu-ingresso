window.addEventListener("load", main);

let carrinho = []
let filmes = []

async function main() {
  //obtem os filmes do backend
  const dados = await fetch('http://localhost:3000/api/filmes')
  const dadosPuros = await dados.json()

  filmes = dadosPuros

  const miCarrinho = localStorage.getItem("meuingresso-carrinho")
  if (miCarrinho == null) {
    localStorage.setItem("meuingresso-carrinho", "[]")
  } else {
    carrinho = JSON.parse(miCarrinho);

    const carrinhoItens = document.getElementById("carrinho-itens");
    for (let x = 0; x < carrinho.length; x++) {
      const elementoCarrinho = criarElementoDoLocalStorage(carrinho[x]);
      carrinhoItens.innerHTML += elementoCarrinho;
    }
    adicionarEventoDeExclusao();
    atualizarValorTotal();
  }

  const divFilmes = document.getElementById("filmes");

  for (let x = 0; x < filmes.length; x++) {
    // PASSO1: Criar os elementos do filme
    const divFilme = document.createElement("div");
    const imgFilme = document.createElement("img");
    const h2Filme = document.createElement("h2");
    const pFilme = document.createElement("p");
    const ulFilme = document.createElement("ul");
    const li1Filme = document.createElement("li");
    const li2Filme = document.createElement("li");
    const li3Filme = document.createElement("li");
    const li4Filme = document.createElement("li");
    const buttonFilme = document.createElement("button");

    // PASSO 2: Configurar as propriedades/valores de cada elemento
    divFilme.className = "filme";
    divFilme.id = x;

    imgFilme.src = filmes[x].img;
    imgFilme.width = "100";
    imgFilme.height = "150";

    h2Filme.textContent = filmes[x].titulo;
    pFilme.textContent = filmes[x].descricao;

    li1Filme.textContent = "Ano: " + filmes[x].ano;
    li2Filme.textContent = `Direção: ${filmes[x].direcao}`;
    li3Filme.textContent = `Gênero: ${filmes[x].genero}`;
    li4Filme.textContent = `Valor: R$${filmes[x].valor}`;
    buttonFilme.textContent = "Adicionar ao carrinho";
    buttonFilme.addEventListener("click", adicionarNoCarrinho);

    // PASSO 3: Adicionar os elemento em tela para renderização

    divFilme.appendChild(imgFilme);
    divFilme.appendChild(h2Filme);
    divFilme.appendChild(pFilme);

    ulFilme.appendChild(li1Filme);
    ulFilme.appendChild(li2Filme);
    ulFilme.appendChild(li3Filme);
    ulFilme.appendChild(li4Filme);

    divFilme.appendChild(ulFilme);
    divFilme.appendChild(buttonFilme);

    divFilmes.appendChild(divFilme);
  }
}

function adicionarNoCarrinho(event) {
  console.log(event.target.parentElement.id);

  const carrinhoItem = document.getElementById("carrinho-itens");
  
  // adicionar elemento
  carrinhoItem.innerHTML += criarElementoDoCarrinho(
    event.target.parentElement.id
  );

  // Adicionar evento de exclusão
  const excluirBotao = document.getElementsByClassName("excluir");
  for (let x = 0; x < excluirBotao.length; x++) {
    excluirBotao[x].addEventListener("click", excluirDoCarrinho);
  }

  atualizarValorTotal();
  atualizarLocalStorage();
}

function adicionarEventoDeExclusao() {
  const excluirBotao = document.getElementsByClassName("excluir");
  for (let x = 0; x <excluirBotao.length; x++) {
    excluirBotao[x].addEventListener("click", excluirDoCarrinho);
  }
}

function atualizarLocalStorage() {
  const elementosCarrinho = document.querySelectorAll(".carrinho-item");
  let cElementos = []
  for (let x = 0; x < elementosCarrinho.length; x++) {
    const nome = elementosCarrinho[x].children[0].textContent;
    const preco = elementosCarrinho[x].children[2].textContent;
    const qtd = elementosCarrinho[x].children[1].value;
    const obj = {
      nome,
      preco,
      qtd
    }
    cElementos.push(obj)
  }
  carrinho = cElementos;
  localStorage.setItem("meuingresso-carrinho", JSON.stringify(carrinho));
  console.log(cElementos);
}

function excluirDoCarrinho(evento) {
  evento.target.parentElement.remove();
  atualizarLocalStorage();
  atualizarValorTotal();
}

function criarElementoDoCarrinho(id) {
  const filme = filmes[id];
  const carrinhoItem = `
        <div class="carrinho-item">
            <p>${filme.titulo}</p>
            <input value="1">
            <p class="preco">R$ ${filme.valor}</p>
            <button class="excluir">X</button>
        </div>
    `;
  return carrinhoItem;
}

//  {nome: "Alguma coisa", preco: "R$ 3.00", qtd: 1}
function criarElementoDoLocalStorage(obj) {
  const carrinhoItem = `
        <div class="carrinho-item">
            <p>${obj.nome}</p>
            <input value="${obj.qtd}">
            <p class="preco">${obj.preco}</p>
            <button class="excluir">X</button>
        </div>
    `;
  return carrinhoItem;
}

function atualizarValorTotal() {
    const precos = document.getElementsByClassName("preco");
    let total = 0;
    for (let x = 0; x < precos.length; x++) {
        const preco = +precos[x].textContent.replace("R$ ", "");
        total += preco;
    }

    const pTotal = document.getElementById("total");
    pTotal.textContent = `Total: R$ ${total.toFixed(2).replace(".", ",")}`;

    const bFinalizar = document.getElementById("finalizar-compra");

    if (precos.length > 0) {
        bFinalizar.classList.add("botao")
        bFinalizar.disabled = "false"
    } else {
        bFinalizar.classList.remove("botao")
        bFinalizar.disabled = "true"
    }
    atualizarHeader(precos.length);
}

function atualizarHeader(qtd){
  const itemCount = document.getElementsByClassName("item-count");
  itemCount[0].textContent = qtd;
}
