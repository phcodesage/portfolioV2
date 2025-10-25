export function externalLinks() {
  return function (tree) {
    const visit = (node) => {
      if (node.type === 'link') {
        const url = node.url;
        if (url.startsWith('http')) {
          node.data = node.data || {};
          node.data.hProperties = node.data.hProperties || {};
          node.data.hProperties.target = '_blank';
          node.data.hProperties.rel = 'noopener noreferrer';
        }
      }
      if (node.children) {
        node.children.forEach(visit);
      }
    };
    visit(tree);
  };
}