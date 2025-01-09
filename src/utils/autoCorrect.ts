export function autoCorrect(input: string): string {
    // Step 1: Split by camel case or non-letter characters
    const words = input
        .replace(/([a-z])([A-Z])/g, '$1 $2') // Insert space before uppercase letters (camel case)
        .replace(/([a-z])(\d)/g, '$1 $2') // Insert space before numbers (optional if needed)
        .replace(/([^\w\s])/g, '') // Remove any non-word characters (optional)
        .split(/\s+/); // Split into an array of words
    
    // Step 2: Capitalize the first letter of each word
    const correctedWords = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });

    // Step 3: Join the words back into a single string
    return correctedWords.join(' ');
}
