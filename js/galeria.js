//Criando Slide Show
"use strict"

const limparElementos = (elemento) =>{
    //enquanto elemento tiver o primeiro filho
    while (elemento.firstChild){
        //remove o ultimo filho
        elemento.removeChild(elemento.lastChild)
    }
}
//Criando função assincrona para conssumir json
const pesquisarImagens = async (evento) => {
    //testando btão pressionado para fazer pesquisa
    if(evento.key == "Enter"){
        //recebendo value da input para pesquisar raca
        const raca = evento.target.value
        //recebendo url do json
        const url = "https://dog.ceo/api/breed/"+raca+"/images"
        //fazendo requisição 
        const imagensResposta = await fetch(url)
        //testando se imagensResposta.ok retorna true ou false
        if(imagensResposta.ok){
            //reduzindo 
            const imagens = await imagensResposta.json()
            //chamando função para Limpar elementos
            limparElementos(document.querySelector(".container-galeria"))
            limparElementos(document.querySelector(".container-slide"))

            //chamando função para carregar galeria e passando url
            carregarGaleria(imagens.message)
            carregarSlide(imagens.message)
        }
        else{
            alert("Raça Não encontrada")
        }
    }  
}



//função para filtrar a url para identificar o ID
const filtrarId= item =>{
    //filtrando onde começa o nome da imagem através da posição da ultima barra com lastIndexOf
    const ultimaBarra = item.lastIndexOf("/") + 1;
    //filtrando onde termina o nome da imagem através da posição d0 ultimo ponto com lastIndexOf
    const ultimoPonto = item.lastIndexOf(".");
    //retornando conteúdo entre a posição da UltimaBarra e UltimoPonto
    return item.substring(ultimaBarra, ultimoPonto);

}
//função para criar itens da caleria dentro do container-galeria a partir da url
const criarItem = item =>{
    const container = document.querySelector(".container-galeria");
    //Criando um novo elemento <a>
    const novoLink = document.createElement("a");
    novoLink.href = `#${filtrarId(item)}`;
    //utilizando classlist para adicionar uma classe ao novoLink
    novoLink.classList.add("itens-galeria");
    //neste caso innerHtml esta funcionando na memoria então não atualiza a patgina
    novoLink.innerHTML = `<img src="${item}">`;
    //adicionando novoLink no Container 
    container.appendChild(novoLink);


}
//Função para criar Slide dentro do .container-slide
const criarSlide = (item,indice,array) =>{
    const container =  document.querySelector(".container-slide");
    //criando um novo elemento<div> na memória
    const novaDiv = document.createElement("div");
    //adicionando uma classe a nova div
    novaDiv.classList.add("slide");
    //recebendo id com a função filtrar id
    novaDiv.id = filtrarId(item);

    //verificando se o indice é igual a 0 e retornando posição final do array ou indice anterior
    const indiceAnterior = indice == 0 ? array.length - 1 : indice -1;
    //recebendo id da imagem na posição retornada pelo indiceAnterior
    const slideAnterior = filtrarId(array[indiceAnterior]);

    //verificando se o indice é igual a ultima posição do array e retornando 0 se não + 1
    const indiceSeguinte = indice == array.length -1 ?  0 : indice + 1;
    //recebendo id da imagem na posição retornada pelo indiceSeguinte
    const slideSeguinte = filtrarId(array[indiceSeguinte]);

    //inserindo bloco html  na novaDiv
    novaDiv.innerHTML = `
        <div class="container-imagem">
            <a href="#"class="fechar">&#10006;</a>
            <a href="#${slideAnterior}"class="navegacao anterior">&#171;</a>
            <img src="${item}">
            <a href="#${slideSeguinte}"class="navegacao proximo">&#187;</a>
        </div>
    `
    //criando nova div no container
    container.appendChild(novaDiv);
}



//Função responsavel por apresentar imagens da galeria
//percorrendo com .foreach, percorre array e manda pro callback
const carregarGaleria = imagens => imagens.forEach(criarItem);

const carregarSlide = imagens => imagens.forEach(criarSlide);

pesquisarImagens()
// carregarGaleria(imagens);
// carregarSlide(imagens);

document.querySelector(".pesquisa-container input").addEventListener("keypress", pesquisarImagens)

