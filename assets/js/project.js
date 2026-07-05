// Loads a single project by ?id= param from projects.json.
(async function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const res = await fetch('projects.json?v=' + Date.now());
  const data = await res.json();
  const project = data.projects.find(p => p.id === id);

  document.querySelectorAll('[data-email]').forEach(el => {
    el.textContent = data.developer.email;
    el.setAttribute('href', 'mailto:' + data.developer.email);
  });
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  const brand = document.querySelector('[data-brand]');
  if (brand) brand.textContent = data.developer.brand;

  const host = document.querySelector('[data-project]');
  if (!project) {
    host.innerHTML = `
      <div style="text-align:center;padding:80px 0;">
        <h1>Project not found</h1>
        <p style="color:var(--muted)">The project you were looking for doesn't exist.</p>
        <p><a class="btn btn-primary" href="index.html">Back to home</a></p>
      </div>`;
    return;
  }

  document.title = `${project.name} — ${data.developer.brand}`;

  const screenshotsHtml = project.screenshots && project.screenshots.length
    ? `<div class="screenshots">${project.screenshots.map(s => `<img src="${s}" alt="${project.name} screenshot" loading="lazy" />`).join('')}</div>`
    : `<div class="screenshots-empty">Screenshots coming soon.</div>`;

  const featuresHtml = project.features && project.features.length
    ? `<ul class="feature-list">${project.features.map(f => `<li>${f}</li>`).join('')}</ul>`
    : '';

  host.innerHTML = `
    <a class="back-link" href="index.html">← All projects</a>
    <div class="project-hero">
      <div class="project-hero-icon"><img src="${project.icon}" alt="${project.name} icon" /></div>
      <div>
        <span class="featured-tag" style="--_accent:${project.accentColor}"><span class="status-dot"></span>${project.statusLabel}</span>
        <h1>${project.name}</h1>
        <p class="subtitle">${project.subtitle} — ${project.tagline}</p>
        <div class="actions">
          ${project.playStoreUrl ? `<a class="btn btn-primary" href="${project.playStoreUrl}" target="_blank" rel="noopener">Get it on Google Play</a>` : `<span class="btn btn-ghost" style="opacity:.6;cursor:default">Play Store link coming soon</span>`}
          ${project.privacyPolicyUrl ? `<a class="btn btn-ghost" href="${project.privacyPolicyUrl}">Privacy policy</a>` : ''}
        </div>
      </div>
    </div>

    <div class="project-section">
      <h2>About</h2>
      <p>${project.longDescription}</p>
    </div>

    ${featuresHtml ? `
    <div class="project-section">
      <h2>Highlights</h2>
      ${featuresHtml}
    </div>` : ''}

    <div class="project-section">
      <h2>Screenshots</h2>
      ${screenshotsHtml}
    </div>
  `;
})();
