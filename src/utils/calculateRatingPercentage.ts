// Calculate rating percentage
type DataType = {
    RatingTotal:string;
    RatingCount:string;
}
export const calculateRatingPercentage: React.FC<DataType> = ({RatingTotal,RatingCount}) => {
    const count = Number(RatingCount)
    const total = Number(RatingTotal)
    if (count === 0) {
        return "0%"; // No ratings, return 0%
    }

    const averageRating = total / count;
    const ratingPercentage = (averageRating / 5) * 100;

    // Round to the nearest whole number and return the percentage
    return `${Math.round(ratingPercentage)}%`;
};
