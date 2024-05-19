import mongoose from "mongoose";

const dbUrl = process.env.DB_URI || 'mongodb+srv://trekomi:AkqEPipnajKeTrTC@cluster0.uy9ofus.mongodb.net/debug-omni-erro';

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
