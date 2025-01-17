class AuthService {
  constructor() {
    this.currentUser = null;
    this.setupLoginHandler();
    this.checkLoginStatus();
  }

  setupLoginHandler() {
    document.getElementById('loginForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const userType = document.getElementById('userType').value;
      
      this.login(username, password, userType);
    });
  }

  login(username, password, userType) {
    // Simulação de autenticação - em produção deve ser integrado com backend
    if (username && password) {
      this.currentUser = {
        username,
        type: userType
      };
      localStorage.setItem('user', JSON.stringify(this.currentUser));
      this.updateLoginStatus();
      this.closeLoginModal();
    }
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('user');
    this.updateLoginStatus();
  }

  checkLoginStatus() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
      this.updateLoginStatus();
    }
  }

  updateLoginStatus() {
    const loginStatus = document.getElementById('loginStatus');
    if (this.currentUser) {
      loginStatus.innerHTML = `
        <span class="nav-link">
          ${this.currentUser.username} (${this.currentUser.type})
          <button class="btn btn-sm btn-outline-light ms-2" onclick="auth.logout()">Sair</button>
        </span>
      `;
    } else {
      loginStatus.innerHTML = `
        <a class="nav-link" href="#" onclick="showLoginModal()">Login</a>
      `;
    }
  }

  closeLoginModal() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    modal.hide();
  }

  isAdmin() {
    return this.currentUser?.type === 'admin';
  }

  isProfessor() {
    return this.currentUser?.type === 'professor';
  }

  isAluno() {
    return this.currentUser?.type === 'aluno';
  }
}

const auth = new AuthService();