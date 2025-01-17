class ConfrontosManager {
  constructor() {
    this.confrontos = [];
    this.turmas = ['1º A', '1º B', '2º A', '2º B', '3º A', '3º B']; // Simulação
    this.init();
  }

  init() {
    this.setupFormConfrontos();
    this.carregarConfrontos();
    this.popularSelects();
  }

  setupFormConfrontos() {
    document.getElementById('formConfronto').addEventListener('submit', (e) => {
      e.preventDefault();
      if (auth.isAdmin() || auth.isProfessor()) {
        this.salvarConfronto();
      }
    });
  }

  popularSelects() {
    const modalidadeSelect = document.getElementById('modalidadeConfronto');
    const turma1Select = document.getElementById('turma1');
    const turma2Select = document.getElementById('turma2');

    // Flatten all modalidades from different categories into a single array
    const todasModalidades = [
      ...modalidades.modalidades.esportesIndividuais,
      ...modalidades.modalidades.esportesColetivos,
      ...modalidades.modalidades.eSports
    ];

    modalidadeSelect.innerHTML = todasModalidades
      .map(m => `<option value="${m.id}">${m.nome}</option>`)
      .join('');

    const turmasOptions = this.turmas
      .map(t => `<option value="${t}">${t}</option>`)
      .join('');

    turma1Select.innerHTML = turmasOptions;
    turma2Select.innerHTML = turmasOptions;
  }

  carregarConfrontos() {
    // Simulação de dados - integrar com backend
    this.confrontos = [
      {
        id: 1,
        modalidade: 'Futsal',
        turma1: '3º A',
        turma2: '2º B',
        data: '2024-03-15 14:00',
        placar1: null,
        placar2: null
      },
      // ... mais confrontos
    ];
    this.renderizarConfrontos();
  }

  renderizarConfrontos() {
    const container = document.getElementById('listaConfrontos');
    container.innerHTML = `
      <div class="list-group">
        ${this.confrontos.map(confronto => `
          <div class="list-group-item">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h6>${confronto.modalidade}</h6>
                <div class="placar-container">
                  <span class="badge bg-primary badge-turma">${confronto.turma1}</span>
                  ${this.renderizarPlacar(confronto)}
                  <span class="badge bg-primary badge-turma">${confronto.turma2}</span>
                </div>
                <small class="text-muted">${new Date(confronto.data).toLocaleString()}</small>
              </div>
              ${(auth.isAdmin() || auth.isProfessor()) && !this.confrontoFinalizado(confronto) ? `
                <button class="btn btn-sm btn-primary" onclick="confrontos.registrarResultado(${confronto.id})">
                  Registrar Resultado
                </button>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  renderizarPlacar(confronto) {
    if (confronto.placar1 !== null && confronto.placar2 !== null) {
      return `
        <span class="placar">
          ${confronto.placar1} x ${confronto.placar2}
        </span>
      `;
    }
    return '<span class="versus">VS</span>';
  }

  confrontoFinalizado(confronto) {
    return confronto.placar1 !== null && confronto.placar2 !== null;
  }

  salvarConfronto() {
    const modalidadeId = parseInt(document.getElementById('modalidadeConfronto').value);
    const turma1 = document.getElementById('turma1').value;
    const turma2 = document.getElementById('turma2').value;
    const dataHora = document.getElementById('dataHoraConfronto').value;

    // Find modalidade name from id
    const todasModalidades = [
      ...modalidades.modalidades.esportesIndividuais,
      ...modalidades.modalidades.esportesColetivos,
      ...modalidades.modalidades.eSports
    ];
    const modalidadeNome = todasModalidades.find(m => m.id === modalidadeId)?.nome || 'Desconhecida';

    // Simulação de salvamento - integrar com backend
    const novoConfronto = {
      id: this.confrontos.length + 1,
      modalidade: modalidadeNome,
      turma1,
      turma2,
      data: dataHora,
      placar1: null,
      placar2: null
    };

    this.confrontos.push(novoConfronto);
    this.renderizarConfrontos();
    document.getElementById('formConfronto').reset();
  }

  registrarResultado(confrontoId) {
    const confronto = this.confrontos.find(c => c.id === confrontoId);
    if (!confronto) return;

    const placar1 = prompt(`Digite o placar para ${confronto.turma1}:`);
    const placar2 = prompt(`Digite o placar para ${confronto.turma2}:`);

    if (placar1 !== null && placar2 !== null) {
      confronto.placar1 = parseInt(placar1);
      confronto.placar2 = parseInt(placar2);
      this.renderizarConfrontos();
      // Atualizar pontuação geral - implementar
    }
  }
}

const confrontos = new ConfrontosManager();