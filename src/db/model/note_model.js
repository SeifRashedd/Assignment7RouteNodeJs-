import mongoose, { Schema, model } from "mongoose";
import { mongooseLeanVirtuals } from "mongoose-lean-virtuals";


let noteSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (value) {
                return value !== value.toUpperCase() || value === value.toLowerCase();
            },
            message: "{VALUE} title must not be entirely uppercase"
        }
    },
    content: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'user'
    }

}, {
    timestamps: true,
    strict: false,
    strictQuery: false,
    optimisticConcurrency: true,
})


noteSchema.plugin(mongooseLeanVirtuals);


export const noteModel = model("note", noteSchema, "notes");
