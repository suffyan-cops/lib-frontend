export const formattedDate = (val) => {
    const date = new Date(val);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options); 
};