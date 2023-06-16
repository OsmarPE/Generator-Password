"use strict";
const form = document.querySelector('.form');
const range = document.querySelector('#range');
const numberText = document.querySelector('.number');
const passwordText = document.querySelector('#password');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const rangeProccess = document.querySelector('.range__process');
const checkActive = document.querySelectorAll('.check-active');
let numberRange = 1;
let typeLettersArray = [
    {
        type: 'uppercase',
        view: 'ABCDEFGHIJKLMNOPQRST',
        activo: false
    },
    {
        type: 'lowercase',
        view: 'abcdefghijklmnopqrstuvwxyz',
        activo: false
    },
    {
        type: 'numbers',
        view: '1234567890',
        activo: false
    },
    {
        type: 'symbols',
        view: '!@#$%^&*()',
        activo: false
    }
];
checkboxes.forEach((checkItem, index) => {
    checkItem.addEventListener('change', () => {
        if (checkItem.checked) {
            checkActive[index].style.opacity = '1';
            return;
        }
        checkActive[index].style.opacity = '0';
    });
});
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!Array.from(checkboxes).some(item => item.checked))
        return;
    typeLettersArray = typeLettersArray.map(letters => letters.activo ? {
        type: letters.type,
        view: letters.view,
        activo: false
    } : letters);
    checkboxes.forEach((box) => {
        if (box.checked) {
            typeLettersArray = typeLettersArray.map(letters => letters.type !== box.name ? letters : {
                type: letters.type,
                view: letters.view,
                activo: true
            });
            console.log(box.checked);
        }
    });
    console.log(typeLettersArray);
    generatePassword(numberRange, typeLettersArray);
});
rangeProccess.style.width = `${numberRange * 5}%`;
range === null || range === void 0 ? void 0 : range.addEventListener('input', () => {
    numberText.textContent = range.value.toString();
    numberRange = Number(range.value);
    rangeProccess.style.width = `${numberRange * 5}%`;
});
function generatePassword(wordLenght, arrayLetters) {
    const array = arrayLetters.filter(letters => letters.activo && letters); // filtro
    let password = '';
    for (let index = 0; index < wordLenght; index++) {
        let indexTypeLetters = Math.floor(Math.random() * array.length); //index del tipo de letra: 0.uppercase,1.lowercase...
        let lettersSpaces = array[indexTypeLetters].view.split(''); // obtiene un arreglo con letrar con espacios ['a','b',...]
        let indexLetter = Math.floor(Math.random() * lettersSpaces.length - 1) + 1; // indice de la letra:  [0] = 'a'
        password += lettersSpaces[indexLetter];
    }
    passwordText.value = password;
}
