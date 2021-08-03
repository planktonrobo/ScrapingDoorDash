// Take in json

var input = require("./input.json");

function bareMinimum() {
  // Take first option

  const one = input.optionLists[0].options[0];

  const { id, name } = one;
  const itemExtraOption = { id: id, name: name };
  // Create main dictionary
  const zit = {
    itemExtraOption,
    id: itemExtraOption.id,
    quantity: 1,
    options: [],
  };
  // Loop through options and only add those that aren't optional
  one.optionLists.map((option) => {
    if (!option.isOptional) {
      // Look for default value or go further in nested data
      if (option.flattenedDefaultNodes.length) {
        const [item1] = option.flattenedDefaultNodes;
        const { id, name } = item1;
        firstSide = {
          id,
          quantity: 1,
          options: [],
          itemExtraOption: { id, name },
        };
        // Add first side to main dicitonary
        zit.options.push(firstSide);
      } else {
        const two = option.options[0];
        const { id, name } = two;
        const itemExtraOption = { id, name };
        const picked = option.options[0].optionLists[0].options[0];
        const options = {
          id: picked.id,
          quantity: 1,
          options: [],
          itemExtraOption: { id: picked.id, name: picked.name },
        };
        const secondSide = {
          itemExtraOption,
          id: itemExtraOption.id,
          quantity: 1,
          options: [options],
        };
        // Add second side to main dicitonary
        zit.options.push(secondSide);
      }
    }
  });
  // Return mutated main dictionary
  return zit;
}

console.log(bareMinimum());
