// /components/DynamicImage.tsx
import { isLocalDev, repoName } from "@/lib/config";
import Image from "next/image";
import { ImgHTMLAttributes } from "react";
 
const resolveImagePath = (category: string, slug: string, value: string | undefined): string => {
    const v = String(value);
 
    // absolute / external / hash links는 그대로
    if (
        v.startsWith("/") ||
        v.startsWith("http://") ||
        v.startsWith("https://") ||
        v.startsWith("#")
    ) {
        return v;
    }
    const baseurl = isLocalDev ? '' : `/${repoName}`;
    return `${baseurl}/images/${encodeURIComponent(category)}/${encodeURIComponent(slug)}/${v}`;
};
 
interface DynamicImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    category: string;
    slug: string;
}
 
export const DynamicImage = ({ category, slug, ...props }: DynamicImageProps) => {
    const {
        src,
        alt,
        width,
        height,
        ...rest
    } = props;
 
    const resolvedSrc = resolveImagePath(category, slug, src as string);
 
    return (
        <span className="relative block w-full aspect-[3/2]">
            <Image
                unoptimized
                src={resolvedSrc}
                alt={alt ?? ""}
                fill
                className="object-contain"
                {...rest}
            />
        </span>
    );
};
 