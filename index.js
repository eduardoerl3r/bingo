function criarCartela() {
    const cartela = gerarCartela()

    const pai_div_cartela = document.getElementById('areaCartelas')
    const div_cartela = document.createElement('div');
    div_cartela.className = 'cartela'

    pai_div_cartela.appendChild(div_cartela)

    const input_jogador = document.createElement('input')
    input_jogador.type = 'text'
    input_jogador.placeholder = 'Nome do jogador'

    input_jogador.addEventListener('change', function () {
        // Verificar se o campo do nome do jogador não está vazio
        if (input_jogador.value.trim() !== '') {
            const nome_jogador = input_jogador.value.trim();

            // Remover o input do nome do jogador e adicionar o nome como texto
            div_cartela.removeChild(input_jogador);
            const nome_jogador_texto = document.createElement('p');
            nome_jogador_texto.innerText = nome_jogador;
            div_cartela.appendChild(nome_jogador_texto);


            const tabela = document.createElement('table')
            const thead = document.createElement('thead')
            const tbody = document.createElement('tbody')

            const thB = document.createElement('th')
            const thI = document.createElement('th')
            const thN = document.createElement('th')
            const thG = document.createElement('th')
            const thO = document.createElement('th')

            thB.innerText = 'B'
            thI.innerText = 'I'
            thN.innerText = 'N'
            thG.innerText = 'G'
            thO.innerText = 'O'

            thead.appendChild(thB)
            thead.appendChild(thI)
            thead.appendChild(thN)
            thead.appendChild(thG)
            thead.appendChild(thO)

            var count = 0
            for (var i = 0; i < 5; i++) {
                const tr = document.createElement('tr')
                for (var j = 0; j < 5; j++) {
                    const td = document.createElement('td')
                    td.innerText = cartela[count]
                    tr.appendChild(td)
                    count++
                }
                tbody.appendChild(tr)
            }




            tabela.appendChild(thead)
            tabela.appendChild(tbody)
            div_cartela.appendChild(tabela)
        }
    })

    div_cartela.appendChild(input_jogador)
    pai_div_cartela.appendChild(div_cartela)
}

function reiniciarJogo() {
    const pai_div_cartela = document.getElementById('body_cartelas');
    while (pai_div_cartela.firstChild) {
        pai_div_cartela.removeChild(pai_div_cartela.firstChild);
    }

    // Reiniciar o contador
    const divNumeros = document.getElementById('body_numeros');
    divNumeros.innerHTML = '';

    // Limpar o intervalo de tempo
    clearInterval(intervalId);
}


function gerarCartela() {
    var cartela = []

    //para quando entrega 25 numeros diferentes
    while (cartela.length < 25) {
        var randoNumber = Math.floor(Math.random() * 75 + 1)
        if (!cartela.includes(randoNumber)) {
            cartela.push(randoNumber)
        }
    }

    //math.random gera numeros aleatorios
    //math.floor arredonda o numero para baixo 
    for (var i = cartela.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = cartela[i];
        cartela[i] = cartela[j];
        cartela[j] = temp;
    }

    console.log(cartela)
    return cartela;

}

function sortearNumero() {
    // Gerar números sorteados
    const numerosSorteados = [];
    while (numerosSorteados.length < 75) {
        const numero = Math.floor(Math.random() * 75 + 1);
        if (!numerosSorteados.includes(numero)) {
            numerosSorteados.push(numero);
        }
    }

    const divNumeros = document.getElementById('sorteio');

    divNumeros.innerHTML = '';

    for (let i = 0; i < numerosSorteados.length; i++) {
        const numeroSorteado = numerosSorteados[i];
        setTimeout(function () {
            const numeroElemento = document.createElement('span');
            numeroElemento.textContent = numeroSorteado;
            divNumeros.appendChild(numeroElemento);

            const cartelas = document.getElementsByClassName('cartela');

            // Iterar sobre as cartelas
            let cartelaCompleta = false;
            let cartelaVencedora = null; // Variável para armazenar a tabela vencedora
            let nomeJogadorVencedor = ''; // Variável para armazenar o nome do jogador vencedor
            for (let j = 0; j < cartelas.length; j++) {
                const cartela = cartelas[j];
                const tabela = cartela.querySelector('table');
                const celulas = tabela.getElementsByTagName('td');

                for (let k = 0; k < celulas.length; k++) {
                    const celula = celulas[k];
                    const numeroCartela = parseInt(celula.innerText, 10);


                    if (numeroCartela === numeroSorteado) {
                        celula.style.backgroundColor = 'purple';
                    }

                    const todasMarcadas = Array.from(celulas).every(function (celula) {
                        return celula.style.backgroundColor === 'yellow';
                    });

                    if (todasMarcadas) {
                        cartelaCompleta = true;
                        cartelaVencedora = cartela;
                        nomeJogadorVencedor = cartela.querySelector('p').innerText;
                        break;
                    }
                }

                if (cartelaCompleta) {
                    break;
                }
            }

            if (cartelaCompleta) {
                alert(`Bingo! A cartela do jogador ${nomeJogadorVencedor} está completa!`);
                for (let j = 0; j < cartelas.length; j++) {
                    if (cartelas[j] !== cartelaVencedora) {
                        const tabela = cartelas[j].querySelector('table');
                        const celulas = tabela.getElementsByTagName('td');
                        for (let k = 0; k < celulas.length; k++) {
                            celulas[k].style.backgroundColor = 'transparent';
                        }
                    }
                }
                return;
            }
        }, i * 300);
    }
}


