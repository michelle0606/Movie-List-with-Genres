
(function () {
    // 變數宣告
    const genres = {
        "1": "Action",
        "2": "Adventure",
        "3": "Animation",
        "4": "Comedy",
        "5": "Crime",
        "6": "Documentary",
        "7": "Drama",
        "8": "Family",
        "9": "Fantasy",
        "10": "History",
        "11": "Horror",
        "12": "Music",
        "13": "Mystery",
        "14": "Romance",
        "15": "Science Fiction",
        "16": "TV Movie",
        "17": "Thriller",
        "18": "War",
        "19": "Western"
      }
    const BASE_URL = 'https://movie-list.alphacamp.io'
    const INDEX_URL = BASE_URL + '/api/v1/movies/'
    const POSTER_URL = BASE_URL + '/posters/'
    const genresList = document.getElementById("genres-list")
    const dataPanel = document.getElementById("movie-display")
    let movies = []
    let filterData = []

    let obj = {}
    for (let i in genres) { //看不懂就跟著迴圈跑一次
        obj[i] = genres[i] //記得不是 obj = genres[i] 
        genresList.innerHTML += `
        <li class="nav-item">
            <a class="nav-link" href="#" data-id="${i}">${obj[i]}</a>
        </li>
        `
    }

    function filterMovie (id) {
        filterData = movies
        filterData = filterData.filter( item => {
            return item.genres.includes(id)
        })
        displayMovie (filterData)
    }

    function displayMovie (filterData) {
        let htmlContent = ''
        filterData.map( item => { 
            htmlContent += `
            <div class="d-inline-block col-3">
                <div class="card">
                    <img src="${POSTER_URL}${item.image}" class="card-img-top" alt="${item.title}">
                    <div class="card-body px-1 text-center">
                        <h5 class="card-title">${item.title}</h5>
                    </div>
                    <div class="card-footer alert-light px-3">
            `
            for (value of item.genres) {
                htmlContent += `
            <small class="text-muted fz-3 d-inline-block alert-dark p-1 mr-1 my-1">#${genres[value]}</small>
            `
            }

            htmlContent += `
                    </div>
                </div>
            </div>
            `
        })
        dataPanel.innerHTML = htmlContent
    }


    function clearActive() {
        const list = document.querySelectorAll('.nav-link')
        list.forEach(x => x.classList.remove('active')) //forEach不會額外回傳值，只單純執行每個陣列內的物件或值。
    }

    axios.get(INDEX_URL)
        .then(response => {
            movies.push(...response.data.results)
        }).catch(function(error){
            console.log(error)
    })

 

    
    genresList.onclick = e => {
        e.preventDefault()
      
        clearActive()
        e.target.closest('.nav-link').classList.add('active')
        targetGenres = Number(e.target.dataset.id)
        filterMovie(targetGenres) 
    }
})()