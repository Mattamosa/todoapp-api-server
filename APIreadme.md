# TODO App API Documentation

## URL: `http://localhost:3000`

### Endpoints:

#### 1. `GET /todos`
- **Description**: Retrieve all TODOs.
- **Response**: Returns an array of all TODOs in JSON format.

#### 2. `POST /todos`
- **Description**: Create a new TODO.
- **Request Body**:
  - `title`: (required) string - The title of the TODO.
  - `description`: (optional) string - A description of the TODO.
  - `category`: (required) string - The category the TODO belongs to.
- **Response**: Returns the created TODO object in JSON format.

#### 3. `PUT /todos/:id`
- **Description**: Update an existing TODO by its ID.
- **Request Body**:
  - `title`: (optional) string - The updated title of the TODO.
  - `description`: (optional) string - The updated description of the TODO.
  - `category`: (optional) string - The updated category of the TODO.
- **Response**: Returns the updated TODO object in JSON format.

#### 4. `DELETE /todos/:id`
- **Description**: Delete a TODO by its ID.
- **Response**: Returns a success message in JSON format.

#### 5. `GET /todos/category/:category`
- **Description**: Retrieve all TODOs that belong to a specific category.
- **Response**: Returns an array of TODOs in the specified category in JSON format.

#### 6. `GET /categories`
- **Description**: Retrieve all available categories.
- **Response**: Returns an array of category names in JSON format.

#### 7. `POST /categories`
- **Description**: Create a new category.
- **Request Body**:
  - `name`: (required) string - The name of the new category.
- **Response**: Returns a success message in JSON format.

#### 8. `PUT /categories/:category`
- **Description**: Update an existing category's name.
- **Request Body**:
  - `newName`: (required) string - The updated name for the category.
- **Response**: Returns a success message in JSON format.

#### 9. `DELETE /categories/:category`
- **Description**: Delete a category and all associated TODOs.
- **Response**: Returns a success message in JSON format.

