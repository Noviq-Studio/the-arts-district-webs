# The Arts District · versión C · Noche

Rama `web-noche` del repositorio `Noviq-Studio/the-arts-district-webs`. Contiene solo esta web, lista para Hostinger: `index.html` está en la raíz.

Esta versión lleva `noindex`: se puede abrir y compartir (anuncios, pruebas), pero Google no la indexa para no competir con la principal (rama `web-atardecer`), que tiene los mismos textos. Para indexarla, cambia `noindex, follow` por `index, follow` en `index.html`.

## Publicar en Hostinger

1. hPanel → **Sitios web** → tu dominio → **Avanzado → GIT**.
2. Repositorio: `https://github.com/Noviq-Studio/the-arts-district-webs.git`
3. Rama: `web-noche`
4. Directorio: déjalo vacío (se instala en `public_html`, que debe estar vacío).
5. Pulsa **Crear** y después **Implementar**. Activa la implementación automática si quieres que cada cambio en GitHub se publique solo.

Sin Git: descarga la rama en ZIP desde GitHub y sube su contenido a `public_html` con el Administrador de archivos (incluido `.htaccess`).

## Poner el dominio

El SEO usa el marcador `https://TU-DOMINIO.com`. Cuando tengas el dominio:

```
./set-domain.sh midominio.com
git commit -am "Dominio" && git push
```

## Pendiente antes de lanzar

- `js/data.js` → `LEAD_ENDPOINT` está vacío: el formulario entrega el PDF pero no guarda el lead.
- La fecha de lanzamiento («28 de noviembre») aparece en la portada y en el cierre.
- Analítica: hay un hueco marcado en el `<head>` de `index.html`.
