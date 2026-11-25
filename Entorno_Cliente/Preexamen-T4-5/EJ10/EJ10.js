/*
10 · Validación personalizada con la API del
navegador
1,50 pt
<form id="alta" novalidate>
 <input id="alias" required pattern="[A-Za-z][A-Za-z0-9_]{3,11}">
 <button type="submit">Crear cuenta</button>
</form>
<p id="resultado"></p>
En submit, evita la recarga. Primero limpia cualquier error
personalizado anterior con setCustomValidity(""). Tras trim(), asigna el
valor limpio al campo. Si es «admin», ignorando mayúsculas,
establece un error personalizado. Usa checkValidity(): si falla, muestra
validationMessage y enfoca el campo; si cumple, muestra «
*/

const form = document.getElementById("alta");
const aliasInput = document.getElementById("alias");
const resultado = document.getElementById("resultado");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    aliasInput.setCustomValidity("");
    aliasInput.value = aliasInput.value.trim();

    if (aliasInput.value.toLowerCase() === "admin") {
        aliasInput.setCustomValidity("El alias no puede ser 'admin'");
    }
    if (!aliasInput.checkValidity()) {
        resultado.textContent = aliasInput.validationMessage;
        aliasInput.focus();
    } else {
        resultado.textContent = "Alias válido";
    }
});