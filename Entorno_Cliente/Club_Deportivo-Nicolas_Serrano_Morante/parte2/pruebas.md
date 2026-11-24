# Pruebas finales e integración — Parte 2 (Tema 5B)

## Ejecución de pruebas
- **Automatizadas (`parte2/pruebas.js`)**: se ejecutan automáticamente al abrir `parte2/index.html` (ver consola del navegador) o mediante `node parte2/pruebas.js`.
- **Integración**: verificadas directamente sobre los formularios de `parte2/index.html`.

## Resultados de pruebas
| Regla / Bloque | Entrada | Resultado esperado | Resultado obtenido |
| :--- | :--- | :--- | :--- |
| Nombre y normalización | `"  Ana   López  "` / `"Ana2 López"` / límites 3, 4, 50, 51 | `"Ana López"` válido y guardado normalizado; `"Ana2 López"`, 3 y 51 fallan. | Cumplido |
| Usuario (2 repeticiones) | `"ana77"` válido; `"7ana7"` y `"ana_7"` inválidos; límites 4, 5, 20, 21 | Mismo booleano en ambas pasadas (sin `lastIndex`). | Cumplido |
| Contraseña (2 repeticiones) | `"Clave_12"` válida; `"1Clave_2"` y `"Clave-12"` inválidas; límites 7, 8, 16, 17 | Mismo booleano en ambas pasadas; sin `trim()`. | Cumplido |
| Teléfono y códigos | `"+34 612 345 678"` vs `"34 612 345 678"`, `"+34612345678"`, `"+34 512 345 678"`, `"+34 612 345 6789"`; `"DEP-007"`, `"CITA-0001"` vs `"dep-007"`, `"XCITA-0001"`, `"RES-001"` | Solo los formatos exactos superan la validación. | Cumplido |
| Métodos de texto | `"Hay 12 clases y 3 pistas"`, texto sin cifras, `""`, `"club, salud,, verano"` | `["12", "3"]`, `[]`, `[]` y `["club", "salud", "verano"]`. | Cumplido |
| Integración con Parte 1 | Regex correctas pero edad `17` o archivo PNG | El formulario rechaza el envío hasta corregir edad y JPEG. | Cumplido |
| Demo JS vs `pattern` | Vacío, `"DEP-007"` y `"XDEP-007"` en sección 6 | Vacío activa `valueMissing`; `"XDEP-007"` activa `patternMismatch`; `"DEP-007"` supera ambos. | Cumplido |
