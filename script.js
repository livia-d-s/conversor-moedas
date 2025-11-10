const convertButton = document.getElementById('convertButton');
const textoFantasma = document.querySelector(".textoFantasma");

const currencySelect1 = document.querySelector(".input1");
const currencySelect2 = document.querySelector(".input2");


const convertValues1 = async () => {
    const inputCurrencyValue = document.querySelector(".typeValueInput").value;
    const valueToConvert = document.querySelector(".valorDoConversorInicial");
    const valueAlreadyConverted = document.querySelector(".valorDoConversorFinal");

    const data = await fetch("/api/get-rates").then(response => response.json());
    console.log(await (await fetch('/api/get-rates')).json())

    // Pegar as cotações do objeto 'data' que a API retornou
    const dolarRate = data.conversion_rates.USD;
    const euroRate = data.conversion_rates.EUR;
    const libraRate = data.conversion_rates.GBP;
    const swedishRate = data.conversion_rates.SEK;
    const bitcoinRate = 0.0000029;

    // Valor em Real formatado
    valueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(inputCurrencyValue);

    if (currencySelect2.value == "dolar") {
        valueAlreadyConverted.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(inputCurrencyValue * dolarRate);
    }
    if (currencySelect2.value == "euro") {
        valueAlreadyConverted.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(inputCurrencyValue * euroRate);
    }
    if (currencySelect2.value == "libra") {
        valueAlreadyConverted.innerHTML = new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP"
        }).format(inputCurrencyValue * libraRate);
    }
    if (currencySelect2.value == "bitcoin") {
        const btcValue = inputCurrencyValue * bitcoinRate;
        valueAlreadyConverted.innerHTML = `₿ ${btcValue.toFixed(6)}`;
    }
    if (currencySelect2.value == "swedish") {
        valueAlreadyConverted.innerHTML = new Intl.NumberFormat("sv-SE", {
            style: "currency",
            currency: "SEK"
        }).format(inputCurrencyValue * swedishRate);
    }

    // Pegar a taxa da moeda selecionada
    let taxaSelecionada;

    if (currencySelect2.value == "dolar") {
        taxaSelecionada = dolarRate;
    } else if (currencySelect2.value == "euro") {
        taxaSelecionada = euroRate;
    } else if (currencySelect2.value == "libra") {
        taxaSelecionada = libraRate;
    } else if (currencySelect2.value == "bitcoin") {
        taxaSelecionada = bitcoinRate;
    } else if (currencySelect2.value == "swedish") {
        taxaSelecionada = swedishRate;
    }

    if (taxaSelecionada) {
        let simbolo = currencySelect2.value === "bitcoin" ? "BTC" : currencySelect2.options[currencySelect2.selectedIndex].text.split(" - ")[0];
        textoFantasma.innerHTML = `1 Real = ${taxaSelecionada.toFixed(2)} ${simbolo}`;
    } else {
        textoFantasma.innerHTML = "";
    }

};

function changeCurrency() {
    const currencyName = document.getElementById("conversordolar");
    const currencyImage = document.querySelector(".currency-img");

    if (currencySelect2.value == "dolar") {
        currencyName.innerHTML = "Dólar";
        currencyImage.src = "./AssetsConversor/usaBandeira.png";
    }

    if (currencySelect2.value == "euro") {
        currencyName.innerHTML = "Euro";
        currencyImage.src = "./AssetsConversor/euroBandeira.png";
    }

    if (currencySelect2.value == "libra") {
        currencyName.innerHTML = "Libra esterlina";
        currencyImage.src = "./AssetsConversor/libraBandeira.png";
    }

    if (currencySelect2.value == "bitcoin") {
        currencyName.innerHTML = "Bitcoin";
        currencyImage.src = "./AssetsConversor/bitcoin.png";
    }

    if (currencySelect2.value == "swedish") {
        currencyName.innerHTML = "Coroa Sueca";
        currencyImage.src = "./AssetsConversor/sueciaBandeira.png";
    }

    // Chama a função para converter os valores assim que a moeda é trocada
    convertValues1();
}

// "escutadores de evento" para o botão e para a troca de moeda
currencySelect2.addEventListener("change", changeCurrency);
convertButton.addEventListener("click", convertValues1);