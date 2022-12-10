# 5 Praticas do Node.js que podem ser aplicadas no frontend

Aplicação do conceito de S.O.L.I.D ao frontend
Projeto construído embasado na live feita por [Erick Wendel](https://youtu.be/n0lNNu2qMcU)

## Tecnologias utilzadas

- Node.js (v18.12.1)
- NPM (v8.19.2)
- Yarn (v1.22.19)
- Google Chrome (ou browser que suporte importação de arquivos .json)

> Vale lembrar que os nomes das camadas podem lembrar muito o modelo MVC, porém, não são a mesma coisa.

Keywords: [CallTracker, Native Tests, Node 18, ES Modules, Single Responsability, Dependency Injection, Inversion Dependecy, Spy, Stub, Mocks]

### 01 - ES Modules
ES Modules traz com sigo a estrutura de `import/export` tanto para o frontend quanto para o backend, além dos `import/export`
o `ES Modules` traz também a possiblidade de importar arquivos `.json`, abaixo demonstrarei alguns exemplos de como 
importar e exportar modulos e importar arquivos com extensão `.json`

>Lembrando que a funcionalidade de importar arquivos json ainda é algo experimental no browser, até a data de hoje (26/novembro/2022), 
apenas o Google Chrome implementou está funcionalidade.

##### Como usar import/export

Usando `import`
```js
// index.test.js
import { describe, it } from 'node:test'
```

Usando `export` e importando o modulo
```js
// user.js
export default class User {}

// index.js
import User from './user.js'
const user = new User()
```

##### Importando arquivos .json
Criand arquivo `config.json` (pode ser qualquer nome)
```json
{
  "url_minha_api": "https://minha-api.com.br/api/v1"
}
```

Importando arquivo `.json`
```js
// index.js
import config from './config.json' assert { type: 'json' }
console.log(config.url_minha_api) // "https://minha-api.com.br/api/v1"
```

### 02 - Responsabilidade Única
No modulo `02-single-responsability` vemos como separar o que é regra de negócio da aplicação, serviço externo e exibição de tela.
Nomeclaturas utilizadas:
- Service = Serviços externos
- View = Exibição em tela
- Controller = Regra de negócio da aplicação

### 03 - Injeção de dependencia
No modulo `03-dependecy-injection` vemos como externalizar implementações concretas (ou em outras palavras nossas classes),
como a `Service` e a `View`, e injetar essas duas dependencias em nossa classe `Controller`. Você pode estar se perguntando,
"porquê injetar as dependências se posso instanciar essas mesmas dependências dentro de algum método ou no proprio construtor da classe classe Controller?"
e a resposta para isso é bem simples o motivo real, além de organizar melhor o codigo, é facilitar na hora testar os métodos de maneira isolada.

### 04 e 05 - Node Native Tests
No module `04-05-node-native-tests` podemos ver que como é feito os testes de maneira nativa no Node.js, onde foi utilizados os modulos `node:test` e `node:assert`
O modulo `node:test` responsavel em importar as funções `describe` e `it` usadas para nomear os testes.
O modulo `node:assert` responsavel em importar as funções `deepStrictEqual`, usado para verificar se os 2 valores passados como argumento a ele são iguais, e `CallTracker`
usado para criar `spies` ou `stubs` de funções.

## Sanando duvidas para melhor entendimento:

### O que é CallTracker?
Para os que não estão familiarizados `CallTracker` é um modulo (nativo) do Node.js, que foi implementado na versão 18,
este module é usado para interceptar chamadas de funções agindo como um **Spy** ou **Stub**. Permitindo assim o programador verificar
se uma determinada função foi chamada ou mockar o retorno desta função, graças a esse modulo agora é possivel eliminar dependencias 
externas como `sinon` e `jest`.

### Qual a diferença entre Spies e Stubs?
Em suma, `spies` são responsaveis por monitorar o comportamento de uma funcão/método, como por exemplo se a função ou método foi chamada,
quantas vezes foi chamada, e quais argumentos foram passados para essa função. Já os `stubs` traz consigo formas de você mockar 
o retorno de alguma função/método ou até a implementação daquela função alterando o comportamento padrão dela.  

Pelo fato de algumas dependencias unir os dois conceitos em um único termo (`stubs`), isso pode acabar gerando um mal entendimento,
que o `spies` apenas monitara os comportamentos e `stubs` monitara e altera os comportamentos. Sendo que, os métodos `stubs` dessas 
tais dependencias extende o comportamento dos `spies`, pois ao alterar o comportamento de algum método é comum o Q.A ou programador
querer monitorar o comportamento deste método e é neste ponto que acaba tendo a união dos dois conceitos.  

Em resumo, para facilitar a diferença de ambas as praticas, com `spies` é possivel apenas monitorar o comportamento de uma determinada
função/método e com `stubs` é possivel apenas alterar o comportamento de alguma função/método e com isso usar os `spies` junto para monitorar.
