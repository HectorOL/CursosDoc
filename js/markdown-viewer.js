const { Marked } = globalThis.marked;
const { markedHighlight } = globalThis.markedHighlight;
const urlParams = new URLSearchParams(window.location.search);
const fileUrl = urlParams.get('url');

console.log(globalThis.markedHighlight);

const marked = new Marked(
  markedHighlight({
	emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight(code, lang, info) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
);

// Configuración de extensiones
marked.use(markedKatex({
    throwOnError: false,
    displayMode: false
}));
marked.use(markedCustomHeadingId());

// Configuración básica
marked.use({
    gfm: true,        
    breaks: true,
    tables: true,     
    pedantic: false 
});

async function renderMarkdown(filePath) {
    try {
        const response = await fetch(filePath);
        const markdown = await response.text();
        document.getElementById('content').innerHTML = 
            DOMPurify.sanitize(marked.parse(markdown));
    } catch (error) {
        console.error('Error loading markdown file:', error);
        document.getElementById('content').innerHTML = 
            '<p>Error loading markdown content</p>';
    }
}

// Ejecutar cuando el documento esté listo
document.addEventListener('DOMContentLoaded', () => {
    renderMarkdown(`/documents/${fileUrl}.md`);
});
