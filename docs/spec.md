# 🛠️ Especificação Técnica (Tech Spec) - Roubank

Este documento detalha a arquitetura técnica, o modelo de dados e os contratos de API (via JSON Server) necessários para o funcionamento do sistema bancário Roubank.

## 1. Modelo de Dados (Diagrama ER)

Abaixo está o Diagrama Entidade-Relacionamento (DER) que representa a estrutura do nosso "banco de dados" (`db.json`) e como as informações se conectam.


```mermaid
erDiagram
    USUARIO ||--o{ PROPRIEDADE : "possui"
    PROPRIEDADE ||--o{ ANIMAL : "abriga"

    USUARIO {
        string id PK "Identificador único do usuário"
        string nome "Nome completo do usuário"
        string email "Endereço de e-mail"
        string senha "Credencial de acesso"
    }

    PROPRIEDADE {
        string id PK "Identificador da propriedade"
        string usuarioId FK "Referência ao usuário dono"
        string endereco "Localização da propriedade"
    }

    ANIMAL {
        string id PK "Identificador do animal"
        string propriedadeId FK "Vínculo com a propriedade"
        string especie "Ex: cavalo, vaca"
        float idade "Idade aproximada do animal (em meses)"
        string genero "Macho ou fêmea"
        string vacinas "Lista de vacinas aplicadas"
    }
```
## 2. Dicionário de Dados

Breve explicação das tabelas principais:

- **Clientes:** Responsável por armazenar os dados de autenticação e o saldo consolidado do usuário.
  - id: Identificador único gerado pelo JSON Server (String ou Hash).
  - cpf: Chave de acesso do usuário. Em um cenário real seria único, mas para o MVP não há trava estrita no banco, apenas validação no front-end.
  - saldo: Valor numérico (Float) que representa o dinheiro disponível. Pode ficar negativo devido à cobrança implacável de taxas do banco.
- **Transações:** Registra o histórico financeiro. Regra de Negócio Crítica: Toda transação de SAQUE ou DEPOSITO feita pelo cliente deve gerar, via JavaScript, uma transação secundária automática do tipo TAXA, subtraindo um valor do saldo do cliente.
  - clienteId: Chave estrangeira que vincula a transação ao cliente (padrão de nomenclatura exigido pelo JSON Server para rotas aninhadas).
  - tipo: Aceita apenas os valores "SAQUE", "DEPOSITO" ou "TAXA".
  - valor: Sempre um número positivo. O front-end decide se soma ou subtrai do saldo geral baseado no tipo.


