# Deadpool Site

Landing page temática do Deadpool, construída com HTML, SCSS e JavaScript, utilizando Gulp como ferramenta de build.

## Tecnologias

- **HTML5** — estrutura com componentes separados por arquivo
- **SCSS** — estilização modular com variáveis e partials
- **JavaScript** — interatividade (tabs, animações)
- **Gulp** — automação de build, compilação SCSS e live reload

## Como rodar

**Pré-requisitos:** Node.js instalado.

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento com live reload
npm run dev

# Gerar build de produção
npm run build

# Remover pasta dist/
npm run clean
```

## Estrutura de pastas

- `src/` — código fonte do projeto
- `src/components/` — seções do site separadas por arquivo
- `src/styles/` — estilos SCSS modulares
- `src/images/` — imagens utilizadas no site
- `dist/` — build gerado pelo Gulp
