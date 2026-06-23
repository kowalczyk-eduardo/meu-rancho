export default class AnimalService {

    constructor() {
        this.url = "http://localhost:3000/animais";
    }

    async cadastrar(animal) {
        const resposta = await fetch(this.url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(animal)
        });
        return await resposta.json();
    }

    async listarPorPropriedade(propriedadeId) {
        const resposta = await fetch(`${this.url}?propriedadeId=${propriedadeId}`);
        return await resposta.json();
    }

    async excluir(id) {
        await fetch(`${this.url}/${id}`, { method: "DELETE" });
    }
}