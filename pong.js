// Variáveis da Bolinha
let xBolinha = 300;
let yBolinha = 200;
let dimBolinha = 15;
let raio = dimBolinha / 2;

// Velocidade da Bolinha
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;

// Raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

let colidiu = false;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  mostraBolinha();
  mostraRaquete();
  movimentaBolinha();
  movimentaMinhaRaquete();
  verificaColisaoBorda();
  //verificaColisaoRaquete();
  colisaoMinhaRaqueteBiblioteca();
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, dimBolinha);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha
  yBolinha += velocidadeYBolinha
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1
  }
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1
  }
}

function mostraRaquete() {
  rect(xRaquete, yRaquete, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10
  }
}

function verificaColisaoRaquete() {
  if (xBolinha - raio < xRaquete + raqueteComprimento && 
      yBolinha - raio < yRaquete + raqueteAltura &&
      yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1
  }
}

function colisaoMinhaRaqueteBiblioteca() {
  colidiu = collideRectCircle(xRaquete, yRaquete, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu) {
    velocidadeXBolinha *= -1
  }
}
