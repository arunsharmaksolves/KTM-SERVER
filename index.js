// server.js
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const EventData = require('./model/EventData')

const app = express();

// Middleware
app.use(express.json());
// app.use(cors({origin: ["http://127.0.0.1:5500", "http://localhost:5173"],credentials:true}))
app.use(cors({origin: "*",credentials:true}))


// Connect to MongoDB
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("database is connected successfully!")

    }
    catch(err){
        console.log(err)
    }
}

// Define schema and model for event data
// const eventDataSchema = new mongoose.Schema({
//     event: String,
//     timestamp: Date,
//     target: {
//         tagName: String,
//         id: String,
//         innerText: String
//     },
//     ipAddress: String,
//     location: Object,
//     timeSpent: Number
// });

// const EventData = mongoose.model('EventData', eventDataSchema);

// Route to handle incoming event data
app.get('/',(req,res)=>{
    res.send("Hello from KTM Server. Go to to /events for data")
})

app.get('/events', async (req, res) => {
    try {
        const eventData = await EventData.find();
        res.json(eventData);
    } catch (error) {
        console.error('Error fetching event data:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/events', async (req, res) => {
    try {
        const eventData = req.body;
        await EventData.create(eventData);
        res.status(201).send('Event data saved successfully');
    } catch (error) {
        console.error('Error saving event data:', error);
        res.status(500).send('Internal Server Error');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
