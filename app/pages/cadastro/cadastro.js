const form = document.getElementById("formCadastro");
const senha = document.getElementById("senha");

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

form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const usuario = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value
    };

    localStorage.setItem("usuario", JSON.stringify(usuario));

    window.location.href = "../login/index.html";
});