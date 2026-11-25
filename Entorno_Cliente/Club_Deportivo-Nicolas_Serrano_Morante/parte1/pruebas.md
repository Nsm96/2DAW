# Pruebas de verificación — Parte 1 (Tema 5A)

## Instrucciones de apertura
1. Abre `parte1/index.html` con **Live Server** en VS Code o directamente en tu navegador.
2. Abre la consola (`F12` → **Consola**) y verifica que no hay errores.
3. Para la captura de varios errores simultáneos: deja vacío el formulario **1. Formulario de socios** y pulsa **Registrar socio** (o **Intro**).

## Casos de prueba realizados
| Categoría | Caso de prueba | Entrada | Resultado esperado | Resultado obtenido |
| :--- | :--- | :--- | :--- | :--- |
| Obligatoriedad y textos | Formulario vacío | Todos los campos vacíos | Errores bajo cada campo, `aria-invalid="true"` y foco en `#socio-nombre`. | Correcto |
| Obligatoriedad y textos | Solo espacios en nombre | `"     "` | Error de obligatoriedad tras `trim()`. | Correcto |
| Obligatoriedad y textos | Límites de longitud | `"AB"` (2), `"Spa"` (3), 50 y 51 chars | 2 y 51 fallan; 3 y 50 válidos. | Correcto |
| Números | Edad vacía, 17, 18, 18.5, 101 | `""`, `17`, `18`, `18.5`, `101` | Solo `18` es válido (`Number.isInteger` rechaza `18.5`). | Correcto |
| Números | Duración | `14`, `15`, `20`, `30` | `15` y `30` válidos; `14` y `20` rechazados. | Correcto |
| Números | Precio | `""`, `-1`, `0`, `12.345` | `0` válido; vacío, negativo y 3 decimales (`stepMismatch`) rechazados. | Correcto |
| Archivos | Sin archivo, PNG, JPEG 5 MB, JPEG > 5 MB | Ninguno, `foto.png` (`image/png`, 95 KB), `ok.jpg` (`image/jpeg`, `5.000.000` B), `grande.jpg` (`image/jpeg`, `5.000.001` B) | Solo `ok.jpg` válido (`<= 5.000.000` bytes). | Correcto |
| Fechas y selecciones | Noticia ayer, hoy y mañana | Ayer, hoy local, mañana local | Solo mañana es válido (comparación local `YYYY-MM-DD`). | Correcto |
| Fechas y selecciones | Cita pasada y futura | -5 min y +1 hora respecto a `Date.now()` | Solo futura válida. | Correcto |
| Fechas y selecciones | Selects sin cambiar y checkboxes | Opción `""` y casillas sin marcar | Error en selects y casillas obligatorias; publicación opcional queda privada. | Correcto |
| Eventos | Corrección, Intro, cambio de clave y edición post-envío | Corregir campos tras fallo, enviar con `Enter`, cambiar contraseña tras confirmarla, editar tras envío válido | Errores desaparecen al corregir; confirmación se revalida; resumen previo se limpia al editar. | Correcto |

## Qué debe validar de nuevo el servidor en una aplicación real
La validación en cliente mejora la experiencia de usuario pero puede eludirse desactivando JavaScript o enviando peticiones HTTP manipuladas. El servidor debe volver a comprobar:
1. Presencia, longitud tras recortar espacios, tipos y rangos numéricos/temporales respecto al reloj del servidor.
2. Contraseñas sin recortar espacios y almacenadas con *hash* seguro (nunca en texto plano).
3. Archivos subidos: verificar el tamaño máximo real en recepción, inspeccionar la cabecera binaria (*magic bytes*) para confirmar que es un JPEG auténtico (no confiar en `file.type` ni en la extensión), renombrar el fichero y guardarlo fuera de directorios ejecutables.
