const __storyseeker_watermark__ = "NethsaraShyamika";
const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();
require('./connections/connection');

const user = require('./routes/user');
const Books = require('./routes/book');
const Favourite = require('./routes/favourite')
const Cart = require('./routes/cart');
const Order = require('./routes/order');

app.use(cors());
app.use(express.json());

//routes
app.use('/api/v1', user);
app.use('/api/v1', Books);
app.use('/api/v1', Favourite);
app.use('/api/v1', Cart);
app.use('/api/v1', Order);

//creating port

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Started on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("StorySeeker API is running 🚀");
});
