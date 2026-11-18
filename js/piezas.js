/* =========================================================
   La Pampa Teje — Catálogo de piezas
   Vistas: catálogo (#catalogo) y ficha (#p<id>), en la misma página.
   Datos: window.PIEZAS (js/data/piezas.js)
   ========================================================= */
(function () {
  "use strict";

  var TODAS = window.PIEZAS || [];
  /* Piezas del nomenclador oficial (catálogo) y piezas fuera del nomenclador (anexo) */
  /* Para el evento: la pieza sin foto queda oculta y, dentro de cada tipo, primero las fotos de producción */
  var PIEZAS = TODAS.filter(function (p) { return !p.anexo && !p.oculta; })
    .map(function (p, i) { return [p, i]; })
    .sort(function (a, b) { return ((a[0].provisoria ? 1 : 0) - (b[0].provisoria ? 1 : 0)) || (a[1] - b[1]); })
    .map(function (x) { return x[0]; });
  var ANEXO = TODAS.filter(function (p) { return p.anexo; });

  /* Orden de capítulos: sigue el texto curatorial del brochure */
  var ORDEN_GRUPOS = ["Ataderas", "Fajas", "Matras", "Ponchos", "Caminos", "Pares de alfombras", "Pies de cama", "Ruana"];

  /* Perfiles de artesanos: activar cuando exista artesanos.html */
  var ARTESANOS_URL = "tejedoras.html#";

  /* Términos agrupados para los filtros (la ficha siempre muestra el texto original) */
  var TECNICAS = [
    ["Lista / listado", /\blista|\blistado/],
    ["Peinecillo", /peinecillo/],
    ["Labor / laboreo", /\blabor/],
    ["Punto arroz", /punto arroz/],
    ["Franja lisa", /franja lisa/],
    ["Guarda atada", /guarda atada/],
    ["Viborita", /viborita/],
    ["Flecos retorcidos", /flecos retorcidos|retorcido de flecos/],
    ["Pompones", /pompones/],
    ["Argollas", /argollas/]
  ];
  var TINTES = [
    ["Anilinas", /anilina/],
    ["Color natural de la fibra", /natural/],
    ["Té pampa", /té pampa/],
    ["Manzanilla", /manzanilla/],
    ["Eucalipto", /eucalip/],
    ["Piquillín", /piquill/],
    ["Jarilla", /jarilla/],
    ["Cebolla", /cebolla/],
    ["Yerba", /yerba/],
    ["Chilca", /chilca/],
    ["Aserrín", /aserr/]
  ];

  /* ---------- Utilidades ---------- */
  function $(s, c) { return (c || document).querySelector(s); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }
  function norm(s) { return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
  function etiquetas(texto, lista) {
    var t = String(texto || "").toLowerCase();
    return lista.filter(function (x) { return x[1].test(t); }).map(function (x) { return x[0]; });
  }

  /* Campos derivados para filtrar */
  TODAS.forEach(function (p, i) {
    p._i = i;
    p._tecnicas = etiquetas(p.tecnica, TECNICAS);
    p._tintes = etiquetas(p.tenidos, TINTES);
    p._busqueda = norm([p.titulo, p.grupo, p.artesana, p.localidad, p.materia, p.tenidos, p.telar, p.tecnica].join(" "));
  });

  /* ---------- Filtros ---------- */
  var FILTROS = [
    { clave: "grupo", nombre: "Tipología", valores: function (p) { return [p.grupo]; }, orden: ORDEN_GRUPOS },
    { clave: "artesana", nombre: "Artesana/o", valores: function (p) { return [p.artesana]; } },
    { clave: "localidad", nombre: "Localidad", valores: function (p) { return [p.localidad]; } },
    { clave: "telar", nombre: "Telar", valores: function (p) { return [p.telar]; } },
    { clave: "tecnica", nombre: "Técnica", valores: function (p) { return p._tecnicas; }, orden: TECNICAS.map(function (x) { return x[0]; }) },
    { clave: "tinte", nombre: "Tintes", valores: function (p) { return p._tintes; }, orden: TINTES.map(function (x) { return x[0]; }) }
  ];
  var estado = { q: "" };
  var abierto = null;

  function opciones(f) {
    var cuenta = {};
    PIEZAS.forEach(function (p) { f.valores(p).forEach(function (v) { cuenta[v] = (cuenta[v] || 0) + 1; }); });
    var claves = Object.keys(cuenta);
    if (f.orden) claves.sort(function (a, b) { return f.orden.indexOf(a) - f.orden.indexOf(b); });
    else claves.sort(function (a, b) { return a.localeCompare(b, "es"); });
    return claves.map(function (k) { return { valor: k, n: cuenta[k] }; });
  }

  function filtradas() {
    var q = norm(estado.q.trim());
    return PIEZAS.filter(function (p) {
      for (var i = 0; i < FILTROS.length; i++) {
        var f = FILTROS[i], v = estado[f.clave];
        if (v && f.valores(p).indexOf(v) === -1) return false;
      }
      return !q || q.split(/\s+/).every(function (w) { return p._busqueda.indexOf(w) !== -1; });
    });
  }
  function hayFiltros() {
    return !!estado.q.trim() || FILTROS.some(function (f) { return estado[f.clave]; });
  }

  function pintarFiltros() {
    var cont = $("#filtros");
    var lista = filtradas();
    /* 1. Búsqueda destacada */
    var html = '<div class="filtros__fila">' +
      '<label class="filtros__buscar"><span class="visually-hidden">Buscar piezas</span>' +
      '<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M15.5 15.5 21 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>' +
      '<input id="buscar-piezas" type="search" placeholder="' + (window.innerWidth < 700 ? "Buscar" : "Buscar por pieza, tejedora, localidad, técnica o tinte") + '" autocomplete="off" value="' + esc(estado.q) + '"></label>' +
      '<span class="filtros__total" aria-live="polite">' + lista.length + (lista.length === 1 ? " pieza" : " piezas") + "</span></div>";
    /* 2. Tipologías como chips de un clic */
    var fg = FILTROS[0];
    html += '<div class="filtros__chips" role="group" aria-label="Tipología">' +
      '<button type="button" class="chip' + (estado.grupo ? "" : " is-activo") + '" data-quitar="grupo">Todas</button>';
    opciones(fg).forEach(function (o) {
      var on = estado.grupo === o.valor;
      html += '<button type="button" class="chip' + (on ? " is-activo" : "") + '" ' + (on ? 'data-quitar="grupo"' : 'data-filtro="grupo" data-valor="' + esc(o.valor) + '"') +
        ' aria-pressed="' + on + '">' + esc(o.valor) + ' <span class="chip__n">' + o.n + "</span></button>";
    });
    html += "</div>";
    /* Filtros desplegables quitados a pedido; queda el botón para limpiar si se llega filtrado desde una ficha */
    if (hayFiltros()) html += '<div class="filtros__mas"><button type="button" class="filtros__limpiar" data-limpiar>Quitar filtros</button></div>';
    cont.innerHTML = html;
  }

  /* ---------- Composición ---------- */
  function columnas() {
    var w = window.innerWidth;
    return w >= 1100 ? 3 : w >= 640 ? 2 : 1;
  }

  function tarjeta(p) {
    var img = p.foto
      ? '<div class="pieza__img" style="aspect-ratio:' + p.fw + "/" + p.fh + '"><img src="' + esc(p.foto) + '" alt="' +
        esc(p.titulo + " de " + p.artesana) + '" loading="lazy" width="' + p.fw + '" height="' + p.fh + '"></div>'
      : '<div class="pieza__img pieza__img--vacia"><span>' + esc(p.titulo) + '</span></div>';
    if (p.vendida) img = img.replace(/<\/div>$/, '<span class="sello-vendida">Vendida</span></div>');
    return '<a class="pieza" href="#p' + esc(p.id) + '">' + img +
      '<p class="pieza__titulo">' + esc(p.titulo) + "</p>" +
      '<p class="pieza__meta">' + esc(p.artesana) + " · " + esc(p.localidad) + "</p></a>";
  }

  /* Tarjeta de carrusel: altura fija; al pasar el mouse muestra una toma de detalle */
  function tarjetaFila(p) {
    var det = (p.galeria || [])[1];
    var img = p.foto
      ? '<div class="pz__img" style="aspect-ratio:' + p.fw + "/" + p.fh + '"><img src="' + esc(p.foto) + '" alt="' + esc(p.titulo + " de " + p.artesana) +
        '" loading="lazy">' + (det ? '<img class="pz__det" src="' + esc(det.src) + '" alt="" loading="lazy">' : "") + "</div>"
      : '<div class="pz__img pz__img--vacia"><span>' + esc(p.titulo) + '</span></div>';
    if (p.vendida) img = img.replace(/<\/div>$/, '<span class="sello-vendida">Vendida</span></div>');
    return '<a class="pz" href="#p' + esc(p.id) + '">' + img +
      '<span class="pz__info"><span class="pz__titulo">' + esc(p.titulo) + '</span><span class="pz__meta">' + esc(p.artesana) + " · " + esc(p.localidad) + "</span></span></a>";
  }
  function revelar() {
    var filas = document.querySelectorAll(".fila");
    if (!("IntersectionObserver" in window)) { filas.forEach(function (f) { f.classList.add("is-visible"); }); return; }
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); } }); }, { threshold: .12 });
    filas.forEach(function (f) { io.observe(f); });
  }

  function composicion(lista) {
    var n = columnas();
    var cols = [], alto = [];
    for (var i = 0; i < n; i++) { cols.push([]); alto.push(i === 1 && n === 3 ? 0.35 : 0); }
    lista.forEach(function (p) {
      var k = alto.indexOf(Math.min.apply(null, alto));
      cols[k].push(p);
      alto[k] += (p.foto ? p.fh / p.fw : 4 / 3) + 0.22;
    });
    return '<div class="composicion composicion--' + n + '">' + cols.map(function (c) {
      return '<div class="composicion__col">' + c.map(tarjeta).join("") + "</div>";
    }).join("") + "</div>";
  }

  function pintarCatalogo() {
    var cont = $("#catalogo-contenido");
    var lista = filtradas();
    if (!lista.length) {
      cont.innerHTML = '<p class="catalogo__vacio">No hay piezas con esos filtros.</p>';
      return;
    }
    if (hayFiltros()) {
      cont.innerHTML = composicion(lista);
      return;
    }
    /* Vista general: cada tipología es una fila deslizable (carrusel) */
    cont.innerHTML = ORDEN_GRUPOS.map(function (g, gi) {
      var del = lista.filter(function (p) { return p.grupo === g; });
      if (!del.length) return "";
      return '<section class="fila" aria-label="' + esc(g) + '">' +
        '<header class="fila__cab"><h2 class="fila__titulo"><span class="fila__num">0' + (gi + 1) + '</span>' + esc(g) +
        ' <span class="capitulo__n">' + del.length + '</span></h2>' +
        '<div class="fila__acciones"><button type="button" class="fila__ver" data-filtro="grupo" data-valor="' + esc(g) + '">Ver todas</button>' +
        '<button type="button" class="fila__flecha" data-fila="-1" aria-label="Anterior">←</button>' +
        '<button type="button" class="fila__flecha" data-fila="1" aria-label="Siguiente">→</button></div></header>' +
        '<div class="fila__pista">' + del.map(tarjetaFila).join("") + "</div></section>";
    }).join("") + anexoHTML();
    revelar();
  }

  function anexoHTML() {
    if (!ANEXO.length) return "";
    return '<section class="anexo" aria-labelledby="t-anexo">' +
      '<header class="anexo__cab"><p class="anexo__etq">Anexo</p><h2 class="anexo__titulo" id="t-anexo">Otras piezas de la selección</h2>' +
      '<p class="anexo__nota">Piezas de la selección de obras que no integran el nomenclador de la muestra.</p></header>' +
      '<div class="fila__pista anexo__pista">' + ANEXO.map(tarjetaFila).join("") + "</div></section>";
  }

  function aplicar() { pintarFiltros(); pintarCatalogo(); }


  /* Consulta por pieza (venta). Completar con el contacto oficial del Mercado Artesanal de La Pampa.
     whatsapp: solo números con código de país, ej. "549XXXXXXXXXX". Si ambos están vacíos, el botón lleva a Contacto. */
  var CONSULTA = { activa: false, whatsapp: "", email: "" };
  function consultaHTML(p) {
    if (p.vendida) return '<p class="ficha__vendida">Pieza vendida</p>';
    if (!CONSULTA.activa) return ""; /* botón desactivado hasta tener el contacto del Mercado Artesanal */
    var msg = "Hola, quiero consultar por la pieza «" + p.titulo + "» de " + p.artesana + (p.codigo ? " (código " + p.codigo + ")" : "") + ", del catálogo La Pampa Teje.";
    var href, ext = ' target="_blank" rel="noopener"';
    if (CONSULTA.whatsapp) href = "https://wa.me/" + CONSULTA.whatsapp + "?text=" + encodeURIComponent(msg);
    else if (CONSULTA.email) { href = "mailto:" + CONSULTA.email + "?subject=" + encodeURIComponent("Consulta por pieza: " + p.titulo) + "&body=" + encodeURIComponent(msg); ext = ""; }
    else { href = "contacto.html#t-sedes"; ext = ""; }
    return '<a class="ficha__consulta" href="' + esc(href) + '"' + ext + '>Consultar por esta pieza <span aria-hidden="true">→</span></a>';
  }

  /* ---------- Ficha ---------- */
  function fila(et, valor, extra) {
    if (!valor) return "";
    return "<div><dt>" + esc(et) + "</dt><dd>" + esc(valor) + (extra || "") + "</dd></div>";
  }
  function enlacesFiltro(clave, valores) {
    if (!valores.length) return "";
    return '<span class="ficha__enlaces">Ver piezas con: ' + valores.map(function (v) {
      return '<button type="button" data-ir-filtro="' + clave + '" data-valor="' + esc(v) + '">' + esc(v) + "</button>";
    }).join(" · ") + "</span>";
  }

  function escala(p) {
    if (!p.dims) return "";
    var w = p.dims[0], h = p.dims[1], max = Math.max(w, h, 100), s = 180 / max;
    var rw = Math.max(w * s, 1.5), rh = Math.max(h * s, 1.5), ref = 100 * s;
    var W = rw + 70, H = 200;
    return '<figure class="ficha__escala"><svg viewBox="0 0 ' + W + " " + H + '" width="' + W + '" height="' + H + '" role="img" aria-label="Escala: ' + esc(p.medidas) + ' junto a una referencia de un metro">' +
      '<rect x="0.5" y="' + (H - rh - 0.5) + '" width="' + rw + '" height="' + rh + '" class="escala__pieza"/>' +
      '<line x1="' + (rw + 40) + '" y1="' + (H - ref) + '" x2="' + (rw + 40) + '" y2="' + H + '" class="escala__ref"/>' +
      '<text x="' + (rw + 48) + '" y="' + (H - ref + 12) + '" class="escala__txt">1 m</text></svg>' +
      "<figcaption>Escala</figcaption></figure>";
  }

  function miniaturas(titulo, lista) {
    if (!lista.length) return "";
    return '<section class="ficha__relacionadas"><h2>' + esc(titulo) + '</h2><div class="miniaturas">' +
      lista.slice(0, 4).map(tarjeta).join("") + "</div></section>";
  }

  function pintarFicha(p) {
    var autora = ARTESANOS_URL
      ? '<a href="' + ARTESANOS_URL + esc(p.slug) + '">' + esc(p.artesana) + "</a>"
      : esc(p.artesana);
    var tomas = p.galeria || (p.foto ? [{ src: p.foto, w: p.fw, h: p.fh }] : []);
    var altBase = p.titulo + " de " + p.artesana;
    function toma(t, i) {
      return '<button type="button" class="ficha__ampliar" data-i="' + i + '" aria-label="Ampliar fotografía ' + (i + 1) + ' de ' + tomas.length + '">' +
        '<img src="' + esc(t.src) + '" alt="' + esc(altBase + (i ? " · detalle " + i : "")) + '" width="' + t.w + '" height="' + t.h + '"' + (i ? ' loading="lazy"' : "") + "></button>";
    }
    var foto = tomas.length
      ? toma(tomas[0], 0)
      : '<div class="pieza__img pieza__img--vacia ficha__vacia"><span>' + esc(p.titulo) + '</span></div>';
    var masTomas = tomas.length > 1
      ? '<div class="ficha__tomas">' + tomas.slice(1).map(function (t, i) { return toma(t, i + 1); }).join("") + "</div>"
      : "";
    galeriaActual = tomas.map(function (t, i) { return { src: t.src, alt: altBase + (i ? " · detalle " + i : "") }; });

    var deAutora = PIEZAS.filter(function (x) { return x.artesana === p.artesana && x !== p; });
    var tec = p._tecnicas.slice().sort(function (a, b) {
      return cuenta("tecnica", a) - cuenta("tecnica", b);
    }).filter(function (t) { return cuenta("tecnica", t) > 1; })[0];
    var conTec = tec ? PIEZAS.filter(function (x) { return x !== p && x.artesana !== p.artesana && x._tecnicas.indexOf(tec) !== -1; }) : [];

    var orden = p.anexo ? ANEXO.concat(ordenCatalogo()) : ordenCatalogo();
    var pos = orden.indexOf(p);
    var ant = orden[(pos - 1 + orden.length) % orden.length], sig = orden[(pos + 1) % orden.length];

    $("#vista-ficha").innerHTML =
      '<a class="ficha__volver" href="#catalogo">← Piezas</a>' +
      '<div class="ficha__grid">' +
        '<figure class="ficha__foto">' + foto + "</figure>" +
        '<div class="ficha__info">' +
          (p.anexo ? '<p class="ficha__anexo">Anexo</p>' : "") +
          '<h1 class="ficha__titulo">' + esc(p.titulo) + "</h1>" +
          '<p class="ficha__autora">' + autora + "</p>" +
          '<p class="ficha__localidad"><button type="button" data-ir-filtro="localidad" data-valor="' + esc(p.localidad) + '">' + esc(p.localidad) + "</button></p>" +
          (p.destacado ? '<p class="ficha__destacado">' + esc(p.destacado) + ".</p>" : "") +
          '<dl class="ficha__datos">' +
            fila("Materia prima", p.materia) +
            fila("Hilado", p.hilado) +
            fila("Teñidos", p.tenidos, enlacesFiltro("tinte", p._tintes)) +
            fila("Telar", p.telar, '<span class="ficha__enlaces"><button type="button" data-ir-filtro="telar" data-valor="' + esc(p.telar) + '">Ver piezas con este telar</button></span>') +
            fila("Técnica expresiva", p.tecnica, enlacesFiltro("tecnica", p._tecnicas)) +
            fila("Medidas", p.medidas) +
            fila("Código", p.codigo) +
          "</dl>" +
          consultaHTML(p) +
        "</div>" +
        masTomas +
      "</div>" +
      miniaturas("Más piezas de " + p.artesana, deAutora) +
      (tec ? miniaturas("Otras piezas con " + tec.toLowerCase(), conTec) : "") +
      '<nav class="ficha__pasos" aria-label="Otras piezas">' +
        '<a href="#p' + esc(ant.id) + '">← ' + esc(ant.titulo) + " · " + esc(ant.artesana) + "</a>" +
        '<a href="#p' + esc(sig.id) + '">' + esc(sig.titulo) + " · " + esc(sig.artesana) + " →</a>" +
      "</nav>";
    document.title = p.titulo + " · " + p.artesana + " · La Pampa Teje";
  }

  function cuenta(clave, valor) {
    var f = FILTROS.filter(function (x) { return x.clave === clave; })[0];
    return PIEZAS.filter(function (p) { return f.valores(p).indexOf(valor) !== -1; }).length;
  }
  function ordenCatalogo() {
    return ORDEN_GRUPOS.reduce(function (acc, g) {
      return acc.concat(PIEZAS.filter(function (p) { return p.grupo === g; }));
    }, []);
  }

  /* ---------- Rutas ---------- */
  var scrollCatalogo = 0;
  var vistaActual = "catalogo";

  function ruta() {
    var h = location.hash.replace("#", "");
    var m = /^p(.+)$/.exec(h);
    var p = m && TODAS.filter(function (x) { return x.id === m[1]; })[0];
    if (p) {
      if (vistaActual === "catalogo") scrollCatalogo = window.scrollY;
      pintarFicha(p);
      $("#vista-catalogo").hidden = true;
      $("#vista-ficha").hidden = false;
      vistaActual = "ficha";
      window.scrollTo(0, 0);
    } else {
      $("#vista-ficha").hidden = true;
      $("#vista-catalogo").hidden = false;
      document.title = "Piezas · La Pampa Teje";
      var volver = vistaActual === "ficha";
      vistaActual = "catalogo";
      aplicar();
      window.scrollTo(0, volver ? scrollCatalogo : 0);
    }
  }

  function irAFiltro(clave, valor) {
    FILTROS.forEach(function (f) { estado[f.clave] = null; });
    estado.q = "";
    estado[clave] = valor;
    scrollCatalogo = 0;
    if (location.hash === "#catalogo") ruta(); else location.hash = "catalogo";
  }

  /* ---------- Eventos ---------- */
  document.addEventListener("click", function (e) {
    var b = e.target.closest("button");
    var dentroFiltro = e.target.closest(".filtro");
    if (!b) { if (!dentroFiltro && abierto) { abierto = null; pintarFiltros(); } return; }
    if (b.dataset.abrir) { abierto = abierto === b.dataset.abrir ? null : b.dataset.abrir; pintarFiltros(); return; }
    if (b.dataset.filtro) { estado[b.dataset.filtro] = b.dataset.valor; abierto = null; aplicar(); if (b.classList.contains("fila__ver")) $("#filtros").scrollIntoView({ behavior: "smooth" }); return; }
    if (b.dataset.quitar) { estado[b.dataset.quitar] = null; aplicar(); return; }
    if (b.hasAttribute("data-limpiar")) { FILTROS.forEach(function (f) { estado[f.clave] = null; }); estado.q = ""; abierto = null; aplicar(); return; }
    if (b.dataset.fila) {
      var pista = b.closest(".fila").querySelector(".fila__pista");
      pista.scrollBy({ left: +b.dataset.fila * pista.clientWidth * .8, behavior: "smooth" }); return;
    }
    if (b.dataset.irFiltro) { irAFiltro(b.dataset.irFiltro, b.dataset.valor); return; }
    if (b.classList.contains("ficha__ampliar")) { abrirZoom(+b.dataset.i || 0); return; }
    if (b.classList.contains("zoom__cerrar")) { cerrarZoom(); return; }
    if (b.closest("#zoom")) return;
    if (abierto && !dentroFiltro) { abierto = null; pintarFiltros(); }
  });

  var t;
  document.addEventListener("input", function (e) {
    if (e.target.id !== "buscar-piezas") return;
    estado.q = e.target.value;
    clearTimeout(t);
    t = setTimeout(function () {
      pintarCatalogo();
      var total = $(".filtros__total");
      var n = filtradas().length;
      if (total) total.textContent = n + (n === 1 ? " pieza" : " piezas");
      var limpiar = $(".filtros__limpiar");
      if (hayFiltros() && !limpiar) {
        $(".filtros__mas").insertAdjacentHTML("beforeend", '<button type="button" class="filtros__limpiar" data-limpiar>Quitar filtros</button>');
      } else if (!hayFiltros() && limpiar) { limpiar.remove(); }
    }, 160);
  });

  /* Zoom con recorrido por todas las tomas de la pieza */
  var zoom = $("#zoom");
  var galeriaActual = [];
  var tomaActual = 0;
  function mostrarToma(i) {
    var n = galeriaActual.length;
    tomaActual = (i + n) % n;
    var z = $(".zoom__img", zoom), g = galeriaActual[tomaActual];
    z.src = g.src; z.alt = g.alt;
    var c = $(".zoom__contador", zoom);
    c.textContent = n > 1 ? (tomaActual + 1) + " / " + n : "";
    $(".zoom__prev", zoom).hidden = $(".zoom__next", zoom).hidden = n < 2;
  }
  function abrirZoom(i) {
    if (!galeriaActual.length) return;
    mostrarToma(i);
    zoom.hidden = false;
    document.body.style.overflow = "hidden";
    $(".zoom__cerrar", zoom).focus();
  }
  function cerrarZoom() { zoom.hidden = true; document.body.style.overflow = ""; }
  zoom.addEventListener("click", function (e) {
    if (e.target.closest(".zoom__prev")) { mostrarToma(tomaActual - 1); return; }
    if (e.target.closest(".zoom__next")) { mostrarToma(tomaActual + 1); return; }
    if (e.target === zoom || e.target.classList.contains("zoom__img")) cerrarZoom();
  });
  document.addEventListener("keydown", function (e) {
    if (!zoom.hidden && e.key === "ArrowLeft") { mostrarToma(tomaActual - 1); return; }
    if (!zoom.hidden && e.key === "ArrowRight") { mostrarToma(tomaActual + 1); return; }
    if (e.key !== "Escape") return;
    if (!zoom.hidden) cerrarZoom();
    else if (abierto) { abierto = null; pintarFiltros(); }
  });

  /* Recalcular columnas al cambiar el ancho */
  var nCols = columnas();
  window.addEventListener("resize", function () {
    var n = columnas();
    if (n !== nCols) { nCols = n; if (vistaActual === "catalogo") pintarCatalogo(); }
  });

  window.addEventListener("hashchange", ruta);
  ruta();
})();
