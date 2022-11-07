// const mongoose = require("mongoose");

// mongoose.connect("mongodb+srv://tsering:sherpa@rentnreadcluster.l44fhbf.mongodb.net/rentnreaddb?retryWrites=true&w=majority",{
//     useNewUrlParser : true,
//     useUnifiedTopology : true
// });

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://tsering:sherpa@rentnreadcluster.l44fhbf.mongodb.net/rentnreaddb?retryWrites=true&w=majority");
    console.log("MongoDB Connected")
  } catch (error) {
    console.log("Error");
    process.exit(1);
  }
};

module.exports = connectDB;