// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();

// Middleware
app.use(express.json());
app.use(cors({origin: "*",credentials:true}))

// Connect to MongoDB
const connectDB=async()=>{
    try{
        await mongoose.connect("mongodb+srv://arunsharma:Arun0208@cluster0.8b9nmku.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("database is connected successfully!")

    }
    catch(err){
        console.log(err)
    }
}

// Define schema and model for event data
const eventDataSchema = new mongoose.Schema({
    event: String,
    timestamp: Date,
    target: {
        tagName: String,
        id: String,
        innerText: String
    },
    ipAddress: String,
    location: Object,
    timeSpent: Number
});

const EventData = mongoose.model('EventData', eventDataSchema);

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
