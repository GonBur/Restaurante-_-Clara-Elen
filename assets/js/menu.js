/**
 * ClaraElen — Carta Gastronómica Dinámica con Filtro y Buscador
 */
const FALLBACK_CARTA = [
  {
    "id": "ceviche-claraelen",
    "name": "Ceviche Clásico ClaraElen",
    "category": "entradas",
    "categoryLabel": "Entradas & Ceviches",
    "price": 38.0,
    "tag": "Más Pedido",
    "image": "assets/img/ceviche-claraelen.webp",
    "alt": "Ceviche Clásico ClaraElen con camote, choclo y cancha",
    "description": "Pescado fresco del día marinado al instante en jugo de limón, ají limo, cebolla roja, camote glaseado, choclo y cancha tostada."
  },
  {
    "id": "causa-claraelen",
    "name": "Causa Crocante de Langostinos",
    "category": "entradas",
    "categoryLabel": "Entradas & Ceviches",
    "price": 34.0,
    "tag": "Especialidad",
    "image": "assets/img/ceviche-claraelen.webp",
    "alt": "Causa de papa amarilla con langostinos en ClaraElen",
    "description": "Papa amarilla sazonada con ají amarillo y limón, rellena de palta y coronada con langostinos salteados y salsa de la casa."
  },
  {
    "id": "lomo-saltado-claraelen",
    "name": "Lomo Saltado Flameado ClaraElen",
    "category": "criollos",
    "categoryLabel": "Fondos Criollos",
    "price": 44.0,
    "tag": "Clásico",
    "image": "assets/img/lomo-claraelen.webp",
    "alt": "Lomo Saltado Flameado ClaraElen con papas fritas y arroz",
    "description": "Lomo fino salteado al wok con cebolla morada, tomate, sillao artesanal, papas doradas al hilo o bastón y arroz blanco graneado."
  },
  {
    "id": "arroz-mariscos-claraelen",
    "name": "Arroz con Mariscos a la Norteña",
    "category": "criollos",
    "categoryLabel": "Fondos Criollos",
    "price": 45.0,
    "tag": "Tradición",
    "image": "assets/img/lomo-claraelen.webp",
    "alt": "Arroz con mariscos preparado en ClaraElen",
    "description": "Arroz meloso preparado con aderezo norteño, langostinos, calamar, conchas y chicha de jora, acompañado de sarza criolla."
  },
  {
    "id": "bife-claraelen",
    "name": "Bife Ancho a la Brasa ClaraElen",
    "category": "parrilla",
    "categoryLabel": "Parrilla & Brasas",
    "price": 62.0,
    "tag": "Parrilla",
    "image": "assets/img/parrilla-claraelen.webp",
    "alt": "Bife ancho a la parrilla servido en ClaraElen",
    "description": "Corte jugoso sellado a la brasa con chimichurri artesanal, papas rústicas sazonadas y ensalada fresca de temporada."
  },
  {
    "id": "parrilla-compartir-claraelen",
    "name": "Parrilla Especial ClaraElen (2-3 pers.)",
    "category": "parrilla",
    "categoryLabel": "Parrilla & Brasas",
    "price": 98.0,
    "tag": "Para Compartir",
    "image": "assets/img/parrilla-claraelen.webp",
    "alt": "Parrilla especial para compartir en ClaraElen",
    "description": "Selección de cortes a la brasa, pollo marinado, chorizos artesanales, papas doradas, choclo asado y salsas criollas."
  },
  {
    "id": "pisco-sour-claraelen",
    "name": "Pisco Sour Clásico de la Casa",
    "category": "bebidas",
    "categoryLabel": "Cócteles & Bebidas",
    "price": 22.0,
    "tag": "Barra",
    "image": "assets/img/cocteles-claraelen.webp",
    "alt": "Copa de Pisco Sour preparado en ClaraElen",
    "description": "Pisco puro, limón recién exprimido, jarabe de goma, espuma sedosa y gotas de amargo aromático."
  },
  {
    "id": "chilcano-claraelen",
    "name": "Chilcano de Maracuyá ClaraElen",
    "category": "bebidas",
    "categoryLabel": "Cócteles & Bebidas",
    "price": 20.0,
    "tag": "Refrescante",
    "image": "assets/img/cocteles-claraelen.webp",
    "alt": "Chilcano de maracuyá servido en ClaraElen",
    "description": "Pisco, maracuyá natural, toque cítrico y ginger ale bien frío para acompañar tus platos."
  },
  {
    "id": "suspiro-claraelen",
    "name": "Suspiro & Dulces ClaraElen",
    "category": "postres",
    "categoryLabel": "Postres",
    "price": 18.0,
    "tag": "Dulce Final",
    "image": "assets/img/postre-claraelen.webp",
    "alt": "Postre artesanal servido en ClaraElen",
    "description": "Suave manjar de yemas con toque de canela y merengue aromático, ideal para cerrar la comida."
  }
];

const WHATSAPP_PHONE = '51977555420';

export async function initMenu() {
  const grid = document.getElementById('menuGrid');
  const searchInput = document.getElementById('menuSearch');
  const filterButtons = document.querySelectorAll('.menu-filter-btn');
  const emptyState = document.getElementById('menuEmptyState');

  if (!grid) return;

  let dishes = FALLBACK_CARTA;
  try {
    const response = await fetch('data/carta.json');
    if (response.ok) {
      dishes = await response.json();
    }
  } catch (_err) {
    dishes = FALLBACK_CARTA;
  }

  let activeCategory = 'all';
  let searchQuery = '';

  const renderDishes = () => {
    const filtered = dishes.filter((dish) => {
      const matchesCat = activeCategory === 'all' || dish.category === activeCategory;
      const haystack = `${dish.name} ${dish.description} ${dish.categoryLabel}`.toLowerCase();
      const matchesText = haystack.includes(searchQuery.toLowerCase().trim());
      return matchesCat && matchesText;
    });

    grid.innerHTML = '';

    if (filtered.length === 0) {
      if (emptyState) emptyState.classList.remove('d-none');
      return;
    }
    if (emptyState) emptyState.classList.add('d-none');

    filtered.forEach((dish) => {
      const col = document.createElement('div');
      col.className = 'col-md-6 col-lg-4';

      const waMsg = encodeURIComponent(
        `Hola ClaraElen, quisiera pedir: *${dish.name}* (S/ ${dish.price.toFixed(2)}).`
      );

      col.innerHTML = `
        <article class="ce-card d-flex flex-column">
          <div class="dish-img-wrap">
            <img src="${dish.image}" alt="${dish.alt}" width="480" height="360" loading="lazy">
            <span class="dish-tag-badge">${dish.tag}</span>
            <span class="dish-price-tag">S/ ${dish.price.toFixed(2)}</span>
          </div>
          <div class="p-4 d-flex flex-column flex-grow-1">
            <span class="small fw-semibold mb-1" style="color: var(--ce-purple-bright);">${dish.categoryLabel}</span>
            <h3 class="h5 mb-2">${dish.name}</h3>
            <p class="small text-secondary mb-4">${dish.description}</p>
            <div class="mt-auto d-flex gap-2">
              <a href="https://wa.me/${WHATSAPP_PHONE}?text=${waMsg}" target="_blank" rel="noopener noreferrer" class="btn-ce-primary py-2 px-3 flex-grow-1">
                <i class="bi bi-whatsapp" aria-hidden="true"></i>
                <span>Pedir por WhatsApp</span>
              </a>
            </div>
          </div>
        </article>
      `;
      grid.appendChild(col);
    });
  };

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.category || 'all';
      filterButtons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      renderDishes();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderDishes();
    });
  }

  renderDishes();
}
