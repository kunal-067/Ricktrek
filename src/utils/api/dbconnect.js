import mongoose from "mongoose";

const dbUrl = process.env.DB_URI || 'mongodb://127.0.0.1:27017/ommimlm-try';

export async function connectDb() {
    try {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            authSource: "admin",
        });
        console.log('Connected to database');
    } catch (error) {
        console.error('Error connecting to database:', error);
        // throw error;
    }
}
