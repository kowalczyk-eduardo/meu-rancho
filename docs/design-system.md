# 🎨 Design System - Meu Rancho

Neste projeto, utilizamos um framework UI e aplicamos customizações pontuais para refletir a identidade visual.

### 1. Framework Base

- **Framework escolhido:** Bootstrap
- **Motivação:** Permite criar interfaces responsivas e visualmente organizadas de forma rápida, utilizando componentes e estilos prontos, o que facilita o aprendizado inicial sem exigir conhecimento avançado de CSS.

### 2. Paleta de Cores (Customização)

As variáveis de cor do sistema foram definidas para transmitir confiabilidade, solidez e sofisticação rural, alinhadas ao conceito "Modern Agrarian", utilizando tons terrosos e naturais.
 
- **Cor Primária (Botões, links primários, CTAs):** `#DB4B1F` _(Terracota Vivo)_
  - _Uso:_ Botões primários (ex: salvar, confirmar ações), elementos de destaque, CTAs e ícones principais.
- **Cor Escura da Marca (Fundos de seção de destaque):** `#9A3412` (Terracota Escuro)
  - _Uso:_ Seções de chamada para ação (ex: faixa "Criar Conta"), fundo de blocos de alto contraste.
- **Cor Profunda da Marca (Texto sobre fundo primário):** `#7C2D12` _(Marrom Avermelhado)_
  - _Uso:_ Texto de botões sobre fundos brancos, reforço de hierarquia em componentes de CTA.
- **Cor de Superfície (Base / Estrutura):** `#FFFFFF` _(Branco)_
  - _Uso:_ Cartões, modais, menus suspensos e painéis internos.
- **Cor de Fundo Principal (Fundo da página):** `#F7F3F1` _(Creme Claro)_
  - _Uso:_ Fundo base da aplicação, suporte à hierarquia visual entre seções.
- **Cor de Fundo Alternativo (Seções de destaque suave):** `#F3EAE8` _(Rosa Creme)_
  - _Uso:_ Seções alternadas como "Filosofia", criando ritmo visual sem sobrecarga.
- **Cor de Texto Principal (Títulos e headings):** `#1B110E` _(Café Muito Escuro)_
  - _Uso:_ Headings h1, h2, h3 e qualquer texto de alta hierarquia.
- **Cor de Texto do Corpo:** `#5A413A` _(Marrom Médio)_
  - _Uso:_ Parágrafos, descrições e textos de apoio em geral.
- **Cor Neutra / Muted:** `#78716C` _(Taupe Quente)_
  - _Uso:_ Texto secundário, rodapés, placeholders e créditos.
- **Cor de Destaque / Accent:** `#956050` _(Cobre Terroso)_
  - _Uso:_ Labels de seção, badges, ícones de apoio e texto de navegação interna.
- **Cor de Sucesso:** `#059669` _(Verde Esmeralda)_
  - _Uso:_ Ícones de checklist, estados ativos, confirmações e indicadores positivos.
- **Texto sobre Fundo Escuro:** `#FFEDD5` _(Creme Pálido)_
  - _Uso:_ Parágrafos e descrições sobre fundos de cor primária escura (ex: seção CTA).

## 3. Tipografia

- **Títulos e Headings:** `Plus Jakarta Sans, sans-serif` _(Peso: 800)_
  - _Uso:_ h1, h2, h3 — todos os títulos de seção e headline do hero.
- **Corpo de Texto e Interface:** `Work Sans, sans-serif` _(Peso: 400)_
  - _Uso:_ Parágrafos, descrições, labels, menus e textos de apoio.
- **Botões:** `Work Sans, sans-serif` _(Peso: 600 a 700)_
  - _Uso:_ Rótulos de botões primários e secundários.
- **Labels e Badges:** `Work Sans, sans-serif` _(Peso: 550 a 600)_
  - _Uso:_ Tags, badges de status, labels de ícone e legendas.

## 4. Design Tokens

:root {

  --color-primary:      #DB4B1F;  
  --color-primary-dark: #9A3412;   
  --color-primary-deep: #7C2D12;  
  --color-surface:      #FFFFFF;  
  --color-background:   #F7F3F1;  
  --color-background-alt: #F3EAE8;   
  --color-text:         #1B110E;  
  --color-text-body:    #5A413A;  
  --color-muted:        #78716C;  
  --color-accent:       #956050;  
  --color-text-light:   #FFEDD5;  
  --color-success:      #059669;  
  -font-headings: 'Plus Jakarta Sans', sans-serif; 
   -font-body: 'Work Sans', sans-serif;  
}
