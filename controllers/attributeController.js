const { insertProductAttributes } = require("../models/attributeModel");
const { postAttributesSchema } = require("../middlewares/attributeValidation");

const addAttributes = async (req, res) => {
  const productId = parseInt(req.params.productId);

  if (isNaN(productId)) {
    return res.status(400).json({ message: "Invalid product ID." });
  }

  const { error } = postAttributesSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details.map(e => e.message).join(", ") });
  }

  try {
    const result = await insertProductAttributes(productId, req.body);
    res.status(201).json({ message: "Attributes added successfully.", result });
  } catch (err) {
    console.error("Error inserting attributes:", err);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = { addAttributes };