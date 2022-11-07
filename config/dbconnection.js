const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://tsering:sherpa@rentnreadcluster.l44fhbf.mongodb.net/rentnreaddb?retryWrites=true&w=majority",{
    useNewUrlParser : true,
    useUnifiedTopology : true
});

