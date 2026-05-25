#!/bin/bash
# ================================================================
# MyRTOS 官网生态 — 一键部署脚本
# 
# 适配系统：Alibaba Cloud Linux 3.2104 LTS 64 位
# 功能：
#   1. 检查并安装必要依赖
#   2. 构建 Docusaurus 文档站
#   3. 本地预览（可选）
#   4. 推送到 GitHub 触发自动部署
#
# 使用方式：
#   chmod +x scripts/deploy.sh
#   ./scripts/deploy.sh [--build|--preview|--push|--all]
# ================================================================

set -e  # 遇到错误立即退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 项目根目录
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DOCS_DIR="${PROJECT_ROOT}/docs"

# ====== 日志函数 ======
log_info()    { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn()    { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error()   { echo -e "${RED}[ERROR]${NC} $1"; }
log_section() { echo -e "\n${BLUE}====== $1 ======${NC}\n"; }

# ====== 检查依赖 ======
check_dependencies() {
    log_section "检查依赖"

    # Git
    if command -v git &> /dev/null; then
        log_info "Git: $(git --version)"
    else
        log_error "Git 未安装，请执行: sudo dnf install -y git"
        exit 1
    fi

    # Node.js
    if command -v node &> /dev/null; then
        log_info "Node.js: $(node --version)"
    else
        log_warn "Node.js 未安装，正在安装..."
        curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
        sudo dnf install -y nodejs
        log_info "Node.js 已安装: $(node --version)"
    fi

    # npm
    if command -v npm &> /dev/null; then
        log_info "npm: $(npm --version)"
    else
        log_error "npm 未安装"
        exit 1
    fi

    # Python (SCons 需要)
    if command -v python3 &> /dev/null; then
        log_info "Python: $(python3 --version)"
    else
        log_warn "Python 未安装，正在安装..."
        sudo dnf install -y python3
    fi

    # SCons
    if command -v scons &> /dev/null; then
        log_info "SCons: $(scons --version 2>&1 | head -1)"
    else
        log_warn "SCons 未安装，正在安装..."
        pip3 install scons
    fi
}

# ====== 安装 Docusaurus 依赖 ======
install_docs_deps() {
    log_section "安装 Docusaurus 依赖"

    cd "${DOCS_DIR}"

    if [ -f "package-lock.json" ]; then
        log_info "使用 npm ci 安装（更快、更可靠）..."
        npm ci
    else
        log_info "使用 npm install 安装..."
        npm install
    fi

    log_info "依赖安装完成"
    cd "${PROJECT_ROOT}"
}

# ====== 构建 Docusaurus ======
build_docs() {
    log_section "构建 Docusaurus 文档站"

    cd "${DOCS_DIR}"
    npm run build
    log_info "构建完成，输出目录: ${DOCS_DIR}/build/"
    cd "${PROJECT_ROOT}"
}

# ====== 本地预览 ======
preview_docs() {
    log_section "本地预览文档站"

    cd "${DOCS_DIR}"
    log_info "启动本地预览服务器..."
    log_info "访问地址: http://localhost:3000/myrtos/"
    log_info "按 Ctrl+C 停止"
    npm run start
}

# ====== 推送到 GitHub ======
push_to_github() {
    log_section "推送到 GitHub"

    cd "${PROJECT_ROOT}"

    # 检查是否有未提交的更改
    if [ -n "$(git status --porcelain)" ]; then
        log_info "检测到未提交的更改..."

        # 显示变更
        git status --short

        # 提示输入 commit message
        read -p "请输入 commit message (留空使用默认消息): " commit_msg
        if [ -z "$commit_msg" ]; then
            commit_msg="docs: update website and documentation"
        fi

        # 提交更改
        git add .
        git commit -m "$commit_msg"
        log_info "已提交: $commit_msg"
    else
        log_info "没有未提交的更改"
    fi

    # 推送到远程
    log_info "推送到 GitHub..."
    git push origin main
    log_info "推送完成！GitHub Actions 将自动部署"
    log_info "查看部署状态: https://github.com/YOUR_USERNAME/myrtos/actions"
}

# ====== 显示帮助 ======
show_help() {
    echo "MyRTOS 官网生态 — 一键部署脚本"
    echo ""
    echo "用法: $0 [选项]"
    echo ""
    echo "选项:"
    echo "  --check      仅检查依赖"
    echo "  --install    安装 Docusaurus 依赖"
    echo "  --build      构建 Docusaurus 文档站"
    echo "  --preview    本地预览文档站"
    echo "  --push       推送到 GitHub（触发自动部署）"
    echo "  --all        执行完整流程（检查 + 安装 + 构建 + 推送）"
    echo "  --help       显示此帮助信息"
    echo ""
    echo "示例:"
    echo "  $0 --all          # 完整部署流程"
    echo "  $0 --build        # 仅构建"
    echo "  $0 --preview      # 本地预览"
    echo "  $0 --push         # 推送到 GitHub"
}

# ====== 主函数 ======
main() {
    log_section "MyRTOS 官网生态部署"
    log_info "项目目录: ${PROJECT_ROOT}"

    case "${1:-}" in
        --check)
            check_dependencies
            ;;
        --install)
            check_dependencies
            install_docs_deps
            ;;
        --build)
            check_dependencies
            install_docs_deps
            build_docs
            ;;
        --preview)
            check_dependencies
            install_docs_deps
            preview_docs
            ;;
        --push)
            push_to_github
            ;;
        --all)
            check_dependencies
            install_docs_deps
            build_docs
            push_to_github
            ;;
        --help|-h)
            show_help
            ;;
        *)
            show_help
            ;;
    esac

    log_section "完成"
}

# 执行主函数
main "$@"
