// ============================
// Estado global y selectores base
// ============================
const API_URL = "https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region,subregion,area,currencies,languages,maps,cca3";
const formatter = new Intl.NumberFormat("es-CO");
const state = {
  countries: [],
  searchTerm: "",
  region: "all",
  sortBy: "name"
};

const statusEl = document.getElementById("status");
const countriesGridEl = document.getElementById("countriesGrid");
const searchInputEl = document.getElementById("searchInput");
const regionSelectEl = document.getElementById("regionSelect");
const sortSelectEl = document.getElementById("sortSelect");
const modalOverlayEl = document.getElementById("modalOverlay");
const modalContentEl = document.getElementById("modalContent");
const closeModalBtnEl = document.getElementById("closeModalBtn");

// ============================
// Utilidades de render para estados visuales
// ============================
function showSpinner() {
  statusEl.innerHTML = '<div class="spinner" aria-label="Cargando países"></div>';
}

function showError(message) {
  statusEl.innerHTML = `<p class="error">${message}</p>`;
}

function clearStatus() {
  statusEl.innerHTML = "";
}

// ============================
// Llamada a API con async/await y manejo de errores con try/catch
// ============================
async function fetchCountries() {
  showSpinner();
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("No se pudo obtener la información de países.");
    }
    const data = await response.json();
    state.countries = Array.isArray(data) ? data : [];
    clearStatus();
  } catch (error) {
    showError("No pudimos actualizar datos en vivo ahora mismo. Revisa tu conexión y recarga.");
    state.countries = [];
    console.error("Error API RestCountries:", error);
  }
}

// ============================
// Debounce: retrasa la ejecución para no filtrar en cada tecla instantáneamente
// ============================
function debounce(callback, delay = 250) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
}

// ============================
// Filtro + ordenamiento:
// - .filter() por nombre y región
// - .sort() con comparador dinámico según criterio
// ============================
function getProcessedCountries() {
  const normalizedTerm = state.searchTerm.trim().toLowerCase();

  const filtered = state.countries.filter((country) => {
    const countryName = country.name?.common?.toLowerCase() || "";
    const matchesName = countryName.includes(normalizedTerm);
    const matchesRegion = state.region === "all" || country.region === state.region;
    return matchesName && matchesRegion;
  });

  const comparators = {
    name: (a, b) => (a.name?.common || "").localeCompare(b.name?.common || ""),
    population: (a, b) => (b.population || 0) - (a.population || 0),
    area: (a, b) => (b.area || 0) - (a.area || 0)
  };

  return filtered.sort(comparators[state.sortBy] || comparators.name);
}

// ============================
// Render de tarjetas:
// - .map() + template literals para construir HTML dinámico
// - animation-delay para entrada escalonada
// ============================
function renderCountries() {
  const processedCountries = getProcessedCountries();

  if (!processedCountries.length) {
    countriesGridEl.innerHTML = '<div class="empty-state">No hay países que coincidan con tu búsqueda.</div>';
    return;
  }

  countriesGridEl.innerHTML = processedCountries
    .map((country, index) => {
      const cardName = country.name?.common || "Sin nombre";
      const capital = country.capital?.[0] || "No disponible";
      const population = formatter.format(country.population || 0);
      const flag = country.flags?.svg || country.flags?.png || "";
      const alt = country.flags?.alt || `Bandera de ${cardName}`;

      return `
        <article class="country-card" data-country-code="${country.cca3}" style="animation-delay: ${index * 35}ms">
          <img src="${flag}" alt="${alt}" loading="lazy" />
          <div class="card-body">
            <h3>${cardName}</h3>
            <p><strong>Capital:</strong> ${capital}</p>
            <p><strong>Población:</strong> ${population}</p>
          </div>
        </article>
      `;
    })
    .join("");
}

// ============================
// Modal: abre con datos completos de un país específico
// ============================
function openModal(country) {
  if (!country) return;

  const name = country.name?.common || "Sin nombre";
  const capital = country.capital?.join(", ") || "No disponible";
  const region = country.region || "No disponible";
  const subregion = country.subregion || "No disponible";
  const population = formatter.format(country.population || 0);
  const area = `${formatter.format(country.area || 0)} km²`;
  const currencies = country.currencies
    ? Object.values(country.currencies).map((currency) => currency.name || "").filter(Boolean).join(", ")
    : "No disponible";
  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "No disponible";
  const mapsLink = country.maps?.googleMaps || "#";
  const flag = country.flags?.svg || country.flags?.png || "";
  const alt = country.flags?.alt || `Bandera de ${name}`;

  modalContentEl.innerHTML = `
    <header class="modal-header">
      <img src="${flag}" alt="${alt}" />
      <h2 id="modalTitle">${name}</h2>
    </header>
    <section class="modal-grid">
      <div class="modal-item"><strong>Capital</strong>${capital}</div>
      <div class="modal-item"><strong>Región</strong>${region}</div>
      <div class="modal-item"><strong>Subregión</strong>${subregion}</div>
      <div class="modal-item"><strong>Población</strong>${population}</div>
      <div class="modal-item"><strong>Área</strong>${area}</div>
      <div class="modal-item"><strong>Monedas</strong>${currencies}</div>
      <div class="modal-item"><strong>Idiomas</strong>${languages}</div>
    </section>
    <a class="maps-link" href="${mapsLink}" target="_blank" rel="noopener noreferrer">Ver en Google Maps</a>
  `;

  modalOverlayEl.classList.add("show");
  modalOverlayEl.setAttribute("aria-hidden", "false");
}

// ============================
// Modal: cierre reutilizable para botón, clic externo y tecla Escape
// ============================
function closeModal() {
  modalOverlayEl.classList.remove("show");
  modalOverlayEl.setAttribute("aria-hidden", "true");
}

// ============================
// Delegación de eventos para clicks en tarjetas de países
// ============================
function setupEventListeners() {
  const onSearchInput = debounce((event) => {
    state.searchTerm = event.target.value || "";
    renderCountries();
  }, 250);

  searchInputEl.addEventListener("input", onSearchInput);

  regionSelectEl.addEventListener("change", (event) => {
    state.region = event.target.value;
    renderCountries();
  });

  sortSelectEl.addEventListener("change", (event) => {
    state.sortBy = event.target.value;
    renderCountries();
  });

  countriesGridEl.addEventListener("click", (event) => {
    const card = event.target.closest(".country-card");
    if (!card) return;

    const countryCode = card.dataset.countryCode;
    const selectedCountry = state.countries.find((country) => country.cca3 === countryCode);
    openModal(selectedCountry);
  });

  closeModalBtnEl.addEventListener("click", closeModal);

  modalOverlayEl.addEventListener("click", (event) => {
    if (event.target === modalOverlayEl) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modalOverlayEl.classList.contains("show")) {
      closeModal();
    }
  });
}

// ============================
// Inicialización principal de la aplicación
// ============================
async function init() {
  setupEventListeners();
  await fetchCountries();
  renderCountries();
}

// ============================
// Función autoejecutable para iniciar la SPA al cargar
// ============================
(function autoInit() {
  init();
})();
