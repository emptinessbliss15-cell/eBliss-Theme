// Shared eBliss shell helpers. Theme color editing/saving is intentionally separate
// and will be added later.

export function createHeader({ appName = '', account = null, themeControl = true } = {}) {
  const header = document.createElement('header');
  header.className = 'eb-header';

  const inner = document.createElement('div');
  inner.className = 'eb-header-inner';

  const left = document.createElement('div');
  left.className = 'eb-row';
  left.innerHTML = `<a class="eb-brand" href="/">eBliss</a>${appName ? `<span class="eb-app-name">${appName}</span>` : ''}`;

  const right = document.createElement('div');
  right.className = 'eb-row';

  if (themeControl) {
    const theme = document.createElement('select');
    theme.setAttribute('aria-label', 'Theme');
    theme.innerHTML = '<option value="system">System</option><option value="light">Light</option><option value="dark">Dark</option>';
    theme.addEventListener('change', () => {
      document.documentElement.dataset.theme = theme.value;
      if (theme.value === 'system') delete document.documentElement.dataset.theme;
    });
    right.append(theme);
  }

  if (account) {
    const accountLabel = document.createElement('span');
    accountLabel.className = 'eb-muted';
    accountLabel.textContent = account.email || account.name || 'Account';
    right.append(accountLabel);
  }

  inner.append(left, right);
  header.append(inner);
  return header;
}

export function createSubheader({ views = [], activeView = '' } = {}) {
  const subheader = document.createElement('div');
  subheader.className = 'eb-subheader';

  const inner = document.createElement('div');
  inner.className = 'eb-subheader-inner';

  const controls = document.createElement('div');
  controls.className = 'eb-view-controls';
  controls.setAttribute('aria-label', 'View');

  for (const view of views) {
    const button = document.createElement('button');
    button.className = 'eb-view-button secondary';
    button.textContent = view.label || view.id;
    button.dataset.view = view.id;
    button.setAttribute('aria-current', String(view.id === activeView));
    controls.append(button);
  }

  inner.append(controls);
  subheader.append(inner);
  return subheader;
}
