const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(   //think of schemas or models as the layout structure of your collection/table, where you define what fields/columns/attributes you want in your table, and each document/entry will have those fields.
    {
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