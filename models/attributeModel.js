const db = require("../config/db");

const insertProductAttributes = async (productId, attributes) => {
  const values = attributes.map(attr => [productId, attr.name, attr.value]);

  const query = `
    INSERT INTO product_attributes (product_id, attr_key, attr_value)
    VALUES ?
  `;

  const [result] = await db.query(query, [values]);
  return result;
};

module.exports = { insertProductAttributes };