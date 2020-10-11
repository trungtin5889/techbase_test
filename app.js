const path = require('path')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const logger = require('morgan')
//const querystring = require('querystring')
const helmet = require('helmet')

// Load environment variables using dotenv
require('dotenv').config({ path: 'variables.env' })

//const helpers = require('./helpers')
//const { translate, initializeTranslations, setFallbackLocale } = require('./i18n/i18n')
//const breadcrumb = require('./lib/breadcrumb')
//const { updateCookie } = require('./lib/cookies')

const routes = require('./routes/index')
//const { getSpace, getLocales } = require('./services/contentful')
//const { catchErrors } = require('./handlers/errorHandlers')

//const SETTINGS_NAME = 'theExampleAppSettings'

const app = express()
//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

// View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Force all requests on production to be served over https
app.use(function (req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https' && process.env.NODE_ENV === 'production') {
    const secureUrl = 'https://' + req.hostname + req.originalUrl
    res.redirect(302, secureUrl)
  }
  next()
})

//app.use(breadcrumb())

// Initialize the route handling
// Check ./routes/index.js to get a list of all implemented routes
app.use('/', routes)

// Catch 404 and forward to error handler
/* app.use(function (request, response, next) {
  const err = new Error(translate('errorMessage404Route', response.locals.currentLocale.code))
  err.status = 404
  next(err)
}) */

// Error handler
app.use(function (err, request, response, next) {
  // Set locals, only providing error in development
  response.locals.error = err
  response.locals.error.status = err.status || 500
  if (request.app.get('env') !== 'development') {
    delete err.stack
  }
  response.locals.title = 'Error'
  // Render the error page
  response.status(err.status || 500)
  response.render('error')
})

module.exports = app
