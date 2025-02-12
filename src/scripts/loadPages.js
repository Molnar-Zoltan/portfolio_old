const filePath = "./src/pages/";

async function loadPage(file, pageID) {

    try {
        const response = await fetch(file);

        if (!response.ok) {
            throw new Error("Failed to load the page.");
        }

        const html = await response.text();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        //document.getElementById(pageID).innerHTML = DOMPurify.sanitize(html);
        while (tempDiv.firstChild) {
            document.getElementById(pageID).appendChild(tempDiv.firstChild);
        }
        //document.getElementById(pageID).appendChild(tempDiv.firstElementChild);
        document.getElementById(pageID).dispatchEvent(new Event("contentUpdated"));

    }
    catch(error) {
        console.error(error);
    }

}

loadPage(`${filePath}about.html`, "about");
loadPage(`${filePath}skills.html`, "skills");
loadPage(`${filePath}projects.html`, "projects");
loadPage(`${filePath}contact.html`, "contact");
