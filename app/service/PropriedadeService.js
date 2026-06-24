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
        // Busca todos os animais da propriedade
        const animais = await fetch(`http://localhost:3000/animais?propriedadeId=${id}`);
        const animaisJson = await animais.json();

    // Exclui cada animal
        await Promise.all(
            animaisJson.map(animal =>
                fetch(`http://localhost:3000/animais/${animal.id}`, { method: "DELETE" })
            )
        );
        
        await fetch(`${this.url}/${id}`, { method: "DELETE" });
    }
}