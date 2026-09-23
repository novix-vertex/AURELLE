import mongoose from "mongoose"
/**
 * {
    "_id": "",
    "name": "Chirag",
    "email": "chirag@test.com",
    "passwordHash": "",
    "refreshTokenHash": null,
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
    }
},
    {
        timestamps: true
    });

const UserModel = mongoose.model("users", userSchema);

export default UserModel

