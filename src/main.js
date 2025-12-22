document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll("[data-tab-button]");
    const questions = document.querySelectorAll('[data-faq-question]');

    // Seção de Abas (Tabs)
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function(botao) {
            const abaAlvo = botao.target.dataset.tabButton;
            const aba = document.querySelector(`[data-tab-id=${abaAlvo}]`);
            
            esconderTodasAbas();
            aba.classList.add("shows__list--is-active");
            
            removerBotaoAtivo();
            botao.target.classList.add("shows__tabs__button--this-is-active");
        });
    }

    // Seção de FAQ (Accordion)
    for (let i = 0; i < questions.length; i++) {
        questions[i].addEventListener('click', mudaEstadoResposta);
    }
});

function mudaEstadoResposta(evento) {
    // 1. Usamos 'faq__questions__item--is-open' para manter o padrão plural do seu HTML
    const classe = 'faq__questions__item--is-open';
    
    // 2. currentTarget garante que pegamos o elemento que tem o atributo data-faq-question
    const elementoPai = evento.currentTarget.parentNode;

    elementoPai.classList.toggle(classe);
}

function removerBotaoAtivo() {
    const buttons = document.querySelectorAll("[data-tab-button]");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("shows__tabs__button--this-is-active");
    }
}

function esconderTodasAbas() {
    const tabs = document.querySelectorAll("[data-tab-id]");
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("shows__list--is-active");
    }
}