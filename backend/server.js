import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/retroApp";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();

// User model using schema to be reusable
const UserSchema = mongoose.Schema({
  name: String,
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  },
});

const User = mongoose.model("User", UserSchema);

const RoleSchema = mongoose.Schema({
  description: String,
});

const Role = mongoose.model("Role", RoleSchema);

// Thoughts using schema to be reusable
const RetroSchema = mongoose.Schema({
  description: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userId",
  },
});

const Retro = mongoose.model("Retro", RetroSchema);

const ThoughtSchema = mongoose.Schema({
  description: String,
  retroId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "retroId",
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
  const { description, userId } = req.body;

  try {
    const queriedUserId = await userId.findById(userId);
    const newRetro = await new Retro({
      description,
      userId: queriedUserId,
    }).save();

    res.status(201).json({ response: newRetro, success: true });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

app.post("/thoughts", async (req, res) => {
  const { description, retroId } = req.body;

  try {
    const queriedRetroId = await Retro.findById(retroId);
    const newThought = await new Thought({
      description,
      retroId: queriedRetroId,
    }).save();

    res.status(201).json({ response: newThought, success: true });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

// Get request

app.get("/thought/:thoughtId", async (req, res) => {
  const { thoughtId } = req.params;

  const thought = await Thought.findById(thoughtId).populate("retro");
  res.status(200).json({ response: thought, success: true });
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
