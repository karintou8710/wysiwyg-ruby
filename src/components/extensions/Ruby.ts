import { mergeAttributes, Node } from '@tiptap/react'

export type RubyAttributes = {
  reading: string
  text: string
}

declare module '@tiptap/react' {
  interface Commands<ReturnType> {
    ruby: {
      insertRuby: (attributes: RubyAttributes) => ReturnType
    }
  }
}

const Ruby = Node.create({
  name: 'ruby',

  group: 'inline',

  inline: true,

  atom: true,

  selectable: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  addAttributes() {
    return {
      text: {
        default: '',
      },
      reading: {
        default: '',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'ruby',
        getAttrs: (element) => {
          if (!(element instanceof HTMLElement)) {
            return false
          }

          const reading = element.querySelector('rt')?.textContent?.trim() ?? ''
          const text = Array.from(element.childNodes)
            .filter((node) => {
              return !(node instanceof HTMLElement && node.tagName === 'RT')
            })
            .map((node) => node.textContent ?? '')
            .join('')
            .trim()

          return { reading, text }
        },
      },
    ]
  },

  renderHTML({ HTMLAttributes, node }) {
    const { reading, text } = node.attrs as RubyAttributes

    return [
      'ruby',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      text,
      ['rt', reading],
    ]
  },

  addCommands() {
    return {
      insertRuby:
        (attributes) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: attributes,
          })
        },
    }
  },
})

export default Ruby
