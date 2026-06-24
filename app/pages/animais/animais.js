import ClimaService from "../../service/ClimaService.js";
import AnimalService from "../../service/AnimalService.js";

const service = new AnimalService();

//  Guarda de sessão 
const sessao = sessionStorage.getItem("usuarioLogado") || localStorage.getItem("usuarioLogado");
if (!sessao) window.location.href = "../login/index.html";

const propriedade = JSON.parse(sessionStorage.getItem("propriedadeSelecionada"));
if (!propriedade) window.location.href = "../propriedades/index.html";

//  Título da página 
document.querySelector("h1").textContent = `Animais: ${propriedade.nome}`;

//  Renderiza cards 
const container = document.querySelector(".cards");

function iconeGenero(genero) {
    return genero === "macho"
        ? `<i class="bi bi-gender-male rounded-5 px-2"></i>`
        : `<i class="bi bi-gender-female rounded-5 px-2"></i>`;
}

function criarCard(animal) {
    return `
        <div class="col-12 col-md-6 col-lg-4">
            <div class="card rounded-4 border-0 position-relative">
                <div class="card-body d-flex flex-column">
                    <div class="d-flex justify-content-between px-2 mb-4">
                        <span class="badge">#${animal.brinco}</span>
                        ${iconeGenero(animal.genero)}
                    </div>
                    <div class="px-2">
                        <h5>${animal.raca}</h5>
                        <p>${animal.idade} meses</p>
                    </div>
                </div>
                <button class="btn btn-excluir position-absolute bottom-0 end-0 mb-4 me-4" data-id="${animal.id}">
                    <i class="bi bi-trash3"></i>
                </button>
            </div>
        </div>
    `;
}

function criarCardVazio() {
    return `
        <div class="col-12 text-center py-5">
            <i class="bi bi-box2" style="color: #ced4da; border: none; background-color: transparent; font-size: 3rem;"></i>
            <p class="text-muted">Nenhum animal cadastrado nesta propriedade.</p>
            <a href="../adicionar-animal/index.html" class="btn btn-primary mt-2">
                <i class="bi bi-plus-lg" style="color: #ffffff; border: none; background-color: transparent; font-size: 1rem;"></i> Adicionar Animal
            </a>
        </div>
    `;
}

// Variável global para guardar os animais carregados
let animaisCarregados = [];

async function carregarAnimais() {
    animaisCarregados = await service.listarPorPropriedade(propriedade.id);

    const botaoAdicionar = document.querySelector(".btn-adicionar-animal");
    if (botaoAdicionar) {
        botaoAdicionar.style.visibility = animaisCarregados.length === 0 ? "hidden" : "visible";
    }

    renderizarAnimais(animaisCarregados);
}

function renderizarAnimais(animais) {
    container.innerHTML = animais.length
        ? animais.map(criarCard).join("")
        : criarCardVazio();

    container.querySelectorAll(".btn-excluir").forEach((btn) => {
        btn.addEventListener("click", async () => {
            if (confirm("Tem certeza que deseja excluir este animal?")) {
                await service.excluir(btn.dataset.id);
                await carregarAnimais();
            }
        });
    });
}carregarAnimais();

// Filtros 
function aplicarFiltros() {
    const genero = document.getElementById("selectGenero")?.value;
    const brinco = document.getElementById("pesquisarBrinco")?.value.trim().toLowerCase();
    const idade  = document.getElementById("selectIdade")?.value;
    const raca   = document.getElementById("selectRaca")?.value;

    const resultado = animaisCarregados.filter((animal) => {
        // Gênero: opção "1" = Macho, "2" = Fêmea
        if (genero === "1" && animal.genero !== "macho")   return false;
        if (genero === "2" && animal.genero !== "femea")   return false;

        // Brinco: busca parcial
        if (brinco && !animal.brinco.toString().toLowerCase().includes(brinco)) return false;

        // Raça
        if (raca && animal.raca.toLowerCase() !== raca.toLowerCase()) return false;

        // Idade
        if (idade === "1" && animal.idade !== "0-12")   return false;
        if (idade === "2" && animal.idade !== "13-24")  return false;
        if (idade === "3" && animal.idade !== "25-36")  return false;
        if (idade === "4" && animal.idade !== "+36")    return false;

        return true;
    });

    renderizarAnimais(resultado);
}

function resetarFiltros() {
    const selectGenero = document.getElementById("selectGenero");
    const inputBrinco  = document.getElementById("pesquisarBrinco");
    const selectIdade  = document.getElementById("selectIdade");
    const selectRaca   = document.getElementById("selectRaca");

    if (selectGenero) selectGenero.selectedIndex = 0;
    if (inputBrinco)  inputBrinco.value = "";
    if (selectIdade)  selectIdade.selectedIndex = 0;
    if (selectRaca)   selectRaca.selectedIndex = 0;

    renderizarAnimais(animaisCarregados);
}

document.getElementById("btnSalvar")?.addEventListener("click", aplicarFiltros);
document.getElementById("btnReset")?.addEventListener("click", resetarFiltros);

// API pública 
const climaService = new ClimaService();

async function carregarClima() {
    const { cidade, estado } = propriedade;

    try {
        const coordenadas = await climaService.buscarCoordenadas(cidade);

        if (!coordenadas) {
            document.getElementById("climaCards").innerHTML = `
                <div class="carousel-item active">
                    <div class="card-clima card rounded-4 border-0 p-3 text-muted">
                        <i class="bi bi-cloud-slash"></i> Não foi possível encontrar a localização de <strong>${cidade}</strong>
                    </div>
                </div>
            `;
            return;
        }

        const dados = await climaService.buscarClima(coordenadas.latitude, coordenadas.longitude);

        if (!dados?.current || !dados?.daily) {
            throw new Error("Dados do clima incompletos.");
        }
        
        const { current, daily } = dados;
        const climaAtual = climaService.descricaoClima(current.weather_code);

        // Monta o card "Agora"
        const cardAtual = `
            <div class="carousel-item active">
                <div class="card-clima card rounded-4 border-0 p-3">
                    <div class="d-flex align-items-center justify-content-between mb-2">
                        <div>
                            <p class="label-dia mb-0">Agora</p>
                            <p class="label-cidade mb-0">${cidade}, ${estado}</p>
                        </div>
                        <i class="bi ${climaAtual.icone} icone-clima"></i>
                    </div>
                    <div class="d-flex align-items-end justify-content-between">
                        <span class="temperatura-atual">${current.temperature_2m}°C</span>
                        <span class="descricao-clima">${climaAtual.descricao}</span>
                    </div>
                    <hr class="my-2">
                    <div class="d-flex justify-content-between info-clima">
                        <span><i class="bi bi-droplet"></i> ${current.relative_humidity_2m}%</span>
                        <span><i class="bi bi-wind"></i> ${current.wind_speed_10m} km/h</span>
                        <span><i class="bi bi-cloud-rain"></i> ${current.precipitation} mm</span>
                    </div>
                </div>
            </div>
        `;

        // Monta os 7 cards de previsão diária
        const cardsDiarios = daily.time.slice(1).map((data, i) => {
            const index = i + 1;
            const { descricao, icone } = climaService.descricaoClima(daily.weather_code[index]);
            const diaSemana = climaService.formatarDiaSemana(data, index);

        return `
            <div class="carousel-item">
                <div class="card-clima card rounded-4 border-0 p-3">
                    <div class="d-flex align-items-center justify-content-between mb-2">
                        <div>
                            <p class="label-dia mb-0">${diaSemana}</p>
                            <p class="label-cidade mb-0">${cidade}, ${estado}</p>
                        </div>
                        <i class="bi ${icone} icone-clima"></i>
                    </div>
                    <div class="d-flex align-items-end justify-content-between">
                        <div class="d-flex gap-2 align-items-end">
                            <span class="temperatura-atual">${daily.temperature_2m_max[index]}°C</span>
                            <span class="temperatura-min mb-1">${daily.temperature_2m_min[index]}°C</span>
                        </div>
                        <span class="descricao-clima">${descricao}</span>
                    </div>
                    <hr class="my-2">
                    <div class="d-flex justify-content-between info-clima">
                        <span><i class="bi bi-cloud-rain"></i> ${daily.precipitation_sum[index]} mm</span>
                    </div>
                </div>
            </div>
        `;
        }).join("");

        document.getElementById("climaCards").innerHTML = cardAtual + cardsDiarios;
        } catch (erro) {
            console.error("Erro ao carregar clima:", erro);
            document.getElementById("climaCards").innerHTML = `
                <div class="carousel-item active">
                    <div class="card-clima card rounded-4 border-0 p-3 text-muted">
                        <i class="bi bi-wifi-off"></i> Não foi possível carregar o clima. Verifique sua conexão.
                    </div>
                </div>
            `;
    }   
}
carregarClima();