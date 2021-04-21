import _ from "lodash";

// To paginate the data, first we need to calculate the starting index of the items on the current page (pageNumber)

// We can use lodash to go to this startIndex and take all the items of the current page:
// _.slice(items, startIndex) - this method will slice our array of items starting from startIndex

// Now that we have a new array, we can go to this array and pick items for the current page:
// _.take(pageSize)

// So we're going to use two of the methods in lodash, but in order to call these methods using chain,
// first we need to convert this items array to a lodash wrapper:
// _(items)
// and with that we can chain all the lodash methods like this:
// _(items).slice().take()
// Finally, we need to convert this lodash wrapper object to a regular array using the value() method

export const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return _(items).slice(startIndex).take(pageSize).value();
};
