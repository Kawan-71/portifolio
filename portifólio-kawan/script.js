"use strict";

// Seleciona os elementos da página.
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const themeToggle = document.getElementById("themeToggle");
const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");
const projectsGrid = document.getElementById("projectsGrid");
const backToTop = document.getElementById("backToTop");

// Lista dos projetos do portfólio.
const projetos = [
    {
        titulo: "Banco de dados para loja",
        descricao: "Estudo de organização de informações com tabelas e comandos SQL.",
        tecnologias: ["SQL", "SQLite"],
        categoria: "sql",
        simbolo: "SQL",
        link: "https://github.com/Kawan-71"
    },
    {
        titulo: "Páginas HTML e CSS",
        descricao: "Prática de criação de páginas web com layout responsivo.",
        tecnologias: ["HTML", "CSS"],
        categoria: "html",
        simbolo: "</>",
        link: "https://github.com/Kawan-71"
    },
    {
        titulo: "Protótipo de interface",
        descricao: "Estudo de organização visual de telas e protótipos.",
        tecnologias: ["Figma", "UI"],
        categoria: "figma",
        simbolo: "FG",
        link: "https://github.com/Kawan-71"
    },
    {
        titulo: "Exercícios de JavaScript",
        descricao: "Prática de lógica, funções, eventos e interatividade.",
        tecnologias: ["JavaScript", "HTML"],
        categoria: "javascript",
        simbolo: "JS",
        link: "https://github.com/Kawan-71"
    },
    {
        titulo: "Estudos com Python e Flask",
        descricao: "Estudos dos fundamentos de Python e aplicações web.",
        tecnologias: ["Python", "Flask"],
        categoria: "python",
        simbolo: "PY",
        link: "https://github.com/Kawan-71"
    }
];

// Retorna uma saudação de acordo com a hora.
function obterSaudacao(hora) {
    if (hora >= 5 && hora < 12) {
        return "BOM DIA, SEJA BEM-VINDO!";
    }

    if (hora >= 12 && hora < 18) {
        return "BOA TARDE, SEJA BEM-VINDO!";
    }

    return "BOA NOITE, SEJA BEM-VINDO!";
}

// Atualiza a saudação.
function atualizarSaudacao() {
    const saudacao = document.getElementById("saudacao");

    if (saudacao) {
        saudacao.textContent = obterSaudacao(
            new Date().getHours()
        );
    }
}

// Abre ou fecha o menu.
function alternarMenu() {
    if (!navMenu || !menuToggle) return;

    const menuAberto = navMenu.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        String(menuAberto)
    );

    menuToggle.setAttribute(
        "aria-label",
        menuAberto
            ? "Fechar menu de navegação"
            : "Abrir menu de navegação"
    );
}

// Fecha o menu após clicar em um link.
function fecharMenu() {
    if (!navMenu || !menuToggle) return;

    navMenu.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute(
        "aria-label",
        "Abrir menu de navegação"
    );
}

// Aplica o tema e atualiza o botão.
function aplicarTema(tema) {
    const temaClaro = tema === "claro";

    document.body.classList.toggle(
        "light-theme",
        temaClaro
    );

    if (themeToggle) {
        themeToggle.textContent = temaClaro ? "☾" : "☀";

        themeToggle.setAttribute(
            "aria-label",
            temaClaro
                ? "Ativar tema escuro"
                : "Ativar tema claro"
        );
    }

    try {
        localStorage.setItem(
            "temaPreferido",
            temaClaro ? "claro" : "escuro"
        );
    } catch (erro) {
        // O site continua funcionando se o armazenamento estiver bloqueado.
    }
}

// Alterna entre os temas.
function alternarTema() {
    const temaClaroAtivo =
        document.body.classList.contains("light-theme");

    aplicarTema(
        temaClaroAtivo ? "escuro" : "claro"
    );
}

// Carrega o tema salvo.
function carregarTema() {
    let temaSalvo = "escuro";

    try {
        temaSalvo =
            localStorage.getItem("temaPreferido") || "escuro";
    } catch (erro) {
        // Usa o tema escuro como padrão.
    }

    aplicarTema(temaSalvo);
}

// Cria os cards dos projetos.
function renderizarProjetos(filtro = "todos") {
    if (!projectsGrid) return;

    projectsGrid.innerHTML = "";

    const projetosFiltrados = projetos.filter(function (projeto) {
        if (filtro === "todos") return true;

        if (filtro === "web") {
            return ["html", "javascript"].includes(
                projeto.categoria
            );
        }

        if (filtro === "estudo") {
            return ["sql", "figma", "python"].includes(
                projeto.categoria
            );
        }

        return projeto.categoria === filtro;
    });

    if (projetosFiltrados.length === 0) {
        projectsGrid.textContent =
            "Nenhum projeto encontrado nessa categoria.";
        return;
    }

    projetosFiltrados.forEach(function (projeto) {
        const card = document.createElement("article");
        card.className = "project-card";

        const arte = document.createElement("div");
        arte.className = "project-art";
        arte.setAttribute("aria-hidden", "true");

        const simbolo = document.createElement("span");
        simbolo.textContent = projeto.simbolo;
        arte.appendChild(simbolo);

        const conteudo = document.createElement("div");
        conteudo.className = "project-content";

        const titulo = document.createElement("h3");
        titulo.textContent = projeto.titulo;

        const descricao = document.createElement("p");
        descricao.textContent = projeto.descricao;

        const tags = document.createElement("div");
        tags.className = "project-tags";
        tags.setAttribute(
            "aria-label",
            "Tecnologias utilizadas"
        );

        projeto.tecnologias.forEach(function (tecnologia) {
            const tag = document.createElement("span");
            tag.textContent = tecnologia;
            tags.appendChild(tag);
        });

        const link = document.createElement("a");
        link.className = "project-link";
        link.href = projeto.link;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Ver no GitHub ↗";

        link.setAttribute(
            "aria-label",
            "Ver " + projeto.titulo + " no GitHub"
        );

        conteudo.append(
            titulo,
            descricao,
            tags,
            link
        );

        card.append(arte, conteudo);
        projectsGrid.appendChild(card);
    });
}

// Filtra os projetos.
function filtrarProjetos(evento) {
    const botao = evento.target.closest(".filter-button");

    if (!botao) return;

    document.querySelectorAll(".filter-button").forEach(
        function (item) {
            item.classList.remove("active");
            item.setAttribute("aria-pressed", "false");
        }
    );

    botao.classList.add("active");
    botao.setAttribute("aria-pressed", "true");

    renderizarProjetos(botao.dataset.filter);
}

// Exibe ou remove o erro de um campo.
function mostrarErro(campoId, mensagem) {
    const campo = document.getElementById(campoId);
    const erro = document.getElementById(campoId + "Error");

    if (erro) {
        erro.textContent = mensagem;
    }

    if (campo) {
        campo.classList.toggle("invalid", mensagem !== "");

        campo.setAttribute(
            "aria-invalid",
            String(mensagem !== "")
        );
    }
}

// Valida o formulário.
function validarFormulario() {
    let formularioValido = true;

    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const mensagem = document.getElementById("mensagem");
    const consentimento =
        document.getElementById("consentimento");

    if (!nome || !email || !mensagem) {
        return false;
    }

    if (nome.value.trim().length < 2) {
        mostrarErro(
            "nome",
            "Digite seu nome com pelo menos 2 caracteres."
        );

        formularioValido = false;
    } else {
        mostrarErro("nome", "");
    }

    const emailValido =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            email.value.trim()
        );

    if (email.value.trim() === "") {
        mostrarErro("email", "Digite seu e-mail.");
        formularioValido = false;
    } else if (!emailValido) {
        mostrarErro("email", "Digite um e-mail válido.");
        formularioValido = false;
    } else {
        mostrarErro("email", "");
    }

    if (mensagem.value.trim().length < 20) {
        mostrarErro(
            "mensagem",
            "A mensagem deve ter pelo menos 20 caracteres."
        );

        formularioValido = false;
    } else {
        mostrarErro("mensagem", "");
    }

    // Valida o consentimento se ele existir no HTML.
    if (consentimento) {
        const consentimentoErro =
            document.getElementById("consentimentoError");

        if (!consentimento.checked) {
            if (consentimentoErro) {
                consentimentoErro.textContent =
                    "Marque a caixa de consentimento para continuar.";
            }

            formularioValido = false;
        } else if (consentimentoErro) {
            consentimentoErro.textContent = "";
        }
    }

    return formularioValido;
}

// Limpa as mensagens de erro.
function limparErros() {
    ["nome", "email", "mensagem"].forEach(
        function (campoId) {
            mostrarErro(campoId, "");
        }
    );

    const consentimentoErro =
        document.getElementById("consentimentoError");

    if (consentimentoErro) {
        consentimentoErro.textContent = "";
    }
}

// Processa o formulário sem enviar dados para um servidor.
function processarFormulario(evento) {
    evento.preventDefault();

    if (!formFeedback || !contactForm) return;

    formFeedback.textContent = "";
    formFeedback.className = "form-feedback";

    if (!validarFormulario()) {
        formFeedback.textContent =
            "Confira os campos destacados antes de continuar.";

        formFeedback.classList.add("error");

        const primeiroCampoComErro =
            document.querySelector(
                ".form-group input.invalid, .form-group textarea.invalid"
            );

        if (primeiroCampoComErro) {
            primeiroCampoComErro.focus();
        }

        return;
    }

    contactForm.reset();
    limparErros();

    formFeedback.textContent =
        "Formulário validado! Esta é uma demonstração escolar; nenhuma mensagem foi enviada.";

    formFeedback.classList.add("success");
}

// Atualiza o ano do rodapé.
function atualizarAno() {
    const ano = document.getElementById("currentYear");

    if (ano) {
        ano.textContent = new Date().getFullYear();
    }
}

// Exibe ou esconde o botão de voltar ao topo.
function atualizarBotaoTopo() {
    if (backToTop) {
        backToTop.classList.toggle(
            "is-visible",
            window.scrollY > 300
        );
    }
}

// Inicia os recursos do site.
function iniciarSite() {
    atualizarSaudacao();
    carregarTema();
    atualizarAno();
    renderizarProjetos();

    if (menuToggle) {
        menuToggle.addEventListener(
            "click",
            alternarMenu
        );
    }

    if (themeToggle) {
        themeToggle.addEventListener(
            "click",
            alternarTema
        );
    }

    if (navMenu) {
        navMenu.querySelectorAll("a").forEach(
            function (link) {
                link.addEventListener(
                    "click",
                    fecharMenu
                );
            }
        );
    }

    const filtros =
        document.querySelector(".project-filters");

    if (filtros) {
        filtros.addEventListener(
            "click",
            filtrarProjetos
        );
    }

    if (contactForm) {
        contactForm.addEventListener(
            "submit",
            processarFormulario
        );
    }

    ["nome", "email", "mensagem"].forEach(
        function (campoId) {
            const campo =
                document.getElementById(campoId);

            if (campo) {
                campo.addEventListener(
                    "input",
                    function () {
                        mostrarErro(campoId, "");
                    }
                );
            }
        }
    );

    window.addEventListener(
        "scroll",
        atualizarBotaoTopo
    );

    atualizarBotaoTopo();

    if (backToTop) {
        backToTop.addEventListener(
            "click",
            function () {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        );
    }
}

// Executa o site.
iniciarSite();