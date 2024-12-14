import { formatDistanceToNow, parseISO, isValid } from 'date-fns';

// Define the function with proper type annotations
const formatRelativeDate = (postedDate: string): string => {
    if (!postedDate) {
        return "Date not available";
    }

    try {
        // Parse the provided date directly
        const parsedDate = parseISO(postedDate);

        // Validate parsed date
        if (!isValid(parsedDate)) {
            console.error("Invalid date format:", postedDate);
            return "Invalid date";
        }

        const diffInDays = Math.floor((new Date().getTime() - parsedDate.getTime()) / (1000 * 60 * 60 * 24)); // Difference in days

        if (diffInDays >= 7 && diffInDays < 14) {
            return "1 week ago";
        } else if (diffInDays >= 14 && diffInDays < 21) {
            return "2 weeks ago";
        } else if (diffInDays >= 21 && diffInDays < 28) {
            return "3 weeks ago";
        } else if (diffInDays >= 28) {
            const weeksAgo = Math.floor(diffInDays / 7);
            return `${weeksAgo} weeks ago`;
        } else {
            let relative = formatDistanceToNow(parsedDate, { addSuffix: true });
            // Remove the word "about"
            relative = relative.replace(/^about /, '');
            return relative;
        }
    } catch (error: any) {
        console.error("Error in formatRelativeDate:", error.message);
        return "Invalid date";
    }
};

export default formatRelativeDate;
