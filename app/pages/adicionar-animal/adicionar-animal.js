import Animal from "../../model/Animal.js";
import AnimalService from "../../service/AnimalService.js";

const service = new AnimalService();

//  Guarda de sessão 
const sessao = sessionStorage.getItem("usuarioLogado") || localStorage.getItem("usuarioLogado");
if (!sessao) window.location.href = "../login/index.html";

const propriedade = JSON.parse(sessionStorage.getItem("propriedadeSelecionada"));
if (!propriedade) window.location.href = "../propriedades/index.html";

//  Submit 
document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const brinco = document.getElementById("numeroBrinco").value.trim();
    const raca   = document.getElementById("selectRaca").value;
    const genero = document.querySelector('input[name="genero"]:checked').value;
    const idade  = document.querySelector('input[name="idade"]:checked').value;

    const racaFormatada = raca.charAt(0).toUpperCase() + raca.slice(1).toLowerCase();
    const animal = new Animal(brinco, genero, idade, racaFormatada, propriedade.id);

    await service.cadastrar(animal);
    window.location.href = "../animais/index.html";
});

$(document).ready(function () {
    $("#numeroBrinco").mask("0000", {
        translation: {
            "0": { pattern: /[0-9]/ }
        }
    });
});