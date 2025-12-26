// /lib/config.ts
// 환경 설정 파일
export const isLocalDev = process.env.NODE_ENV === 'development'
export const repoName = "blog"
 
// 유용한 사이트
export interface UsefulLink {
  name: string;
  url: string;
}
export const usefulLinks: UsefulLink[] = [
  { name: "Next.js 학습자료", url: "https://sangkon.com/practice-ts/" },
];