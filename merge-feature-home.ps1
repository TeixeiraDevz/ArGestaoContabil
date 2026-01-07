# Script para fazer merge da feature-home para main
# Passo 1: Commit automático das alterações
# Passo 2: Merge feature-home -> main
# Passo 3: Push para origin/main
$env:Path += ";C:\Program Files\Git\bin"

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "  Merge: feature-home -> main" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# 1. Verificar repositorio Git
Write-Host "[1/7] Verificando repositorio Git..." -ForegroundColor Cyan
if (-not (Test-Path ".git")) {
    Write-Host "ERRO: Nao e um repositorio Git!" -ForegroundColor Red
    exit 1
}
Write-Host "OK: Repositorio Git encontrado" -ForegroundColor Green
Write-Host ""

# 2. Verificar e fazer commit das alterações pendentes
Write-Host "[2/7] Verificando alteracoes pendentes..." -ForegroundColor Cyan
$status = & git status --porcelain
if ($status) {
    Write-Host "Alteracoes encontradas. Fazendo commit automatico..." -ForegroundColor Yellow
    & git add .
    & git commit -m "Auto-commit: Alteracoes antes do merge feature-home -> main"
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERRO: Falha ao fazer commit" -ForegroundColor Red
        exit 1
    }
    Write-Host "OK: Alteracoes commitadas" -ForegroundColor Green
} else {
    Write-Host "OK: Nenhuma alteracao pendente" -ForegroundColor Green
}
Write-Host ""

# 3. Verificar branches
Write-Host "[3/7] Verificando branches..." -ForegroundColor Cyan
$currentBranch = & git branch --show-current
Write-Host "Branch atual: $currentBranch" -ForegroundColor Cyan

$branches = & git branch --list
$hasFeature = $branches | Select-String "feature-home"
$hasMain = $branches | Select-String "main"

if (-not $hasFeature) {
    Write-Host "ERRO: Branch feature-home nao encontrada!" -ForegroundColor Red
    Write-Host "Branches disponiveis:" -ForegroundColor Yellow
    & git branch --list
    exit 1
}

if (-not $hasMain) {
    Write-Host "Criando branch main a partir de origin/main..." -ForegroundColor Yellow
    & git fetch origin
    & git checkout -b main origin/main
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERRO: Nao foi possivel criar branch main" -ForegroundColor Red
        exit 1
    }
}
Write-Host "OK: Branches verificadas" -ForegroundColor Green
Write-Host ""

# 4. Checkout para main
Write-Host "[4/7] Mudando para branch main..." -ForegroundColor Cyan
if ($currentBranch -ne "main") {
    & git checkout main
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERRO ao fazer checkout" -ForegroundColor Red
        exit 1
    }
}
Write-Host "OK: Na branch main" -ForegroundColor Green
Write-Host ""

# 5. Atualizar com origin/main
Write-Host "[5/7] Atualizando com origin/main..." -ForegroundColor Cyan
& git fetch origin
$remote = & git ls-remote --heads origin main
if ($remote) {
    & git pull origin main
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERRO: Conflitos no pull. Resolva manualmente e rode o script novamente" -ForegroundColor Red
        exit 1
    }
    Write-Host "OK: Main atualizada com origin/main" -ForegroundColor Green
} else {
    Write-Host "INFO: Origin/main nao encontrado, continuando..." -ForegroundColor Yellow
}
Write-Host ""

# 6. Fazer merge
Write-Host "[6/7] Fazendo merge de feature-home -> main..." -ForegroundColor Cyan
& git merge feature-home --no-ff -m "Merge feature-home into main"
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRO: Conflitos no merge!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Para resolver:" -ForegroundColor Yellow
    Write-Host "1. Resolva os conflitos nos arquivos" -ForegroundColor Yellow
    Write-Host "2. Execute: git add ." -ForegroundColor Yellow
    Write-Host "3. Execute: git commit -m 'Resolve merge conflicts'" -ForegroundColor Yellow
    Write-Host "4. Execute: git push origin main" -ForegroundColor Yellow
    Write-Host ""
    & git status
    exit 1
}
Write-Host "OK: Merge realizado com sucesso" -ForegroundColor Green
Write-Host ""

# 7. Push para origin/main
Write-Host "[7/7] Fazendo push para origin/main..." -ForegroundColor Cyan
& git push origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRO: Falha no push" -ForegroundColor Red
    Write-Host "Tente executar manualmente: git push origin main" -ForegroundColor Yellow
    exit 1
}
Write-Host "OK: Push realizado com sucesso" -ForegroundColor Green
Write-Host ""

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "  Merge concluido com sucesso! 🎉" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Mostrar log resumido
Write-Host "Ultimos 5 commits:" -ForegroundColor Cyan
& git log --oneline -5
