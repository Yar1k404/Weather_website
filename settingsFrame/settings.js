const checkboxValue = document.getElementById('switch')
const switchTemp = document.getElementById('switchTemperature')

document.addEventListener('keydown', (ev) => {
    if (ev.code === 'Enter') {
        let cityInputFromSettings = document.getElementById('cityInput').value
        let temporaryCity = cityInputFromSettings
        localStorage.setItem('city', temporaryCity)
        window.open('../mainFrame/main.html', '_self')
        fetchData()
    }
})

const checkboxSave = () => {
    checkboxValue.addEventListener('click', () => {
        localStorage.setItem('switch', checkboxValue.checked)
    })

    switchTemp.addEventListener('click', () => {
        localStorage.setItem('switchTemperature', switchTemp.checked)
    })

    let checked = JSON.parse(localStorage.getItem("switch"))
    let checkedTemp = JSON.parse(localStorage.getItem("switchTemperature"))
    document.getElementById("switch").checked = checked
    document.getElementById("switchTemperature").checked = checkedTemp
}

checkboxSave()