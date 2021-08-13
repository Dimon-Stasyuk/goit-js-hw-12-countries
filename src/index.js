import './sass/main.scss';
import cardTemplate from './cardTemplate.hbs'
import cards from './menu.json'

const menuListRef = document.querySelector('.js-menu')
const themeSwitchRef = document.querySelector('.theme-switch__toggle')

darkThemeCheck()

menuListRef.insertAdjacentHTML('beforeend', cardTemplate(cards))

themeSwitchRef.addEventListener('click',onThemeSwitch)


function darkThemeCheck() {
    if (localStorage.getItem('dark-mode') === 'true') {
    document.body.classList.add('dark-theme')
    themeSwitchRef.checked = true
}
}

function onThemeSwitch(event) {
    document.body.classList.toggle('dark-theme')
    localStorage.setItem('dark-mode', event.target.checked)  
}