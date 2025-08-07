const slugify = require("slugify");
const { v4: uuidv4 } = require("uuid");

const generateSlug = (fullName) => {
  const base = slugify(fullName, { lower: true, strict: true });
  const unique = uuidv4().slice(0, 4); // Short unique ID
  return `${base}-${unique}`;
};

module.exports = generateSlug
