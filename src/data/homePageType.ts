import { Clapperboard, ImageDown, LucideProps } from "lucide-react";

type DataType = {
    id: number;
    path: string;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}
export const homePageType: DataType[] = [
    { id: 1, path: "Video", icon: Clapperboard  },
    { id: 2, path: "Photo", icon: ImageDown },
]