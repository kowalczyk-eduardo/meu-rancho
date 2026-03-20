# 📄 Product Requirements Document (PRD) - Roubank

## 1. Visão Geral e Objetivo

Com o crescimento exponencial das tarefas, obrigações e custos operacionais, os produtores rurais frequentemente enfrentam dificuldades para gerenciar todas as demandas de suas propriedades, o que pode resultar no esquecimento de atividades essenciais. Essa situação pode acarretar perdas financeiras, aumento do estresse e impactos negativos na vida pessoal.

Diante desse cenário, o projeto tem como objetivo facilitar o cotidiano do produtor rural, oferecendo uma ferramenta que proporcione maior organização e controle das atividades, diretamente na palma da mão.

## 2. Atores do Sistema

- **Visitante:** Usuário ainda não registrado que pretende se cadastrar no sistema.
- **Cliente:** Usuário que tem uma conta registrada, e pode listar sua propriedades cadastradas, assim podendo gerenciar os seus animais.

## 3. Histórias de Usuário e Escopo

Abaixo estão as funcionalidades escritas sob a perspecitiva do usuário final, que deseja organizar a sua propriedade rural.

### 👨‍🌾 Épico 1: Cadastro

- **US01 - Cadastro do visitante:** Como um Visitante, quero preencher um formulário (Nome, E-mail e Senha) para criar uma conta no Meu Rancho.
  - _Critérios de Aceitação:_ O nome deve ser válido (Não conter números, símbolos, etc);todos os campos são obrigatórios.
- **US02 - Login:** Como um usuário, quero inserir meu e-mail e/ou nome e senha para acessar a página inicial.

### 🌳  Épico 2: Propriedades

- **US03 - Cadastro de propriedades:** Como um Usuário, quero quero poder adicionar minhas propriedades.
- **US04 - Listagem de propriedades:** Como um Usuário, quero que seja possível visualizar todas as minhas propriedades adicionadas.
- **US05 - Busca de propriedades:** Como um Usuário, quero informar um nome de busca, para localizar uma propriedade cadastrada em específico.
  - _Critérios de Aceitação:_ Não deve haver caracteres especiais; deve funcionar mesmo com o nome parcialmente escrito.

### 🐄 Épico 3: Animais

- **US06 - Cadastro de animais:** Como um Usuário, quero cadastrar meus animais.
  - _Critérios de Aceitação:_ Deve haver um brinco numerado, para a realizar o cadastro do animal com sucesso.
- **US07 - Seleção de características dos animais:** Como um Usuário, quero poder selecionar a idade, raça (opcional), e gênero do animal.
  - _Critérios de Aceitação:_ Deve haver uma lista para cada um dos itens.
- **US08 - Cadastro de vacinas:** Como Usuário, quero poder associar vacinas para um animal ou mais.
