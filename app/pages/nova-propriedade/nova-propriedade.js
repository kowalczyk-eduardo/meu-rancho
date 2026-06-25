import Propriedade from "../../model/Propriedade.js";
import PropriedadeService from "../../service/PropriedadeService.js";

const service = new PropriedadeService();

//  Guarda de sessão 
const sessao = sessionStorage.getItem("usuarioLogado") || localStorage.getItem("usuarioLogado");
if (!sessao) window.location.href = "../login/index.html";

const usuario = JSON.parse(sessao);

//  Imagens 
const imagensDisponiveis = [
    "https://res.cloudinary.com/dzkkqkuav/image/upload/q_auto,f_auto,w_291,h_192/v1778531758/IMG_20250610_172801_kaiwk5.jpg",
    "https://res.cloudinary.com/dzkkqkuav/image/upload/q_auto,f_auto,w_291,h_192/v1778531756/IMG_20260421_163200_czivg4.jpg",
    "https://res.cloudinary.com/dzkkqkuav/image/upload/q_auto,f_auto,w_291,h_192/v1778531758/IMG_20250618_175025_e0y77l.jpg",
    "https://res.cloudinary.com/dzkkqkuav/image/upload/q_auto,f_auto,w_291,h_192/v1778531757/IMG_20250704_181947_tkrsmp.jpg",
    "https://res.cloudinary.com/dzkkqkuav/image/upload/q_auto,f_auto,w_291,h_192/v1778531757/IMG_20241110_184047_HDR_2_bruvrc.jpg",
    "https://res.cloudinary.com/dzkkqkuav/image/upload/q_auto,f_auto,w_291,h_192/v1778531757/IMG_20250610_172549_n5hsod.jpg",
    "https://res.cloudinary.com/dzkkqkuav/image/upload/q_auto,f_auto,w_291,h_192/v1778531758/IMG_20241110_183813_ycuu3b.jpg",
];

function sortearImagem() {
    const indice = Math.floor(Math.random() * imagensDisponiveis.length);
    return imagensDisponiveis[indice];
}

//  Submit 
document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const inputs = event.target.querySelectorAll("input");
    const nome = document.getElementById("nome").value.trim();
    const cidade = document.getElementById("cidade").value.trim()
    .split(" ")
    .map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
    .join(" ");
    const estado = document.getElementById("estado").value.trim().toUpperCase();

    const propriedade = new Propriedade(nome, cidade, estado, usuario.id, sortearImagem());

    await service.cadastrar(propriedade);
    window.location.href = "../propriedades/index.html";
});