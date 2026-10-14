// create schema first
const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true,
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    }
},{});


// now create model