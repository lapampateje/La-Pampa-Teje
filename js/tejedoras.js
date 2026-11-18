/* Tejedoras: índice + biografías, cruzadas con las piezas del catálogo */
(function () {
  var T = window.TEJEDORAS || [], P = (window.PIEZAS || []).filter(function (p) { return !p.anexo && !p.oculta; });
  var indice = document.getElementById("tej-indice");
  var lista = document.getElementById("tej-lista");
  if (!indice || !lista) return;

  function el(tag, cls, txt) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt != null) e.textContent = txt;
    return e;
  }

  function listaPremios(arr) {
    var box = el("details", "tej__premios");
    box.appendChild(el("summary", "tej__sub", "Distinciones (" + arr.length + ")"));
    var ul = el("ul");
    arr.forEach(function (r) { ul.appendChild(el("li", null, r)); });
    box.appendChild(ul);
    return box;
  }

  T.forEach(function (t) {
    var piezas = P.filter(function (p) { return p.slug === t.slug; });
    var loc = piezas.length ? piezas[0].localidad : "";

    var li = el("li"), a = el("a", null, t.nombre);
    a.href = "#" + t.slug;
    li.appendChild(a); indice.appendChild(li);

    var art = el("article", "tej");
    art.id = t.slug;

    /* Sin retratos todavía: se muestra la foto principal de una de sus piezas */
    var conFoto = piezas.filter(function (p) { return p.foto; })[0];
    var fig = el("figure", "tej__foto");
    if (conFoto) {
      var fa = el("a"); fa.href = "piezas.html#p" + conFoto.id;
      var img = el("img");
      img.src = conFoto.foto; img.loading = "lazy";
      img.alt = conFoto.titulo + " de " + conFoto.artesana;
      fa.appendChild(img);
      fig.appendChild(fa);
      var cap = el("figcaption"), ca = el("a", null, conFoto.titulo + " →");
      ca.href = fa.href; cap.appendChild(ca); fig.appendChild(cap);
    }
    art.appendChild(fig);

    var txt = el("div", "tej__texto");
    var h = el("h2", "tej__nombre", t.nombre);
    txt.appendChild(h);
    if (loc) txt.appendChild(el("p", "tej__loc", loc));
    txt.appendChild(el("p", "tej__bio", t.bio));
    if (t.destacado) txt.appendChild(el("p", "tej__destacado", t.destacado));
    if (t.reconocimientos && t.reconocimientos.length) txt.appendChild(listaPremios(t.reconocimientos));

    var otras = piezas.filter(function (p) { return p !== conFoto; });
    if (otras.length) {
      txt.appendChild(el("h3", "tej__sub", "Otras piezas en la muestra"));
      var ul = el("ul", "tej__piezas");
      otras.forEach(function (p) {
        var li2 = el("li"), a2 = el("a");
        a2.href = "piezas.html#p" + p.id;
        if (p.foto) {
          var im = el("img"); im.src = p.foto; im.loading = "lazy"; im.alt = "";
          a2.appendChild(im);
        }
        a2.appendChild(el("span", null, p.titulo));
        li2.appendChild(a2); ul.appendChild(li2);
      });
      txt.appendChild(ul);
    }
    art.appendChild(txt);
    lista.appendChild(art);
  });

  /* Llegada directa desde una ficha (tejedoras.html#slug) */
  if (location.hash) {
    var d = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (d) setTimeout(function () { d.scrollIntoView(); }, 0);
  }
})();
