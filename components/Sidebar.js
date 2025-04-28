export function renderSidebar() {
  const sidebarHTML = `
      <aside class="sidebar">
        <nav>
          <ul>
            <li>
            <a href="/" class="">
              <img src="https://cdn.glitch.global/5f40ca2f-f96b-493b-806d-4711b651a143/logo.png?v=1744044819325" alt="Logo" />
              </a>
            </li>
            <li>
              <a href="/" class="nav-icon">
                <i class="fa-solid fa-house"></i>
              </a>
            </li>
            <li>
              <a href="/paginas/produtos.html" class="nav-icon">
                <i class="fa-solid fa-pizza-slice"></i>
              </a>
            </li>
            <li>
              <a href="/paginas/pedidos.html" class="nav-icon">
                <i class="fa-solid fa-list-ul"></i>
              </a>
            </li>
            <li>
              <a href="/paginas/comandas.html" class="nav-icon">
                <i class="fa-solid fa-receipt"></i>
              </a>
            </li>
            <li>
              <a href="/paginas/garcons.html" class="nav-icon">
                <i class="fa-solid fa-bell-concierge"></i>
              </a>
            </li>
            <li>
              <a href="/paginas/mesas.html" class="nav-icon">
                <i class="fa-solid fa-tablet-screen-button"></i>
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    `;

  const container = document.getElementById("sidebar-container");
  if (container) {
    container.innerHTML = sidebarHTML;
  }
}
