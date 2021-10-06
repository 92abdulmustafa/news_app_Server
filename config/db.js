const mongoose = require("mongoose");

mongoose
    .connect("mongodb+srv://newsapp:newsapp123@cluster0.gnahu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log("🚀 Database connected successfullly!"))
    .catch((err) =>
        console.error("Error connecting database ==> ", err.message)
    );

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);