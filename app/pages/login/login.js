$(function () {

    //  Pré-preenche o e-mail se "Lembrar de mim" estava marcado 
    const emailSalvo = localStorage.getItem("emailLembrado");
    if (emailSalvo) {
        $("#email").val(emailSalvo);
        $("#lembrar").prop("checked", true);
    }

    //  Exibe/oculta alerta de erro 
    function exibirErro(mensagem) {
        let $alerta = $("#alertaLogin");

        if ($alerta.length === 0) {
            $alerta = $("<div>", {
                id: "alertaLogin",
                class: "alert alert-danger col-8 py-2 text-center",
                role: "alert"
            });
            $("button[type='submit']").before($alerta);
        }

        $alerta.text(mensagem).show();
    }

    function ocultarErro() {
        $("#alertaLogin").hide();
    }

    //  Submit do formulário 
    $("#formLogin").on("submit", function (event) {
        event.preventDefault();

        if (!this.checkValidity()) {
            this.reportValidity();
            return;
        }

        ocultarErro();

        const email = $("#email").val().trim();
        const senha = $("#senha").val();

        $.ajax({
            url: "http://localhost:3000/usuarios",
            method: "GET",
            success: function (usuarios) {
                const usuarioEncontrado = $.grep(usuarios, function (u) {
                    return u.email === email && u.senha === senha;
                })[0];

                if (!usuarioEncontrado) {
                    exibirErro("E-mail ou senha incorretos. Tente novamente.");
                    $("#senha").val("").focus();
                    return;
                }

                //  Lembrar de mim 
                if ($("#lembrar").is(":checked")) {
                    localStorage.setItem("emailLembrado", email);
                } else {
                    localStorage.removeItem("emailLembrado");
                }
                sessionStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
                window.location.href = "../propriedades/index.html";
            },
            error: function () {
                exibirErro("Não foi possível conectar ao servidor. Verifique se o json-server está rodando.");
            }
        });
    });
});