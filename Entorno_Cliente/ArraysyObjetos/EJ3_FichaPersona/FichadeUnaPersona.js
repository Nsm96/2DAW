const persona = {
    nombre: "Laura",
    edad: 24,
    profesion: "Desarrolladora",

    describir: function(){
        return `Nombre: ${this.nombre}, Edad: ${this.edad}, Profesión: ${this.profesion}`;
    }
}

console.log(persona.nombre);
console.log(persona.edad);
console.log(persona.profesion);
console.log(persona.describir());

persona.edad = 25;
console.log(persona.describir());