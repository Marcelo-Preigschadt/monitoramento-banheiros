const API = "http://localhost:3000";

async function load() {
  const res = await fetch(API + "/banheiros");
  const data = await res.json();

  const container = document.getElementById("cards");
  container.innerHTML = "";

  data.forEach(b => {
    const div = document.createElement("div");

    div.innerHTML = `
      <h2>${b.nome}</h2>
      <p>Usos: ${b.usos}</p>
      <button onclick="limpar(${b.id})">Limpar</button>
    `;

    container.appendChild(div);
  });
}

async function limpar(id) {
  await fetch(API + "/limpeza", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ banheiro_id: id })
  });

  load();
}

load();
