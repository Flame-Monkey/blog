// /components/Navigation.tsx
"use client";
 
import { Post } from "@/lib/posts";
import Link from "next/link";
import { useState } from "react";
 
interface NaviProps {
  posts: Omit<Post, "content">[]
}
 
export default function Navi({ posts }: NaviProps) {    
    const [openDoc, setOpenDoc] = useState(false);
    const [openProject, setOpenProject] = useState(false);
    const [openJournal, setOpenJournal] = useState(false);
 
    const categories = Array.from(
        new Set(posts.map(post => post.category))
    ).filter((category): category is string => Boolean(category) && category !== 'Project' && category !== 'Journal')
        .sort((a, b) => {
            const latestA = Math.max(
                ...posts
                    .filter(p => p.category === a)
                    .map(p => new Date(p.date).getTime())
            )
 
            const latestB = Math.max(
                ...posts
                    .filter(p => p.category === b)
                    .map(p => new Date(p.date).getTime())
            )
 
            return latestB - latestA // 최신 글 있는 카테고리가 앞으로
        });
    const firstCategory = categories[0] || '';
 
    const projects = posts.filter(post => post.category === 'Project');
    const journals = posts.filter(post => post.category === 'Journal');
 
    return (
        <nav className="relative w-full h-full bg-transparent grid grid-cols-5 items-center">
 
            <div></div>
 
            {/* 가운데 네비 전체 */}
            <div className="flex w-full items-center col-span-3 justify-between">
 
                <div className="flex items-center justify-start py-2 px-6 gap-6">
 
                    <Link href="/" className="flex w-full text-xl items-center font-bold hover:opacity-70 transition">
                        <img
                            src="https://avatars.githubusercontent.com/u/161662653?v=4"
                            alt="avatar"
                            className="w-12 h-12 rounded-full"
                        />
                        <p>Main</p>
                    </Link>
                    <Link href="https://crusthack.github.io/catbattle/" target="_blank" className="whitespace-nowrap flex w-full text-xl items-center font-bold hover:opacity-70 transition">
                        <img
                            src="https://i.namu.wiki/i/M6AE8KgdUiL4hPvu8foaiuoQhAg4irefljwcQwO6AMrLqF3N1g-x9fov0mU6Q4wwTeeepQzVT-yw4_qUs_0pfYaxE69UzDs6tbU9riaYER2lvO_nHhxzKNssBW1ZbE7JcZW4SIT4jaup6K8P2kk7hQ.webp"
                            alt="avatar"
                            className="w-12 h-12 rounded-full"
                        />
                        냥코DB
                    </Link>
                </div>

                <div className="flex items-center w-full justify-end px-6 gap-2">
 
                    <Link
                        href="/about"
                        className="px-3 py-2 hover:bg-gray-200 rounded transition"
                    >
                        소개
                    </Link>
 
                    {/* 문서 드롭다운 */}
                    <div
                        className="relative"
                        onPointerEnter={() => setOpenDoc(true)}
                        onPointerLeave={() => setOpenDoc(false)}
                    >
                        <Link
                            href={`/${encodeURIComponent(firstCategory)}`}
                            className="px-3 py-2 hover:bg-gray-200 rounded transition"
                        >
                            문서
                        </Link>
 
                        {openDoc && (
                            <div
                                className="absolute mt-0 left-0 min-w-[12rem] bg-white shadow-lg rounded-md border p-2 z-50"
                            >
                                {categories.map((cat) => (
                                    <Link
                                        key={cat}
                                        href={`/${encodeURIComponent(cat)}`}
                                        className="block px-3 py-2 hover:bg-gray-100 w-full rounded"
                                    >
                                        {cat}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
 
                    {/* Project 카테고리 및 드롭다운 */}
                    <div
                        className="relative"
                        onPointerEnter={() => setOpenProject(true)}
                        onPointerLeave={() => setOpenProject(false)}
                    >
                        <Link
                            href={`/Project`}
                            className="px-3 py-2 hover:bg-gray-200 rounded transition"
                        >
                            프로젝트
                        </Link>
 
                        {openProject && (
                            <div
                                className="absolute mt-0 left-0 min-w-[12rem] bg-white shadow-lg rounded-md border p-2 z-50"
                            >
                                {projects.map((cat) => (
                                    <Link
                                        key={cat.slug}
                                        href={`/${encodeURIComponent(cat.category)}/${encodeURIComponent(cat.slug)}`}
                                        className="block px-3 py-2 hover:bg-gray-100 w-full rounded"
                                    >
                                        {cat.slug}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
 
                    {/* Journal 카테고리 및 드롭다운 */}
                    <div
                        className="relative"
                        onPointerEnter={() => setOpenJournal(true)}
                        onPointerLeave={() => setOpenJournal(false)}
                    >
                        <Link
                            href={`/Journal`}
                            className="px-3 py-2 hover:bg-gray-200 rounded transition"
                        >
                            일지
                        </Link>
 
                        {openJournal && (
                            <div
                                className="absolute mt-0 left-0 min-w-[12rem] bg-white shadow-lg rounded-md border p-2 z-50"
                            >
                                {journals.map((cat) => (
                                    <Link
                                        key={cat.slug}
                                        href={`/${encodeURIComponent(cat.category)}/${encodeURIComponent(cat.slug)}`}
                                        className="block px-3 py-2 hover:bg-gray-100 w-full rounded"
                                    >
                                        {cat.slug}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
 
 
 
            <div></div>
 
        </nav>
    );
}