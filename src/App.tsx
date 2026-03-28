import './App.css'
import Editor from './components/Editor'

function App() {
  return (
    <main className="app">
      <section className="app-intro" aria-labelledby="app-title">
        <p className="app-eyebrow">Ruby WYSIWYG Editor</p>
        <h1 id="app-title">日本語のルビを扱える WYSIWYG エディター</h1>
        <p className="app-description">
          日本語のルビをその場で編集できる WYSIWYG エディターです。
          ルビは <code>contenteditable=false</code> として定義しており、
          モーダルを通して読みを編集できます。
        </p>
      </section>
      <Editor />
    </main>
  )
}

export default App
