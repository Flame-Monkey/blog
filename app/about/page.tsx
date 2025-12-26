// /app/about/page.tsx
import BlogPost from "@/components/BlogPost";
import type { Metadata } from "next";
import { getPostData } from "@/lib/posts";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
 
export async function generateMetadata(): Promise<Metadata> {
    const post = getPostData("", 'about')
    return {
        title: post?.title ?? "소개",
        description: post?.description ?? "소개 페이지",
    };
}
 
export default async function AboutPage() {
    const postData = getPostData("", 'about')
    if (postData === null) {
        return <div>존재하지 않는 포스트입니다.</div>;
    }
 
    return (
        <main className="grid grid-cols-5 gap-8 w-full">
            <div className="flex justify-end">
                <LeftSidebar /> 
            </div>
            <div className="w-full mx-auto col-span-3 Markdown-body">
                <BlogPost post={postData}/>
            </div>
            <div className="flex justify-start">
                <RightSidebar />
            </div>
        </main>
    );
}