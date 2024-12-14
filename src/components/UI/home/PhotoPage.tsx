import React, { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Card, CardFooter, CardHeader, Image } from '@nextui-org/react';
import LazyLoad from 'react-lazyload';
import Skeleton from 'react-loading-skeleton';
import { Button } from 'flowbite-react';
import TvLoader from '../loader/TvLoader';
import { useGetPhotosQuery } from '../../../redux/api/getPhotoPage';
import TVSkeleton from '../loader/TVSkeleton';


const PhotoPage: React.FC = () => {
    const [showTVske, setShowTVske] = useState(false);
    const { data: photos, isLoading } = useGetPhotosQuery();

    const handleDownload = useCallback((url: string, name: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to download this ${name}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, download it!',
            cancelButtonText: 'Cancel',
            customClass: {
                confirmButton: 'confirm-btn',
                cancelButton: 'cancel-btn',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                // Start the download if the user confirms
                const link = document.createElement('a');
                link.href = url; // Set the URL for the image
                link.download = name || 'image'; // Set the name of the downloaded file
                link.style.display = 'none'; // Hide the link (it won’t be visible on the page)
                document.body.appendChild(link); // Append the link to the DOM
                link.click(); // Programmatically trigger the download
                document.body.removeChild(link); // Clean up by removing the link after clicking

                Swal.fire('Downloading!', 'Your image is being downloaded.', 'success'); // Success alert
            }
        });

        // Add these styles to your CSS file (or use inline styles if preferred)
        const style = document.createElement('style');
        style.innerHTML = `
      .confirm-btn {
        background-color: #7FADE0 !important;
        color: #EAF0F7 !important;
      }
      .cancel-btn {
        background-color: red !important;
        color: white !important;
      }
    `;
        document.head.appendChild(style);
    }, []);

    useEffect(() => {
        if (!isLoading) {
            setShowTVske(true);
            const timer = setTimeout(() => {
                setShowTVske(false);
            }, 3000);

            // Clean up the timer when component unmounts or when isLoading changes
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    if (isLoading) return <TvLoader />; // Display loading state


    return (
        <>
            <div className="mt-6 px-2 flex-wrap grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 transition-all duration-300 ease-in-out">
                {/* Map over the 'photos' data that is fetched */}
                {photos?.map((item) => (
                    showTVske ? (
                        <TVSkeleton key={item?.id} />
                    ) : (
                        <Card
                            key={item?.id}
                            isFooterBlurred
                            className="bg-transparent w-full h-[250px] sm:h-[300px] md:h-[300px] lg:h-[300px] overflow-hidden transition-all duration-300 ease-in-out"
                        >
                            <CardHeader className="absolute z-10 top-1 flex-col items-start">
                                <p className="text-tiny text-[var(--dark-blue)] uppercase font-bold">New</p>
                            </CardHeader>
                            <LazyLoad
                                offset={100}
                                placeholder={<Skeleton style={{ height: '100%', width: '100%' }} />}  // Full viewport height for the skeleton
                                style={{ height: '100%', width: '100%' }}
                            >
                                <Image
                                    removeWrapper
                                    alt={item?.title || "Card example background"} // Use item's name or fallback text
                                    className="z-0 w-full h-full scale-125 -translate-y-6 object-contain"
                                    src={item?.url} // Use dynamic image URL
                                />
                            </LazyLoad>
                            <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                                <div>
                                    {/* Optionally, add more content here */}
                                </div>
                                <Button
                                    className="text-tiny bg-[var(--medium-blue)]"
                                    radius="full"
                                    size="sm"
                                    onClick={() => handleDownload(item?.url, item?.title)} // Trigger download on button click
                                >
                                    Download
                                </Button>
                            </CardFooter>
                        </Card>
                    )
                ))}
            </div>
        </>
    );
}

export default PhotoPage;
