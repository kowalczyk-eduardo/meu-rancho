import Usuario from "../../model/Usuario.js";
import UsuarioService from "../../service/UsuarioService.js";

const form = document.getElementById("formCadastro");
const senha = document.getElementById("senha");

const service = new UsuarioService();

senha.addEventListener("input", () => {
    const valor = senha.value;

    senha.setCustomValidity("");

    if (valor.length < 8) {
        senha.setCustomValidity(
            "A senha deve possuir pelo menos 8 caracteres."
        );
    } else if (!/[A-Z]/.test(valor)) {
        senha.setCustomValidity(
            "A senha deve possuir uma letra maiúscula."
        );
    } else if (!/[a-z]/.test(valor)) {
        senha.setCustomValidity(
            "A senha deve possuir uma letra minúscula."
        );
    } else if (!/\d/.test(valor)) {
        senha.setCustomValidity(
            "A senha deve possuir um número."
        );
    }
});

senha.addEventListener("blur", () => {
    senha.reportValidity();
});

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const usuario = new Usuario(nome, email, senha);

    await service.cadastrar(usuario);
    window.location.href = "../login/index.html";
});