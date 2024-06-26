const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");

const app = express();
const port = 3000;

// Initialize Firebase Admin SDK
const serviceAccount = require("./serviceAccountKey.json"); // Download this key from Firebase Console
const connectToDB = async () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://projectexpo-850af-default-rtdb.firebaseio.com",
  });
  console.log("Firebase DB initialized successfully");
};

connectToDB();

// Reference to Firebase Realtime Database
const db = admin.database();
const usersRef = db.ref("users"); // 'users' can be any desired name for your collection

app.use(express.json());
app.use(cors());

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const snapshot = await usersRef
      .orderByChild("username")
      .equalTo(username)
      .once("value");
    const userData = snapshot.val();

    if (userData) {
      const user = Object.values(userData)[0];
      if (user.password === password) {
        res.status(200).json({ message: "Login successful!!" });
      } else {
        res.status(401).json({ message: "Invalid password." });
      }
    } else {
      res.status(401).json({ message: "Invalid username." });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
});

app.post("/pushData", async (req, res) => {
  try {
    const db = admin.database();
    const dataRef = db.ref("/readings");
    const newData = req.body;

    await dataRef.set(newData);

    res.status(200).json({ message: "Data pushed to Firebase successfully" });
  } catch (error) {
    console.error("Error pushing data to Firebase:", error);
    res.status(500).json({ error: "Failed to push data to Firebase" });
  }
});

app.get("/readings", async (req, res) => {
  try {
    const db = admin.database();
    const dataRef = db.ref("/readings"); 
    const snapshot = await dataRef.once("value");
    const data = snapshot.val();

    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data from Firebase:", error);
    res.status(500).json({ error: "Failed to fetch data from Firebase" });
  }
});

app.post("/insertOne", async (req, res) => {
  try {
    const data = req.body;
    await usersRef.push(data); // Push data to the 'users' collection
    res.status(200).json({ message: "Data inserted successfully!" });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ message: "Error inserting data" });
  }
});

app.post("/submit-query", async (req, res) => {
  try {
    const data = req.body;
    const newQueryRef = db.ref("queries").push(); // 'queries' can be any desired name for your collection
    await newQueryRef.set(data); // Save the query data to Firebase
    res.status(201).json({ message: "Query submitted successfully!" });
  } catch (error) {
    console.error("Error saving query:", error);
    res.status(500).json({ message: "Error saving query" });
  }
});

// app.get('/queries', async (req, res) => {
//   try {
//     const queriesSnapshot = await db.ref('queries').once('value');
//     const queriesData = queriesSnapshot.val();
//     const queries = Object.values(queriesData);
//     res.status(200).json({ queries });
//   } catch (error) {
//     console.error('Error fetching queries:', error);
//     res.status(500).json({ message: 'Error fetching queries' });
//   }
// });

app.get("/queries", async (req, res) => {
  try {
    const queriesSnapshot = await db.ref("queries").once("value");
    const queriesData = queriesSnapshot.val();
    const queries = queriesData
      ? Object.entries(queriesData).map(([queryId, queryData]) => ({
          queryId,
          ...queryData,
        }))
      : [];
    res.status(200).json({ queries });
  } catch (error) {
    console.error("Error fetching queries:", error);
    res.status(500).json({ message: "Error fetching queries" });
  }
});

app.get("/solvedQueries", async (req, res) => {
  try {
    const queriesSnapshot = await db
      .ref("queries")
      .orderByChild("status")
      .equalTo("solved")
      .once("value");
    const queriesData = queriesSnapshot.val();
    const solvedQueries = queriesData
      ? Object.entries(queriesData).map(([queryId, queryData]) => ({
          queryId,
          ...queryData,
        }))
      : [];
    res.status(200).json({ queries: solvedQueries });
  } catch (error) {
    console.error("Error fetching solved queries:", error);
    res.status(500).json({ message: "Error fetching solved queries" });
  }
});

app.get("/unsolvedQueries", async (req, res) => {
  try {
    const queriesSnapshot = await db
      .ref("queries")
      .orderByChild("status")
      .equalTo("unsolved")
      .once("value");
    const queriesData = queriesSnapshot.val();
    const unsolvedQueries = queriesData
      ? Object.entries(queriesData).map(([queryId, queryData]) => ({
          queryId,
          ...queryData,
        }))
      : [];
    res.status(200).json({ queries: unsolvedQueries });
  } catch (error) {
    console.error("Error fetching unsolved queries:", error);
    res.status(500).json({ message: "Error fetching unsolved queries" });
  }
});

app.post("/queries/update-status", async (req, res) => {
  try {
    const { queryId } = req.body;
    const querySnapshot = await db.ref(`queries/${queryId}`).once("value");
    const queryData = querySnapshot.val();

    if (!queryData) {
      return res.status(404).json({ message: "Query not found" });
    }

    const updatedStatus =
      queryData.status === "unsolved" ? "solved" : "unsolved";
    await db.ref(`queries/${queryId}`).update({ status: updatedStatus });

    res.status(200).json({ message: "Query status updated successfully" });
  } catch (error) {
    console.error("Error updating query status:", error);
    res.status(500).json({ message: "Error updating query status" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
