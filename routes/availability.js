const mongoose = require('mongoose');
const availschema = mongoose.Schema({
    "availability": [
        {
            "day": "Monday",
            "slots": [
                {"start": "HH:MM", "end": "HH:MM", "maxCapacity": 5},
                {"start": "HH:MM", "end": "HH:MM", "maxCapacity": 5},
            ]
        },
        {
            "day": "Tuesday",
            "slots": [
                {"start": "HH:MM", "end": "HH:MM", "maxCapacity": 5},
                {"start": "HH:MM", "end": "HH:MM", "maxCapacity": 5},
            ]
        },
    ]

})
// Virtual property to return the total number of
// available slots for a given day
availschema.virtual("totalSlots ").get(function () {
    let sum=0;
    this.availability.forEach((day) => {sum += day.slots.length});
    return sum;
});

module.exports = mongoose.model("Availability", availschema);
