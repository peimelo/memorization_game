# Memorization Game

Memorization game is for you to test your knowledge by dragging the items to their proper places.

This project was built with [Ruby on Rails](https://rubyonrails.org/) as API and [Angular](https://angular.io/) as frontend.

## Backend

<table>
  <tr>
    <td>Ruby</td>
    <td>
      3.0.0
    </td>
  </tr>
  <tr>
    <td>Rails</td>
    <td>
      6.1.1
    </td>
  </tr>
  <tr>
    <td>Database</td>
    <td>
      PostgreSQL
    </td>
  </tr>
</table>

The [ancestry](https://github.com/stefankroes/ancestry) gem is responsible for creating
the tree when a file is imported and when we `GET /api/categories/:id`.

## Configuration

```bash
git clone https://github.com/peimelo/memorization_game.git
cd memorization_game

# installation of dependencies
bundle install

# creation of database and tables
rails db:create
rails db:migrate

# run the project
rails s
```

The backend will be available in `http://localhost:3000`.

## Configuration for Production

```bash
# delete the config/credentials.yml.enc file
rm config/credentials.yml.enc

# run the command to create credentials and master key (replace 'code' if you don't use VSCode)
EDITOR="code --wait" bin/rails credentials:edit
```

Add the information below in the [credentials](https://guides.rubyonrails.org/security.html#custom-credentials) to configure:

- `token`: used for the `update`, `destroy` and `import` actions of
  [`CategoriesController`](/app/controllers/api/categories_controller.rb).
  Add a token with at least 10 characters in the `Authorization` header.
  You can use some client api for these actions, for example, [Insomnia](https://insomnia.rest).
- `gmail(user_name/password)`: Information from your email provider used by
  [Exception Notification](https://github.com/smartinez87/exception_notification) gem
  to send an exception notification if an error occurs.
- `exception_recipients`: Email address that will receive notification if an application error occurs.

```yml
# ... your content above

token: your_token_with_at_least_10_characters

gmail:
  user_name: your@gmail.com
  password: your_password

exception_recipients: exceptions@example.com
```

Save and close the `config/credentials.yml.enc` file.

If you want to use another email provider, change it in the file
`config/environments/production.rb`.

To configure [Exception Notification](https://github.com/smartinez87/exception_notification), change it in the file
`config/initializers/exception_notification.rb`.

To configure [CORS](https://github.com/cyu/rack-cors) `origins`, change it in the file
`config/initializers/cors.rb`.

## API Endpoint

| Endpoints                        | Usage                                                               | Params                     |
| -------------------------------- | ------------------------------------------------------------------- | -------------------------- |
| `GET /api/categories`            | Get all of the categories.                                          |                            |
| `GET /api/categories/:id`        | Get the details of a single category.                               |                            |
| \* `PUT /api/categories/:id`     | Edit the details of an existing category.                           | **name**: [String]         |
| \* `DELETE /api/categories/:id`  | Remove the category.                                                |                            |
| \* `POST /api/categories/import` | Import a file that will mount the tree used by a memorization game. | **file**: [Multipart Form] |

\*This endpoint needs the `Authorization` header.

Some examples of files to import in `db/data`.

## Frontend

The frontend source code is inside the [frontend](/frontend) folder.
