// URL do Supabase
const SUPABASE_URL = "https://uqsudnqqdonyrdluefcm.supabase.co";

// Chave pública do Supabase
const SUPABASE_KEY = "Brt109526**";

// Tabela monitoramento
const TABELA_MONITORAMENTO = "monitoramento";

// Tabela limpeza
const TABELA_LIMPEZA = "limpeza";

// Elementos HTML
const totalUsos = document.getElementById("total-usos");
const ultimoRegistro = document.getElementById("ultimo-registro");
const statusBanheiro = document.getElementById("status-banheiro");
const tabela = document.getElementById("tabela-monitoramento");
const btnLimpeza = document.getElementById("btn-limpeza");

// Função carregar dados
async function carregarDados(){

    try{

        // Busca dados do Supabase
        const resposta = await fetch(
            `${SUPABASE_URL}/rest/v1/${TABELA_MONITORAMENTO}?select=*&order=id.desc`,
            {
                headers:{
                    apikey:SUPABASE_KEY,
                    Authorization:`Bearer ${SUPABASE_KEY}`
                }
            }
        );

        // Converte para JSON
        const dados = await resposta.json();

        // Total registros
        totalUsos.innerText = dados.length;

        // Limpa tabela
        tabela.innerHTML = "";

        // Verifica se possui registros
        if(dados.length > 0){

            // Último registro
            const ultimo = dados[0];

            // Atualiza último registro
            ultimoRegistro.innerHTML = `
                <p><strong>ID:</strong> ${ultimo.id}</p>
                <p><strong>Banheiro:</strong> ${ultimo.banheiro}</p>
                <p><strong>Data:</strong> ${formatarData(ultimo.data_hora)}</p>
            `;

            // Atualiza status
            statusBanheiro.classList.remove("offline");
            statusBanheiro.classList.add("online");
            statusBanheiro.innerText = "Movimento Detectado";

        }

        // Percorre dados
        dados.forEach(item => {

            // Cria linha
            const linha = document.createElement("tr");

            // Conteúdo linha
            linha.innerHTML = `
                <td>${item.id}</td>
                <td>${item.banheiro}</td>
                <td>${item.status_presenca ? "Presença" : "Sem Movimento"}</td>
                <td>${formatarData(item.data_hora)}</td>
            `;

            // Adiciona tabela
            tabela.appendChild(linha);

        });

    }catch(erro){

        console.log(erro);

    }

}

// Função registrar limpeza
async function registrarLimpeza(){

    // Responsável
    const responsavel = document.getElementById("responsavel").value;

    // Observação
    const observacao = document.getElementById("observacao").value;

    // Verifica campo vazio
    if(responsavel === ""){

        alert("Digite o responsável");
        return;

    }

    try{

        // Envia para Supabase
        await fetch(
            `${SUPABASE_URL}/rest/v1/${TABELA_LIMPEZA}`,
            {
                method:"POST",

                headers:{
                    "Content-Type":"application/json",
                    apikey:SUPABASE_KEY,
                    Authorization:`Bearer ${SUPABASE_KEY}`
                },

                body:JSON.stringify({
                    responsavel:responsavel,
                    banheiro:"Masculino",
                    observacao:observacao
                })
            }
        );

        // Limpa campos
        document.getElementById("responsavel").value = "";
        document.getElementById("observacao").value = "";

        // Mensagem
        alert("Limpeza registrada com sucesso");

    }catch(erro){

        console.log(erro);

    }

}

// Função formatar data
function formatarData(data){

    // Cria objeto data
    const novaData = new Date(data);

    // Retorna formatado
    return novaData.toLocaleString("pt-BR");

}

// Evento botão
btnLimpeza.addEventListener("click", registrarLimpeza);

// Atualiza automaticamente
setInterval(carregarDados, 5000);

// Carrega inicial
carregarDados();