# Proyecto UD5 — Club Deportivo: Formularios Fiables (DWEC 2.º DAW)

## Estructura del proyecto
- `parte1/`: versión funcional del Tema 5A (HTML5 + validación JS sin expresiones regulares ni `pattern`), con `index.html`, `estilos.css`, `app.js` y `pruebas.md`.
- `parte2/`: versión ampliada del Tema 5B con expresiones regulares, funciones puras en `validadores.js`, integración en `app.js`, pruebas automatizadas en `pruebas.js` y resultados en `pruebas.md`.

## Cómo abrir y probar
1. Abre `parte1/index.html` o `parte2/index.html` con **Live Server** o directamente en un navegador.
2. En `parte2/index.html`, abre la consola (`F12` → **Consola**) para ver el resultado de `pruebas.js` (también ejecutable con `node parte2/pruebas.js`).

## Memoria breve
1. **Explicación de cada patrón por partes**:
   - **Nombre socio**: `/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?: [A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/` (tras `trim().replace(/ +/g, " ")` y longitud 4–50). Anclas `^` y `$`, letras españolas incluidas tildes/ü/ñ (`+`) y grupo no capturante `(?: ...)*` con un único espacio ASCII separador.
   - **Usuario**: `/^[A-Za-z][A-Za-z0-9]{4,19}$/`. Empieza por letra ASCII (`[A-Za-z]`) y sigue con 4 a 19 letras ASCII o dígitos (total 5–20).
   - **Contraseña**: `/^[A-Za-z][A-Za-z0-9_]{7,15}$/`. Empieza por letra ASCII y sigue con 7 a 15 letras ASCII, dígitos o `_` (total 8–16, sin normalizar).
   - **Teléfono**: `/^\+34 [6-9][0-9]{2} [0-9]{3} [0-9]{3}$/` (tras `trim()` en extremos). Signo `+` escapado (`\+`), prefijo `34`, espacios literales, primer dígito nacional `[6-9]` y grupos de 2, 3 y 3 dígitos.
   - **Código de servicio**: `/^DEP-[0-9]{3}$/`. Prefijo literal `DEP-` y 3 dígitos exactos.
   - **Referencia de cita**: `/^(?:CITA|RES)-[0-9]{4}$/`. Alternativa agrupada sin captura entre `CITA` o `RES`, guion y 4 dígitos.
   - **Normalización / Búsqueda / Etiquetas**: `/ +/g` con `replace()` colapsa espacios; `/[0-9]+/g` con `match()` extrae cifras (`?? []`); `/,/` con `split()` separa etiquetas antes de `trim()` y filtrado.
2. **Banderas**: no se usa `g` ni `y` en `.test()` para evitar el estado mutable de `lastIndex` en llamadas repetidas, ni `m` para validar el campo completo de principio a fin. Sí se usa `g` en `replace()` y `match()` para actuar sobre todas las coincidencias.
3. **Formato vs significado**: un patrón garantiza la forma sintáctica (ej. `+34 612 345 678`), pero no demuestra que el teléfono exista o pertenezca al usuario, ni sustituye reglas semánticas como fechas futuras reales o verificación binaria de archivos en servidor.
4. **Por qué `pattern` no sustituye a `required` ni basta para todo**: un `<input pattern="...">` vacío se considera válido si no lleva `required`; además, `pattern` solo evalúa texto de una línea y no puede comprobar tamaños/MIME de archivos, aritmética de múltiplos (`duracion % 15 === 0`), igualdad entre contraseñas ni fechas futuras respecto al reloj actual.
5. **Flujo de validación de un campo**: al capturar `submit` se llama a `preventDefault()`, se limpia el estado anterior, se resetea `setCustomValidity("")`, se lee el valor según el tipo de control (`value`, `valueAsNumber`, `checked`, `files[0]`), se ejecutan las reglas y, si hay error, se marca `aria-invalid="true"`, se escribe el mensaje en `textContent` (`aria-describedby`) y se enfoca el primer campo erróneo.
