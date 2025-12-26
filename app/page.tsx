// /app/page.tsx
import { getPostData } from '@/lib/posts'
import BlogPost from '@/components/BlogPost'
import LeftSidebar from '@/components/LeftSidebar';
import RightSidebar from '@/components/RightSidebar';
 
// MDX plugins are provided via shared options
 
export default async function Post() {
    const postData = getPostData("", 'index')
    if (postData === null) {
        return <div>존재하지 않는 포스트입니다.</div>;
    }
 
    return (
        <div className="grid grid-cols-5 gap-8 w-full">
 
            {/* 왼쪽 사이드 컨텐츠 */}
            <div className="flex justify-end">
              <LeftSidebar />
            </div>
 
            {/* 가운데 컨텐츠 */}
            <div className="w-full col-span-3 mx-auto Markdown-body">
                <BlogPost post={postData}/>
            </div>
 
            {/* 오른쪽 사이드 컨텐츠 */}
            <div className="flex justify-start">
              <RightSidebar />
            </div>
 
        </div>
 
    );
}