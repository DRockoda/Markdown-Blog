const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const db = require('./config/key').MongoURI
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

mongoose.connect( db, { useNewUrlParser:true , useCreateIndex: true , useUnifiedTopology: true} 
  ).then(() =>
      console.log('mongodb connected...')
  ).catch((e)=>
      console.log(e)
  )

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT,console.log(`server is up on port ${PORT}`))