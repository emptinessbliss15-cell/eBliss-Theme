// Protocol-facing navigation model.
// The left rail selects an application; the tree selects a context within it.
// Rendering is intentionally separate so the same model can become 2D, 3D, text, etc.

export function createNavigationModel({ apps = [], tree = [] } = {}) {
  return { apps, tree };
}

export function createAppRail({ apps = [], activeApp = '' } = {}) {
  const rail = document.createElement('nav');
  rail.className = 'eb-app-rail';
  rail.setAttribute('aria-label', 'Applications');

  for (const app of apps) {
    const button = document.createElement('button');
    button.className = 'eb-app-button';
    button.textContent = app.icon || app.label || app.id;
    button.title = app.label || app.id;
    button.dataset.app = app.id;
    button.setAttribute('aria-current', String(app.id === activeApp));
    rail.append(button);
  }

  return rail;
}

export function createTree({ nodes = [], onSelect = () => {} } = {}) {
  const tree = document.createElement('nav');
  tree.className = 'eb-tree';
  tree.setAttribute('aria-label', 'Context');

  const renderNodes = (items, parent) => {
    for (const node of items) {
      const row = document.createElement('div');
      row.className = 'eb-tree-row';
      row.style.paddingInlineStart = `${(node.depth || 0) * 16}px`;

      const button = document.createElement('button');
      button.className = 'eb-tree-node';
      button.textContent = `${node.expanded ? '▾' : node.children?.length ? '▸' : '•'} ${node.label || node.id}`;
      button.dataset.node = node.id;
      button.addEventListener('click', () => onSelect(node));
      row.append(button);
      parent.append(row);

      if (node.expanded && node.children?.length) renderNodes(node.children, parent);
    }
  };

  renderNodes(nodes, tree);
  return tree;
}
