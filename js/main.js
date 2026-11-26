(function () {
  "use strict";
  var T = window.TAD, $ = function (s, r) { return (r || document).querySelector(s); },
      $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- Contenido generado desde data.js ---------- */
  var base = T.units[0];
  function put(sel, txt) { $$(sel).forEach(function (el) { el.textContent = txt; }); }
  put("[data-precio]", T.fmt(T.eur(base.precio)) + " €");
  put("[data-precio-aed]", "AED " + T.fmt(base.precio));
  put("[data-cuota]", T.fmt(T.eur10(base.cuota)) + " €");
  put("[data-cuota-aed]", "AED " + T.fmt(base.cuota));

  $("#distances").innerHTML = T.distancias.map(function (d) {
    return "<li><span>" + d[0] + "</span><b>" + d[1] + "<i>min</i></b></li>";
  }).join("");

  function fila(label, aed, eur) {
    return "<div><dt>" + label + "</dt><dd>" + T.fmt(eur) + " €<small>AED " + T.fmt(aed) + "</small></dd></div>";
  }
  $("#price-grid").innerHTML = T.units.map(function (u) {
    return '<article class="price"><div><h3>' + u.nombre + '</h3><p class="price-area">' + u.m2 + " m² · " + T.fmt(u.sqft) + " sq ft</p></div>" +
      '<div class="price-main"><small>Desde</small><b>' + T.fmt(T.eur(u.precio)) + " €</b><span>AED " + T.fmt(u.precio) + "</span></div>" +
      "<dl>" + fila("Reserva con un 10 %", u.precio * .1, T.eur(u.precio * .1)) + fila("Cuota mensual desde", u.cuota, T.eur10(u.cuota)) + "</dl>" +
      '<button class="link-cta" data-lead="precio-' + u.id + '" data-tipo="' + u.nombre + '">Pedir disponibilidad</button></article>';
  }).join("");

  /* ---------- Plan de pago 60 / 40 (resumen interactivo por tipología) ---------- */
  var planTabs = $("#plan-tabs");
  if (planTabs) {
    planTabs.setAttribute("role", "tablist");
    planTabs.innerHTML = T.units.map(function (u, i) {
      return '<button type="button" role="tab" aria-selected="' + (i === 0) + '" data-u="' + u.id + '">' + u.nombre + "</button>";
    }).join("");
    var setPlan = function (id) {
      var u = T.units.filter(function (x) { return x.id === id; })[0]; if (!u) return;
      var v = {
        nombre: u.nombre,
        precio: T.fmt(T.eur(u.precio)) + " €", "precio-aed": "AED " + T.fmt(u.precio),
        reserva: T.fmt(T.eur(u.precio * .1)) + " €", "reserva-aed": "AED " + T.fmt(u.precio * .1),
        cuota: T.fmt(T.eur10(u.cuota)) + " €", "cuota-aed": "AED " + T.fmt(u.cuota),
        obra: T.fmt(T.eur(u.precio * .6)) + " €", "obra-aed": "AED " + T.fmt(u.precio * .6),
        entrega: T.fmt(T.eur(u.precio * .4)) + " €", "entrega-aed": "AED " + T.fmt(u.precio * .4)
      };
      Object.keys(v).forEach(function (k) { put('[data-plan="' + k + '"]', v[k]); });
      $$("button", planTabs).forEach(function (b) { b.setAttribute("aria-selected", String(b.dataset.u === id)); });
      $$("[data-plan-lead]").forEach(function (b) { b.dataset.tipo = u.nombre; });
    };
    planTabs.addEventListener("click", function (e) { var b = e.target.closest("button[data-u]"); if (b) setPlan(b.dataset.u); });
    setPlan(T.units[0].id);
  }

  /* ---------- Calculadora ---------- */
  var range = $("#calc-range");
  // El deslizador va del precio del estudio al del 2 dormitorios, en euros.
  range.min = T.eur(T.units[0].precio);
  range.max = T.eur(T.units[T.units.length - 1].precio);
  range.step = 500;
  range.value = range.min;
  function calc() {
    var v = +range.value;
    $("#calc-amount").textContent = T.fmt(v) + " €";
    $("#calc-madrid").textContent = T.fmt(v * T.YIELD_MADRID) + " €";
    $("#calc-d8").textContent = T.fmt(v * T.YIELD_DUBAI_MIN) + " €";
    $("#calc-d11").textContent = T.fmt(v * T.YIELD_DUBAI_TARGET) + " €";
    $("#calc-diff").textContent = T.fmt(v * (T.YIELD_DUBAI_TARGET - T.YIELD_MADRID) * 10) + " €";
  }
  range.addEventListener("input", calc); calc();

  /* ---------- Barra superior: transparente sobre la portada, sólida después ---------- */
  var nav = $("#nav");
  function onScroll() { if (nav) nav.classList.toggle("is-solid", window.scrollY > window.innerHeight * .7); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Formularios de captación ---------- */
  var prefijos = [["+34", "España"], ["+52", "México"], ["+57", "Colombia"], ["+54", "Argentina"], ["+56", "Chile"], ["+51", "Perú"],
    ["+593", "Ecuador"], ["+58", "Venezuela"], ["+598", "Uruguay"], ["+507", "Panamá"], ["+506", "Costa Rica"], ["+1", "EE. UU. / R. Dominicana"],
    ["+971", "Emiratos"], ["+376", "Andorra"], ["+44", "Reino Unido"], ["+49", "Alemania"], ["+33", "Francia"], ["+41", "Suiza"]];
  $$('select[name="prefijo"]').forEach(function (s) {
    s.innerHTML = prefijos.map(function (p) { return '<option value="' + p[0] + '">' + p[0] + " " + p[1] + "</option>"; }).join("");
  });

  var modal = $("#lead-modal"), origen = "", lastFocus = null;
  function openLead(src, tipo) {
    origen = src || ""; lastFocus = document.activeElement;
    if (tipo) $("#m-tipo").value = tipo;
    modal.hidden = false; document.body.style.overflow = "hidden";
    setTimeout(function () { $("#m-nombre").focus(); }, 60);
  }
  function closeLead() { modal.hidden = true; document.body.style.overflow = ""; if (lastFocus) lastFocus.focus(); }
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-lead]");
    if (b) { e.preventDefault(); openLead(b.dataset.lead, b.dataset.tipo); return; }
    if (e.target.closest("[data-close]")) closeLead();
  });

  function download() {
    var a = document.createElement("a");
    a.href = T.DOSSIER_URL; a.download = "The-Arts-District-Dossier.pdf";
    document.body.appendChild(a); a.click(); a.remove();
  }

  $$("form.lead-form").forEach(function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var err = $(".form-error", f), bad = null;
      var nombre = f.nombre, tel = f.telefono, email = f.email;
      [nombre, tel, email].forEach(function (i) { i.classList.remove("bad"); });
      if (nombre.value.trim().length < 2) bad = [nombre, "Escribe tu nombre."];
      else if (tel.value.replace(/\D/g, "").length < 7) bad = [tel, "Revisa el teléfono: faltan dígitos."];
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) bad = [email, "Revisa el email: no parece completo."];
      if (bad) { bad[0].classList.add("bad"); bad[0].focus(); err.textContent = bad[1]; err.hidden = false; return; }
      err.hidden = true;
      var lead = {
        nombre: nombre.value.trim(), telefono: f.prefijo.value + " " + tel.value.trim(), email: email.value.trim(),
        tipologia: f.tipologia.value, origen: f.dataset.form === "modal" ? origen : f.dataset.form,
        proyecto: "The Arts District by Binghatti", fecha: new Date().toISOString(), pagina: location.href
      };
      if (T.LEAD_ENDPOINT) {
        fetch(T.LEAD_ENDPOINT, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=UTF-8" }, body: JSON.stringify(lead), keepalive: true }).catch(function () {});
      }
      $('button[type="submit"]', f).hidden = true;
      $(".form-done", f).hidden = false;
      download();
    });
  });

  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !modal.hidden) closeLead(); });
})();
