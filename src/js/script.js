const ul = document.querySelector(".containerListaProdutos ul");

function montarListaProdutos(listaProdutos) {
  ul.innerHTML = "";
  listaProdutos.forEach((produto) => {
    const li = document.createElement("li");
    const img = document.createElement("img");
    const h3 = document.createElement("h3");
    const span = document.createElement("span");
    const p = document.createElement("p");
    

    img.src = produto.img;
    img.alt = produto.nome;
    h3.innerText = produto.nome;
    span.innerText = produto.secao;
    p.innerText = `R$ ${produto.preco}`;
    

    li.append(img, h3, span, p);
    ul.append(li);
  });
  somarTotalItems(produtos);
}
montarListaProdutos(produtos);

function filtrarPorHortifruti() {
  const listaHortifruti = produtos.filter((produto) => {
    return produto.secao === "Hortifruti";
  });
  montarListaProdutos(listaHortifruti);
  somarTotalItems(listaHortifruti);
}

const botaoMostrarHortifruti = document.querySelector(
  ".estiloGeralBotoes--filtrarHortifruti"
);

botaoMostrarHortifruti.addEventListener("click", filtrarPorHortifruti);

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
  somarTotalItems(listaNomeItem);
}

const botaoBuscarPorNome = document.querySelector(
  ".estiloGeralBotoes--botaoBuscaPorNome"
);

botaoBuscarPorNome.addEventListener("click", nomeItem);

input.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    nomeItem();
  }
});

function mostrarTodos() {
  montarListaProdutos(produtos);
  somarTotalItems(produtos);
}

const botaoBuscarTodos = document.querySelector(
  ".estiloGeralBotoes--mostrarTodos"
);

botaoBuscarTodos.addEventListener("click", mostrarTodos);

function somarTotalItems(array) {
  let result = 0;
  for (let i = 0; i < array.length; i++) {
    result += array[i].preco;
  }
  const valorItem = document.querySelector("#precoTotal");
  return (valorItem.innerText = `R$ ${result}`);
}
