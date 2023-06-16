const form = document.querySelector<HTMLFormElement>('.form')
const range = document.querySelector<HTMLInputElement>('#range')
const numberText = document.querySelector<HTMLParagraphElement>('.number')
const passwordText = document.querySelector<HTMLInputElement>('#password')
const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
const rangeProccess = document.querySelector<HTMLDivElement>('.range__process')
const checkActive = document.querySelectorAll<HTMLDivElement>('.check-active')

let numberRange: number = 1

interface typeLettersObject {
    type: string,
    view: string,
    activo: boolean
}

let typeLettersArray: typeLettersObject[] = [
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
]

checkboxes.forEach( (checkItem,index) => {
   checkItem.addEventListener('change',() => {
        
    if (checkItem.checked) {
        checkActive[index].style.opacity = '1'
        return        
    }
    checkActive[index].style.opacity = '0'

   })

});



form?.addEventListener('submit', (e: Event): void => {
    e.preventDefault()

    if (!Array.from(checkboxes).some(item => item.checked)) return

    typeLettersArray = typeLettersArray.map(letters => letters.activo ? {
        type: letters.type,
        view: letters.view,
        activo: false
    } : letters)

    checkboxes.forEach((box) => {

        if (box.checked) {

            typeLettersArray = typeLettersArray.map(letters => letters.type !== box.name ? letters : {
                type: letters.type,
                view: letters.view,
                activo: true
            })

            console.log(box.checked);


        }
    });


    console.log(typeLettersArray);

    generatePassword(numberRange, typeLettersArray);



})

rangeProccess!.style.width = `${numberRange * 5}%`

range?.addEventListener('input', (): void => {
    numberText!.textContent = range.value.toString()
    numberRange = Number(range.value)

    rangeProccess!.style.width = `${numberRange * 5}%`



})



function generatePassword(wordLenght: number, arrayLetters: typeLettersObject[]) {

    const array: typeLettersObject[] = arrayLetters.filter(letters => letters.activo && letters) // filtro

    let password: string = ''

    for (let index = 0; index < wordLenght; index++) {
        let indexTypeLetters: number = Math.floor(Math.random() * array.length) //index del tipo de letra: 0.uppercase,1.lowercase...
        let lettersSpaces: string[] = array[indexTypeLetters].view.split('') // obtiene un arreglo con letrar con espacios ['a','b',...]
        let indexLetter = Math.floor(Math.random() * lettersSpaces.length - 1) + 1 // indice de la letra:  [0] = 'a'
        password += lettersSpaces[indexLetter]
    }

    passwordText!.value = password


}



