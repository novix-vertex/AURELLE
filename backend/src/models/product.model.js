import mongoose from "mongoose"
/**
 * {
    "_id": "",
    "name": "Premium T-Shirt",
    "description": "Premium Cotton T-Shirt"
    "price": 1499,
    "category": "tshirts",
    "size": "M",
    "stock": 25,
    "images": [
        {
            "url": "",
            "fileId": ""
        },
        {
            "url": "",
            "fileId": ""
        }
    ],
    "createdAt": "",
    "updatedAt": ""
}
 */
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    images:[
        {
            url:{
                type:String,
                default:""
            },
            fileId:{
                type:String,
                default:""
            }
        }
    ]
}, {
    timestamps: true
});

const productModel = mongoose.model("products", productSchema);

export default productModel;