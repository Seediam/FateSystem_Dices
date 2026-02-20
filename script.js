import OBR from "https://cdn.jsdelivr.net/npm/@owlbear-rodeo/sdk@3.1.0/lib/index.mjs";

OBR.onReady(() => {
  document.getElementById('btn-rolar').addEventListener('click', () => {
    
    // Pega os valores da ficha
    const forca = parseInt(document.getElementById('qtd-forca').value) || 0;
    const magia = parseInt(document.getElementById('qtd-magia').value) || 0;
    const agilidade = parseInt(document.getElementById('qtd-agilidade').value) || 0;
    const sorte = parseInt(document.getElementById('qtd-sorte').value) || 0;

    let notacao = [];

    // O dddice usa o @ para definir a cor/tema do dado 3D
    if (forca > 0) notacao.push(`${forca}d20@dddice-red`);
    if (magia > 0) notacao.push(`${magia}d20@dddice-blue`);
    if (agilidade > 0) notacao.push(`${agilidade}d20@dddice-purple`);
    if (sorte > 0) notacao.push(`${sorte}d20@dddice-green`);

    if (notacao.length === 0) {
      alert("Coloque pelo menos 1 dado em algum atributo!");
      return;
    }

    // Junta tudo numa frase só. Exemplo: "2d20@dddice-red + 1d20@dddice-blue"
    const comandoDeRolagem = notacao.join(" + ");

    // Grita para a sala do Owlbear: "Ei dddice, rola isso aqui!"
    OBR.broadcast.sendMessage("dddice/roll", {
      equation: comandoDeRolagem
    });

    // Zera os contadores para a próxima rolagem
    document.getElementById('qtd-forca').value = 0;
    document.getElementById('qtd-magia').value = 0;
    document.getElementById('qtd-agilidade').value = 0;
    document.getElementById('qtd-sorte').value = 0;
  });
});
