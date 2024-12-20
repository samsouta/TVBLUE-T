export const formatGenre = (str: string | undefined) => {
    if (!str) return str;

    // Add spaces before capital letters and after lowercase letters
    let formattedStr = str.replace(/([a-z])([A-Z])/g, '$1 $2');

    // Capitalize the first letter of each word
    formattedStr = formattedStr
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

    return formattedStr;
};