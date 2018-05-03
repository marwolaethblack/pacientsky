module.exports = (dateString) => {
    let date = new Date(dateString);
    const day = date.getDate() < 10 ? "0"+ date.getDate().toString() : date.getDate();
    const month =  date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1).toString() : date.getMonth() + 1;
    date = date.getFullYear() + "-" + month + "-" + day;
    return date;
}