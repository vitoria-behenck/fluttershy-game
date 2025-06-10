//declaração das variáveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

//captura os botões pelos IDs e adiciona evento de clique
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

//função que zera os valores das variáveis controladoras
function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;
  jogarNovamente();
  atualizaPlacar(0, 0);
  btnJogarNovamente.className = 'visivel';
  btnReiniciar.className = 'invisivel';
}

//função jogar novamente
function jogarNovamente() {
  jogar = true;
  let divis = document.getElementsByTagName("div");

  for (let i = 0; i < divis.length; i++) {
    if (divis[i].id == 0 || divis[i].id == 1 || divis[i].id == 2 || divis[i].id == 3 || divis[i].id == 4) {
      divis[i].className = "inicial";

      // Remove apenas imagens, mantendo o número dentro da div
      const filhos = Array.from(divis[i].childNodes);
      filhos.forEach(filho => {
        if (filho.tagName === 'IMG') {
          divis[i].removeChild(filho);
        }
      });
    }
  }
}


//função que atualiza o placar
function atualizaPlacar(acertos, tentativas) {
  desempenho = (acertos / tentativas) * 100;
  document.getElementById("resposta").innerHTML = 
    "Placar - Acertos: " + acertos + 
    " Tentativas: " + tentativas + 
    " Desempenho: " + Math.round(desempenho) + "%";
}

function insereImagem(obj, classe, src) {
  obj.className = classe;
  const img = new Image(100);
  img.src = src;
  obj.appendChild(img);
}

function insereSmile(obj) {
  insereImagem(obj, "acertou", "https://i.pinimg.com/736x/8c/18/02/8c1802842104e3745e5bda3cb70d6d18.jpg");
}

function insereSmileErrado(obj) {
  insereImagem(obj, "errou", "https://i.pinimg.com/736x/c3/10/a7/c310a7b59c2ad1c127a1467b05bb6afc.jpg");
}


//função que verifica se o jogador acertou
function verifica(obj) {
  if (jogar) {
    jogar = false;
    tentativas++;
    if (tentativas == 5) {
      btnJogarNovamente.className = 'invisivel';
      btnReiniciar.className = 'visivel';
    }

    let sorteado = Math.floor(Math.random() * 5); // de 0 a 4 inclusive

    if (parseInt(obj.id) === sorteado) {
      insereSmile(obj);
      acertos++;
    } else {
      const objSorteado = document.getElementById(sorteado);
      insereSmile(objSorteado);
      insereSmileErrado(obj);
    }

    atualizaPlacar(acertos, tentativas);
  } else {
    alert('Clique em "Jogar novamente"');
  }
}

//adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);
