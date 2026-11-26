# The Arts District by Binghatti · Webs de captación (España)

Tres versiones de la misma web de captación de leads para el proyecto **The Arts District by Binghatti** (Dubái), en español y pensadas para el inversor español e hispano. Las tres tienen el mismo contenido y los mismos datos; cambian el diseño, las imágenes y la paleta.

| Versión | Archivo | Estilo |
|---|---|---|
| A · Atardecer | `index.html` | Marrón, terracota y crema. Serif elegante. |
| B · Mañana | `b.html` | Blanco y gris con azul cobalto. Limpia, tipo informe. |
| C · Noche | `c.html` | Casi negro con dorado arena. Lujo nocturno. |

Capturas de cómo se ve cada una en el móvil, de arriba abajo, en la carpeta [`capturas/`](capturas).

Es una web estática: HTML, CSS y JavaScript sin dependencias ni paso de compilación. Se puede alojar en cualquier sitio que sirva archivos.

## Qué tiene cada web

- Portada con el edificio, titular y precio desde.
- Cifras clave: precio desde, cuota mensual, 60/40, rentabilidad 8–11 %+, 0 % impuestos.
- Galería, el proyecto, ubicación y tiempos en coche.
- Comparativa Madrid vs Dubái (Madrid tachado) y calculadora de rentabilidad.
- Precios por tipología (estudio, 1 y 2 dormitorios): euros primero y dirham debajo, reserva con un 10 % y cuota mensual.
- Plan de pago 60/40 interactivo por tipología.
- Preguntas frecuentes.
- Formulario que pide nombre, teléfono (WhatsApp) y email a cambio del dossier en PDF, repetido en varios puntos y en una ventana desde cada botón.

## Estructura

```
index.html, b.html, c.html   Las tres versiones
dossier.html                 Fuente del dossier PDF
css/                         Una hoja de estilos por versión (styles.css = A)
js/data.js                   Precios, cuotas, tipo de cambio, rentabilidades, distancias
js/main.js                   Lógica común: precios, calculadora, plan de pago y formularios
assets/img/                  Imágenes del proyecto
assets/dossier-the-arts-district.pdf   Dossier que se descarga al dejar los datos
capturas/                    Capturas en móvil de las tres versiones
```

Para cambiar un precio, una cuota o el tipo de cambio, se edita solo `js/data.js` y cambia en las tres versiones.

## Verla en local

Con Python instalado, desde la carpeta del proyecto:

```bash
python3 -m http.server 4173
```

Y abrir `http://localhost:4173/` (A), `http://localhost:4173/b.html` (B) y `http://localhost:4173/c.html` (C).

## Publicarla con dominio propio

1. **Elegir la versión** que será la principal. Si no es la A, renombrar ese archivo a `index.html` (y mover o borrar los otros).
2. **Alojarla.** Cualquiera de estas opciones sirve y tiene plan gratuito:
   - **Netlify** o **Vercel**: “Importar proyecto” desde este repositorio de GitHub. No hace falta configurar nada (sin comando de compilación, carpeta de publicación = raíz).
   - **GitHub Pages**: Settings → Pages → rama `main`, carpeta raíz. En cuentas gratuitas exige que el repositorio sea público.
3. **Comprar el dominio** (por ejemplo en Namecheap, GoDaddy, Cloudflare o el propio Netlify/Vercel) y apuntarlo al alojamiento siguiendo las instrucciones de “Custom domain” del servicio elegido. El certificado HTTPS lo ponen ellos solos.

## Pendiente antes de lanzar

- **Recepción de los leads.** Ahora el formulario valida los datos y descarga el dossier, pero los datos no se guardan en ningún sitio. Hay que poner una URL en `LEAD_ENDPOINT` dentro de `js/data.js` (un webhook de Zapier/Make, Google Apps Script, un formulario de Netlify, el CRM…). La web envía por POST un JSON con nombre, teléfono, email, tipología, origen del botón, proyecto, fecha y página.
- **Dossier PDF.** El PDF actual todavía muestra el plan de pago mes a mes con la entrada del 20 % y los planos. Revisarlo para que cuente lo mismo que la web.
- **Fecha de lanzamiento.** Los textos hablan del lanzamiento del 28 de noviembre de 2026; actualizarlos cuando pase esa fecha.
- **Tipo de cambio.** Los euros se calculan con 1 € = 4,25 AED (`AED_PER_EUR` en `js/data.js`), un valor orientativo. Revisarlo.
- **Rentabilidad de Madrid.** El 3 % neto de la comparativa es una estimación (`YIELD_MADRID`).
- **Analítica y píxeles** (Google Analytics, Meta Pixel…) y aviso de cookies, si se van a usar anuncios.
