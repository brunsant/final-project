import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/retroApp";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();

// User model
const UserSchema = mongoose.Schema({
  name: String,
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  },
});

const User = mongoose.model("User", UserSchema);

// Role model
const RoleSchema = mongoose.Schema({
  description: String,
});

const Role = mongoose.model("Role", RoleSchema);

// Retro model - initiate retro + add participants (patch request)
const RetroSchema = mongoose.Schema({
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Retro = mongoose.model("Retro", RetroSchema);

// Thought model
const ThoughtSchema = mongoose.Schema({
  description: String,
  retro: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Retro",
  },
});

const Thought = mongoose.model("Thought", ThoughtSchema);

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Final Project - Backend");
});

//User POST GET Request
// Post requests
app.post("/role", async (req, res) => {
  const { description } = req.body;

  try {
    const newRole = await new Role({ description }).save();
    res.status(201).json({ response: newRole, success: true });
  } catch (error) {
    res.status(400).json({
      response: error,
      success: false,
    });
  }
});

app.post("/user", async (req, res) => {
  const { name, role } = req.body;

  try {
    const queriedRole = await Role.findById(role);
    const newUser = await new User({ name, role: queriedRole }).save();

    res.status(201).json({ response: newUser, success: true });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

// Get request

app.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId).populate("role");
  res.status(200).json({ response: user, success: true });
});

//Thoughts POST GET Request
// Post requests
app.post("/retro", async (req, res) => {
  const { description, user } = req.body;

  try {
    const queriedUser = await User.findById(user);
    const newRetro = await new Retro({
      description,
      user: queriedUser,
      participants: [],
    }).save();

    res.status(201).json({ response: newRetro, success: true });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

app.patch("/retro/:retroid/participants", async (req, res) => {
  const { participant } = req.body;
  const { retroid } = req.params;

  try {
    const queriedParticipant = await User.findById(participant);
    const updatedRetro = await Retro.findByIdAndUpdate(retroid, {
      $addToSet: {
        participants: queriedParticipant,
      },
    });
    if (updatedRetro) {
      res.status(201).json({ response: updatedRetro, success: true });
    } else {
      res.status(404).json({ response: "retro not found", succes: false });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

app.post("/retro/:retro/thoughts", async (req, res) => {
  const { description, retro } = req.body;

  try {
    const queriedRetro = await Retro.findById(retro);
    const newThought = await new Thought({
      description,
      retro: queriedRetro,
    }).save();

    res.status(201).json({ response: newThought, success: true });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

// Get request

app.get("/thoughts", async (req, res) => {
  const thought = await Thought.find(req.query);
  res.status(200).json({ response: thought, success: true });
});

app.get("/thoughts/:thoughtId", async (req, res) => {
  const { thoughtId } = req.params;

  const thought = await Thought.findById(thoughtId).populate("retro");
  res.status(200).json({ response: thought, success: true });
});

app.get("/retro/:retro/thoughts", async (req, res) => {
  try {
    const retroThoughts = await Thought.find({ retro: req.params.retro });
    if (retroThoughts) {
      res.json(retroThoughts);
    } else {
      res.status(404).json({ error: "No retro found with that id" });
    }
  } catch (err) {
    res.status(400).json({ error: "Invalid id" });
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
