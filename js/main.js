// ... rest of the code remains the same until showSection function ...

function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(section => {
    section.classList.add('d-none');
  });
  
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.remove('d-none');
  }
  
  const sectionTitles = {
    'dashboard': 'Dashboard',
    'classificacao-geral': 'Classificação Geral',
    'modalidades': 'Modalidades',
    'confrontos': 'Gerenciamento de Confrontos',
    'pontuacoes': 'Pontuações por Modalidade',
    'calendario': 'Calendário de Eventos',
    'votacao': 'Votação - Modalidade Dança',
    'usuarios': 'Gerenciamento de Usuários',
    'relatorios': 'Relatórios',
    'galeria': 'Galeria',
    'notificacoes': 'Notificações',
    'ajuda': 'Ajuda',
    'configuracoes': 'Configurações'
  };

  const currentSection = document.getElementById('currentSection');
  if (currentSection) {
    currentSection.textContent = sectionTitles[sectionId] || sectionId;
  }
  
  document.querySelectorAll('.sidebar-nav a').forEach(link => {
    link.classList.remove('active');
  });
  const activeLink = document.querySelector(`#nav-${sectionId}`);
  if (activeLink) {
    activeLink.classList.add('active');
  }

  // Handle section-specific rendering
  if (sectionId === 'pontuacoes') {
    window.dashboard?.renderizarPontuacoes();
  } else if (sectionId === 'modalidades') {
    window.modalidades?.renderizarModalidades();
  } else if (sectionId === 'votacao') {
    window.votacao?.renderizarSistemaDanca();
  } else if (sectionId === 'calendario') {
    window.calendar?.renderCalendar();
  }
}

// ... rest of the code remains the same until DashboardManager class declaration ...

class DashboardManager {
  constructor() {
    this.classificacao = [];
    this.proximosJogos = [];
    this.classificacaoChart = null;
    this.modalidades = {
      esportesIndividuais: [
        { id: 1, nome: 'Atletismo', pontuacao: { ouro: 50, prata: 30, bronze: 20 } },
        { id: 2, nome: 'Futmesa', pontuacao: { ouro: 50, prata: 30, bronze: 20 } }
      ],
      esportesColetivos: [
        { id: 3, nome: 'Futebol', pontuacao: { ouro: 100, prata: 60, bronze: 40 } },
        { id: 4, nome: 'Vôlei', pontuacao: { ouro: 100, prata: 60, bronze: 40 } },
        { id: 5, nome: 'Basquete', pontuacao: { ouro: 100, prata: 60, bronze: 40 } },
        { id: 6, nome: 'Handebol', pontuacao: { ouro: 100, prata: 60, bronze: 40 } }
      ],
      eSports: [
        { id: 7, nome: 'CS:GO', pontuacao: { ouro: 50, prata: 30, bronze: 20 } },
        { id: 8, nome: 'Free Fire', pontuacao: { ouro: 50, prata: 30, bronze: 20 } }
      ],
      especiais: [
        { id: 9, nome: 'Dança', pontuacao: { ouro: 100, prata: 60, bronze: 40 } }
      ]
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }

  init() {
    this.carregarClassificacao();
    this.carregarProximosJogos();
    this.setupEventListeners();
    this.updateSidebar();
    this.initNotifications();
    this.initGaleria();
    this.renderizarClassificacaoGeral();
  }

  carregarClassificacao() {
    this.classificacao = [
      { 
        turma: '3º A', 
        pontosTotais: 150,
        modalidades: {
          'Atletismo': { vitorias: 2, pontos: 20 },
          'Futmesa': { vitorias: 1, pontos: 10 },
          'Futebol': { vitorias: 3, pontos: 30 },
          'Vôlei': { vitorias: 2, pontos: 20 },
          'Basquete': { vitorias: 4, pontos: 40 },
          'Handebol': { vitorias: 1, pontos: 10 },
          'CS:GO': { vitorias: 1, pontos: 10 },
          'Free Fire': { vitorias: 0, pontos: 0 },
          'Dança': { vitorias: 1, pontos: 10 }
        }
      },
      { 
        turma: '2º B', 
        pontosTotais: 130,
        modalidades: {
          'Atletismo': { vitorias: 1, pontos: 10 },
          'Futmesa': { vitorias: 1, pontos: 10 },
          'Futebol': { vitorias: 2, pontos: 20 },
          'Vôlei': { vitorias: 3, pontos: 30 },
          'Basquete': { vitorias: 3, pontos: 30 },
          'Handebol': { vitorias: 1, pontos: 10 },
          'CS:GO': { vitorias: 0, pontos: 0 },
          'Free Fire': { vitorias: 1, pontos: 10 },
          'Dança': { vitorias: 1, pontos: 10 }
        }
      },
      { 
        turma: '1º C', 
        pontosTotais: 120,
        modalidades: {
          'Atletismo': { vitorias: 2, pontos: 20 },
          'Futmesa': { vitorias: 0, pontos: 0 },
          'Futebol': { vitorias: 1, pontos: 10 },
          'Vôlei': { vitorias: 2, pontos: 20 },
          'Basquete': { vitorias: 2, pontos: 20 },
          'Handebol': { vitorias: 1, pontos: 10 },
          'CS:GO': { vitorias: 0, pontos: 0 },
          'Free Fire': { vitorias: 0, pontos: 0 },
          'Dança': { vitorias: 2, pontos: 20 }
        }
      },
      { 
        turma: '3º B', 
        pontosTotais: 110,
        modalidades: {
          'Atletismo': { vitorias: 1, pontos: 10 },
          'Futmesa': { vitorias: 0, pontos: 0 },
          'Futebol': { vitorias: 2, pontos: 20 },
          'Vôlei': { vitorias: 1, pontos: 10 },
          'Basquete': { vitorias: 3, pontos: 30 },
          'Handebol': { vitorias: 1, pontos: 10 },
          'CS:GO': { vitorias: 0, pontos: 0 },
          'Free Fire': { vitorias: 0, pontos: 0 },
          'Dança': { vitorias: 1, pontos: 10 }
        }
      },
      { 
        turma: '2º A', 
        pontosTotais: 100,
        modalidades: {
          'Atletismo': { vitorias: 1, pontos: 10 },
          'Futmesa': { vitorias: 0, pontos: 0 },
          'Futebol': { vitorias: 1, pontos: 10 },
          'Vôlei': { vitorias: 2, pontos: 20 },
          'Basquete': { vitorias: 2, pontos: 20 },
          'Handebol': { vitorias: 1, pontos: 10 },
          'CS:GO': { vitorias: 0, pontos: 0 },
          'Free Fire': { vitorias: 0, pontos: 0 },
          'Dança': { vitorias: 1, pontos: 10 }
        }
      },
      { 
        turma: '1º A', 
        pontosTotais: 90,
        modalidades: {
          'Atletismo': { vitorias: 1, pontos: 10 },
          'Futmesa': { vitorias: 0, pontos: 0 },
          'Futebol': { vitorias: 1, pontos: 10 },
          'Vôlei': { vitorias: 1, pontos: 10 },
          'Basquete': { vitorias: 2, pontos: 20 },
          'Handebol': { vitorias: 1, pontos: 10 },
          'CS:GO': { vitorias: 0, pontos: 0 },
          'Free Fire': { vitorias: 0, pontos: 0 },
          'Dança': { vitorias: 2, pontos: 20 }
        }
      },
    ];

    this.calcularPontuacoesTotais();
  }

  renderizarClassificacaoGeral() {
    const container = document.getElementById('classificacao-geral');
    if (!container) return;
    
    container.innerHTML = `
      <div class="section-header">
        <h2>Classificação Geral</h2>
      </div>
      <div class="modal-destaque mb-4">
        <div class="row">
          <div class="col-md-6">
            <h4>Funcionalidade</h4>
            <ul class="list-unstyled">
              <li><i class="fas fa-check-circle text-success me-2"></i> Pontuação acumulada por sala</li>
              <li><i class="fas fa-sync text-primary me-2"></i> Atualização automática após cada modalidade</li>
              <li><i class="fas fa-chart-line text-info me-2"></i> Recálculo dinâmico de rankings</li>
            </ul>
          </div>
          <div class="col-md-6">
            <h4>Sistema de Pontos</h4>
            <ul class="list-unstyled">
              <li><i class="fas fa-trophy text-warning me-2"></i> 1º Lugar: 10 pontos</li>
              <li><i class="fas fa-medal text-secondary me-2"></i> 2º Lugar: 5 pontos</li>
              <li><i class="fas fa-star text-info me-2"></i> Participação: 2 pontos</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="card dashboard-card">
            <div class="card-body">
              <div class="classificacao-chart-container">
                <canvas id="classificacaoGeralChart"></canvas>
              </div>
              <div class="table-responsive mt-4">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>Ranking</th>
                      <th>Sala</th>
                      <th>Pontuação Total</th>
                      <th>Modalidade Destaque</th>
                      <th>Vitórias</th>
                      <th>Detalhes por Modalidade</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${this.classificacao.map((item, index) => `
                      <tr>
                        <td><strong>${index + 1}º</strong></td>
                        <td>${item.turma}</td>
                        <td><strong>${item.pontosTotais}</strong></td>
                        <td>
                          <span class="badge bg-success">
                            ${item.modalidadeDestaque.nome} 
                            (${item.modalidadeDestaque.pontos} pts)
                          </span>
                        </td>
                        <td>${item.vitoriasTotais}</td>
                        <td>
                          <button class="btn btn-sm btn-primary" onclick="window.dashboard.mostrarDetalhesModalidades('${item.turma}')">
                            Ver Detalhes
                          </button>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const ctx = document.getElementById('classificacaoGeralChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.classificacao.map(item => item.turma),
        datasets: [{
          label: 'Pontuação Total',
          data: this.classificacao.map(item => item.pontosTotais),
          backgroundColor: '#0056b3',
          borderColor: '#0056b3',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Pontos'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Turmas'
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              afterBody: (tooltipItems) => {
                const idx = tooltipItems[0].dataIndex;
                const turma = this.classificacao[idx];
                return [
                  `Modalidade Destaque: ${turma.modalidadeDestaque.nome}`,
                  `Vitórias Totais: ${turma.vitoriasTotais}`
                ];
              }
            }
          }
        }
      }
    });
  }

  mostrarDetalhesModalidades(turma) {
    const sala = this.classificacao.find(item => item.turma === turma);
    if (!sala) return;

    const modal = new bootstrap.Modal(document.getElementById('detalhesModal'));
    const modalBody = document.querySelector('#detalhesModal .modal-body');
    
    modalBody.innerHTML = `
      <h5>Detalhes de Pontuação - ${sala.turma}</h5>
      <div class="modal-destaque mb-4">
        <div class="classification-details">
          <span class="modal-badge bg-primary">Ranking: ${this.classificacao.findIndex(item => item.turma === turma) + 1}º</span>
          <span class="modal-badge bg-success">Total: ${sala.pontosTotais} pontos</span>
          <span class="modal-badge bg-info">Modalidade Destaque: ${sala.modalidadeDestaque.nome}</span>
          <span class="modal-badge bg-warning">Total de Vitórias: ${sala.vitoriasTotais}</span>
        </div>
      </div>
      <div class="table-container">
        <table class="table classification-table">
          <thead>
            <tr>
              <th>Modalidade</th>
              <th>Pontos</th>
              <th>Vitórias</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${Object.entries(sala.modalidades).map(([modalidade, dados]) => `
              <tr>
                <td>${modalidade}</td>
                <td>${dados.pontos}</td>
                <td>${dados.vitorias}</td>
                <td>
                  ${dados.pontos > 0 
                    ? `<span class="badge bg-success">Participou</span>`
                    : `<span class="badge bg-secondary">Pendente</span>`
                  }
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    modal.show();
  }

  carregarProximosJogos() {
    this.proximosJogos = [
      { modalidade: 'Futebol', turma1: '3º A', turma2: '2º B', data: '2024-03-15 14:00' },
      { modalidade: 'Vôlei', turma1: '1º C', turma2: '3º B', data: '2024-03-16 15:30' },
      { modalidade: 'Basquete', turma1: '2º A', turma2: '1º A', data: '2024-03-17 13:00' },
    ];
  }

  setupEventListeners() {
    window.addEventListener('resize', () => {
    });
  }

  calcularPontuacoesTotais() {
    this.classificacao.forEach(turma => {
      let totalPontos = 0;
      let modalidadeDestaque = { nome: '', pontos: 0 };

      Object.entries(turma.modalidades).forEach(([modalidade, dados]) => {
        totalPontos += dados.pontos;
        
        if (dados.pontos > modalidadeDestaque.pontos) {
          modalidadeDestaque = { nome: modalidade, pontos: dados.pontos };
        }
      });

      turma.pontosTotais = totalPontos;
      turma.modalidadeDestaque = modalidadeDestaque;
      turma.vitoriasTotais = Object.values(turma.modalidades)
        .reduce((acc, curr) => acc + curr.vitorias, 0);
    });

    this.classificacao.sort((a, b) => b.pontosTotais - a.pontosTotais);
  }

  updateSidebar() {
    const sidebarNav = document.querySelector('.sidebar-nav ul');
    if (!sidebarNav) return;
    
    const menuItems = [
      { id: 'dashboard', icon: 'home', text: 'Home' },
      { id: 'classificacao-geral', icon: 'trophy', text: 'Classificação Geral' },
      { id: 'modalidades', icon: 'table-tennis', text: 'Modalidades' },
      { id: 'confrontos', icon: 'calendar-alt', text: 'Confrontos' },
      { id: 'pontuacoes', icon: 'chart-bar', text: 'Pontuações' },
      { id: 'calendario', icon: 'calendar', text: 'Calendário' },
      { id: 'votacao', icon: 'music', text: 'Votação' },
      { id: 'usuarios', icon: 'users', text: 'Usuários' },
      { id: 'relatorios', icon: 'file-alt', text: 'Relatórios' },
      { id: 'galeria', icon: 'image', text: 'Galeria' },
      { id: 'notificacoes', icon: 'bell', text: 'Notificações' },
      { id: 'ajuda', icon: 'question-circle', text: 'Ajuda' },
      { id: 'configuracoes', icon: 'cog', text: 'Configurações' }
    ];

    sidebarNav.innerHTML = menuItems.map(item => `
      <li>
        <a href="#" onclick="showSection('${item.id}')" id="nav-${item.id}">
          <i class="fas fa-${item.icon}"></i>
          <span>${item.text}</span>
        </a>
      </li>
    `).join('');
  }

  initNotifications() {
    const notificationsList = document.querySelector('.notifications-list');
    if (notificationsList) {
      const notifications = [
        {
          title: 'Novo Confronto Agendado',
          message: 'Futebol: 3º A vs 2º B - Amanhã às 14h',
          date: new Date(Date.now() - 1000 * 60 * 30),
          type: 'info'
        },
        {
          title: 'Votação Aberta',
          message: 'A votação para a modalidade Dança está aberta',
          date: new Date(Date.now() - 1000 * 60 * 60),
          type: 'success'
        }
      ];

      notificationsList.innerHTML = notifications.map(notification => `
        <div class="notification-item">
          <div class="d-flex justify-content-between align-items-center">
            <h5>${notification.title}</h5>
            <span class="badge bg-${notification.type}">${notification.type}</span>
          </div>
          <p>${notification.message}</p>
          <small class="text-muted">${notification.date.toLocaleString()}</small>
        </div>
      `).join('');
    }
  }

  initGaleria() {
    const galeriaGrid = document.querySelector('.galeria-grid');
    if (galeriaGrid) {
      const galeriaItems = [
        {
          title: 'Final Futebol',
          date: '2024-03-15',
          image: 'placeholder.jpg'
        },
      ];

      galeriaGrid.innerHTML = galeriaItems.map(item => `
        <div class="galeria-item">
          <img src="${item.image}" alt="${item.title}">
          <div class="galeria-info">
            <h5>${item.title}</h5>
            <small class="text-muted">${item.date}</small>
          </div>
        </div>
      `).join('');
    }
  }

  renderizarPontuacoes() {
    const container = document.getElementById('pontuacoes');
    if (!container) return;

    container.innerHTML = `
      <div class="section-header">
        <h2>Pontuações por Modalidade</h2>
      </div>
      <div class="modal-destaque mb-4">
        <div class="row">
          <div class="col-md-6">
            <h4>Objetivo</h4>
            <p>Manter um controle detalhado da pontuação de cada sala em cada modalidade.</p>
            <h4>Funcionamento</h4>
            <p>As pontuações individuais de cada modalidade são exibidas para consulta detalhada.</p>
          </div>
          <div class="col-md-6">
            <h4>Sistema de Pontos</h4>
            <ul class="list-unstyled">
              <li><i class="fas fa-trophy text-warning me-2"></i> 1º Lugar: 10 pontos</li>
              <li><i class="fas fa-medal text-secondary me-2"></i> 2º Lugar: 5 pontos</li>
              <li><i class="fas fa-award text-info me-2"></i> 3º Lugar: 2 pontos</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="card dashboard-card">
            <div class="card-body">
              <div class="mb-4">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="filtroModalidade">Filtrar por Modalidade</label>
                      <select class="form-control" id="filtroModalidade" onchange="window.dashboard.filtrarPontuacoes()">
                        <option value="todas">Todas as Modalidades</option>
                        ${Object.keys(this.modalidades).flatMap(categoria => 
                          this.modalidades[categoria].map(modalidade => 
                            `<option value="${modalidade.id}">${modalidade.nome}</option>`
                          )
                        ).join('')}
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="filtroTurma">Filtrar por Turma</label>
                      <select class="form-control" id="filtroTurma" onchange="window.dashboard.filtrarPontuacoes()">
                        <option value="todas">Todas as Turmas</option>
                        ${this.classificacao.map(item => 
                          `<option value="${item.turma}">${item.turma}</option>`
                        ).join('')}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div class="table-responsive">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>Modalidade</th>
                      ${this.classificacao.map(item => `<th>${item.turma}</th>`).join('')}
                    </tr>
                  </thead>
                  <tbody>
                    ${Object.keys(this.modalidades).flatMap(categoria => 
                      this.modalidades[categoria].map(modalidade => `
                        <tr data-modalidade="${modalidade.id}">
                          <td><strong>${modalidade.nome}</strong></td>
                          ${this.classificacao.map(turma => `
                            <td>
                              ${turma.modalidades[modalidade.nome]?.pontos || 0} pontos
                              ${turma.modalidades[modalidade.nome]?.vitorias ? 
                                `<br><small class="text-muted">${turma.modalidades[modalidade.nome].vitorias} vitória(s)</small>` 
                                : ''}
                            </td>
                          `).join('')}
                        </tr>
                      `)
                    ).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-md-6">
          <div class="card dashboard-card">
            <div class="card-header">
              <h5>Gráfico de Pontuações</h5>
            </div>
            <div class="card-body">
              <canvas id="pontuacoesChart"></canvas>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card dashboard-card">
            <div class="card-header">
              <h5>Destaques</h5>
            </div>
            <div class="card-body">
              ${this.classificacao.map(turma => `
                <div class="destaque-item mb-3">
                  <h6>${turma.turma}</h6>
                  <p>
                    Pontuação Total: <strong>${turma.pontosTotais}</strong><br>
                    Modalidade Destaque: <strong>${turma.modalidadeDestaque.nome}</strong> 
                    (${turma.modalidadeDestaque.pontos} pts)<br>
                    Total de Vitórias: <strong>${turma.vitoriasTotais}</strong>
                  </p>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    this.renderizarGraficoPontuacoes();
  }

  renderizarGraficoPontuacoes() {
    const ctx = document.getElementById('pontuacoesChart')?.getContext('2d');
    if (!ctx) return;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.classificacao.map(item => item.turma),
        datasets: [{
          label: 'Pontuação Total',
          data: this.classificacao.map(item => item.pontosTotais),
          backgroundColor: '#0056b3',
          borderColor: '#0056b3',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  filtrarPontuacoes() {
    const modalidadeSelecionada = document.getElementById('filtroModalidade').value;
    const turmaSelecionada = document.getElementById('filtroTurma').value;

    const rows = document.querySelectorAll('table tbody tr');
    rows.forEach(row => {
      const modalidadeId = row.getAttribute('data-modalidade');
      const showModalidade = modalidadeSelecionada === 'todas' || modalidadeId === modalidadeSelecionada;
      
      if (turmaSelecionada === 'todas') {
        row.style.display = showModalidade ? '' : 'none';
      } else {
        const turmaIndex = this.classificacao.findIndex(t => t.turma === turmaSelecionada);
        if (showModalidade) {
          row.style.display = '';
          row.querySelectorAll('td').forEach((td, index) => {
            if (index !== 0) { // Skip modalidade column
              td.style.display = index - 1 === turmaIndex ? '' : 'none';
            }
          });
        } else {
          row.style.display = 'none';
        }
      }
    });
  }
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.querySelector('.main-content');
  if (sidebar && mainContent) {
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
  }
}

function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(section => {
    section.classList.add('d-none');
  });
  
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.remove('d-none');
  }
  
  const sectionTitles = {
    'dashboard': 'Dashboard',
    'classificacao-geral': 'Classificação Geral',
    'modalidades': 'Modalidades',
    'confrontos': 'Gerenciamento de Confrontos',
    'pontuacoes': 'Pontuações por Modalidade',
    'calendario': 'Calendário de Eventos',
    'votacao': 'Votação - Modalidade Dança',
    'usuarios': 'Gerenciamento de Usuários',
    'relatorios': 'Relatórios',
    'galeria': 'Galeria',
    'notificacoes': 'Notificações',
    'ajuda': 'Ajuda',
    'configuracoes': 'Configurações'
  };

  const currentSection = document.getElementById('currentSection');
  if (currentSection) {
    currentSection.textContent = sectionTitles[sectionId] || sectionId;
  }
  
  document.querySelectorAll('.sidebar-nav a').forEach(link => {
    link.classList.remove('active');
  });
  const activeLink = document.querySelector(`#nav-${sectionId}`);
  if (activeLink) {
    activeLink.classList.add('active');
  }

  // Handle section-specific rendering
  if (sectionId === 'pontuacoes') {
    window.dashboard?.renderizarPontuacoes();
  } else if (sectionId === 'modalidades') {
    window.modalidades?.renderizarModalidades();
  } else if (sectionId === 'votacao') {
    window.votacao?.renderizarSistemaDanca();
  } else if (sectionId === 'calendario') {
    window.calendar?.renderCalendar();
  }
}

function showLoginModal() {
  const loginModal = document.getElementById('loginModal');
  if (loginModal) {
    const modal = new bootstrap.Modal(loginModal);
    modal.show();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.dashboard = new DashboardManager();
});