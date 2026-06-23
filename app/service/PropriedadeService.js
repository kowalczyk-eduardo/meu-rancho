export default class PropriedadeService {

    constructor() {
        this.url = "http://localhost:3000/propriedades";
    }

    async cadastrar(propriedade) {
        const resposta = await fetch(this.url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(propriedade)
        });

        return await resposta.json();
    }

    async listarPorUsuario(usuarioId) {
        const resposta = await fetch(`${this.url}?usuarioId=${usuarioId}`);
        return await resposta.json();
    }

    async excluir(id) {
        await fetch(`${this.url}/${id}`, { method: "DELETE" });
    }

}