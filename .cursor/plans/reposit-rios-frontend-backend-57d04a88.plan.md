---
name: Elevar Design Inspirado no Stable
overview: ""
todos:
  - id: 07cab788-b1ac-4390-ad8b-346039e3f42e
    content: Adicionar variáveis CSS para paleta de cores (azul, branco, preto, roxo) no styles.scss
    status: completed
  - id: 7a2f434f-abcb-4ba4-9e2b-e462f2f6b3a0
    content: Criar animações CSS com objetos de escritório (calculadora, gráficos, documentos, caneta)
    status: completed
  - id: edba7dc2-50b1-4e56-af99-53b9219435da
    content: Adicionar animações sutis no hero (calculadora flutuante, gráficos, parallax)
    status: completed
  - id: e306c36e-220b-458c-8fea-8980f22f5f39
    content: Melhorar animações dos cards (hover effects, micro-interações, objetos de escritório)
    status: completed
  - id: 70632e5c-1e38-4dee-aa21-bc8b56f613f6
    content: Adicionar animação de contagem nos números e ícones animados na seção de métricas
    status: pending
  - id: 9895c1c1-e305-4e1c-9422-889c534a36d4
    content: Melhorar tipografia com hierarquia clara e espaçamentos generosos
    status: pending
  - id: cf17268a-cfa5-43e8-8431-3903b8f72c85
    content: Adicionar gradientes sutis e sombras modernas seguindo estilo Stable
    status: pending
  - id: 6efbf4b6-37da-4db5-b676-b6daf96485dc
    content: Implementar micro-interações em todos os elementos interativos
    status: pending
---

# Elevar Design Inspirado no Stable

## Objetivo

Melhorar o design do site inspirado no Stable (stableapp.cloud), adicionando animações sutis com objetos de escritório, mantendo a identidade de escritório de contabilidade.

## Paleta de Cores

- **Azul**: #2563eb (azul profissional)
- **Branco**: #ffffff (fundo limpo)
- **Preto**: #1a1a1a (textos principais)
- **Roxo**: #667eea (destaques e gradientes)

## Animações com Objetos de Escritório

### 1. Hero Section

- Animação de calculadora flutuante (SVG animado)
- Gráficos aparecendo suavemente
- Documentos deslizando
- Efeito parallax sutil

### 2. Cards de Serviços

- Ícones com animação de "escrever" (caneta)
- Hover com efeito de papel sendo virado
- Animação de gráfico crescendo
- Micro-interações ao passar o mouse

### 3. Seção de Métricas

- Números contando (count-up animation)
- Ícones de calculadora/gráfico animados
- Efeito de "digitando" nos números

### 4. Cards de Planos

- Animação de documento abrindo
- Hover com efeito de prancheta
- Badge "Mais Popular" com pulso sutil

### 5. Diferenciais

- Ícones com animação de movimento
- Efeito de "check" aparecendo
- Transições suaves entre estados

## Melhorias de Design (Estilo Stable)

### Tipografia

- Fontes mais modernas e limpas
- Hierarquia clara de tamanhos
- Espaçamento generoso entre linhas

### Espaçamentos

- Padding e margins mais generosos
- Seções com mais respiro
- Cards com espaçamento interno adequado

### Gradientes e Sombras

- Gradientes sutis (azul → roxo)
- Sombras suaves e modernas
- Efeitos de profundidade

### Micro-interações

- Hover effects suaves
- Transições de 0.3s ease
- Feedback visual em todos os elementos clicáveis

### Layout

- Container max-width adequado
- Grid responsivo melhorado
- Espaçamento consistente

## Estrutura de Arquivos

```javascript
frontend/src/
├── styles.scss (variáveis de cores e animações globais)
├── app/
│   └── features/
│       └── home/
│           └── pages/
│               └── home/
│                   ├── home.html
│                   └── home.ts (estilos e animações)
```



## Animações CSS a Implementar

1. **@keyframes float** - Objetos flutuando
2. **@keyframes slideIn** - Elementos entrando
3. **@keyframes countUp** - Números contando
4. **@keyframes write** - Efeito de escrita
5. **@keyframes pulse** - Pulsação sutil
6. **@keyframes fadeInUp** - Fade in com movimento

## Objetos de Escritório para Animar

- Calculadora (hero)
- Gráficos/Charts (métricas)
- Documentos (planos)
- Caneta (serviços)
- Prancheta (diferenciais)
- Check marks (benefícios)

## Manter Campos Padrões

- Home (hero, serviços, planos, métricas, diferenciais, CTA)
- Clientes
- Equipe
- Login
- Footer
- Header

## Arquivos-Chave

- `frontend/src/styles.scss` - Variáveis CSS e animações globais
- `frontend/src/app/app/features/home/pages/home/home.ts` - Estilos e animações da home