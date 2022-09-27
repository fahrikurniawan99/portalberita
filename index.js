const loading = document.getElementById("loading")

window.onload = () => {
  loading.classList.toggle("d-none")
  trendingNews()
}

document.getElementById("btnSearch").onclick = () => {
  loading.classList.toggle("d-none")
  searchNews()
}

const trendingNews = () => {
  const url = "https://newsapi.org/v2/top-headlines?country=id&apiKey=630ae0f6a29f463393f7762eca548831"
  getNews(url)
}

const keyword = document.getElementById("searchKey")
const searchNews = () => {
  const url = `https://newsapi.org/v2/everything?q=${keyword.value}&from=2022-09-27&sortBy=popularity&apiKey=630ae0f6a29f463393f7762eca548831`
  if (keyword.value.length !== 0) {
    getNews(url)
  }else{
    trendingNews()
  }
}

const getNews = async (url) => {
  const res = await fetch(url)
  const json = await res.json()
  displayCard(json)
}

const displayCard = (json) => {
  const articles = json.articles
  const row = document.getElementById("row")
  let card = ""

  if (json.totalResults !== 0) {
      articles.forEach(article => {
      const publish = new Date(article.publishedAt)
      const date = publish.toLocaleDateString()
      card += `
      <div class="col">
        <div class="card shadow h-100">
          <img
            src=${article.urlToImage}
            alt=""
            srcset=""
            class="card-img-top"
            height="200px"
            style="object-fit: cover"
          />
          <div class="card-body">
            <h5 class="card-title">${article.title}</h5>
            <p class="card-text">
              ${article.description}
            </p>
          </div>
          <div class="card-footer d-flex justify-content-between">
            <small class="text-muted">${article.author}</small>
            <small class="text-muted">${date}</small>
          </div>
        </div>
      </div>
      `
    })
  }else{
    card += `
      <div class="col-12">
        <div class="alert alert-danger" role="alert">
          Menampilkan ${json.totalResults} dari ${keyword.value}.
        </div>          
      </div>
    `
  }

  loading.classList.toggle("d-none")
  row.innerHTML = card 
}