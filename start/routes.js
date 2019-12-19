'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Route.on('/').render('platform')
Route.get('/', 'NavbarController.platform')
Route.get('/news', 'NavbarController.news')
Route.get('/profile', 'NavbarController.profile').middleware('auth')
Route.get('/create', 'NavbarController.create').middleware('guest')
Route.get('/login', 'NavbarController.login').middleware('guest')
Route.post('/login', 'LoginController.login')
Route.get('/logout', 'LoginController.logout')
Route.resource('users', 'UserController').middleware(new Map([
  [['update', 'destroy'], ['auth']]
])).validator(new Map([
  [['users.store'], ['StoreUser']],
  [['users.update'], ['UpdateUser']]
]))
Route.resource('posts', 'PostController').middleware('auth').validator(new Map([
  [['posts.update'], ['StorePost']]
]))
Route.get('/forget', 'LoginController.forgetForm').middleware('guest')
Route.post('/forget', 'LoginController.forget')
Route.get('/reset/:token', 'LoginController.resetForm').middleware('guest')
Route.post('/reset/:token', 'LoginController.reset')
Route.get('/change/:username', 'LoginController.changeShow').middleware('auth')
Route.post('/change/:username', 'LoginController.change').middleware('auth')
Route.post('/uploads/:title/', 'UploadController.upload')
Route.get('/:title', 'NavbarController.post')
