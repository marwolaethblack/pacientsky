module.exports = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let date = new Date(dateString);
    date = date.toLocaleDateString("en-US",options)
    return date;
}