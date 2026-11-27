#!/bin/sh
# Pone tu dominio en todo el SEO (canonical, Open Graph, datos estructurados, sitemap, robots).
# Uso:  ./set-domain.sh midominio.com
[ -z "$1" ] && { echo "Uso: ./set-domain.sh midominio.com"; exit 1; }
D=$(printf '%s' "$1" | sed -e 's#^https*://##' -e 's#/*$##')
cd "$(dirname "$0")" || exit 1
for f in index.html robots.txt sitemap.xml; do
  [ -f "$f" ] && sed -i.bak "s#https://TU-DOMINIO\.com#https://$D#g" "$f" && rm -f "$f.bak"
done
echo "Dominio puesto: https://$D  ·  ahora: git commit -am 'Dominio' && git push"
