const photosInner = document.querySelector('.photos-inner')
const searchInput = document.getElementById('search')
const searchBtn = document.getElementById('search-btn')
let scrollAmount = 0
const scrollStep = 0.5
const scrollInterval = 16
let autoScrollInterval

function getData(query) {
    let url
    if (!query) {
        url = 'https://api.unsplash.com/search/photos?query=spring&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo'
    } else {
        url = `https://api.unsplash.com/search/photos?query=${query}&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo`
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            photosInner.innerHTML = '';
            data.results.forEach(photo => {
                const img = document.createElement('img')
                img.src = photo.urls.regular
                img.alt = photo.alt_description || 'Image from Unsplash'
                photosInner.appendChild(img)
            })
            duplicateImages()
        })
        .catch(error => console.error(error))
}
function duplicateImages() {
    const photosHTML = photosInner.innerHTML
    photosInner.innerHTML += photosHTML
    resetScroll()
}
function autoScroll() {
    scrollAmount += scrollStep
    photosInner.style.transform = `translateX(-${scrollAmount}px)`
    if (scrollAmount >= photosInner.scrollWidth / 2) {
        scrollAmount = 0
        photosInner.style.transition = 'none'
        photosInner.style.transform = 'translateX(0)'
        setTimeout(() => {
            photosInner.style.transition = 'transform 0.1s linear'
        }, 20)
    }
}
function resetScroll() {
    scrollAmount = 0
    photosInner.style.transform = 'translateX(0)'
    clearInterval(autoScrollInterval)
    autoScrollInterval = setInterval(autoScroll, scrollInterval)
}
function searchQuery() {
    const query = searchInput.value
    getData(query)
}
searchBtn.addEventListener('click', searchQuery);
window.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') searchQuery()
})
getData()
autoScrollInterval = setInterval(autoScroll, scrollInterval)