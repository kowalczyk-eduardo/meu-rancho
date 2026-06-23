import AnimalService from "../../service/AnimalService.js";

const service = new AnimalService();

// ── Guarda de sessão ─────────────────────────────────────────────────────────
const sessao = sessionStorage.getItem("usuarioLogado") || localStorage.getItem("usuarioLogado");
if (!sessao) window.location.href = "../login/index.html";

const propriedade = JSON.parse(sessionStorage.getItem("propriedadeSelecionada"));
if (!propriedade) window.location.href = "../propriedades/index.html";

// ── Título da página ─────────────────────────────────────────────────────────
document.querySelector("h1").textContent = `Animais: ${propriedade.nome}`;

// ── Renderiza cards ──────────────────────────────────────────────────────────
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
            <i class="fa-solid fa-cow fa-3x mb-3" style="color: #ced4da;"></i>
            <p class="text-muted">Nenhum animal cadastrado nesta propriedade.</p>
            <a href="../adicionar-animal/index.html" class="btn btn-primary mt-2">
                <i class="bi bi-plus-lg"></i> Adicionar Animal
            </a>
        </div>
    `;
}

async function carregarAnimais() {
    const animais = await service.listarPorPropriedade(propriedade.id);

    const botaoAdicionar = document.querySelector(".btn-adicionar-animal");
    if (botaoAdicionar) {
        botaoAdicionar.style.visibility = animais.length === 0 ? "hidden" : "visible";
    }

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
}

carregarAnimais();