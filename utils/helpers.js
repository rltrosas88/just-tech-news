//14.4.5 step TWO 
    //create a folder called utils and add this file to it
    //export a function that makes the test pass
    //use the date object to avoid bringing in unnecessary dependencies
module.exports = {
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
            date
        ).getFullYear()}`;
    },
    //14.4.7 step TWO add a format_url() method
    //14.4.7 step THREE chain the methodes with replace() to return URLs that have more after the domain 
    format_url: url => {
        return url
            .replace('http://', '')
            .replace('https://', '')
            .replace('www.', '')
            .split('/')[0]
            .split('?')[0];
    },
    //14.4.6 step TWO add a format_plural() method
    format_plural: (word, amount) => {
        if (amount !== 1) {
            return `${word}s`;
        }
    
        return word;
    }
};
