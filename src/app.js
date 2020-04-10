const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  let { title, url, techs } = request.body
  if (isUuid(uuid())) {
    let repository = {
      id: uuid(),
      title,
      url,
      techs,
      likes: 0
    }
    repositories.push(repository)
    return response.json(repository)
  }
  else return response.status(400).json({ error: 'Invalid ID'} )
});

app.put("/repositories/:id", (request, response) => {
  let { id } = request.params
  let { title, url, techs } = request.body
  let repoIndex = repositories.findIndex(repo => repo.id === id)
  if (repoIndex >= 0) {
    repositories[repoIndex].title = title
    repositories[repoIndex].url = url
    repositories[repoIndex].techs = techs
    return response.json(repositories[repoIndex])
  }
  else return response.status(400).json({ error: 'ID not found'} )
});

app.delete("/repositories/:id", (request, response) => {
  let { id } = request.params
  let repoIndex = repositories.findIndex(repo => repo.id === id)
  if (repoIndex >= 0) {
    repositories.splice(repoIndex, 1)
    return response.status(204).send()
  }
  else return response.status(400).json({ error: 'ID not found' })
});

app.post("/repositories/:id/like", (request, response) => {
  let { id } = request.params
  let repoIndex = repositories.findIndex(repo => repo.id === id)
  if (repoIndex >= 0) {
    repositories[repoIndex].likes +=1
    return response.json(repositories[repoIndex])
  }
  else return response.status(400).json({ error: 'ID not found' })
});

module.exports = app;
