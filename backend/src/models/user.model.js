import mongoose from "mongoose"
/**
 * {
    "_id": "",
    "name": "Chirag",
    "email": "chirag@test.com",
    "passwordHash": "",
    "refreshTokenHash": null,
    "role":"user"
    "createdAt": "",
    "updatedAt": ""
    }
 */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
        select: false
    },
    refreshTokenHash: {
        type: String,
        default: null,
        select: false
    },
    role: {
        type: String,
        enum: ["user", "seller"],
        default: "user"
    }
},
    {
        timestamps: true
    });

const userModel = mongoose.model("users", userSchema);

export default userModel

