// Utility function to handle search

type DataType = {
    id: number;
    title: string;
    description: string;
    genre:string;
    duration: string;
    posted_date: string;
    rating_count: string;
    rating_total: string;
    url: string;
    img_path:string;
    view_count: string;
};



export const HandleSearch = (
    searchQuery: string, 
    setSearchVideos: React.Dispatch<React.SetStateAction<DataType[] | undefined>>, 
    allvid: DataType[] | undefined,
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>
) => {
    
    if (searchQuery.trim() === "") {
        window.location.href = "/";  // Use window.location for navigation
        return;
    }

    // Normalize the query and filter videos based on the title
    const normalizedQuery = searchQuery.trim().toLowerCase();
    // Filter movies by title, ensure to map to full video object
    const filtered = allvid?.filter((vid:DataType)=>(
        vid.title.toLowerCase().includes(normalizedQuery)
    ))

    setSearchVideos(filtered);
    window.scrollTo({ top: window.scrollY + 200, behavior: 'smooth' });

    setSearchQuery('');
};
