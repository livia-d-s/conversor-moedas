  export default async function handler(request, response) {
  // Pega a chave de API das Variáveis do Vercel
  const apiKey = process.env.EXCHANGE_RATE_API_KEY;
  const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/BRL`;

  try {
    // Busca os dados da API de cotação
    const apiResponse = await fetch(apiUrl);
    const data = await apiResponse.json();

    // Se a API externa falhar, retorna um erro
    if (data.result === 'error') {
      return response.status(500).json({ error: 'Failed to fetch from external API' });
    }

    // Se tudo deu certo, envia os dados de volta para o (script.js)
    response.status(200).json(data);

  } catch (error) {
    // Em caso de qualquer outro erro, informa o que aconteceu
    response.status(500).json({ error: 'Something went wrong' });
  }
}