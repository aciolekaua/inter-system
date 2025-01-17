class CalendarManager {
  constructor() {
    this.events = [];
    this.currentDate = new Date();
    this.selectedDate = new Date();
    this.init();
  }

  init() {
    this.loadEvents();
    this.renderCalendar();
    this.setupEventListeners();
  }

  loadEvents() {
    // Simulação de dados - integrar com backend
    this.events = [
      {
        id: 1,
        modalidade: 'Futebol',
        turma1: '3º A',
        turma2: '2º B',
        data: '2024-03-15 14:00',
        local: 'Quadra Principal'
      },
      {
        id: 2,
        modalidade: 'Vôlei',
        turma1: '1º C',
        turma2: '3º B',
        data: '2024-03-16 15:30',
        local: 'Quadra Coberta'
      },
      {
        id: 3,
        modalidade: 'CS:GO',
        turma1: '2º A',
        turma2: '1º A',
        data: '2024-03-17 13:00',
        local: 'Sala de Informática'
      }
    ];
  }

  renderCalendar() {
    const container = document.getElementById('calendario');
    if (!container) return;

    container.innerHTML = `
      <div class="section-header">
        <h2>Calendário de Eventos</h2>
        ${this.renderFilters()}
      </div>
      
      <div class="modal-destaque mb-4">
        <div class="row">
          <div class="col-md-6">
            <h4>Funcionalidades</h4>
            <ul class="list-unstyled">
              <li><i class="fas fa-calendar-check text-success me-2"></i> Visualização de eventos por data</li>
              <li><i class="fas fa-filter text-primary me-2"></i> Filtros por modalidade e sala</li>
              <li><i class="fas fa-edit text-info me-2"></i> Edição de horários e datas</li>
            </ul>
          </div>
          <div class="col-md-6">
            <h4>Informações Exibidas</h4>
            <ul class="list-unstyled">
              <li><i class="fas fa-trophy text-warning me-2"></i> Modalidade do evento</li>
              <li><i class="fas fa-users text-secondary me-2"></i> Salas participantes</li>
              <li><i class="fas fa-map-marker-alt text-danger me-2"></i> Local do evento</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <div class="card dashboard-card">
            <div class="card-header">
              <div class="d-flex justify-content-between align-items-center">
                <h5>Calendário</h5>
                <div class="btn-group">
                  <button class="btn btn-sm btn-outline-primary" onclick="calendar.prevMonth()">
                    <i class="fas fa-chevron-left"></i>
                  </button>
                  <button class="btn btn-sm btn-outline-primary" onclick="calendar.nextMonth()">
                    <i class="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="card-body">
              ${this.renderCalendarGrid()}
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="card dashboard-card">
            <div class="card-header">
              <div class="d-flex justify-content-between align-items-center">
                <h5>Eventos do Dia</h5>
                ${auth.isAdmin() || auth.isProfessor() ? `
                  <button class="btn btn-primary btn-sm" onclick="calendar.showAddEventModal()">
                    <i class="fas fa-plus"></i> Novo Evento
                  </button>
                ` : ''}
              </div>
            </div>
            <div class="card-body">
              ${this.renderEventsList()}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderFilters() {
    return `
      <div class="filters mb-3">
        <div class="row">
          <div class="col-md-4">
            <select class="form-select" onchange="calendar.filterEvents('modalidade', this.value)">
              <option value="">Todas as Modalidades</option>
              ${Object.keys(modalidades.modalidades).flatMap(categoria => 
                modalidades.modalidades[categoria].map(m => 
                  `<option value="${m.id}">${m.nome}</option>`
                )
              ).join('')}
            </select>
          </div>
          <div class="col-md-4">
            <select class="form-select" onchange="calendar.filterEvents('sala', this.value)">
              <option value="">Todas as Salas</option>
              ${['1º A', '1º B', '2º A', '2º B', '3º A', '3º B'].map(sala => 
                `<option value="${sala}">${sala}</option>`
              ).join('')}
            </select>
          </div>
          <div class="col-md-4">
            <input type="date" class="form-control" 
                   onchange="calendar.filterEvents('data', this.value)"
                   value="${this.selectedDate.toISOString().split('T')[0]}">
          </div>
        </div>
      </div>
    `;
  }

  renderCalendarGrid() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    let html = `
      <div class="text-center mb-3">
        <h5>${monthNames[month]} ${year}</h5>
      </div>
      <table class="table table-bordered calendar-table">
        <thead>
          <tr>
            <th>Dom</th>
            <th>Seg</th>
            <th>Ter</th>
            <th>Qua</th>
            <th>Qui</th>
            <th>Sex</th>
            <th>Sáb</th>
          </tr>
        </thead>
        <tbody>
    `;

    let day = 1;
    for (let i = 0; i < 6; i++) {
      html += '<tr>';
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < startingDay) {
          html += '<td></td>';
        } else if (day > daysInMonth) {
          html += '<td></td>';
        } else {
          const currentDate = new Date(year, month, day);
          const hasEvents = this.events.some(event => 
            new Date(event.data).toDateString() === currentDate.toDateString()
          );
          const isSelected = currentDate.toDateString() === this.selectedDate.toDateString();
          
          html += `
            <td class="${hasEvents ? 'has-events' : ''} ${isSelected ? 'selected' : ''}"
                onclick="calendar.selectDate(${year}, ${month}, ${day})">
              ${day}
              ${hasEvents ? '<span class="event-dot"></span>' : ''}
            </td>
          `;
          day++;
        }
      }
      html += '</tr>';
      if (day > daysInMonth) break;
    }

    html += '</tbody></table>';
    return html;
  }

  renderEventsList() {
    const selectedDateEvents = this.events.filter(event => 
      new Date(event.data).toDateString() === this.selectedDate.toDateString()
    );

    if (selectedDateEvents.length === 0) {
      return '<p class="text-center">Nenhum evento programado para esta data.</p>';
    }

    return `
      <div class="list-group">
        ${selectedDateEvents.map(event => `
          <div class="list-group-item">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h6>${event.modalidade}</h6>
                <p class="mb-1">
                  ${event.turma1} vs ${event.turma2}<br>
                  <small class="text-muted">
                    <i class="fas fa-clock me-1"></i>
                    ${new Date(event.data).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    <i class="fas fa-map-marker-alt ms-2 me-1"></i>
                    ${event.local}
                  </small>
                </p>
              </div>
              ${(auth.isAdmin() || auth.isProfessor()) ? `
                <div class="btn-group">
                  <button class="btn btn-sm btn-outline-primary" onclick="calendar.editEvent(${event.id})">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn btn-sm btn-outline-danger" onclick="calendar.deleteEvent(${event.id})">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  selectDate(year, month, day) {
    this.selectedDate = new Date(year, month, day);
    this.renderCalendar();
  }

  prevMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.renderCalendar();
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.renderCalendar();
  }

  filterEvents(type, value) {
    // Implementar filtros
    console.log('Filtrar por:', type, value);
    this.renderCalendar();
  }

  showAddEventModal() {
    // Implementar modal de adição de evento
    console.log('Adicionar novo evento');
  }

  editEvent(eventId) {
    // Implementar edição de evento
    console.log('Editar evento:', eventId);
  }

  deleteEvent(eventId) {
    if (confirm('Tem certeza que deseja excluir este evento?')) {
      // Implementar exclusão de evento
      console.log('Excluir evento:', eventId);
      this.events = this.events.filter(event => event.id !== eventId);
      this.renderCalendar();
    }
  }

  setupEventListeners() {
    // Adicionar event listeners necessários
  }
}

const calendar = new CalendarManager();