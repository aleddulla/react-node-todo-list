const express = require("express");
const router = express.Router();
const userService = require('./models/user.service');
const Role = require('./_helpers/role');
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 4200;
const db = require("./models/");
const cors = require("cors");
var task = [];

app.use(cors());
app.use(bodyParser.json());

function success(res, payload) {
  return res.status(200).json(payload);
}

app.post("/tasks/users/authenticate", async (req, res, next) => {
	console.log('Hello', req.body);
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
});

app.get("/tasks", async (req, res, next) => {
  try {
	  console.log(task);
    return success(res, task);
  } catch (err) {
    next({ status: 400, message: "failed to get todos" });
  }
});

app.post("/tasks", (req, res, next) => {
  try {
	  console.log(req.body.task);
    var newTask = req.body.task;
    task.push(newTask);
    return success(res, task);
  } catch (err) {
    next({ status: 400, message: "failed to create todo" });
  }
});

app.delete("/tasks/:id", async (req, res, next) => {
  try {
	console.log(req.params.id);
    task = task.filter(function(item) {
    return item.id != req.params.id;
	});
    return success(res, task, "todo deleted!");
  } catch (err) {
    next({ status: 400, message: "failed to delete todo" });
  }
});

app.use((err, req, res, next) => {
  return res.status(err.status || 400).json({
    status: err.status || 400,
    message: err.message || "there was an error processing request"
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
