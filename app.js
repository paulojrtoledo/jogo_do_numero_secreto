let listadeNumerosSorteados = [];
let numeroLimite = 10;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto; 
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}


function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número de 1 a 10' );
}

exibirMensagemInicial();


let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1); 
    let quantidadeDeElementosNaLista = listadeNumerosSorteados.length; 

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listadeNumerosSorteados = []
    }

    if (listadeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listadeNumerosSorteados.push(numeroEscolhido);
        console.log(listadeNumerosSorteados);
        return numeroEscolhido; 
    }
}

function verificarChute() {
    let numberkick = document.querySelector('.container__input');
    let nkick = Number(numberkick.value);

    if (nkick == numeroSecreto) {
        exibirTextoNaTela('h1', 'Você Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela(`p`, `${mensagemTentativas}`);
        document.querySelector('#reiniciar').removeAttribute('disabled');
    } else {
        if (nkick > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function limparCampo() {
    let numberkick = document.querySelector('.container__input');
    numberkick.value = ''
}

function novoJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial(); 
    document.querySelector('#reiniciar').setAttribute('disabled', true);
}
