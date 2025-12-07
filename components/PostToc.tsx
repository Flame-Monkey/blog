"use client";

import { TocItem } from "@/lib/extractToc";
import { useActiveHeading } from "@/lib/useActiveHeadingd"
export default function PostToc({ toc }: { toc: TocItem[] }) {
  const activeH1 = useActiveHeading();

  return (
    <aside className="sticky top-20 h-fit max-h-[80vh] overflow-auto">
      <h3 className="font-bold mb-4">목차</h3>

      <ul className="space-y-2">
        {toc.map((item) => {
          const isH1 = item.level === 1;

          // H2/H3/H4는 현재 활성 H1의 topLevelId와 같은 경우만 보여줌
          const shouldShow = isH1 || item.topLevelId === activeH1;

          if (!shouldShow) return null;

          return (
            <li
              key={item.id}
              style={{ paddingLeft: (item.level - 1) * 16 }}
              className={
                item.id === activeH1 && isH1 ? "font-bold text-blue-500" : ""
              }
            >
              <a className="text-sm hover:underline" href={`#${item.id}`}>
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
