//listar nutrientes

const ul = document.querySelector(".containerListaProdutos ul");
let produtosCarrinho = [];

function montarListaProdutos(listaProdutos) {
  ul.innerHTML = "";
  listaProdutos.forEach((produto) => {
    const li = document.createElement("li");
    const img = document.createElement("img");
    const h3 = document.createElement("h3");
    const span = document.createElement("span");
    const p = document.createElement("p");
    const button = document.createElement("button");

    button.className = "botaoComprar";
    button.id = produto.id;

    img.src = produto.img;
    img.alt = produto.nome;
    h3.innerText = produto.nome;
    span.innerText = produto.secao;
    p.innerText = `R$ ${produto.preco}`;
    button.innerText = "Comprar";

    li.append(img, h3, span, p, button);
    ul.append(li);

    button.addEventListener("click", addProdCarrinho);
  });
}
montarListaProdutos(produtos);

const botaoBuscarTodos = document.querySelector(
  ".estiloGeralBotoes--mostrarTodos"
);

botaoBuscarTodos.addEventListener("click", mostrarTodos);

function mostrarTodos() {
  montarListaProdutos(produtos);
}

const botaoMostrarHortifruti = document.querySelector(
  ".estiloGeralBotoes--filtrarHortifruti"
);

botaoMostrarHortifruti.addEventListener("click", filtrarPorHortifruti);

function filtrarPorHortifruti() {
  const listaHortifruti = produtos.filter((produto) => {
    return produto.secao === "Hortifruti";
  });
  montarListaProdutos(listaHortifruti);
}

const botaoMostrarPanificadora = document.querySelector(
  ".estiloGeralBotoes--filtrarPanificadora"
);

botaoMostrarPanificadora.addEventListener("click", filtrarPorPanificadora);

function filtrarPorPanificadora() {
  const listaPanificadora = produtos.filter((produto) => {
    return produto.secao === "Panificadora";
  });
  montarListaProdutos(listaPanificadora);
}

const botaoMostrarLaticinio = document.querySelector(
  ".estiloGeralBotoes--filtrarLaticínio"
);

botaoMostrarLaticinio.addEventListener("click", filtrarPorLaticinio);

function filtrarPorLaticinio() {
  const listaLaticinio = produtos.filter((produto) => {
    return produto.secao === "Laticinio";
  });
  montarListaProdutos(listaLaticinio);
}

const botaoBuscarPorNome = document.querySelector(
  ".estiloGeralBotoes--botaoBuscaPorNome"
);

botaoBuscarPorNome.addEventListener("click", nomeItem);

const input = document.querySelector("#inputBuscar");

function nomeItem() {
  const inputValueMinuscula = input.value.toLowerCase();
  const listaNomeItem = produtos.filter((produto) => {
    return (
      produto.nome.toLowerCase() === inputValueMinuscula ||
      produto.secao.toLowerCase() === inputValueMinuscula
    );
  });
  montarListaProdutos(listaNomeItem);
}

input.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    nomeItem();
  }
});

function itemCarrinho(carrinho) {
  const addCarrinho = document.querySelector(".carrinho");

  addCarrinho.innerHTML = "";

  carrinho.forEach((produto) => {
    const div = document.createElement("div");
    const img = document.createElement("img");
    const h3 = document.createElement("h3");
    const span = document.createElement("span");
    const p = document.createElement("p");
    const button = document.createElement("button");

    div.className = "carrinho__conteudo";
    img.className = "carrinho__img";
    h3.className = "carrinho__nomeItem";
    span.className = "carrinho__sessaoItem";
    p.className = "carrinho__precoItem";
    button.className = "carrinho__removeItem";

    img.src = produto.img;
    img.alt = produto.nome;
    h3.innerText = produto.nome;
    span.innerText = produto.secao;
    p.innerText = `R$ ${produto.preco}`;
    button.innerText = "Remover";

    div.append(img, h3, span, p, button);
    addCarrinho.append(div);

    button.addEventListener("click", () => removeProdCarrinho(produto));
  });
}

function addProdCarrinho(event) {
  const comprar = event.target;
  for (let i = 0; i < produtos.length; i++) {
    if (produtos[i].id == comprar.id) {
      produtosCarrinho.push(produtos[i]);
    }
  }
  itemCarrinho(produtosCarrinho);
  quantidadeCarrinho(produtosCarrinho);
  somarTotalItems(produtosCarrinho);
  return produtosCarrinho;
}

function removeProdCarrinho(item) {
  let result = 0;
  produtosCarrinho = produtosCarrinho.filter((produto) => {
    if (produto.id !== item.id) {
      result += Number(produto.preco);
      return true;
    }
    return false
  });
  const valorItem = document.querySelector("#precoTotal");
  valorItem.innerText = `R$ ${result}`;
  itemCarrinho(produtosCarrinho);
}

function somarTotalItems(array) {
  let result = 0;
  for (let i = 0; i < array.length; i++) {
    result += Number(array[i].preco);
  }
  const valorItem = document.querySelector("#precoTotal");
  valorItem.innerText = `R$ ${result}`;
}

function quantidadeCarrinho(array) {
  const span = document.querySelector("#quantidadeItem");
  span.innerText = array.length;
}
