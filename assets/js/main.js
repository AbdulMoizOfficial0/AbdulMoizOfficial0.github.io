// Loads projects.json and renders the homepage.
(async function () {
  const res = await fetch('projects.json?v=' + Date.now());
  const data = await res.json();

  // Developer info
  const brand = document.querySelector('[data-brand]');
  if (brand) brand.textContent = data.developer.brand;
  document.querySelectorAll('[data-tagline]').forEach(el => el.textContent = data.developer.tagline);
  document.querySelectorAll('[data-bio]').forEach(el => el.textContent = data.developer.bio);
  document.querySelectorAll('[data-email]').forEach(el => {
    el.textContent = data.developer.email;
    el.setAttribute('href', 'mailto:' + data.developer.email);
  });
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  // Featured
  const featured = data.projects.find(p => p.featured) || data.projects[0];
  const featuredHost = document.querySelector('[data-featured]');
  if (featuredHost && featured) {
    featuredHost.style.setProperty('--_accent', featured.accentColor);
    featuredHost.style.setProperty('--_tint', featured.backgroundTint);
    featuredHost.innerHTML = `
      <div class="featured-body">
        <span class="featured-tag"><span class="status-dot"></span>Featured</span>
        <h2>${featured.name}</h2>
        <p class="subtitle">${featured.subtitle}</p>
        <p class="desc">${featured.longDescription}</p>
        <div class="featured-cta">
          <a class="btn btn-primary" href="project.html?id=${featured.id}">View project →</a>
          ${featured.playStoreUrl ? `<a class="btn btn-ghost" href="${featured.playStoreUrl}" target="_blank" rel="noopener">Google Play</a>` : ''}
        </div>
      </div>
      <div class="featured-icon">
        <img src="${featured.icon}" alt="${featured.name} icon" />
      </div>
    `;
  }

  // Project grid (all non-featured projects)
  const gridHost = document.querySelector('[data-grid]');
  if (gridHost) {
    const others = data.projects.filter(p => !p.featured);
    gridHost.innerHTML = others.map(p => `
      <a class="card" href="project.html?id=${p.id}" style="--_tint:${p.backgroundTint};--_accent:${p.accentColor}">
        <div class="card-icon"><img src="${p.icon}" alt="${p.name} icon" /></div>
        <div>
          <h3 class="card-name">${p.name}</h3>
          <p class="card-subtitle">${p.subtitle}</p>
        </div>
        <p class="card-desc">${p.shortDescription}</p>
        <div class="card-foot">
          <span><span class="status-dot"></span>${p.statusLabel}</span>
          <span class="arrow">→</span>
        </div>
      </a>
    `).join('');
  }
})();
