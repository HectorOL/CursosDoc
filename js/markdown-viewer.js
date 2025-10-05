const urlParams = new URLSearchParams(window.location.search);
const fileUrl = urlParams.get('url');

const getNotebook = async (url) => {
    const response = await fetch(url)
    const notebook = await response.json()
    return notebook
}
let notebookUrl =  "../documents/" + fileUrl
const notebook = getNotebook(notebookUrl).then((data) => {
    console.log(data)
    const element = ipynb2html.render(data)
    document.body.appendChild(element)
})

console.log("Script loaded")
