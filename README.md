This project is an api to evaluate students in a givan subject based on the skills they have.

The API requests are as follows:

- GET "/api/v1/student": Gets all the students available in the database.
- POST "/api/v1/student": Creates a student.
- GET "/api/v1/student/:id": Gets ones stuent info. Student id must be provided in params
- PATCH "/api/v1/student/:id": updates the student's information, Student id must be provided in params
- DELETE "/api/v1/student/:id": deletes student from database, Student id must be provided in params

  For the upper POST and PATCH requests, the request body must be as follows:
  {
    "name": String,
    "skills": [String]
  }
  an id is automatically generated upon creating a student

  - POST "api/v1/ai/evaluate": takes a subject and a student id and evaluates the student in that subject on a scale of 1 to 10. It uses openAI API so, an openAI API key must be provided. You can provide your api key n the dotenv file.

    The body of the above request is expected to be like this:
    {
      "subject": String,(The subject that the ai needs to evaluate the student at)
      "studentID" Number (The id of the student you want to evaluate )
    
    }
