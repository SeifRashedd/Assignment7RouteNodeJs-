import { Schema, model } from "mongoose";
import { mongooseLeanVirtuals } from "mongoose-lean-virtuals";

let userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, "{VALUE} name must be at least 3 characters long"],
        maxLength: [20, "{VALUE} name must be at most 20 characters long"],
        trim: true
    },
    email: {
        type: String,
        required: true,
        minLength: [3, "{VALUE} email must be at least 3 characters long"],
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        minLength: 11,
        maxLength: 11,
        trim: true,
    },

    age: {
        type: Number,
        validate: {
            validator: function (value) {
                return value >= 18 && value <= 60;
            },
            message: "Age must be between 18 and 60"
        }
    },
}, {
    timestamps: true,
    strict: false,
    strictQuery: false,
    optimisticConcurrency: true,
})


userSchema.plugin(mongooseLeanVirtuals);


// userSchema.virtual("posts", {
//     ref: "posts",
//     localField: "_id",
//     foreignField: "createdBy",
// })


export const userModel = model("user", userSchema);
