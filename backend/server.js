import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import crypto from "crypto"

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/retroApp"
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
mongoose.Promise = Promise

const port = process.env.PORT || 8080
const app = express()

// User model
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
  // role: {
  //   // type: mongoose.Schema.Types.ObjectId,
  //   ref: "Role",
  //   type: String,
  //   enum: ["Admin", "Participant"],
  // },
})

const User = mongoose.model("User", UserSchema)

// Role model
// const RoleSchema = mongoose.Schema({
//   description: String,
// })

// const Role = mongoose.model("Role", RoleSchema)

// Retro model - initiate retro + add participants (patch request)
const RetroSchema = mongoose.Schema({
  description: String,
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
})

const Retro = mongoose.model("Retro", RetroSchema)

// Thought model
const ThoughtSchema = mongoose.Schema({
  description: String,
  retro: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Retro",
  },
})

const Thought = mongoose.model("Thought", ThoughtSchema)

const ActionSchema = mongoose.Schema({
  description: String,

  retro: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Retro",
  },
})

const ActionItem = mongoose.model("ActionItem", ActionSchema)

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization")

  try {
    const user = await User.findOne({ accessToken })
    if (user) {
      next()
    } else {
      res.status(401).json({
        response: {
          message: "Please, log in",
        },
        success: false,
      })
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
}

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Final Project - Backend")
})

// POST  Requests
// Role
// app.post("/role", async (req, res) => {
//   const { description } = req.body
//   try {
//     const newRole = await new Role({ description }).save()
//     res.status(201).json({ response: newRole, success: true })
//   } catch (error) {
//     res.status(400).json({
//       response: error,
//       success: false,
//     })
//   }
// })
// User
app.post("/signup", async (req, res) => {
  const { username, password, role } = req.body

  try {
    const salt = bcrypt.genSaltSync()
    // const queriedRole = await Role.findById(role)
    const newUser = await new User({
      username: username.toLowerCase(),
      password: bcrypt.hashSync(password, salt),
      role,
    }).save()

    if (password.length < 5) {
      throw { message: "Password must be at least 5 characters long" }
    }

    res.status(201).json({
      response: {
        userId: newUser._id,
        username: newUser.username,
        accessToken: newUser.accessToken,
        role: newUser.role,
      },
      success: true,
    })
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

app.post("/signin", async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username: username.toLowerCase() })

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        response: {
          userId: user,
          username: user.username,
          accessToken: user.accessToken,
        },
        success: true,
      })
    } else {
      res.status(404).json({
        response: "Username or password doesn't match.",
        success: false,
      })
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

// Retros
app.post("/retros", async (req, res) => {
  const { description, admin, participants } = req.body

  try {
    const queriedAdmin = await User.findById(admin)
    const queriedParticipants = await User.findById(participants)

    const newRetro = await new Retro({
      description,
      admin: queriedAdmin,
      participants: [queriedParticipants],
    }).save()

    res.status(201).json({ response: newRetro, success: true })
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})
// Thoughts
app.post("/retros/:retro/thoughts", async (req, res) => {
  const { description, retro } = req.body

  try {
    const queriedRetro = await Retro.findById(retro)
    const newThought = await new Thought({
      description,
      retro: queriedRetro,
    }).save()

    res.status(201).json({ response: newThought, success: true })
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})
// Action Items
app.post("/retros/:retro/actionitems", async (req, res) => {
  const { description, retro } = req.body

  try {
    const queriedRetro = await Retro.findById(retro)
    const newActionItem = await new ActionItem({
      description,
      retro: queriedRetro,
    }).save()

    res.status(201).json({ response: newActionItem, success: true })
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

// PATCH Request
// Participants
// app.patch("/retros/:retro/participants", async (req, res) => {
//   const { participants } = req.body
//   const { retro } = req.params

//   try {
//     const queriedParticipants = await User.findById(participants)
//     const updatedRetro = await Retro.findByIdAndUpdate(retro, {
//       $addToSet: {
//         participants: queriedParticipants,
//       },
//     })
//     if (updatedRetro) {
//       res.status(201).json({ response: updatedRetro, success: true })
//     } else {
//       res.status(404).json({ response: "retro not found", succes: false })
//     }
//   } catch (error) {
//     res.status(400).json({ response: error, success: false })
//   }
// })
// Thoughts
app.patch("/retros/thoughts/:thoughtId", async (req, res) => {
  const { thoughtId } = req.params

  try {
    const updatedThought = await Thought.findOneAndUpdate(
      { _id: thoughtId },
      req.body
    )
    if (updatedThought) {
      res.status(201).json({ response: updatedThought, success: true })
    } else {
      res.status(404).json({ response: "Thought not found", succes: false })
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})
// Action
app.patch("/retros/actionitems/:actionId", async (req, res) => {
  const { actionId } = req.params

  try {
    const updatedAction = await ActionItem.findOneAndUpdate(
      { _id: actionId },
      req.body
    )
    if (updatedAction) {
      res.status(201).json({ response: updatedAction, success: true })
    } else {
      res.status(404).json({ response: "Action Item not found", succes: false })
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})
// DELETE Request
// Retro
app.delete("/retros/:retroId", async (req, res) => {
  const { retroId } = req.params
  try {
    const deletedRetro = await Retro.findOneAndDelete({ _id: retroId })
    if (deletedRetro) {
      res.status(200).json({ response: deletedRetro, success: true })
    } else {
      res.status(404).json({ response: "Retro not found", success: false })
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})
// Thought
app.delete("/thoughts/:thoughtId", async (req, res) => {
  const { thoughtId } = req.params
  try {
    const deletedThought = await Thought.findOneAndDelete({ _id: thoughtId })
    if (deletedThought) {
      res.status(200).json({ response: deletedThought, success: true })
    } else {
      res.status(404).json({ response: "no thought found", success: false })
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})
// Action
app.delete("/actionitems/:actionitemsId", async (req, res) => {
  const { actionitemsId } = req.params
  try {
    const deletedActionItem = await ActionItem.findOneAndDelete({
      _id: actionitemsId,
    })
    if (deletedActionItem) {
      res.status(200).json({ response: deletedActionItem, success: true })
    } else {
      res.status(404).json({ response: "No action item found", success: false })
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

// GET Request
// User
app.get("/users/:userId", authenticateUser)
app.get("/users/:userId", async (req, res) => {
  const { userId } = req.params
  try {
    const user = await User.findById(userId).populate("role")
    if (user) {
      res.status(200).json({ response: user, success: true })
    } else {
      res.status(404).json({ error: "No user found" })
    }
  } catch (err) {
    res.status(400).json({ error: "Invalid user id" })
  }
})
// Retros
app.get("/retros", async (req, res) => {
  try {
    const retro = await Retro.find(req.query)
    if (retro) {
      res.status(200).json({ response: retro, success: true })
    } else {
      res.status(404).json({ error: "No retro found" })
    }
  } catch (err) {
    res.status(400).json({ error: "Invalid id" })
  }
})
// Retro by ID
app.get("/retros/:retroId", async (req, res) => {
  const { retroId } = req.params
  try {
    const retro = await Retro.findById(retroId).populate("retro")
    if (retro) {
      res.status(200).json({ response: retro, success: true })
    } else {
      res.status(404).json({ error: "No retro found with that id" })
    }
  } catch (err) {
    res.status(400).json({ error: "Invalid retro id" })
  }
})
//  Retro by User - NEED FIXING
app.get("/users/:userId/retros", async (req, res) => {
  const { userId } = req.params

  try {
    const queriedUser = await User.findById(userId).populate("retros")
    if (queriedUser) {
      res.status(200).json({ response: queriedUser.retros, success: true })
    } else {
      res.status(404).json({ error: "No retro found for that user" })
    }
  } catch (err) {
    res.status(400).json({ error: "Invalid user id" })
  }
})
// Thoughts
app.get("/thoughts", async (req, res) => {
  try {
    const thought = await Thought.find(req.query)
    if (thought) {
      res.status(200).json({ response: thought, success: true })
    } else {
      res.status(404).json({ error: "No thoughts found" })
    }
  } catch (err) {
    res.status(400).json({ error: "Invalid id" })
  }
})
// Thoughts by ID
app.get("/thoughts/:thoughtId", async (req, res) => {
  const { thoughtId } = req.params
  try {
    const thought = await Thought.findById(thoughtId).populate("retro")
    if (thought) {
      res.status(200).json({ response: thought, success: true })
    } else {
      res.status(404).json({ error: "No thought found with that id" })
    }
  } catch (err) {
    res.status(400).json({ error: "Invalid thought id" })
  }
})
// Thoughts by Retro
app.get("/retros/:retro/thoughts", async (req, res) => {
  try {
    const retroThoughts = await Thought.find({ retro: req.params.retro })
    if (retroThoughts) {
      res.json(retroThoughts)
    } else {
      res.status(404).json({ error: "No thoughts found" })
    }
  } catch (err) {
    res.status(400).json({ error: "Invalid id" })
  }
})
// Actions
app.get("/actionitems", async (req, res) => {
  try {
    const action = await ActionItem.find(req.query)
    if (action) {
      res.status(200).json({ response: action, success: true })
    } else {
      res.status(404).json({ error: "No action items found " })
    }
  } catch (err) {
    res.status(400).json({ error: "Invalid action item" })
  }
})
// Actions by ID
app.get("/actionitems/:actionId", async (req, res) => {
  const { actionId } = req.params
  try {
    const action = await ActionItem.findById(actionId).populate("retro")
    if (action) {
      res.status(200).json({ response: action, success: true })
    } else {
      res.status(404).json({ error: "No action items found with that id" })
    }
  } catch (err) {
    res.status(400).json({ error: "Invalid action item id" })
  }
})
// Actions by Retro
app.get("/retros/:retro/actionitems", async (req, res) => {
  try {
    const retroActions = await ActionItem.find({ retro: req.params.retro })
    if (retroActions) {
      res.json(retroActions)
    } else {
      res.status(404).json({ error: "No action items found" })
    }
  } catch (err) {
    res.status(400).json({ error: "Invalid retro id" })
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
