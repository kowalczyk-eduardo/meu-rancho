const form = document.getElementById("formLogin");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const emailInput = document.getElementById("email");
    const senhaInput = document.getElementById("senha");

    const emailDigitado = emailInput.value;
    const senhaDigitada = senhaInput.value;

    emailInput.setCustomValidity("");
    senhaInput.setCustomValidity("");

    const usuario = JSON.parse(localStorage.getItem("usuario"));


    if (
        emailDigitado === usuario.email &&
        senhaDigitada === usuario.senha
    ) {
        alert("Login realizado com sucesso!");
        window.location.href = "/pages/propriedades/propriedades.html";
    } else if (emailDigitado !== usuario.email) {
        emailInput.setCustomValidity("E-mail não encontrado.");
        emailInput.reportValidity();
    } else {
        senhaInput.setCustomValidity("Senha incorreta.");
        senhaInput.reportValidity();
    }
});