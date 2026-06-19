let score = 0;

// Função para revelar a pergunta escondida no card misterioso
function revealQuestion(card, event) {
    if (card.classList.contains('closed')) {
        card.classList.remove('closed');
        
        // Oculta a capa misteriosa e mostra o conteúdo do quiz
        const cover = card.querySelector('.mystery-cover');
        const content = card.querySelector('.question-content');
        
        if (cover) cover.style.display = 'none';
        if (content) content.style.display = 'block';
        
        // Executa a animação estética de glitter no ponto do clique
        createGlitterExplosion(event.pageX, event.pageY);
    }
}

// Função para verificar se a resposta escolhida está correta
function checkAnswer(button, isCorrect, event) {
    // Evita que o clique no botão ative funções indesejadas no card pai
    event.stopPropagation();
    
    const container = button.closest('.options-container');
    const buttons = container.querySelectorAll('.option-btn');
    
    // Desabilita os outros botões do bloco para evitar cliques múltiplos
    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn === button) {
            if (isCorrect) {
                btn.classList.add('correct');
                score++;
                document.getElementById('score').innerText = score;
                createGlitterExplosion(event.pageX, event.pageY);
            } else {
                btn.classList.add('incorrect');
            }
        }
    });
}

// Mecânica de partículas de glitter flutuantes
function createGlitterExplosion(x, y) {
    const colors = ['#ff3377', '#ff6699', '#ffb3cc', '#ffea00', '#00e5ff'];
    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('glitter-particle');
        
        // Estilização dinâmica de cada partícula
        const size = Math.random() * 8 + 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Posição inicial baseada no cursor
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        // Direção randômica da explosão (variáveis CSS lidas pelo Keyframes)
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 120 + 40;
        const mx = Math.cos(angle) * velocity;
        const my = Math.sin(angle) * velocity;
        
        particle.style.setProperty('--mx', `${mx}px`);
        particle.style.setProperty('--my', `${my}px`);
        
        document.body.appendChild(particle);
        
        // Remove o elemento do documento após o término do efeito visual
        setTimeout(() => {
            particle.remove();
        }, 800);
    }
}
