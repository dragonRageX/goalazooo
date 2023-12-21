const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(   //think of schemas or models as the layout structure of your collection/table, where you define what fields/columns/attributes you want in your table, and each document/entry will have those fields.
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,   //we linked or related the Goal collection/table to the User collection/table by adding the userId attribute to the Goal schema. The userId attribute references from the User schema (just like a Foreign Key).
            required: true,
            ref: "User"
        },
        text: {
            type: String,
            required: [true, "Please add a text value"]
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Goal", goalSchema);