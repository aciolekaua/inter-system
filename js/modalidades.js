class ModalidadesManager {
  constructor() {
    this.modalidades = {
      esportesIndividuais: [
        { 
          id: 1, 
          nome: 'Atletismo',
          participantesPorEquipe: 1,
          pontuacao: { ouro: 50, prata: 30, bronze: 20 },
          regras: [
            "Provas: 100m rasos, 200m, 400m, revezamento",
            "Cada sala pode inscrever até 2 atletas por prova",
            "Pontuação individual e por equipe"
          ]
        },
        { 
          id: 2, 
          nome: 'Futmesa',
          participantesPorEquipe: 2,
          pontuacao: { ouro: 50, prata: 30, bronze: 20 },
          regras: [
            "Partidas em melhor de 3 sets",
            "11 pontos por set",
            "Dois toques máximos por jogador"
          ]
        }
      ],
      esportesColetivos: [
        { 
          id: 3, 
          nome: 'Futebol',
          participantesPorEquipe: 7,
          pontuacao: { ouro: 100, prata: 60, bronze: 40 },
          regras: [
            "Dois tempos de 15 minutos",
            "7 jogadores por equipe em campo",
            "Substituições livres"
          ]
        },
        { 
          id: 4, 
          nome: 'Vôlei',
          participantesPorEquipe: 6,
          pontuacao: { ouro: 100, prata: 60, bronze: 40 },
          regras: [
            "Sets até 25 pontos",
            "Melhor de 3 sets",
            "6 jogadores por equipe em quadra"
          ]
        },
        { 
          id: 5, 
          nome: 'Basquete',
          participantesPorEquipe: 5,
          pontuacao: { ouro: 100, prata: 60, bronze: 40 },
          regras: [
            "Quatro quartos de 8 minutos",
            "5 jogadores por equipe em quadra",
            "Substituições limitadas"
          ]
        },
        { 
          id: 6, 
          nome: 'Handebol',
          participantesPorEquipe: 7,
          pontuacao: { ouro: 100, prata: 60, bronze: 40 },
          regras: [
            "Dois tempos de 20 minutos",
            "7 jogadores por equipe em quadra",
            "Substituições livres"
          ]
        }
      ],
      eSports: [
        { 
          id: 7, 
          nome: 'CS:GO',
          participantesPorEquipe: 5,
          pontuacao: { ouro: 50, prata: 30, bronze: 20 },
          regras: [
            "Melhor de 30 rounds",
            "5 jogadores por equipe",
            "Mapas definidos por sorteio"
          ]
        },
        { 
          id: 8, 
          nome: 'Free Fire',
          participantesPorEquipe: 4,
          pontuacao: { ouro: 50, prata: 30, bronze: 20 },
          regras: [
            "Squad modo clássico",
            "4 jogadores por equipe",
            "Pontuação por eliminações e colocação"
          ]
        }
      ]
    };
    this.init();
  }

  init() {
    this.renderizarModalidades();
  }

  renderizarModalidades() {
    const container = document.getElementById('listaModalidades');
    if (!container) return;

    let html = `
      <div class="modal-destaque mb-4">
        <div class="row">
          <div class="col-md-6">
            <h4>Sistema de Pontuação</h4>
            <ul class="list-unstyled">
              <li><i class="fas fa-trophy text-warning me-2"></i> Ouro: Varia por modalidade</li>
              <li><i class="fas fa-medal text-secondary me-2"></i> Prata: 60% do ouro</li>
              <li><i class="fas fa-award text-success me-2"></i> Bronze: 40% do ouro</li>
            </ul>
          </div>
          <div class="col-md-6">
            <h4>Regras Gerais</h4>
            <ul class="list-unstyled">
              <li><i class="fas fa-check-circle text-success me-2"></i> Participação obrigatória</li>
              <li><i class="fas fa-users text-primary me-2"></i> Número específico de participantes</li>
              <li><i class="fas fa-clipboard-list text-info me-2"></i> Regras por modalidade</li>
            </ul>
          </div>
        </div>
      </div>
    `;

    // Esportes Individuais
    html += this.renderizarCategoriaModalidades('Esportes Individuais', this.modalidades.esportesIndividuais);
    
    // Esportes Coletivos
    html += this.renderizarCategoriaModalidades('Esportes Coletivos', this.modalidades.esportesColetivos);
    
    // eSports
    html += this.renderizarCategoriaModalidades('eSports', this.modalidades.eSports);

    container.innerHTML = html;
  }

  renderizarCategoriaModalidades(titulo, modalidades) {
    return `
      <div class="category-section mb-4">
        <h3 class="mb-3">${titulo}</h3>
        <div class="row">
          ${modalidades.map(modalidade => `
            <div class="col-md-6 mb-4">
              <div class="card modalidade-card h-100">
                <div class="card-header">
                  <h5 class="mb-0">${modalidade.nome}</h5>
                </div>
                <div class="card-body">
                  <div class="modalidade-info mb-3">
                    <h6>Participantes por Equipe</h6>
                    <p><i class="fas fa-users me-2"></i>${modalidade.participantesPorEquipe}</p>
                  </div>
                  <div class="modalidade-pontuacao mb-3">
                    <h6>Sistema de Pontuação</h6>
                    <ul class="list-unstyled">
                      <li><i class="fas fa-trophy text-warning me-2"></i>1º Lugar: ${modalidade.pontuacao.ouro} pontos</li>
                      <li><i class="fas fa-medal text-secondary me-2"></i>2º Lugar: ${modalidade.pontuacao.prata} pontos</li>
                      <li><i class="fas fa-award text-success me-2"></i>3º Lugar: ${modalidade.pontuacao.bronze} pontos</li>
                    </ul>
                  </div>
                  <div class="modalidade-regras">
                    <h6>Regras Específicas</h6>
                    <ul>
                      ${modalidade.regras.map(regra => `
                        <li>${regra}</li>
                      `).join('')}
                    </ul>
                  </div>
                </div>
                ${(auth.isAdmin() || auth.isProfessor()) ? `
                  <div class="card-footer">
                    <button class="btn btn-primary btn-sm me-2" onclick="modalidades.editarModalidade(${modalidade.id})">
                      <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn btn-info btn-sm" onclick="modalidades.verDetalhes(${modalidade.id})">
                      <i class="fas fa-info-circle"></i> Detalhes
                    </button>
                  </div>
                ` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  editarModalidade(id) {
    // Implementar lógica de edição
    console.log('Editar modalidade:', id);
  }

  verDetalhes(id) {
    // Implementar exibição de detalhes
    console.log('Ver detalhes da modalidade:', id);
  }
}

const modalidades = new ModalidadesManager();