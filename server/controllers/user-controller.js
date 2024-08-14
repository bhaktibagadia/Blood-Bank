const Contact = require('../models/user-model');
const Additional = require('../models/additional-model');

const contactForm = async (req, res) => {
    try {
        const response = req.body;

        // Validate the request body here if needed

        await Contact.create(response);
        return res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
        console.error("Error in contactForm:", error);
        return res.status(500).json({ message: "Message not delivered" });
    }
};

const AdditionalForm = async (req, res) => {
    console.log("Outside try-catch");
    try {
        const response = req.body;
        console.log("Request body:", req.body);

        // Validate the request body here if needed

        await Additional.create(response);
        console.log("User controller working");
        return res.status(200).json({ message: "Information sent" });
    } catch (error) {
        console.error("Error in AdditionalForm:", error);
        return res.status(500).json({ message: "Information not sent" });
    }
};

module.exports = {
    contactForm,
    AdditionalForm
};
