const root = document.documentElement;

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

function toggleTheme() {
  const current = root.getAttribute("data-theme") || "dark";
  setTheme(current === "dark" ? "light" : "dark");
}

function initTheme() {
  const saved = localStorage.getItem("theme");
  if (saved) return setTheme(saved);

  // Default: match system preference
  const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  setTheme(prefersLight ? "light" : "dark");
}

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector("#nav-links");

  toggle?.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close on click
  links?.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle?.setAttribute("aria-expanded", "false");
    });
  });
}

function initReveal() {
  const els = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) e.target.classList.add("visible");
    }
  }, { threshold: 0.15 });

  els.forEach(el => io.observe(el));
}

async function loadProjects() {
  const grid = document.getElementById("projectGrid");
  if (!grid) return;

  const res = await fetch("data/projects.json", { cache: "no-store" });
  const projects = await res.json();

  const render = (filter) => {
    grid.innerHTML = "";
    const filtered = filter === "all"
      ? projects
      : projects.filter(p => (p.categories || []).includes(filter));

    for (const p of filtered) {
      const card = document.createElement("article");
      card.className = "card project reveal";
      card.innerHTML = `
        ${p.image ? `
          <img
            class="project-img"
            src="${p.image}"
            alt="${p.imageAlt || p.title}"
            loading="lazy"
          />
        ` : ""}
        <h3>${p.title}</h3>
        <p class="muted tight">${p.subtitle || ""}</p>
        <p>${p.description || ""}</p>
        <div class="tags">
          ${(p.tags || []).map(t => `<span class="tag">${t}</span>`).join("")}
        </div>
        <div class="cta-row" style="margin-top:1rem">
          ${p.link ? `<a class="btn" href="${p.link}" target="_blank" rel="noopener">Repo / Link</a>` : ""}
          ${p.writeup ? `<a class="btn primary" href="${p.writeup}" target="_blank" rel="noopener">Write-up</a>` : ""}
        </div>
      `;
      grid.appendChild(card);
    }

    // trigger reveal for newly created cards
    requestAnimationFrame(() => {
      document.querySelectorAll(".project.reveal").forEach(el => el.classList.add("visible"));
    });
  };

  // Filters
  const chips = document.querySelectorAll(".chip");
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      render(chip.dataset.filter);
    });
  });

  render("all");
}

function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);

    const name = data.get("name")?.toString().trim() || "";
    const email = data.get("email")?.toString().trim() || "";
    const message = data.get("message")?.toString().trim() || "";

    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`From: ${name} (${email})\n\n${message}`);

    window.location.href = `mailto:zach.bickley@duke.edu?subject=${subject}&body=${body}`;
  });
}

document.getElementById("year")?.append(String(new Date().getFullYear()));

initTheme();
document.getElementById("themeBtn")?.addEventListener("click", toggleTheme);

initNav();
initReveal();
loadProjects();
initContactForm();
