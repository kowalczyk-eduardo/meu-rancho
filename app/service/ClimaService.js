export default class ClimaService {

    async buscarCoordenadas(cidade) {
        const query = encodeURIComponent(cidade);
        const resposta = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=1&language=pt`);
        const dados = await resposta.json();

        if (!dados.results || dados.results.length === 0) return null;

        const { latitude, longitude } = dados.results[0];
        return { latitude, longitude };
    }

    async buscarClima(latitude, longitude) {
        const url = `https://api.open-meteo.com/v1/forecast`
            + `?latitude=${latitude}`
            + `&longitude=${longitude}`
            + `&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code`
            + `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code`
            + `&forecast_days=7`
            + `&timezone=America/Sao_Paulo`;

        const resposta = await fetch(url);
        return await resposta.json();
    }

    descricaoClima(codigo) {
        if (codigo === 0) return { descricao: "Céu limpo",           icone: "bi-sun" };
        if (codigo <= 2) return { descricao: "Parcialmente nublado", icone: "bi-cloud-sun" };
        if (codigo === 3) return { descricao: "Nublado",              icone: "bi-clouds" };
        if (codigo <= 48) return { descricao: "Neblina",              icone: "bi-cloud-fog2" };
        if (codigo <= 57) return { descricao: "Garoa",                icone: "bi-cloud-drizzle" };
        if (codigo <= 67) return { descricao: "Chuva",                icone: "bi-cloud-rain" };
        if (codigo <= 77) return { descricao: "Neve",                 icone: "bi-cloud-snow" };
        if (codigo <= 82) return { descricao: "Pancadas de chuva",    icone: "bi-cloud-rain-heavy" };
        if (codigo <= 99) return { descricao: "Tempestade",           icone: "bi-cloud-lightning-rain" };
        return { descricao: "Indisponível", icone: "bi-question-circle" };
    }

    formatarDiaSemana(dataStr, index) {
        if (index === 0) return "Hoje";
        const data = new Date(dataStr + "T12:00:00");
        return data.toLocaleDateString("pt-BR", { weekday: "long" })
            .replace(/^\w/, c => c.toUpperCase());
    }
}