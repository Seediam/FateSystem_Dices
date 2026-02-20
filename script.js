// Importa o SDK Oficial do Owlbear Rodeo
import OBR from "https://cdn.jsdelivr.net/npm/@owlbear-rodeo/sdk@3.1.0/lib/index.mjs";

// Espera que a sala do Owlbear esteja totalmente carregada
OBR.onReady(() => {
  
  document.getElementById('btn-rolar').addEventListener('click', () => {
    
    // Pega nos valores dos inputs
    const forca = parseInt(document.getElementById('qtd-forca').value) || 0;
    const magia = parseInt(document.getElementById('qtd-magia').value) || 0;
    const agilidade = parseInt(document.getElementById('qtd-agilidade').value) || 0;
    const sorte = parseInt(document.getElementById('qtd-sorte').value) || 0;

    let notacao = [];

    // Monta a notação de dados para ser lida pelos plugins 3D
    if (forca > 0) notacao.push(`${forca}d20{Red}`);
    if (magia > 0) notacao.push(`${magia}d20{Blue}`);
    if (agilidade > 0) notacao.push(`${agilidade}d20{Purple}`);
    if (sorte > 0) notacao.push(`${sorte}d20{Green}`);

    if (notacao.length === 0) {
      alert("Coloque pelo menos 1 dado em algum atributo!");
      return;
    }

    const comandoDeRolagem = notacao.join(" + ");

    // Envia o comando para o plugin "dddice" (o mais famoso do Owlbear)
    OBR.broadcast.sendMessage("dddice/roll", {
      equation: comandoDeRolagem,
      theme: "dddice-standard"
    });

    // Envia também para o plugin "Dice+" (como segurança)
    OBR.broadcast.sendMessage("dice-plus/roll", {
      notation: comandoDeRolagem
    });

    // Zera os valores após rolar
    document.getElementById('qtd-forca').value = 0;
    document.getElementById('qtd-magia').value = 0;
    document.getElementById('qtd-agilidade').value = 0;
    document.getElementById('qtd-sorte').value = 0;
  });
});
