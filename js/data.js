/* Datos del proyecto. Todo lo que cambia (precios, cuotas, contacto) está aquí. */
window.TAD = {
  // Dirección a la que se envían los leads (webhook de Zapier, Airtable, Formspree...).
  // Mientras esté vacío, el formulario valida y entrega el PDF pero no guarda el lead.
  LEAD_ENDPOINT: "",
  DOSSIER_URL: "assets/dossier-the-arts-district.pdf",
  AED_PER_EUR: 4.25,          // tipo de cambio orientativo para el equivalente en euros
  YIELD_MADRID: 0.03,         // rentabilidad neta estimada Madrid
  YIELD_DUBAI_MIN: 0.08,      // peor escenario
  YIELD_DUBAI_TARGET: 0.11,   // expectativa

  units: [
    { id: "estudio", nombre: "Estudio", sqft: 370, m2: 34, precio: 525000, cuota: 2500, plano: "assets/img/plano-estudio.jpg",
      distrib: "Zona de dormitorio, cocina, baño y balcón" },
    { id: "1dorm", nombre: "1 dormitorio", sqft: 756, m2: 70, precio: 850000, cuota: 4250, plano: "assets/img/plano-1dorm.jpg",
      distrib: "Salón-comedor, cocina, dormitorio, baño, aseo y balcón" },
    { id: "2dorm", nombre: "2 dormitorios", sqft: 1240, m2: 115, precio: 1300000, cuota: 5200, plano: "assets/img/plano-2dorm.jpg",
      distrib: "Salón-comedor, cocina, dos dormitorios, dos baños y balcón en esquina" }
  ],

  // Calendario 60/40. h = hito (pago destacado).
  fechas: [
    ["31 dic 2026", 1], ["31 ene 2027"], ["28 feb 2027"], ["31 mar 2027"], ["30 abr 2027"], ["31 may 2027"],
    ["30 jun 2027", 1], ["31 jul 2027"], ["31 ago 2027"], ["30 sep 2027"], ["31 oct 2027"], ["30 nov 2027"],
    ["31 dic 2027", 1], ["31 ene 2028"], ["29 feb 2028"], ["31 mar 2028"], ["30 abr 2028"], ["31 may 2028"],
    ["30 jun 2028", 1], ["31 jul 2028"], ["31 ago 2028"], ["30 sep 2028"], ["31 oct 2028", 1], ["A la entrega", 1]
  ],
  planes: {
    estudio: {
      pct: [20, .5, .5, .5, .5, .5, 5, .5, .5, .5, .5, .5, 10, .5, .5, .5, .5, .5, 10, .5, .5, .7, 6, 40],
      aed: [105000, 2500, 2500, 2500, 2500, 2500, 26250, 2500, 2500, 2500, 2500, 2500, 52500, 2625, 2625, 2625, 2625, 2625, 52500, 2625, 2625, 3875, 31500, 210000]
    },
    "1dorm": {
      pct: [20, .5, .5, .5, .5, .5, 5, .5, .5, .5, .5, .5, 10, .5, .5, .5, .5, .5, 10, .5, .5, .5, 6, 40],
      aed: [170000, 4250, 4250, 4250, 4250, 4250, 42500, 4250, 4250, 4250, 4250, 4250, 85000, 4250, 4250, 4250, 4250, 4250, 85000, 4250, 4250, 4250, 51000, 340000]
    },
    "2dorm": {
      pct: [20, .4, .4, .4, .4, .4, 5, .4, .4, .4, .4, .4, 10, .5, .5, .5, .5, .5, 10, .5, .5, .5, 7, 40],
      aed: [260000, 5200, 5200, 5200, 5200, 5200, 65000, 5200, 5200, 5200, 5200, 5200, 130000, 6500, 6500, 6500, 6500, 6500, 130000, 6500, 6500, 6500, 91000, 520000]
    }
  },

  distancias: [
    ["Meydan Racecourse", 10], ["Dubai Creek Harbour", 14], ["Aeropuerto Internacional DXB", 15],
    ["Burj Khalifa y Dubai Mall", 17], ["Museum of the Future", 20], ["Palm Jumeirah", 35]
  ],

  acum: function (id) {
    var a = 0, out = this.planes[id].pct.map(function (p) { a = Math.round((a + p) * 10) / 10; return a; });
    if (id === "estudio") out[21] = 54;
    out[22] = 60; out[23] = 100;
    return out;
  },
  fmt: function (n) { return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); },
  eur: function (aed) { return Math.round(aed / this.AED_PER_EUR / 500) * 500; },
  eur10: function (aed) { return Math.round(aed / this.AED_PER_EUR / 10) * 10; },
  pct: function (p) { return p.toString().replace(".", ",") + " %"; }
};
