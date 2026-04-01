# 🎨 Design System - Meu Rancho

Neste projeto, utilizamos um framework UI e aplicamos customizações pontuais para refletir a identidade visual.

### 1. Framework Base

- **Framework escolhido:** Bootstrap
- **Motivação:** Permite criar interfaces responsivas e visualmente organizadas de forma rápida, utilizando componentes e estilos prontos, o que facilita o aprendizado inicial sem exigir conhecimento avançado de CSS.

### 2. Paleta de Cores (Customização)

As variáveis de cor do sistema foram definidas para transmitir confiabilidade, solidez e sofisticação rural, alinhadas ao conceito "Modern Agrarian", utilizando tons terrosos e naturais.

- **Cor Primária (Botões, links primários, CTAs):** `#C05A3B` _(Terracota)_
  - _Uso:_ Botões primários (ex: salvar, confirmar ações),a elementos de destaque e CTAs, ícones principais.
- **Cor da Superfície(Base / Estrutura):** `#FFFFFF` _(Branco)_
  - _Uso:_ Cartões, modais, menus suspensos.
- **Cor de Fundo (Fundo da página):** `#F9F6F0` _(Creme)_
  - _Uso:_ Fundo principal da aplicação, base para construção da hierarquia visual.
- **Cor de texto:** `#3E2723` _(Café escuro)_
  - _Uso:_ Títulos, texto do corpo.
- **Cor Neutra:** `#8D6E63` _(Taupe Quente)_
  - _Uso:_ Texto secundário, bordas, espaços reservados.
- **Cor de Destaque:** `#4A7337` _(Verde Folha)_
  - _Uso: Sucesso, estados ativos, destaques._

## 3. Tipografia

- **Títulos:** `Playfair Display, serif` (Peso: 700).
- **Corpo:** `Work Sans, sans-serif` (Peso: 400).
- **Texto pequeno:** `Work Sans, sans-serif` (Peso: 400).
- **Botões:** `Work Sans, sans-serif` (Peso: 500).

## 4. Design Tokens

:root {
  -color-primary: #C05A3B;
  -color-background: #F9F6F0;
  -color-surface: #FFFFFF;
  -color-text: #3E2723;
  -color-muted: #8D6E63;
  -color-accent: #4A7337;
  -font-headings: 'Playfair Display', serif;
  -font-body: 'Work Sans', sans-serif;
  -radius-card: 12px;
  -radius-btn: 8px;
  -shadow-warm: 0 4px 12px rgba(62, 39, 35, 0.08);
}
