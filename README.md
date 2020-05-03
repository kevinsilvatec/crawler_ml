# crawler_ml

Aplicação para coletar informações de anúncios no Mercado Livre utilizando NodeJS

# Dependências

Cheerio: Para utilizar seletores jQuery e fazer a navegação dos elementos retornados no body;
Express: Utilizado para criar as rotas e receber as requisições http;
FS: Para criação de arquivos temporários para facilitar a iteração dos objetos.
Request: Para buscar o body das páginas do ML;

# Rodando a aplicação

Essa aplicação foi desenvolvida em JS utilizando a plataforma NodeJS. Para rodar a aplicação é necessário ter o NodeJS instalado. O Yarn e o foi utilizado para gerenciamento das dependências, por isso, para ver a aplicação funcionando basta executar o comando _yarn install_ dentro da pasta da aplicação e depois um _yarn dev_ para incializar (foi criado um script dentro do arquivo _package.json_ para rodar a aplicação utilizando o nodemon). Utilizei o postman para fazer o consumo das rotas;

# Rotas

A aplicação possui duas rotas acessíveis. _/_ e _/search_

## /
- Método: GET;
- Função: Testar a aplicação;
- Retorno: jSON.

## /search
- Método: POST;
- Função: retornar os anúncios saneados do mercado livre saneados;
- Retorno: jSON.

# Observações
Desenvolvendo a aplicação encontrei alguns percalços e, no fim das contas, acabou dando um pouco mais de trabalho do que esperava. Como estou trabalhando, algumas madrugadas foram invadidas para concluir em tempo e, mesmo assim, ainda enxergo algumas implementações que podem ser feitas e que pretendo fazer nesse código para dá-lo mais robustez, dinâmica e perfomance. Algumas implementações que farei: 

- Adicionar Validator;
- Persistir os dados saneados em mongo;
- Paginar as respostas do ML para permitir que sejam capturados mais de 50 anúncios;
- Autenticação JWT (Afinal, o que é uma API sem autenticação?).

Já sei como fazer essas implementações (principalmente a relacionada à paginação). Apenas não tive muito tempo para fazê-las. A aplicação está quase que totalmente baseada em callbacks (o que pode ser confuso pra quem não utiliza habitualmente), mas creio que o fluxo é bem segmentado, os arquivos estão bem separados e há uma sequencia de execução razoalvelmente bem definida. Estou aberto a quaisquer feedbacks e espero que dê tudo certo! Foi divertido fazer essa tarefa!

PS: Dependendo da quantidade de anúncios enviada na chamada e da velocidade de conexão, pode ser necessário utilizar um timeout um pouco maior no postman.