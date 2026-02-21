import OBR from "https://cdn.jsdelivr.net/npm/@owlbear-rodeo/sdk@3.1.0/lib/index.mjs";

OBR.onReady(() => {
  console.log("Extensão FateSystem conectada ao Owlbear!"); // Aviso invisível para devs

  document.getElementById('btn-rolar').addEventListener('click', () => {
    
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

    // TESTE DE SINAL DE VIDA: Essa janela TEM que aparecer!
    alert("Enviando comando para o dddice: " + comandoDeRolagem);

    OBR.broadcast.sendMessage("dddice/roll", {
      equation: comandoDeRolagem
    });

    // Zera os contadores
    document.getElementById('qtd-forca').value = 0;
    document.getElementById('qtd-magia').value = 0;
    document.getElementById('qtd-agilidade').value = 0;
    document.getElementById('qtd-sorte').value = 0;
  });
});
