import { Link, Outlet } from '@tanstack/react-router'
import './App.css'

const editorLinks = [
  {
    to: '/' as const,
    label: 'Tiptap Editor',
    exact: true,
  },
  {
    to: '/contenteditable' as const,
    label: 'contenteditable Editor',
  },
] as const

function App() {
  return (
    <main className="app">
      <section className="app-intro" aria-labelledby="app-title">
        <p className="app-eyebrow">Ruby WYSIWYG Editor</p>
        <h1 id="app-title">日本語のルビを扱える WYSIWYG エディター</h1>
        <p className="app-description">
          contenteditable 単体と Tiptap を使用したエディターの両方で、ルビの挙動比較ができます。
        </p>
      </section>

      <nav className="app-nav" aria-label="Editor switcher">
        {editorLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            preload="intent"
            activeOptions={'exact' in link ? { exact: true } : undefined}
            activeProps={{ className: 'app-navLink app-navLinkActive' }}
            inactiveProps={{ className: 'app-navLink' }}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <Outlet />
    </main>
  )
}

export default App
