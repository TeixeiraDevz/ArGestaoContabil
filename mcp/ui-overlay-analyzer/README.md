# MCP - UI Overlay Analyzer (ArContabilidade)

Este MCP abre o seu frontend no Chromium (Playwright) e expõe tools para:

- Capturar **console logs**, **erros de página** e **network** (request/response/failed)
- Dar **refresh (F5)**
- Tirar **screenshot**
- Detectar **sobreposição de elementos** (via interseção de `getBoundingClientRect()`)

## Instalação (Windows)

No diretório do MCP:

```bash
cd mcp/ui-overlay-analyzer
npm install
npm run playwright:install
```

## Rodar (manual)

```bash
cd mcp/ui-overlay-analyzer
npm run dev
```

> Quando o Cursor chama o MCP, ele roda via STDIO automaticamente (você normalmente não executa manualmente).

## Rodar AUTOMÁTICO via terminal (sem depender do Cursor)

Se a sua versão do Cursor não estiver chamando MCP tools no chat, você pode rodar o fluxo “one-shot” pelo PowerShell e ele vai **salvar os resultados em arquivo**.

1) Build:

```bash
cd mcp/ui-overlay-analyzer
npm run build
```

2) Execute o bootstrap (gera `./out/bootstrap.json` e `./out/bootstrap.png`):

```bash
cd mcp/ui-overlay-analyzer
npm run cli:bootstrap -- http://localhost:4200/ 1500 ./out bootstrap
```

Para reproduzir o cenário “estou no footer e aperto F5”, passe `true` no 5º argumento:

```bash
cd mcp/ui-overlay-analyzer
npm run cli:bootstrap -- "http://localhost:4200/?debugScroll=1" 4000 ./out scroll-debug true
```

## Configurar no Cursor

Em `Cursor Settings` → `MCP`, adicione um servidor apontando para este comando (ajuste o caminho se necessário):

```json
{
  "mcpServers": {
    "ar-ui-overlay-analyzer": {
      "command": "node",
      "args": [
        "C:/Users/vteix/Documents/GitHub/ArContabilidade/mcp/ui-overlay-analyzer/node_modules/tsx/dist/cli.mjs",
        "C:/Users/vteix/Documents/GitHub/ArContabilidade/mcp/ui-overlay-analyzer/src/index.ts"
      ]
    }
  }
}
```

Se você preferir rodar compilado (sem tsx), use:

```bash
cd mcp/ui-overlay-analyzer
npm run build
```

E a config (exemplo):

```json
{
  "mcpServers": {
    "ar-ui-overlay-analyzer": {
      "command": "node",
      "args": [
        "C:/Users/vteix/Documents/GitHub/ArContabilidade/mcp/ui-overlay-analyzer/dist/index.js"
      ]
    }
  }
}
```

## Como executar as tools (quando você não vê “ícone de ferramenta” no chat)

Algumas versões/layouts do Cursor **não mostram um botão “Tools”** no Composer. Nesses casos, use um destes jeitos:

- **Pelo menu do `@` no chat**:
  - Na caixa de mensagem do chat, digite `@` (ou clique no ícone `@`)
  - Procure por algo como **Tools / MCP** e selecione a tool (ex: `ar_ui_bootstrap`)
  - Cole os argumentos em JSON quando solicitado

- **Pedindo para o Agent executar a tool** (sem seletor):
  - Escreva no chat: **“Execute a tool `ar_ui_bootstrap` com estes argumentos:”** e cole o JSON.
  - Se o MCP estiver **Running**, o Agent chama a tool por trás e o resultado volta no chat.

- **Se não aparecer nada de MCP/tools**:
  - Confirme em `Settings → Tools → Installed MCP Servers` que `ar-ui-overlay-analyzer` está **verde/Running**
  - Se estiver vermelho, clique em **“Error – Show Output”** e veja o motivo
  - Se estiver Running e ainda assim não aparece no chat, pode ser versão antiga do Cursor — atualizar costuma resolver.

## Tools disponíveis

- `ar_ui_browser_start`: inicia o Chromium (recomendado `headless: false`)
- `ar_ui_page_open`: abre uma URL
- `ar_ui_page_refresh`: dá F5
- `ar_ui_monitor_start`: começa a capturar eventos (console/network/errors)
- `ar_ui_monitor_events`: lê o buffer (com `sinceSeq`)
- `ar_ui_monitor_clear`: limpa o buffer
- `ar_ui_page_screenshot`: screenshot base64 (retorna content type image/png)
- `ar_ui_overlaps_find`: encontra sobreposições (opcional: `annotateScreenshot: true`)
- `ar_ui_bootstrap`: faz um fluxo completo (start + monitor + open + F5 + wait + events + overlaps + screenshot)

### Exemplo de fluxo

1) Start browser e monitoramento

- `ar_ui_browser_start` `{ "headless": false }`
- `ar_ui_monitor_start` `{}`

2) Abrir sua tela

- `ar_ui_page_open` `{ "url": "http://localhost:4200" }`

3) Dar F5 e ver eventos

- `ar_ui_page_refresh` `{}`
- `ar_ui_monitor_events` `{ "sinceSeq": 0, "limit": 200 }`

4) Detectar sobreposição + screenshot anotado

- `ar_ui_overlaps_find` `{ "minAreaPx": 400, "annotateScreenshot": true, "annotateTop": 10 }`

### One-shot (recomendado)

- `ar_ui_bootstrap` `{ "url": "http://localhost:4200/", "annotateScreenshot": true }`


