const urlParams = new URLSearchParams(window.location.search);
const fileUrl = urlParams.get('url');

const getNotebook = async (url) => {
    const response = await fetch(url)
    const notebook = await response.json()
    return notebook
}

let notebookUrl =  "../documents/" + fileUrl

getNotebook(notebookUrl).then((data) => {
    const element = ipynb2html.render(data)
    const container = document.getElementById('md-inner') || document.getElementById('content') || document.body
    container.appendChild(element)
})

console.log("Script loaded")
