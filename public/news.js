/*
let articles = document.getElementById('articles')

fetch('https://newsapi.org/v2/everything?q=handicraft&apiKey=5e6d33528ade4d2d9e262df704ed8f09')
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {
    console.log(data)
    for (let i = 0; i < data.articles.length; i++) {
      articles.innerHTML +=
        `<div class="col-sm-6 col-md-4 item"><a href="${data.articles[i].url}"><img class="img-fluid" src="${data.articles[i].urlToImage}"></a><h3 class="name">${data.articles[i].title}</h3><p class="description">${data.articles[i].description.substring(0, 255)}...</p></div>`
    }
  })
  */

new Vue ({
  el: '#app',
  data: {
    articles: [],
    oldArticles: [],
    input: ''
  },
  watch: {
    input: function () {
      if (this.input === "") {
        this.clearInput()
      } else {
        this.articles = this.articles.filter((item) => item.title.toLowerCase().includes(this.input.toLowerCase()))
      }
    }
  },
  created () {
    axios.get('https://newsapi.org/v2/everything?q=handicraft&apiKey=5e6d33528ade4d2d9e262df704ed8f09')
      .then((response) => {
        for (let i = 0; i < response.data.articles.length; i++) {
          let article = {}
          const img = response.data.articles[i].urlToImage === null ? 'blank.jpg' : response.data.articles[i].urlToImage
          article.url = response.data.articles[i].url
          article.img = img
          article.title = response.data.articles[i].title
          article.description = response.data.articles[i].description
          this.articles.push(article)
          this.oldArticles.push(article)
        }
      })
  },
  methods: {
    clearInput: function () {
      this.articles = this.oldArticles
    }
  }
})
