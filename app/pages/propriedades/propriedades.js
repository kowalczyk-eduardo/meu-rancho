import PropriedadeService from "../../service/PropriedadeService.js";
import AnimalService from "../../service/AnimalService.js";

const animalService = new AnimalService();
const service = new PropriedadeService();

//  Guarda de sessão 
const sessao = sessionStorage.getItem("usuarioLogado") || localStorage.getItem("usuarioLogado");
if (!sessao) window.location.href = "../login/index.html";

const usuario = JSON.parse(sessao);

//  Renderiza os cards 
const container = document.querySelector(".cards");

function criarCard(propriedade, totalAnimais) {
    return `
        <div class="col-12 col-md-6 col-lg-4">
            <div class="card h-100 rounded-5 position-relative card-propriedade" data-propriedade='${JSON.stringify(propriedade)}'>
                 <img src="${propriedade.imagem}" class="card-img-top rounded-top-5" alt="${propriedade.nome}" />
                <div class="card-body">
                    <div class="d-flex align-items-center justify-content-between gap-2 mb-2">
                        <h3
                            class="mb-0 text-truncate"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            data-bs-title="${propriedade.nome}"
                        >
                            ${propriedade.nome}
                        </h3>
                        <span class="badge rounded-pill">
                            <i class="fa-solid fa-cow"></i> ${totalAnimais}
                        </span>
                    </div>
                    <p><i class="bi bi-geo-alt"></i> ${propriedade.cidade}, ${propriedade.estado}</p>
                </div>
                <button class="btn btn-excluir position-absolute top-0 end-0 m-2" data-id="${propriedade.id}">
                    <i class="bi bi-trash3"></i>
                </button>
            </div>
        </div>
    `;
}

function criarCardVazio() {
    return `
        <div class="col-12 text-center py-5">
            <i class="fa-solid fa-tractor fa-3x mb-3" style="color: #ced4da;"></i>
            <p class="text-muted">Você ainda não tem propriedades cadastradas.</p>
            <a href="../nova-propriedade/index.html" class="btn btn-primary mt-2">
                <i class="bi bi-plus-lg"></i> Nova Propriedade
            </a>
        </div>
    `;
}

async function carregarPropriedades() {
    const propriedades = await service.listarPorUsuario(usuario.id);

    const botaoDesktop = document.querySelector(".botao-original");
    const botaoMobile  = document.querySelector(".botao-flutuante");

    if (propriedades.length === 0) {
        botaoDesktop.style.visibility = "hidden";
        botaoMobile.style.visibility = "hidden";
        container.innerHTML = criarCardVazio();
        return
    } 

    botaoDesktop.style.visibility = "visible";
    botaoMobile.style.visibility = "visible";
    container.innerHTML = propriedades.map(criarCard).join("");
    

    // Contagem dos animais
    const contagens = await Promise.all(
        propriedades.map(p => animalService.contarPorPropriedade(p.id))
    );

    container.innerHTML = propriedades
        .map((p, i) => criarCard(p, contagens[i]))
        .join("");

    // Reativa tooltips nos cards recém-criados
    container.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => {
        new bootstrap.Tooltip(el);
    });

    // Navega para animais salvando a propriedade na sessão
    container.querySelectorAll(".card-propriedade").forEach((card) => {
        card.addEventListener("click", (e) => {
            // Ignora clique no botão de excluir
            if (e.target.closest(".btn-excluir")) return;

            const propriedade = JSON.parse(card.dataset.propriedade);
            sessionStorage.setItem("propriedadeSelecionada", JSON.stringify(propriedade));
            window.location.href = "../animais/index.html";
        });
    });

    // Botão excluir
    container.querySelectorAll(".btn-excluir").forEach((btn) => {
        btn.addEventListener("click", async (e) => {
            e.preventDefault();
            const confirmado = confirm("Tem certeza que deseja excluir esta propriedade?");
            if (confirmado) {
                await service.excluir(btn.dataset.id);
                await carregarPropriedades();
            }
        });
    });
}

carregarPropriedades();