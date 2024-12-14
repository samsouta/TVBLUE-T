// Utility function to handle search

type DataItem = {
    id: number;
    title: string;
    description: string;
    posted_date: string;
    genre: string;
    duration: string;
    view_count: string;
    rating_count: string;
    rating_total: string;
    url: string;
  };
  type DataArray = DataItem[];
export const HandleSearch = (
    searchQuery: string, 
    setVideos: React.Dispatch<React.SetStateAction<any[]>>, 
    allvid: DataArray[] | undefined,
    vidPage:DataArray[],
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>
) => {
    
    if (searchQuery.trim() === "") {
        setVideos(vidPage);
        return; 
    }

    // Normalize the query and filter videos based on the title
    const normalizedQuery = searchQuery.trim().toLowerCase();

    // Filter movies by title, ensure to map to full video object
    const filtered = allvid.filter((video) =>
        video.title.toLowerCase().includes(normalizedQuery)  
    );

    setVideos(filtered);
    window.scrollTo({ top: window.scrollY + 200, behavior: 'smooth' });

    setSearchQuery('');
};
