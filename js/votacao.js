class VotacaoManager {
  constructor() {
    this.apresentacoes = [];
    this.votos = [];
    this.modalidadesVotacao = ['Dança', 'Free Fire', 'Atletismo'];
    this.pontuacoesPossiveis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.turmas = ['1º A', '1º B', '2º A', '2º B', '3º A', '3º B'];
    this.init();
  }

  init() {
    this.carregarApresentacoes();
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.addEventListener('votacaoUpdated', () => {
      this.atualizarClassificacaoGeral();
    });
  }

  carregarApresentacoes() {
    // Simulação de dados - integrar com backend
    this.apresentacoes = [
      {
        id: 1,
        turma: '3º A',
        modalidade: 'Dança',
        tema: 'Anos 80',
        votos: [],
        mediaNotas: 0,
        status: 'em_votacao'
      },
      {
        id: 2,
        turma: '2º B',
        modalidade: 'Dança',
        tema: 'Rock Nacional',
        votos: [],
        mediaNotas: 0,
        status: 'em_votacao'
      }
    ];
    this.renderizarSistemaDanca();
  }

  renderizarSistemaDanca() {
    const container = document.getElementById('sistemaDanca');
    if (!container) return;

    if (!auth.currentUser) {
      container.innerHTML = '<div class="alert alert-info">Faça login para participar da votação!</div>';
      return;
    }

    container.innerHTML = `
      <div class="modal-destaque mb-4">
        <div class="row">
          <div class="col-md-6">
            <h4>Objetivo do Sistema</h4>
            <p>Permitir que juízes avaliem as apresentações de forma justa e transparente.</p>
            <ul class="list-unstyled">
              <li><i class="fas fa-check text-success me-2"></i> Votação exclusiva para juízes autenticados</li>
              <li><i class="fas fa-star text-warning me-2"></i> Notas de 1 a 10 pontos</li>
              <li><i class="fas fa-chart-line text-info me-2"></i> Resultados em tempo real</li>
            </ul>
          </div>
          <div class="col-md-6">
            <h4>Funcionamento</h4>
            <ul class="list-unstyled">
              <li><i class="fas fa-user-shield text-primary me-2"></i> Autenticação necessária</li>
              <li><i class="fas fa-list-ol text-success me-2"></i> Critérios específicos por modalidade</li>
              <li><i class="fas fa-trophy text-warning me-2"></i> Integração com classificação geral</li>
            </ul>
          </div>
        </div>
      </div>

      ${auth.isProfessor() ? this.renderizarFormularioVotacao() : ''}

      <div class="row mb-4">
        <div class="col-md-6">
          <div class="card dashboard-card">
            <div class="card-header">
              <h5>Apresentações em Votação</h5>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Turma</th>
                      <th>Modalidade</th>
                      <th>Tema</th>
                      <th>Média</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${this.apresentacoes.map(apresentacao => `
                      <tr>
                        <td>${apresentacao.turma}</td>
                        <td>${apresentacao.modalidade}</td>
                        <td>${apresentacao.tema}</td>
                        <td>${apresentacao.mediaNotas.toFixed(1)}</td>
                        <td>
                          ${this.renderizarBotaoVotacao(apresentacao)}
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card dashboard-card">
            <div class="card-header">
              <h5>Resultados Parciais</h5>
            </div>
            <div class="card-body">
              <canvas id="votacaoChart"></canvas>
            </div>
          </div>
        </div>
      </div>

      <div class="card dashboard-card">
        <div class="card-header">
          <h5>Histórico de Votações</h5>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Juiz</th>
                  <th>Turma</th>
                  <th>Modalidade</th>
                  <th>Nota</th>
                  <th>Data/Hora</th>
                </tr>
              </thead>
              <tbody>
                ${this.votos.map(voto => `
                  <tr>
                    <td>${voto.juiz}</td>
                    <td>${voto.turma}</td>
                    <td>${voto.modalidade}</td>
                    <td>${voto.nota}</td>
                    <td>${new Date(voto.dataHora).toLocaleString()}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    this.renderizarGrafico();
  }

  renderizarFormularioVotacao() {
    return `
      <div class="card dashboard-card mb-4">
        <div class="card-header">
          <h5>Registrar Votação</h5>
        </div>
        <div class="card-body">
          <form id="formVotacao" onsubmit="votacao.registrarVoto(event)">
            <div class="row">
              <div class="col-md-4">
                <div class="mb-3">
                  <label class="form-label">Modalidade</label>
                  <select class="form-control" name="modalidade" required>
                    ${this.modalidadesVotacao.map(mod => 
                      `<option value="${mod}">${mod}</option>`
                    ).join('')}
                  </select>
                </div>
              </div>
              <div class="col-md-4">
                <div class="mb-3">
                  <label class="form-label">Turma</label>
                  <select class="form-control" name="turma" required>
                    ${this.turmas.map(turma => 
                      `<option value="${turma}">${turma}</option>`
                    ).join('')}
                  </select>
                </div>
              </div>
              <div class="col-md-4">
                <div class="mb-3">
                  <label class="form-label">Nota</label>
                  <select class="form-control" name="nota" required>
                    ${this.pontuacoesPossiveis.map(nota => 
                      `<option value="${nota}">${nota}</option>`
                    ).join('')}
                  </select>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <button type="submit" class="btn btn-primary">
                  Registrar Voto
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  renderizarBotaoVotacao(apresentacao) {
    if (apresentacao.status !== 'em_votacao') {
      return '<span class="badge bg-secondary">Votação encerrada</span>';
    }

    if (auth.isProfessor()) {
      return `
        <button class="btn btn-sm btn-primary" onclick="votacao.abrirFormularioVoto(${apresentacao.id})">
          Votar
        </button>
      `;
    }

    return '';
  }

  abrirFormularioVoto(apresentacaoId) {
    const apresentacao = this.apresentacoes.find(a => a.id === apresentacaoId);
    if (!apresentacao) return;

    // Preencher automaticamente o formulário com os dados da apresentação
    const form = document.getElementById('formVotacao');
    if (form) {
      form.modalidade.value = apresentacao.modalidade;
      form.turma.value = apresentacao.turma;
    }
  }

  registrarVoto(event) {
    event.preventDefault();
    const form = event.target;
    const voto = {
      juiz: auth.currentUser.username,
      modalidade: form.modalidade.value,
      turma: form.turma.value,
      nota: parseInt(form.nota.value),
      dataHora: new Date().toISOString()
    };

    // Adicionar voto ao histórico
    this.votos.push(voto);

    // Atualizar apresentação
    const apresentacao = this.apresentacoes.find(
      a => a.modalidade === voto.modalidade && a.turma === voto.turma
    );
    if (apresentacao) {
      apresentacao.votos.push(voto);
      apresentacao.mediaNotas = this.calcularMedia(apresentacao.votos);
    }

    // Atualizar interface
    this.renderizarSistemaDanca();
    
    // Disparar evento para atualizar classificação geral
    document.dispatchEvent(new CustomEvent('votacaoUpdated'));

    form.reset();
  }

  calcularMedia(votos) {
    if (!votos.length) return 0;
    const soma = votos.reduce((acc, voto) => acc + voto.nota, 0);
    return soma / votos.length;
  }

  renderizarGrafico() {
    const ctx = document.getElementById('votacaoChart');
    if (!ctx) return;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.apresentacoes.map(a => `${a.turma} - ${a.modalidade}`),
        datasets: [{
          label: 'Média das Notas',
          data: this.apresentacoes.map(a => a.mediaNotas),
          backgroundColor: '#0056b3',
          borderColor: '#0056b3',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 10
          }
        }
      }
    });
  }

  atualizarClassificacaoGeral() {
    // Implementar integração com o sistema de classificação geral
    console.log('Atualizando classificação geral com novos resultados de votação');
  }
}

const votacao = new VotacaoManager();