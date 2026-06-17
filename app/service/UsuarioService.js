export default class UsuarioService {

    constructor() {
        this.url = "http://localhost:3000/usuarios";
    }

    async cadastrar(usuario) {
        const resposta = await fetch(this.url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        });

        return await resposta.json();
    }

    async listar() {
        const resposta = await fetch(this.url);

        return await resposta.json();
    }
}