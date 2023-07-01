const cores = ['verde', 'vermelho', 'azul', 'amarelo'];
let listaDeCoresDoJogo = [];
let listaDeCoresDoJogador = [];
let jogoComecou = false;
let podeTeclar = false;
let nivel;

document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && !jogoComecou) {
        iniciarJogo();
    }
    if (jogoComecou && podeTeclar && listaDeCoresDoJogador.length < listaDeCoresDoJogo.length) {
        switch (event.key) {
            case 'a':
                animacaoCliqueDoBotao('verde');
                adicionarCorClicada('verde');
                break;
            case 's':
                animacaoCliqueDoBotao('vermelho');
                adicionarCorClicada('vermelho');
                break;
            case 'z':
                animacaoCliqueDoBotao('amarelo');
                adicionarCorClicada('amarelo');
                break;
            case 'x':
                animacaoCliqueDoBotao('azul');
                adicionarCorClicada('azul');
                break;
        }
    }
});

document.querySelectorAll('.botao').forEach(function (botao) {
    botao.addEventListener('click', function () {
        if (jogoComecou && podeTeclar && listaDeCoresDoJogador.length < listaDeCoresDoJogo.length) {
            const corDoBotaoClicado = this.getAttribute('id');
            animacaoCliqueDoBotao(corDoBotaoClicado);
            adicionarCorClicada(corDoBotaoClicado);
        }
    })
});

document.getElementById('cliqueAqui').addEventListener('click', function () {
    iniciarJogo();
});

function iniciarJogo() {
    podeTeclar = true;
    jogoComecou = true;
    nivel = 0;
    document.getElementById('cliqueAqui').classList.add('esconder');
    proximoNivelDoJogo();
}

function atualizarTextoNivel(texto) {
    document.getElementById('nivel').textContent = texto;
}

function corAleatoria() {
    let numeroAleatorio = Math.floor(Math.random() * 4);
    let corAleatoria = cores[numeroAleatorio];
    return corAleatoria;
}

function proximoNivelDoJogo() {
    nivel++;
    atualizarTextoNivel('Nível ' + nivel);
    listaDeCoresDoJogo.push(corAleatoria());
    piscarCoresDoJogo();
}

function piscarCoresDoJogo() {
    podeTeclar = false;
    document.querySelector('.circuloPretoMenor').classList.add('verdeClaro');
    setTimeout(function () {
        for (let i = 0; i < listaDeCoresDoJogo.length; i++) {
            setTimeout(function () {
                animacaoCliqueDoBotao(listaDeCoresDoJogo[i]);
                if (i === listaDeCoresDoJogo.length - 1) {
                    setTimeout(function () {
                        podeTeclar = true;
                        document.querySelector('.circuloPretoMenor').classList.remove('verdeClaro');
                    }, 500);
                }
            }, 500 * i);
        };
    }, 250);
}
function adicionarCorClicada(corDoBotaoClicado) {
    listaDeCoresDoJogador.push(corDoBotaoClicado);
    checarResposta();
}

function checarResposta() {
    const posicaoAtual = listaDeCoresDoJogador.length - 1
    if (listaDeCoresDoJogo[posicaoAtual] === listaDeCoresDoJogador[posicaoAtual]) {
        if (listaDeCoresDoJogo.length === listaDeCoresDoJogador.length) {
            setTimeout(function () {
                listaDeCoresDoJogador = [];
                proximoNivelDoJogo();
            }, 1000);
        };
    }
    else {
        finalizarJogo();
    }
}

function finalizarJogo() {
    tocarSom('errado');
    animacao(".fundoRosa", "vermelho", 300);
    animacao('#' + 'cliqueAqui', 'esconder');
    listaDeCoresDoJogo = [];
    listaDeCoresDoJogador = [];
    jogoComecou = false;
    atualizarTextoNivel('Aperte ENTER para começar')
}

function tocarSom(cor) {
    const audio = new Audio('sons/' + cor + '.mp3');
    audio.play();
}

function animacao(elemento, classe, tempo) {
    document.querySelector(elemento).classList.add(classe);
    setTimeout(function () {
        document.querySelector(elemento).classList.remove(classe);
    }, tempo);
}

function animacaoCliqueDoBotao(corDoBotaoClicado) {
    tocarSom(corDoBotaoClicado);
    animacao('#' + corDoBotaoClicado, 'botaoAnimado', 100);
}