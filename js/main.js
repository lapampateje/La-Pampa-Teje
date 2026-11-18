/* La Pampa Teje — interacciones */

/* ---------- Pie de página (una sola fuente para todas las páginas) ---------- */
(function () {
  "use strict";
  var pie = document.getElementById("pie");
  if (!pie) return;
  pie.innerHTML =
    '<div class="pie__interior">' +
      '<div class="pie__col">' +
        '<p class="pie__marca">La Pampa Teje</p>' +
        '<p>Tejido artesanal tradicional en telar de La Pampa</p>' +
      "</div>" +
      '<div class="pie__col pie__col--enlaces">' +
        '<a href="contacto.html#creditos">Créditos</a> · <a href="contacto.html">Contacto</a>' +
      "</div>" +
    "</div>";
})();

/* ---------- Barra: logo a la izquierda y sombra al desplazarse ---------- */
(function () {
  "use strict";
  var LOGO = '<svg class="menu__logo" aria-hidden="true" focusable="false" viewBox="54 69 289 75.5" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor"><path d="M 185.4 107.4 L 185.4 78.4 L 187.1 78.4 L 187.1 105.7 L 201.9 105.7 L 201.9 107.4 Z M 185.4 107.4 "/><path d="M 210.4 106.3 C 211.3 106.3 212.2 106.1 213.1 105.8 C 213.9 105.5 214.7 105.1 215.5 104.5 C 216.2 104.0 216.8 103.4 217.3 102.7 C 217.7 102.1 218.0 101.4 218.0 100.7 L 218.0 96.6 L 213.9 96.7 C 211.7 96.8 210.0 97.0 208.7 97.3 C 207.4 97.7 206.5 98.3 206.0 99.0 C 205.4 99.8 205.2 100.8 205.2 102.0 C 205.2 103.3 205.6 104.4 206.6 105.2 C 207.6 105.9 208.8 106.3 210.4 106.3 M 210.2 107.8 C 208.8 107.8 207.6 107.5 206.6 107.1 C 205.6 106.6 204.9 106.0 204.3 105.1 C 203.8 104.3 203.5 103.3 203.5 102.1 C 203.5 99.8 204.3 98.1 205.8 97.0 C 207.3 96.0 209.7 95.4 213.2 95.2 L 218.0 95.1 L 218.0 93.1 C 218.0 91.5 217.5 90.2 216.5 89.2 C 215.5 88.3 214.0 87.8 212.0 87.8 C 210.5 87.8 209.2 88.1 208.2 88.9 C 207.1 89.6 206.5 90.7 206.3 92.2 L 204.6 92.2 C 204.7 91.0 205.0 90.0 205.6 89.1 C 206.1 88.2 207 87.5 208.0 87.0 C 209.1 86.5 210.5 86.3 212.1 86.3 C 213.6 86.3 214.9 86.5 216.0 87.0 C 217.1 87.5 218.0 88.2 218.6 89.2 C 219.2 90.2 219.5 91.5 219.5 93.0 L 219.5 107.4 L 218.1 107.4 L 218.0 103.2 C 217.1 104.9 216.0 106.1 214.6 106.8 C 213.1 107.4 211.7 107.8 210.2 107.8 "/><path d="M 235.2 94.6 L 242.7 94.6 C 245.2 94.6 247.2 93.9 248.8 92.6 C 250.3 91.4 251.1 89.5 251.1 87.1 C 251.1 84.7 250.3 82.9 248.7 81.8 C 247.2 80.7 245.0 80.1 242.4 80.1 L 235.2 80.1 Z M 233.5 107.4 L 233.5 78.4 L 242.4 78.4 C 244.5 78.4 246.3 78.8 247.8 79.4 C 249.4 80.1 250.6 81.1 251.5 82.4 C 252.4 83.7 252.9 85.3 252.9 87.2 C 252.9 89.2 252.4 90.8 251.5 92.2 C 250.7 93.5 249.5 94.5 247.9 95.2 C 246.4 95.9 244.7 96.3 242.7 96.3 L 235.2 96.3 L 235.2 107.4 Z M 233.5 107.4 "/><path d="M 261.1 106.3 C 262 106.3 262.8 106.1 263.7 105.8 C 264.6 105.5 265.4 105.1 266.1 104.5 C 266.9 104.0 267.5 103.4 267.9 102.7 C 268.4 102.1 268.6 101.4 268.6 100.7 L 268.6 96.6 L 264.6 96.7 C 262.4 96.8 260.6 97.0 259.4 97.3 C 258.1 97.7 257.2 98.3 256.6 99.0 C 256.1 99.8 255.8 100.8 255.8 102.0 C 255.8 103.3 256.3 104.4 257.3 105.2 C 258.2 105.9 259.5 106.3 261.1 106.3 M 260.8 107.8 C 259.5 107.8 258.3 107.5 257.3 107.1 C 256.3 106.6 255.5 106.0 255.0 105.1 C 254.4 104.3 254.2 103.3 254.2 102.1 C 254.2 99.8 254.9 98.1 256.4 97.0 C 257.9 96.0 260.4 95.4 263.8 95.2 L 268.6 95.1 L 268.6 93.1 C 268.6 91.5 268.1 90.2 267.2 89.2 C 266.2 88.3 264.7 87.8 262.7 87.8 C 261.1 87.8 259.9 88.1 258.8 88.9 C 257.8 89.6 257.1 90.7 256.9 92.2 L 255.2 92.2 C 255.3 91.0 255.6 90.0 256.2 89.1 C 256.8 88.2 257.6 87.5 258.7 87.0 C 259.8 86.5 261.1 86.3 262.8 86.3 C 264.2 86.3 265.5 86.5 266.6 87.0 C 267.8 87.5 268.6 88.2 269.2 89.2 C 269.8 90.2 270.2 91.5 270.2 93.0 L 270.2 107.4 L 268.7 107.4 L 268.7 103.2 C 267.8 104.9 266.6 106.1 265.2 106.8 C 263.8 107.4 262.3 107.8 260.8 107.8 "/><path d="M 275.0 107.4 L 275.0 86.7 L 276.4 86.7 L 276.4 89.8 C 276.9 88.8 277.6 88.0 278.6 87.3 C 279.5 86.6 280.8 86.3 282.4 86.3 C 283.2 86.3 284.0 86.4 284.8 86.7 C 285.6 86.9 286.4 87.3 287.0 87.8 C 287.7 88.3 288.2 89.0 288.5 89.7 C 289.1 88.6 290.0 87.8 291.1 87.2 C 292.2 86.6 293.4 86.3 294.8 86.3 C 295.5 86.3 296.3 86.4 297.0 86.6 C 297.8 86.7 298.5 87.1 299.2 87.6 C 299.9 88.2 300.5 88.9 300.9 89.9 C 301.3 91 301.5 92.3 301.5 94.0 L 301.5 107.4 L 300.0 107.4 L 300.0 94.0 C 300.0 92.3 299.7 91.0 299.3 90.1 C 298.8 89.2 298.1 88.6 297.4 88.3 C 296.6 88.0 295.7 87.8 294.8 87.8 C 294.0 87.8 293.2 87.9 292.3 88.2 C 291.4 88.5 290.6 89.0 290.0 89.8 C 289.3 90.5 289.0 91.6 289.0 93.0 L 289.0 107.4 L 287.5 107.4 L 287.5 92.3 C 287.5 91.3 287.2 90.5 286.7 89.8 C 286.1 89.1 285.5 88.6 284.7 88.3 C 283.9 88.0 283.1 87.8 282.3 87.8 C 281.5 87.8 280.6 88.0 279.7 88.3 C 278.8 88.6 278.0 89.2 277.4 90.0 C 276.8 90.7 276.5 91.7 276.5 93.0 L 276.5 107.4 Z M 275.0 107.4 "/><path d="M 315.1 106.3 C 317.3 106.3 319.0 105.5 320.3 104.0 C 321.6 102.4 322.3 100.0 322.3 96.8 C 322.3 94.1 321.7 91.9 320.5 90.3 C 319.3 88.6 317.6 87.8 315.1 87.8 C 312.8 87.8 311.0 88.6 309.8 90.2 C 308.5 91.9 307.9 94.1 307.9 96.8 C 307.9 98.6 308.2 100.3 308.7 101.7 C 309.3 103.1 310.1 104.2 311.2 105.1 C 312.2 105.9 313.6 106.3 315.1 106.3 M 306.4 113.8 L 306.4 86.7 L 307.9 86.7 L 308.0 90.9 C 308.1 90.5 308.3 90.1 308.7 89.6 C 309.0 89.1 309.4 88.5 310.0 88.0 C 310.5 87.5 311.2 87.1 312.1 86.8 C 312.9 86.4 313.9 86.3 315.1 86.3 C 316.9 86.3 318.4 86.6 319.8 87.4 C 321.1 88.1 322.1 89.3 322.8 90.8 C 323.6 92.4 323.9 94.3 323.9 96.6 C 323.9 98.9 323.6 100.8 323.0 102.5 C 322.3 104.2 321.4 105.5 320.1 106.4 C 318.8 107.3 317.1 107.8 315.1 107.8 C 313.9 107.8 312.9 107.6 312.1 107.3 C 311.2 106.9 310.5 106.5 310.0 106.0 C 309.4 105.5 309.0 104.9 308.7 104.4 C 308.4 103.9 308.1 103.4 308.0 103.0 L 308.0 113.8 Z M 306.4 113.8 "/><path d="M 333.1 106.3 C 333.9 106.3 334.8 106.1 335.7 105.8 C 336.6 105.5 337.4 105.1 338.1 104.5 C 338.9 104.0 339.5 103.4 339.9 102.7 C 340.4 102.1 340.6 101.4 340.6 100.7 L 340.6 96.6 L 336.6 96.7 C 334.4 96.8 332.6 97.0 331.4 97.3 C 330.1 97.7 329.2 98.3 328.6 99.0 C 328.1 99.8 327.8 100.8 327.8 102.0 C 327.8 103.3 328.3 104.4 329.2 105.2 C 330.2 105.9 331.5 106.3 333.1 106.3 M 332.8 107.8 C 331.4 107.8 330.3 107.5 329.3 107.1 C 328.3 106.6 327.5 106.0 327.0 105.1 C 326.4 104.3 326.2 103.3 326.2 102.1 C 326.2 99.8 326.9 98.1 328.4 97.0 C 329.9 96.0 332.4 95.4 335.8 95.2 L 340.6 95.1 L 340.6 93.1 C 340.6 91.5 340.1 90.2 339.1 89.2 C 338.2 88.3 336.7 87.8 334.7 87.8 C 333.1 87.8 331.8 88.1 330.8 88.9 C 329.8 89.6 329.1 90.7 328.9 92.2 L 327.2 92.2 C 327.3 91.0 327.6 90.0 328.2 89.1 C 328.8 88.2 329.6 87.5 330.7 87.0 C 331.8 86.5 333.1 86.3 334.7 86.3 C 336.2 86.3 337.5 86.5 338.6 87.0 C 339.7 87.5 340.6 88.2 341.2 89.2 C 341.8 90.2 342.1 91.5 342.1 93.0 L 342.1 107.4 L 340.7 107.4 L 340.6 103.2 C 339.7 104.9 338.6 106.1 337.2 106.8 C 335.8 107.4 334.3 107.8 332.8 107.8 "/><path d="M 241.7 137.0 L 241.7 114.9 L 233.5 114.9 L 233.5 108.0 L 257.8 108.0 L 257.8 114.9 L 249.5 114.9 L 249.5 137.0 Z M 241.7 137.0 "/><path d="M 262.8 124.0 L 268.7 124.0 C 268.7 123.5 268.6 123.0 268.4 122.6 C 268.1 122.1 267.8 121.8 267.4 121.5 C 266.9 121.3 266.4 121.1 265.7 121.1 C 265.2 121.1 264.7 121.3 264.3 121.5 C 263.8 121.8 263.5 122.1 263.2 122.6 C 262.9 123.0 262.8 123.5 262.8 124.0 M 266.0 137.4 C 263.9 137.4 262.0 136.9 260.4 136.1 C 258.7 135.2 257.5 134.0 256.6 132.4 C 255.6 130.8 255.2 129.0 255.2 126.9 C 255.2 124.9 255.6 123.1 256.5 121.4 C 257.3 119.8 258.5 118.4 260.1 117.4 C 261.6 116.4 263.5 115.9 265.7 115.9 C 268.0 115.9 269.9 116.3 271.4 117.3 C 272.9 118.2 274.0 119.5 274.8 121.1 C 275.5 122.7 275.9 124.6 275.9 126.6 L 275.9 128.4 L 262.8 128.4 C 262.8 129.2 263.0 129.9 263.2 130.4 C 263.5 131 263.9 131.3 264.3 131.6 C 264.8 131.8 265.3 131.9 265.8 131.9 C 266.6 131.9 267.2 131.8 267.8 131.5 C 268.3 131.3 268.8 130.7 269.1 129.9 L 276.0 129.9 C 275.8 131.5 275.2 132.8 274.2 133.9 C 273.2 135.0 271.9 135.9 270.5 136.5 C 269.1 137.1 267.6 137.4 266.0 137.4 "/><path d="M 278.0 108.0 L 285.8 108.0 L 285.8 114.6 L 278.0 114.6 Z M 277.6 143.6 C 276.6 143.6 275.7 143.4 274.9 142.9 L 274.9 137.7 L 276.1 137.5 C 276.9 137.4 277.4 137.2 277.6 136.9 C 277.9 136.6 278.0 136.3 278.0 135.9 L 278.0 116.3 L 285.8 116.3 L 285.8 135.9 C 285.8 138.4 285.1 140.4 283.8 141.7 C 282.5 143.0 280.4 143.6 277.6 143.6 "/><path d="M 294.7 124.0 L 300.6 124.0 C 300.6 123.5 300.5 123.0 300.3 122.6 C 300.1 122.1 299.7 121.8 299.3 121.5 C 298.8 121.3 298.3 121.1 297.6 121.1 C 297.1 121.1 296.6 121.3 296.2 121.5 C 295.7 121.8 295.4 122.1 295.1 122.6 C 294.9 123.0 294.7 123.5 294.7 124.0 M 298.0 137.4 C 295.8 137.4 293.9 136.9 292.3 136.1 C 290.7 135.2 289.4 134.0 288.5 132.4 C 287.6 130.8 287.1 129.0 287.1 126.9 C 287.1 124.9 287.5 123.1 288.4 121.4 C 289.2 119.8 290.4 118.4 292.0 117.4 C 293.5 116.4 295.4 115.9 297.6 115.9 C 299.9 115.9 301.8 116.3 303.3 117.3 C 304.8 118.2 305.9 119.5 306.7 121.1 C 307.4 122.7 307.8 124.6 307.8 126.6 L 307.8 128.4 L 294.8 128.4 C 294.7 129.2 294.9 129.9 295.1 130.4 C 295.4 131 295.8 131.3 296.2 131.6 C 296.7 131.8 297.2 131.9 297.8 131.9 C 298.5 131.9 299.1 131.8 299.7 131.5 C 300.2 131.3 300.7 130.7 301.0 129.9 L 307.9 129.9 C 307.7 131.5 307.1 132.8 306.1 133.9 C 305.1 135.0 303.9 135.9 302.4 136.5 C 301.0 137.1 299.5 137.4 298.0 137.4 "/><path d="M 106.9 69.6 L 103.1 69.6 L 103.1 77.0 L 106.9 77.0 Z M 106.9 69.6 "/><path d="M 106.9 87.7 L 106.9 80.2 L 103.1 80.2 L 103.1 82.2 L 88.6 82.2 L 88.6 87.7 Z M 106.9 87.7 "/><path d="M 84.4 82.2 L 78.0 82.2 L 78.0 87.7 L 84.4 87.7 Z M 84.4 82.2 "/><path d="M 54.5 95.0 L 54.5 107.6 L 62.0 107.6 L 62.0 95.0 Z M 54.5 95.0 "/><path d="M 84.5 99.4 L 84.5 91.9 L 78.0 91.9 L 78.0 94.8 L 78.1 94.8 L 78.1 95.0 L 66.1 95.0 L 66.1 99.4 Z M 84.5 99.4 "/><path d="M 84.5 102.6 L 66.1 102.6 L 66.1 107.6 L 78.0 107.6 L 78.0 110.1 L 84.5 110.1 Z M 84.5 102.6 "/><path d="M 88.6 91.9 L 88.6 110.2 L 96.1 110.2 L 96.1 91.9 Z M 88.6 91.9 "/><path d="M 99.4 91.9 L 99.4 110.2 L 106.9 110.2 L 106.9 91.9 Z M 99.4 91.9 "/><path d="M 106.9 114.4 L 88.6 114.4 L 88.6 120.2 L 103.1 120.2 L 103.1 121.9 L 106.9 121.9 Z M 106.9 114.4 "/><path d="M 106.9 125.1 L 103.1 125.1 L 103.1 132.6 L 106.9 132.6 Z M 106.9 125.1 "/><path d="M 78.0 114.3 L 78.0 120.2 L 84.4 120.2 L 84.4 114.3 Z M 78.0 114.3 "/><path d="M 152.7 87.7 L 152.7 82.2 L 134.4 82.2 L 134.4 87.7 Z M 152.7 87.7 "/><path d="M 119.5 87.7 L 119.5 69.6 L 112.0 69.6 L 112.0 87.7 Z M 119.5 87.7 "/><path d="M 130.2 87.7 L 130.2 82.2 L 128.4 82.2 L 128.4 82.2 L 128.3 82.2 L 128.3 69.6 L 122.7 69.6 L 122.7 87.7 Z M 130.2 87.7 "/><path d="M 111.9 99.4 L 130.3 99.4 L 130.3 91.9 L 111.9 91.9 Z M 111.9 99.4 "/><path d="M 111.9 110.1 L 130.3 110.1 L 130.3 102.6 L 111.9 102.6 Z M 111.9 110.1 "/><path d="M 134.4 91.9 L 134.4 110.2 L 141.9 110.2 L 141.9 91.9 Z M 134.4 91.9 "/><path d="M 145.2 91.9 L 145.2 110.2 L 152.7 110.2 L 152.7 91.9 Z M 145.2 91.9 "/><path d="M 134.4 114.4 L 134.4 120.2 L 152.7 120.2 L 152.7 114.4 Z M 134.4 114.4 "/><path d="M 112.0 114.3 L 112.0 132.7 L 119.5 132.7 L 119.5 114.3 Z M 112.0 114.3 "/><path d="M 122.7 114.3 L 122.7 132.7 L 128.3 132.7 L 128.3 120.2 L 130.2 120.2 L 130.2 114.3 Z M 122.7 114.3 "/><path d="M 176.0 99.4 L 176.0 94.9 L 157.7 94.9 L 157.7 99.4 Z M 176.0 99.4 "/><path d="M 157.7 102.6 L 157.7 107.5 L 176.0 107.5 L 176.0 102.6 Z M 157.7 102.6 "/></g></svg>';
  var menu = document.querySelector(".menu");
  if (!menu) return;
  if (!menu.querySelector(".menu__marca")) {
    var marca = document.createElement("a");
    marca.className = "menu__marca"; marca.href = "index.html";
    marca.setAttribute("aria-label", "La Pampa Teje, inicio");
    marca.innerHTML = LOGO;
    menu.insertBefore(marca, menu.firstChild);
  }
  var tick = false;
  function estado() { tick = false; menu.classList.toggle("is-scroll", window.scrollY > 24); }
  window.addEventListener("scroll", function () { if (!tick) { tick = true; requestAnimationFrame(estado); } }, { passive: true });
  estado();
})();

(function () {
  "use strict";

  /* Menú móvil: abre y cierra el panel a pantalla completa */
  var boton = document.querySelector(".menu__boton");
  var panel = document.getElementById("panel");
  if (!boton || !panel) return;

  function setOpen(open) {
    boton.setAttribute("aria-expanded", String(open));
    panel.classList.toggle("is-open", open);
    panel.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
  }

  boton.addEventListener("click", function () {
    setOpen(boton.getAttribute("aria-expanded") !== "true");
  });
  panel.addEventListener("click", function (e) {
    if (e.target.closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setOpen(false);
  });
  window.matchMedia("(min-width: 861px)").addEventListener("change", function (mq) {
    if (mq.matches) setOpen(false);
  });
})();

/* ---------- Guionado en español para textos justificados ----------
   Inserta guiones blandos (U+00AD) según la silabeo del español, así el
   justificado reparte mejor los espacios y no se forman «ríos». */
(function () {
  "use strict";
  var SEL = ".ini-pres__texto p, .ini-muestra__texto p, .ini-saber blockquote, .historia__seccion > p, .libro p, .premiada__mas p, " +
    ".tej-cab p, .mu-cols p, .tej__bio, .tej__destacado, .proc-cab p, .mu-intro, .tenido__cab p, .proc-carac__texto p, .planta__mas > span, " +
    ".catalogo__intro, .creditos__intro, .sede__nota, .mu-desplegables p, .mu-desplegables li, .mu-desc, .mu-sede p, .tenido__pasos li, .tenido__otras, .historia__nota";
  var V = "aeiouáéíóúü", FUERTE = "aeoáéíóú";
  var GRUPO = /^(pl|bl|fl|gl|cl|kl|pr|br|fr|gr|cr|kr|dr|tr|ch|ll|rr)$/;
  function esV(c) { return V.indexOf(c) !== -1; }
  function silabas(w) {
    var s = w.toLowerCase(), n = s.length, cortes = [], i = 0, nucleos = [];
    // núcleos vocálicos (respetando qu/gu + e/i y diptongos)
    while (i < n) {
      if (esV(s[i]) && !((s[i] === "u") && i > 0 && (s[i - 1] === "q" || s[i - 1] === "g") && "eéií".indexOf(s[i + 1] || "") !== -1)) {
        var ini = i; i++;
        while (i < n && esV(s[i])) {
          var a = s[i - 1], b = s[i];
          if (FUERTE.indexOf(a) !== -1 && FUERTE.indexOf(b) !== -1) { nucleos.push([ini, i]); cortes.push(i); ini = i; }
          i++;
        }
        nucleos.push([ini, i]);
      } else i++;
    }
    for (var k = 0; k < nucleos.length - 1; k++) {
      var fin = nucleos[k][1], sig = nucleos[k + 1][0];
      if (fin === sig) continue; // hiato ya cortado
      var cons = s.slice(fin, sig).replace(/([qg])u$/, "$1");
      var L = cons.length, p;
      if (L === 1) p = fin;
      else if (L === 2) p = GRUPO.test(cons) ? fin : fin + 1;
      else if (L === 3) p = GRUPO.test(cons.slice(1)) ? fin + 1 : fin + 2;
      else p = GRUPO.test(cons.slice(2)) ? fin + 2 : fin + 3;
      cortes.push(p);
    }
    return cortes.sort(function (x, y) { return x - y; });
  }
  function guionar(w) {
    if (w.length < 7) return w;
    var c = silabas(w).filter(function (p) { return p >= 3 && p <= w.length - 3; }), out = "", last = 0;
    c.forEach(function (p) { out += w.slice(last, p) + "­"; last = p; });
    return out + w.slice(last);
  }
  function procesar(el) {
    var tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null), nodo, lista = [];
    while ((nodo = tw.nextNode())) lista.push(nodo);
    lista.forEach(function (t) {
      t.nodeValue = t.nodeValue.replace(/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]{7,}/g, guionar);
    });
  }
  function correr() { /* desactivado: el sitio va sin guiones */ }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", correr); else correr();
})();

/* ---------- Recorrido: enlace a la página siguiente al final de cada página ---------- */
(function () {
  "use strict";
  var ORDEN = [["index.html", "Inicio"], ["historia.html", "Historia"], ["tejedoras.html", "Tejedoras"], ["piezas.html", "Piezas"],
    ["proceso.html", "Proceso"], ["muestra.html", "Muestras"], ["curaduria.html", "Curaduría"], ["contacto.html", "Contacto"]];
  var actual = (location.pathname.split("/").pop() || "index.html");
  var i = ORDEN.map(function (o) { return o[0]; }).indexOf(actual);
  var pie = document.getElementById("pie");
  if (i < 1 || i >= ORDEN.length - 1 || !pie) return;
  var sig = ORDEN[i + 1], a = document.createElement("a");
  a.className = "siguiente"; a.href = sig[0];
  a.innerHTML = '<span class="siguiente__etq">Siguiente</span><span class="siguiente__nom"></span><span class="siguiente__flecha" aria-hidden="true">→</span>';
  a.querySelector(".siguiente__nom").textContent = sig[1];
  pie.parentNode.insertBefore(a, pie);
  document.body.classList.add("con-siguiente");
})();

/* ---------- Al entrar a una página, empezar siempre desde arriba ----------
   (salvo que el enlace apunte a un lugar puntual, por ejemplo tejedoras.html#nombre) */
(function () {
  "use strict";
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  function arriba() { if (!location.hash) window.scrollTo(0, 0); }
  arriba();
  window.addEventListener("load", arriba);
  window.addEventListener("pageshow", function (e) { if (e.persisted) arriba(); });
})();
