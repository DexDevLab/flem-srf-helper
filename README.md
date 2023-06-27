<h1 align="center">FLEM SRF Helper</h1>
<p align=center><i align="center">Aplicação utilizada para aprovar justificativas de ausência do SRF em lote, para o cliente FLEM</i></p>

<br>

<div align="center">

<a href="https://reactjs.org"><img src="https://img.shields.io/badge/react-black?logo=react&logoColor=white" height="22" alt="React"/></a>
<a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next-black?logo=next.js&logoColor=white" height="22" alt="NextJS"/></a>
<a href="https://chakra-ui.com"><img src="https://img.shields.io/badge/chakra-%234ED1C5.svg?logo=chakraui&logoColor=white" height="22" alt="ChakraUI"/></a>

<a href=""><img src="https://img.shields.io/badge/maintenance-passively--maintained-yellowgreen.svg" height="22" alt="Maintenance-passively-maintained"/></a>
<a href=""><img src="https://img.shields.io/github/last-commit/frtechdev/flem-srf-helper" height="22" alt="LastCommit"></a>
<a href=""><img src="https://snyk.io/test/github/frtechdev/flem-srf-helper/badge.svg" height="22" alt="Snyk"/></a>

<a href=""><img src="https://img.shields.io/github/repo-size/frtechdev/flem-srf-helper" height="22" alt="RepoSize"/></a>
<a href=""><img src="https://img.shields.io/github/languages/code-size/frtechdev/flem-srf-helper" height="22" alt="CodeSize"/></a>
<a href=""><img src="https://img.shields.io/github/contributors/frtechdev/flem-srf-helper" height="22" alt="Contributors"></a>

<a href=""><img src="https://img.shields.io/github/forks/frtechdev/flem-srf-helper" height="22" alt="Fork"></a>
<a href=""><img src="https://img.shields.io/github/release/frtechdev/flem-srf-helper.svg" height="22" alt="LatestRelease"></a>
<a href="https://github.com/frtechdev/flem-srf-helper/blob/main/LICENSE"><img src="https://img.shields.io/github/license/frtechdev/flem-srf-helper" height="22" alt="License"></a>

|| [Conteúdo](#section-conteudo) || [Características](#section-caracteristicas) || [Stack](#section-stack) || [Documentação](#section-documentacao) || [Instruções](#section-instrucoes) ||

|| [Variáveis de Ambiente](#section-vars) || [Notas de versão](#section-changelog) || [Autores](#section-autores) || [Contato](#section-contato) || [Licença](#section-licenca) ||

</div>

<hr>

<a name="section-conteudo">

## Conteúdo

</a>

<br>

Aplicação utilizada para aprovar justificativas de ausência do SRF em lote, para o cliente FLEM. O objetivo desta pequena aplicação é integrar ao backend do SRF - responsável por gerenciar presenças, faltas e férias de colaboradores FLEM - para receber as aprovações pendentes sobre justificativas de falta, e realizar a aprovação em lote, facilitando o trabalho dos colaboradores.

<hr>

<a name="section-caracteristicas">

## Características

</a>

<br>

- Interface simples e compatível com o sistema de design utilizado por outras aplicações FLEM
- Integração com Backend já existente do SRF atual, podendo ser escalada e substituída facilmente por outro Backend caso o SRF seja reconstruído
- Autenticação é realizada pelo próprio Backend do SRF atual

<hr>

<a name="section-stack">

## Stack

</a>

<br>

- **Linguagem Principal:** [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- **Linguagens de Marcação e Estilo:** [HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML), [CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS), [SASS](https://sass-lang.com/documentation)
- **Framework Principal:** [Node.js](https://nodejs.org/en/docs/)
- **Framework estrutural:** [Next.js](https://nextjs.org/docs/getting-started)
- **Design System:** [Chakra UI](https://chakra-ui.com/docs/getting-started)
- **Gerenciador de Dependências:** [Yarn](https://yarnpkg.com/getting-started)
- **Bibliotecas:** Para uma lista completa de bibliotecas e dependências nos mais variados escopos, conferir o arquivo [package.json](https://github.com/frtechdev/flem-srf-helper/blob/main/package.json).

<hr>

<a name="section-documentacao">

## Documentação

</a>

<br>

- [Manual do Usuário](https://frtechdev.github.io/flem-srf-helper/resources/srf_helper_manual_do_usuario.pdf)

Documentação adicional pode ser encontrada [aqui](https://frtechdev.github.io/flem-srf-helper/).

<hr>

<a name="section-instrucoes">

## Instruções

</a>

<br>

### Utilizando o repositório como projeto

</a>

1 - Faça um git clone ou o download do repositório, da forma que preferir

```bash

git clone https://github.com/frtechdev/flem-srf-helper.git

```

2 - Instale um gerenciador de pacotes (preferencialmente yarn) utilizando um terminal no diretório raiz do repositório clonado

`yarn` ou `npm install`

3 - Execute a aplicação no terminal

`yarn dev` ou `npm run dev`

### Implantando o projeto

</a>

#### Por um repositório clonado

**Lembre-se de executar `yarn build` ANTES de criar seu container com base no repositório local.**

Para criar a imagem, utilize o `docker build` referenciando o arquivo local do [Dockerfile](https://github.com/frtechdev/flem-srf-helper/blob/main/Dockerfile):

```bash
docker build --env-file .env -f Dockerfile .
```

#### Diretamente do repositório remoto

Você pode utilizar o `docker build` referenciando diretamente o repositório:

```bash
docker build https://github.com/frtechdev/flem-srf-helper.git#main
```

Alternativamente, pode usar o comando detalhado para alterar diretamente configurações como porta e nome do repositório:

```bash
docker run -p X:3000 --env-file .env -e github='https://github.com/frtechdev/flem-file-upload-api.git' -it frtechdev/flem-file-upload-api
```

**Lembre-se de criar um arquivo `.env` para definir as variáveis de ambiente utilizadas na imagem, ou especificar as variáveis utilizadas uma a uma na linha de comando acima.**

Onde "X" é uma porta externa de sua escolha. Por padrão, a porta interna é 3000.
Para alterar a porta interna, altere a linha `ENV PORT` do [Dockerfile](https://github.com/frtechdev/flem-srf-helper/blob/main/Dockerfile).

Para mais informações, visite a [Documentação do Docker](https://docs.docker.com).

</a>

<hr>

<a name="section-vars">

### Variáveis de Ambiente

</a>

<br>

| Variável      | Uso   |
|---------------|-------|
|`NEXT_PUBLIC_URL_SRF_FRONTEND` | URL da aplicação Frontend SRF, necessária para autenticação. | |
|`NEXT_PUBLIC_URL_SRF_BACKEND` | URL da API / Backend do SRF, necessária para consulta de informações de comprovações. | |
|`NEXTAUTH_SECRET` | Hash JWT para criptografar o token de conexão (preferencialmente um hash acima de 32 caracteres). | |
|`NEXTAUTH_URL` | Endereço externo da aplicação. (Por exemplo: `http://srfhelper.flem.org.br`) | |
|`NEXTAUTH_URL_INTERNAL` | Endereço interno da aplicação. (Por exemplo: `http://localhost:3000`) | |

<hr>

<a name="section-changelog">

## Notas de versão

</a>

<br>

### v1.0.3-230627

- Atualização da Documentação

### v1.0.2-230627

- Atualização da Documentação
- Resolvido bug onde o Github Actions não conseguia terminar o workflow após executar `docker run`

### v1.0.1-230627

- Atualização do Next
- Alteração no next.config.js para output de standalone em builds

### v1.0.0-230627

- Adição de script de limpeza de index de cache do Git
- Adição do arquivo `.yarnclean` para sanitização de módulos
- Inclusão de scripts yarn
- Documentação de todos os componentes, módulos, arquivos e componentes do projeto
- Criação de Handler para tratamento de Exceções e resposta para o usuário
- Atualização da Documentação
- Criação de um script de Github Actions para Tag e Release automáticos das versões no branch `main`
- Adição de um script de Github Actions para deploy automático de imagem Docker
- Remoção de componentes não utilizados

### Initial Commit

- Initial Commit

<hr>

<a name="section-autores">

## Autores

</a>

<br>

<a href="https://github.com/frtechdev/flem-srf-helper/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=frtechdev/flem-srf-helper" />
</a>

<hr>

<a name="section-contato">

## Contato

</a>

<br>

Se você gostou deste projeto, dê uma <a href="https://github.com/frtechdev/flem-srf-helper" data-icon="octicon-star" aria-label="Star frtechdev/flem-srf-helper on GitHub">estrela</a>. <br>
Para contato, envie um email a: <a href="mailto:dex.houshi@hotmail.com">dex.houshi@hotmail.com</a>

<hr>

<a name="section-licenca">

## Licença

</a>

Licenciado sob a [MIT License](https://github.com/frtechdev/flem-srf-helper/blob/main/LICENSE).
