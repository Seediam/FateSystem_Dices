import OBR from "https://cdn.jsdelivr.net/npm/@owlbear-rodeo/sdk@3.1.0/lib/index.mjs";

// Nós ligamos o botão IMEDIATAMENTE, sem esperar o Owlbear!
document.getElementById('btn-rolar').addEventListener('click', async () => {
  
  const forca = parseInt(document.getElementById('qtd-forca').value) || 0;
  const magia = parseInt(document.getElementById('qtd-magia').value) || 0;
  const agilidade = parseInt(document.getElementById('qtd-agilidade').value) || 0;
  const sorte = parseInt(document.getElementById('qtd-sorte').value) || 0;

  let notacao = [];

  if (forca > 0) notacao.push(`${forca}d20@dddice-red`);
  if (magia > 0) notacao.push(`${magia}d20@dddice-blue`);
  if (agilidade > 0) notacao.push(`${agilidade}d20@dddice-purple`);
  if (sorte > 0) notacao.push(`${sorte}d20@dddice-green`);

  if (notacao.length === 0) {
    alert("Coloque pelo menos 1 dado em algum atributo!");
    return;
  }

  const comandoDeRolagem = notacao.join(" + ");

  // Esse alerta VAI aparecer, não importa onde você clique
  alert("Comando gerado: " + comandoDeRolagem);

  try {
    // Se estiver dentro do Owlbear, ele manda o rádio pro dddice
    if (OBR.isAvailable) {
      OBR.broadcast.sendMessage("dddice/roll", {
        equation: comandoDeRolagem
      });
      alert("Enviado para a mesa do Owlbear!");
    } else {
      alert("Você está testando no site normal. O botão funciona!");
    }
  } catch (erro) {
    alert("Erro de conexão: " + erro);
  }

  // Zera os contadores
  document.getElementById('qtd-forca').value = 0;
  document.getElementById('qtd-magia').value = 0;
  document.getElementById('qtd-agilidade').value = 0;
  document.getElementById('qtd-sorte').value = 0;
});
