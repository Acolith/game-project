let listaNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function escreverTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2})
}

function exibirMensagensIniciais() {
    escreverTextoNaTela('h1', 'Jogo do número secreto');
    escreverTextoNaTela('p', 'Escolha um número entre 1 e 100:');
}

exibirMensagensIniciais()

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        escreverTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas!' : 'tentativa!';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        escreverTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            escreverTextoNaTela('p', 'O número é menor.');
        } else {
            escreverTextoNaTela('p', 'O número é maior.');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeNumeroLista = listaNumerosSorteados.length;
    if (quantidadeNumeroLista == numeroLimite) {
        listaNumerosSorteados = [];
    }
    if (listaNumerosSorteados.includes('numeroEscolhido')) {
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagensIniciais();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}