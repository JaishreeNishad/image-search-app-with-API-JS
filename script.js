// ----imported all the element from inside our index.html file to inside our script file----------


const accesKey = "c9yBYUr7POTHGpniwZpdTYVr9CopXYhK3LTQzFW8HLk"
const formEl = document.querySelector("form")
const inputEl = document.getElementById("search-input")
const searchResults = document.querySelector(".search-results")
const showMore = document.getElementById("show-more-button")


let inputData = "" // this input data will store all the keywords which the user is typing inside this
let page = "1"; //  the default page no will be 1 if a user click on show more button then page no willbe increased//

async function searchImages(){
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesKey}`

    const response = await fetch(url)
    const data = await response.json()

    const results = data.results

    if (page === 1){
        searchResults.innerHTML = ""
    }

    results.map((result)=>{
        const imageWrapper = document.createElement('div')
        imageWrapper.classList.add("search-result")
        const image = document.createElement('img')
        image.src = result.urls.small
        image.alt = result.alt_description
        const imageLink = document.createElement('a')
        imageLink.href = result.links.html
        imageLink.target = '_blank'
        imageLink.textContent = result.alt_description


        imageWrapper.appendChild(image)
        imageWrapper.appendChild(imageLink)
        searchResults.appendChild(imageWrapper)
    
    });

    page++
    if(page >1){
        showMore.style.display = "block"
    }
}

formEl.addEventListener("submit", (event)=>{
    event.preventDefault()
    page = 1;
    searchImages();
});

showMore.addEventListener("click",()=>{
    searchImages();
})

