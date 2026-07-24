import { visit } from 'unist-util-visit';

export function remarkObsidian() {
  const baseUrl = (process.env.BASE_URL || '/notes').replace(/\/$/, '');

  return (tree) => {
    visit(tree, 'paragraph', (node) => {
      if (!node.children) return;

      const newChildren = [];

      for (const child of node.children) {
        if (child.type === 'text') {
          const value = child.value;
          const regex = /!\[\[(.*?)\]\]|\[\[(.*?)\]\]/g;
          let match;
          let lastIndex = 0;

          while ((match = regex.exec(value)) !== null) {
            if (match.index > lastIndex) {
              newChildren.push({
                type: 'text',
                value: value.slice(lastIndex, match.index),
              });
            }

            if (match[1]) {
              const fileName = match[1].trim();
              const ext = fileName.split('.').pop()?.toLowerCase() || '';
              const src = `${baseUrl}/images/${fileName}`;

              if (['mp4', 'webm', 'ogg', 'mov'].includes(ext)) {
                newChildren.push({
                  type: 'html',
                  value: `<div class="my-6"><video src="${src}" controls class="w-full rounded-2xl border border-[var(--border-card)] shadow-xl" preload="metadata"></video></div>`,
                });
              } else {
                newChildren.push({
                  type: 'html',
                  value: `<div class="my-6"><img src="${src}" alt="${fileName}" class="w-full rounded-2xl border border-[var(--border-card)] shadow-xl hover:scale-[1.01] transition-transform duration-300" loading="lazy" /></div>`,
                });
              }
            } else if (match[2]) {
              const pageName = match[2].trim();
              const href = `${baseUrl}/notes/${encodeURIComponent(pageName)}`;
              newChildren.push({
                type: 'html',
                value: `<a href="${href}" class="text-sky-400 underline hover:text-sky-300 transition-colors">${pageName}</a>`,
              });
            }

            lastIndex = regex.lastIndex;
          }

          if (lastIndex < value.length) {
            newChildren.push({
              type: 'text',
              value: value.slice(lastIndex),
            });
          }
        } else {
          newChildren.push(child);
        }
      }

      node.children = newChildren;
    });
  };
}
