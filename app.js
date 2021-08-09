// ------------- 基本設定-------------
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const app = express()
const routes = require('./routes')
const session = require('express-session')
const usePassport = require('./config/passport')
const PORT = process.env.PORT || 3000
require('./config/mongoose')

// ------------ 設定使用-------------
app.engine('handlebars', exphbs({
  defaultLayout: 'main', helpers: {
    isEqual: function (arg1, arg2) {
      return arg1 === arg2
    }
  }
}
))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
usePassport(app)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated
  res.locals.user = req.user
  next()
})

// ------------- 路由&回應-------------
app.use(routes)

//--------------啟動並監聽伺服器-------------
app.listen(PORT, () => {
  console.log(`The server is running in http://localhost:${PORT}`)
})