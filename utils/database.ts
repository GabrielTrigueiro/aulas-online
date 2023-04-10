import {Db, MongoClient} from "mongodb";

let cachedDb: Db;
let client: MongoClient;


//caso já haja uma conecxão com o banco de dados, usar ela e não criar uma nova
export const connectToDatabase = async () => {

    if (cachedDb) {
        console.log("Existing cached connection found!");
        return cachedDb;
    }
    console.log("Aquiring new DB connection....");
    try {
        // Connect to our MongoDB database hosted on MongoDB Atlas

        client = await MongoClient.connect(process.env.DATABASE_URL);

        // Specify which database we want to use
        const db = await client.db(process.env.DB_NAME);

        cachedDb = db;
        return db;
    } catch (error) {
        console.log("ERROR aquiring DB Connection!");
        console.log(error);
        throw error;
    }
};