const numeros = [-4, -2,-8,-1,-3,-6];

let multiplicador = 1;
let maximo = numeros[0];
let suma = 0;
let media;

for (let i = 0; i < numeros.length; i++){
    multiplicador *= numeros[i];


    if (numeros[i] > maximo){
        maximo = numeros[i];
    }

    suma += numeros[i]  
}
media = suma / numeros.length;
console.log(multiplicador);
console.log(`El mayor es: ${maximo}`);
console.log(`La media es: ${media}`);
