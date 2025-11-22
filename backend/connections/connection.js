const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        await mongoose.connect(`${process.env.MongoURI}`); 
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

dbConnect();