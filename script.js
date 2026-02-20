// Importa o motor de dados 3D diretamente via CDN
import DiceBox from "https://unpkg.com/@3d-dice/dice-box@1.1.3/dist/dice-box.es.min.js";

// Inicializa a caixa de dados dentro da div #dice-box
const box = new DiceBox("#dice-box", {
  assetPath: "https://unpkg.com/@3d-dice/dice-box@1.1.3/dist/assets/",
  theme: "default",
  scale: 6, // Tamanho dos dados
  gravity: 2
});

// Prepara o motor 3D
box.init().then(() => {
  console.log("Motor de dados 3D pronto!");
});

// Função para rolar os dados ao clicar no botão
document.getElementById('btn-rolar').addEventListener('click', () => {
  
  // Pega os valores dos inputs
  const forca = parseInt(document.getElementById('qtd-forca').value) || 0;
  const magia = parseInt(document.getElementById('qtd-magia').value) || 0;
  const agilidade = parseInt(document.getElementById('qtd-agilidade').value) || 0;
  const sorte = parseInt(document.getElementById('qtd-sorte').value) || 0;

  // Monta a configuração dos dados. Só adiciona na rolagem se for maior que 0.
  let dadosParaRolar = [];

  if (forca > 0) dadosParaRolar.push({ sides: 20, qty: forca, themeColor: '#ff0000' });
  if (magia > 0) dadosParaRolar.push({ sides: 20, qty: magia, themeColor: '#0000ff' });
  if (agilidade > 0) dadosParaRolar.push({ sides: 20, qty: agilidade, themeColor: '#800080' });
  if (sorte > 0) dadosParaRolar.push({ sides: 20, qty: sorte, themeColor: '#00ff00' });

  // Se o jogador não escolheu nenhum dado, não faz nada
  if (dadosParaRolar.length === 0) {
    alert("Coloque pelo menos 1 dado em algum atributo!");
    return;
  }

  // Limpa rolagens anteriores e rola os novos dados!
  box.clear();
  box.roll(dadosParaRolar);
});
