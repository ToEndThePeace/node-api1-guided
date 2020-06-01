// Import Express
const express = require("express");

// Create a Server
const app = express();

// Middleware
app.use(express.json());

let lessons = [
  {
    id: 1,
    name: "Lesson 1",
  },
  {
    id: 2,
    name: "Lesson 2",
  },
];

let hubs = [
  {
    id: 1,
    name: "Building APIs With Express",
    lessonId: 1,
    cohort: "Web 30",
  },
  {
    id: 2,
    name: "Server Routing With Express",
    lessonId: 2,
    cohort: "Web 30",
  },
];

// Create a function to handle GET requests to /
app.get("/", (req, res) => {
  res.status(200).json({ message: "Success" });
});
app.get("/hubs", (req, res) => {
  const q = hubs.map((x) => {
    return {
      ...x,
      lesson: lessons[x.lessonId - 1],
    };
  });
  res.status(200).json(q);
});
app.get("/lessons", (req, res) => {
  res.status(200).json(lessons);
});
app.post("/hubs", (req, res) => {
  const hub = req.body;
  hubs.push({ id: hubs.length + 1, ...hub });
  res.status(201).json(hubs);
});
app.post("/lessons", (req, res) => {
  const lesson = req.body;
  lessons.push({ id: lessons.length + 1, ...lesson });
  res.status(201).json(lessons);
});
app.delete("/hubs/:id", (req, res) => {
  const { id } = req.params;
  hubs = hubs.filter((x) => x.id != id);
  res.status(200).json(hubs);
});
app.put("/hubs/:id", (req, res) => {
  const { id } = req.params;
  const info = req.body;
  hubs = hubs.map((x) => {
    if (x.id == id) {
      return {
        ...x,
        ...info,
        id: x.id
      };
    } else {
      return x;
    }
  });
  res.status(201).json(hubs);
});

// Listen for incoming requests
const port = 8000;
app.listen(port, () => console.log(`\n == API on port ${port} == \n`));
