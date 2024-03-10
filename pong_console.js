const readline = require('readline');

// Define as dimensões do campo de jogo
const larguraCampo = 80;
const alturaCampo = 20;

// Define as posições iniciais da bola e das raquetes
let bolaX = larguraCampo / 2;
let bolaY = alturaCampo / 2;
let raqueteEsquerdaY = alturaCampo / 2;
let raqueteDireitaY = alturaCampo / 2;

// Define as direções iniciais da bola
let dirX = 1;
let dirY = 1;

// Define as teclas de controle das raquetes
const teclaRaqueteEsquerda = 'w';
const teclaRaqueteDireita = 's';

// Função para desenhar o campo de jogo
function desenharCampo() {
    let campo = '';
    for (let y = 0; y < alturaCampo; y++) {
        for (let x = 0; x < larguraCampo; x++) {
            if (x === 0 || x === larguraCampo - 1) {
                campo += '|';
            } else if ((x === 1 || x === larguraCampo - 2) && (y === raqueteEsquerdaY || y === raqueteDireitaY)) {
                campo += '#';
            } else if (x === bolaX && y === bolaY) {
                campo += 'o';
            } else {
                campo += ' ';
            }
        }
        campo += '\n';
    }
    console.clear();
    console.log(campo);
}

// Função para atualizar a posição da bola
function moverBola() {
    bolaX += dirX;
    bolaY += dirY;

    // Verifica colisão com as paredes superior e inferior
    if (bolaY === 0 || bolaY === alturaCampo - 1) {
        dirY = -dirY;
    }

    // Verifica colisão com as raquetes
    if ((bolaX === 2 && bolaY === raqueteEsquerdaY) || (bolaX === larguraCampo - 3 && bolaY === raqueteDireitaY)) {
        dirX = -dirX;
    }
}

// Função para mover as raquetes
function moverRaquetes(key) {
    if (key === teclaRaqueteEsquerda && raqueteEsquerdaY > 1) {
        raqueteEsquerdaY--;
    } else if (key === teclaRaqueteDireita && raqueteEsquerdaY < alturaCampo - 2) {
        raqueteEsquerdaY++;
    }
}

// Função principal
function iniciarJogo() {
    desenharCampo();

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Pressione Enter para iniciar...', () => {
        rl.close();
        setInterval(() => {
            moverBola();
            desenharCampo();
        }, 1000 / 10);

        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.on('data', (key) => {
            moverRaquetes(key.toString());
        });
    });
}

// Inicia o jogo
iniciarJogo();
