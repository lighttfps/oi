
async function fetchGames() {
  document.getElementById("games").innerText = "Buscando jogos e gerando palpites...";

  try {
    const res = await fetch("https://api.api-futebol.com.br/v1/partidas?data=hoje", {
      headers: {
        "Authorization": "Bearer c318d7bb6044fec655937dd09e4bdb34"
      }
    });
    const data = await res.json();

    const jogos = data.slice(0, 5).map(jogo => {
      const casa = jogo.time_mandante.nome_popular;
      const fora = jogo.time_visitante.nome_popular;
      const palpite = Math.random() > 0.5 ? "Vitória do " + casa : "Vitória do " + fora;
      return `<div><strong>${casa} x ${fora}</strong><br/>Palpite: <em>${palpite}</em></div><hr/>`;
    }).join("");

    document.getElementById("games").innerHTML = jogos;
    document.getElementById("highlights").innerHTML = "<h2>🔥 Palpites Mais Quentes do Dia 🔥</h2>" + jogos;

  } catch (err) {
    document.getElementById("games").innerText = "Erro ao buscar jogos. Tente novamente.";
  }
}
fetchGames();
