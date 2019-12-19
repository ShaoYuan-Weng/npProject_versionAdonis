# npProject_versionAdonis
C'est l'implémentation du projet npProject avec le framework nodejs Adonis.

## Structures des bases de données (mySQL)
### User
| Field        | Type           | Null  | Key   |Default|Extra  |
| -------------|:--------------:|:-----:|:------:|:------:|:------:|
| id           | INT        |   NO  | PRI   | NULL  |AUTO_INCREMENT  |
| username     | VARCHAR       |   NO  |       | NULL  |       |
| email        | VARCHAR    |   NO  |       | NULL  |       |
| address       | VARCHAR    |   NO  |       | NULL  |       |
| phone       | VARCHAR    |   NO  |       | NULL  |       |
| password     | VARCHAR    |   NO  |       | NULL  |       |

### Post
| Field        | Type           | Null  | Key   |Default|Extra  |
| -------------|:--------------:|:-----:|:------:|:------:|:------:|
| id           | INT        |   NO  | PRI   | NULL  |AUTO_INCREMENT  |
| user_id           | INT        |   NO  |    | NULL  |  |
| title     | VARCHAR       |   NO  |       | NULL  |       |
| description    | VARCHAR    |   NO  |       | NULL  |       |
| author       | VARCHAR    |   NO  |       | NULL  |       |
| date       | VARCHAR    |   NO  |       | NULL  |       |

### Token
| Field        | Type           | Null  | Key   |Default|Extra  |
| -------------|:--------------:|:-----:|:------:|:------:|:------:|
| id           | INT        |   NO  | PRI   | NULL  |AUTO_INCREMENT  |
| user_id           | INT        |   NO  |    | NULL  |  |
| type     | VARCHAR       |   NO  |       | NULL  |       |
| is_revoked    | VARCHAR    |   NO  |       | NULL  |       |
| token       | VARCHAR    |   NO  |       | NULL  |       |
| updated_at       | date    |   NO  |       | NULL  |       |
| created_at       | date    |   NO  |       | NULL  |       |

## Outils utilisés

* Nodejs avec le framework [Adonis](https://adonisjs.com/)
* [Persona](https://github.com/adonisjs/adonis-persona)

## Hébergement
* [Heroku](https://www.heroku.com/)

## Structures des fichiers

* **entry-point:** start/app.js
* **route:** start/routes.js
* **controllers:** app/Controllers
* **validate:** app/Validators
* **error-handling:** app/Exceptions/Handler.js
