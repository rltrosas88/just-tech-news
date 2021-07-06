// 14.4.5 step THREE import the format_date() function
const {format_date} = require('../utils/helpers');

// 14.4.5 step ONE
    //install npm i jest -D
    //make sure to add "test": "jest" to the scripts in package.json
    //create a folder called __tests__ and had this file to it
    //write a test to ensure that format_data() takes Date() objects and returns dates in the MM/DD/YYYY format
test('format_date() returns a date string', () => {
    const date = new Date('2020-03-20 16:12:03');
  
    expect(format_date(date)).toBe('3/20/2020');
  });