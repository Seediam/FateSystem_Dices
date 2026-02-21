import OBR from "https://cdn.jsdelivr.net/npm/@owlbear-rodeo/sdk@3.1.0/lib/index.mjs";

document.getElementById('btn-rolar').addEventListener('click', async () => {
  const status = document.getElementById('status-texto');
  
  const forca = parseInt(document.getElementById('qtd-forca').value) || 0;
  const magia = parseInt(document.getElementById('qtd-magia').value) || 0;
  const agilidade = parseInt(document.getElementById('qtd-agilidade').value) || 0;
  const sorte = parseInt(document.getElementById('qtd-sorte').value) || 0;

  let notacao = [];

  // Padrão de cores suportado nativamente pelo Dice+
  if (forca > 0) notacao.push(`${forca}d20{Red}`);
  if (magia > 0) notacao.push(`${magia}d20{Blue}`);
  if (agilidade > 0) notacao.push(`${agilidade}d20{Purple}`);
  if (sorte > 0) notacao.push(`${sorte}d20{Green}`);

  if (notacao.length === 0) {
    status.innerText = "⚠️ Escolha pelo menos 1 dado!";
    status.style.color = "#ff5555";
    return;
  }

  const comandoDeRolagem = notacao.join(" + ");
  
  // Muda o texto na tela para você saber que o botão clicou!
  status.innerText = `Enviando: ${comandoDeRolagem}`;
  status.style.color = "#55ff55";

  try {
    if (OBR.isAvailable) {
      // Envia o comando para o Dice+
      OBR.broadcast.sendMessage("dice-plus/roll", {
        notation: comandoDeRolagem
      });
    } else {
      status.innerText = "Teste: Botão funciona, mas não está no Owlbear.";
    }
  } catch (erro) {
    status.innerText = `Erro de rede: ${erro}`;
    status.style.color = "#ff5555";
  }

  // Zera os contadores
  document.getElementById('qtd-forca').value = 0;
  document.getElementById('qtd-magia').value = 0;
  document.getElementById('qtd-agilidade').value = 0;
  document.getElementById('qtd-sorte').value = 0;
});
