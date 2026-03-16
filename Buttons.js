// Author: Mario Aguilera Piceno
// File: Buttons.js
// Date: 02/20/2023
// Last Modified: 02/20/2026 

// Attributes
var previous_ID = null;
var previous_ID_Project = null;
var previous_pic_elemID = null;

// Picture of the Day Prompt
function picOfDay(elemID, description, date, url, picNumber) {

    // Open or Close
    if (description && document.getElementById(elemID) !== null) {

        // Open Current Pic of Day
        previous_pic_elemID = elemID;
        let prompt = document.getElementById(elemID);
        prompt.innerHTML = 
        "<div style='width: 100%; height: 100%; text-align: center;'>" + 
        "<hr>" +
        "<h2 style='font-size: 2.8vw; color: rgb(255, 255, 255);'>Picture of the Day | #" + picNumber + "</h2>" +
        "<img onclick=\"window.open('" + url + "')\" src='" + url + "' style='cursor: pointer; aspect-ratio: 1/1; width: 50%; height: 50%; -webkit-user-drag: none;'>" +
        "<p style='font-size: 2.1vw; color: rgb(255, 255, 255);'>" + date + "</p>" +
        "<p style='font-size: 2.1vw; color: rgb(255, 255, 255);'>" + description + "</p>" + 
        "<button style='color: #ffffff; outline: none; background-color: rgba(119, 20, 20, 0); border-color: #ffffff; border-radius: 1%; text-align: center; font-size: 1vw; width: 80%; height: 5%;' id='Close' onclick=\"picOfDay('" + elemID + "')\">Close</button>" + 
        "<hr>" +
        "</div>";
        prompt.style.display = "block";
        prompt.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
        });
    } else if(document.getElementById(elemID) !== null) {

        // Close Current Pic of Day
        let prompt = document.getElementById(elemID);
        prompt.style.display = "none";
        prompt.innerHTML = "";
        previous_pic_ID = null;
        
        // Scrool to Calendar
        let calendar = document.getElementById(elemID+"_Cal");
        calendar.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
        });
    }
}

// Insert Subpages
function innerPage(pageName) {
    // Check Page; Insert HTML data if page exists
    const div_ID = pageName + "_DIV";
    if (document.getElementById(div_ID) !== null) {
        let careerTextArea = document.getElementById(div_ID);
        fetch("./Pages/Projects/" + pageName + "/index.html")
        .then(response => response.text())
        .then(html => {
            careerTextArea.innerHTML = html;
        })
        .catch(error => {
            console.error("Error loading page:", error);
        });
    } else {
        console.log("Did not fetch: " + div_ID);
    }
}

//Handle Menu Buttons' Inputs 
function myFunction(typ3) {

    // Hide Previous Open Menus
    if (previous_ID !== null && typ3 !== previous_ID)
    {
        var x_previous = document.getElementById(previous_ID);
        x_previous.style.display = "none";
    }

    //Hide Previous visible project if not null
    if (previous_ID_Project !== null && typ3 !== previous_ID_Project)
    {
        var proj_previous = document.getElementById(previous_ID_Project);
        proj_previous.style.display = "none";
    }

    // Obtain Desired Menu
    var x = document.getElementById(typ3);
    previous_ID = typ3;

    // Open or Close Desired Menu
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
  }

//Handle Project Buttons' Inputs
function myFunctionProject(typ3) {

    // Hide Previous Project
    if (previous_ID_Project !== null && typ3 !== previous_ID_Project)
    {
        var x_previous = document.getElementById(previous_ID_Project);
        x_previous.style.display = "none";
    }

    // Find Element
    var x = document.getElementById(typ3);
    previous_ID_Project = typ3;

    // Show or Hide Desired Element
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

// Handle GoTo Top and Close Buttons
function myFunctionTopClose(typ3) {
    if (typ3 === "Top") {
        window.scrollTo({top: 0, behavior: 'smooth'});
    } else {
        window.scrollTo({top: 0, behavior: 'smooth'});
        document.getElementById(typ3).style.display = "none";
    }
}

// Run Functions
document.addEventListener('DOMContentLoaded', function() {
    innerPage("Calendar");
    innerPage("PDF-Dark-Mode");
});

// Dark Mode App:
let modifiedPdfBytes;
let originalPdfData = null;
let originalFileName = "";
let currentRenderId = 0;

// Theme definitions
const themes = {
    classic: {
        r: 0,
        g: 0,
        b: 0,
        name: 'Classic'
    },
    claude: {
        r: 42,
        g: 37,
        b: 34,
        name: 'Claude Warm'
    },
    chatgpt: {
        r: 52,
        g: 53,
        b: 65,
        name: 'ChatGPT Cool'
    },
    sepia: {
        r: 40,
        g: 35,
        b: 25,
        name: 'Sepia'
    },
    midnight: {
        r: 25,
        g: 30,
        b: 45,
        name: 'Midnight Blue'
    },
    forest: {
        r: 25,
        g: 35,
        b: 30,
        name: 'Forest Green'
    }
};

// Retrieve PDF JS's
const pdfJsSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js";
const pdfWorkerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";
const pdfLibSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.11.0/pdf-lib.min.js";
let pdfLibReadyPromise = null;

// Load Libraries
function loadPdfLibraries() {
    if (pdfLibReadyPromise) return pdfLibReadyPromise;
    pdfLibReadyPromise = new Promise((resolve, reject) => {
        const pdfJsScript = document.createElement('script');
        pdfJsScript.src = pdfJsSrc;
        pdfJsScript.crossOrigin = 'anonymous';
        pdfJsScript.referrerPolicy = 'no-referrer';
        pdfJsScript.onload = () => {
            pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;
            const pdfLibScript = document.createElement('script');
            pdfLibScript.src = pdfLibSrc;
            pdfLibScript.crossOrigin = 'anonymous';
            pdfLibScript.referrerPolicy = 'no-referrer';
            pdfLibScript.onload = () => resolve();
            pdfLibScript.onerror = reject;
            document.head.appendChild(pdfLibScript);
        };
        pdfJsScript.onerror = reject;
        document.head.appendChild(pdfJsScript);
    });
    return pdfLibReadyPromise;
}

// Wait for pdfLibraries
async function ensurePdfLibraries() {
    try {
        await loadPdfLibraries();
        //document.getElementById('fileInput').click(); // open file picker
    } catch (e) {
        alert("Unable to load PDF libraries. Please check your connection and try again.");
        throw e;
    }
}

// Apply Theme
function applyThemeBackground(theme) {
    document.getElementById('PDF-Dark-Mode_DIV').style.backgroundColor = `rgb(${theme.r}, ${theme.g}, ${theme.b})`;
}
const selector = document.getElementById('themeSelector');
if (selector) {
    applyThemeBackground(themes[selector.value]);
}

// Handle PDF File
function handleFile(file) {
    originalFileName = file.name.replace(/\.pdf$/i, '');
    const fileReader = new FileReader();
    fileReader.onload = async function() {
        const fileData = new Uint8Array(this.result);
        await ensurePdfLibraries();
        originalPdfData = fileData;
        const progressContainer = document.getElementById('progressContainer');
        progressContainer.style.display = 'block';
        document.getElementById('downloadBtn').style.display = 'none';
        await renderPDF(fileData);
    };
    fileReader.readAsArrayBuffer(file);
}

// Handle File Change
function handleFileInputChange(event) {
    if (event.target.files.length > 0) {
        handleFile(event.target.files[0]);
    }
}

// Hangle Drag and Drop
function handleDragOver(event) {
    event.preventDefault();
}

// Handle Drag and Drop
function handleDrop(event) {
    event.preventDefault(); // Prevent default browser behavior
    if (event.dataTransfer.files.length > 0) {
        handleFile(event.dataTransfer.files[0]); // Your existing file handler
    }
}

// Change Theme
async function changeTheme() {
    const selectedTheme = document.getElementById('themeSelector').value;
    applyThemeBackground(themes[selectedTheme]);
    if (originalPdfData) {
        await ensurePdfLibraries();
        const progressContainer = document.getElementById('progressContainer');
        progressContainer.style.display = 'block';
        document.getElementById('downloadBtn').style.display = 'none';
        await renderPDF(originalPdfData);
    }
}

// Handle Fild Upload Button
async function handleFileUploadClick() {
    try {
        await loadPdfLibraries();
    } catch (e) {
        // ignore errors
    }
}

// Author: Mario Aguilera Piceno
// File: Buttons.js
// Date: 02/20/2023
// Last Modified: 02/20/2026 

// Attributes
var previous_ID = null;
var previous_ID_Project = null;
var previous_pic_elemID = null;

// Picture of the Day Prompt
function picOfDay(elemID, description, date, url, picNumber) {

    // Open or Close
    if (description && document.getElementById(elemID) !== null) {

        // Open Current Pic of Day
        previous_pic_elemID = elemID;
        let prompt = document.getElementById(elemID);
        prompt.innerHTML = 
        "<div style='width: 100%; height: 100%; text-align: center;'>" + 
        "<hr>" +
        "<h2 style='font-size: 2.8vw; color: rgb(255, 255, 255);'>Picture of the Day | #" + picNumber + "</h2>" +
        "<img onclick=\"window.open('" + url + "')\" src='" + url + "' style='cursor: pointer; aspect-ratio: 1/1; width: 50%; height: 50%; -webkit-user-drag: none;'>" +
        "<p style='font-size: 2.1vw; color: rgb(255, 255, 255);'>" + date + "</p>" +
        "<p style='font-size: 2.1vw; color: rgb(255, 255, 255);'>" + description + "</p>" + 
        "<button style='color: #ffffff; outline: none; background-color: rgba(119, 20, 20, 0); border-color: #ffffff; border-radius: 1%; text-align: center; font-size: 1vw; width: 80%; height: 5%;' id='Close' onclick=\"picOfDay('" + elemID + "')\">Close</button>" + 
        "<hr>" +
        "</div>";
        prompt.style.display = "block";
        prompt.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
        });
    } else if(document.getElementById(elemID) !== null) {

        // Close Current Pic of Day
        let prompt = document.getElementById(elemID);
        prompt.style.display = "none";
        prompt.innerHTML = "";
        previous_pic_ID = null;
        
        // Scrool to Calendar
        let calendar = document.getElementById(elemID+"_Cal");
        calendar.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
        });
    }
}

// Insert Subpages
function innerPage(pageName) {
    // Check Page; Insert HTML data if page exists
    const div_ID = pageName + "_DIV";
    if (document.getElementById(div_ID) !== null) {
        let careerTextArea = document.getElementById(div_ID);
        fetch("./Pages/Projects/" + pageName + "/index.html")
        .then(response => response.text())
        .then(html => {
            careerTextArea.innerHTML = html;
        })
        .catch(error => {
            console.error("Error loading page:", error);
        });
    } else {
        console.log("Did not fetch: " + div_ID);
    }
}

//Handle Menu Buttons' Inputs 
function myFunction(typ3) {

    // Hide Previous Open Menus
    if (previous_ID !== null && typ3 !== previous_ID)
    {
        var x_previous = document.getElementById(previous_ID);
        x_previous.style.display = "none";
    }

    //Hide Previous visible project if not null
    if (previous_ID_Project !== null && typ3 !== previous_ID_Project)
    {
        var proj_previous = document.getElementById(previous_ID_Project);
        proj_previous.style.display = "none";
    }

    // Obtain Desired Menu
    var x = document.getElementById(typ3);
    previous_ID = typ3;

    // Open or Close Desired Menu
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
  }

//Handle Project Buttons' Inputs
function myFunctionProject(typ3) {

    // Hide Previous Project
    if (previous_ID_Project !== null && typ3 !== previous_ID_Project)
    {
        var x_previous = document.getElementById(previous_ID_Project);
        x_previous.style.display = "none";
    }

    // Find Element
    var x = document.getElementById(typ3);
    previous_ID_Project = typ3;

    // Show or Hide Desired Element
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

// Handle GoTo Top and Close Buttons
function myFunctionTopClose(typ3) {
    if (typ3 === "Top") {
        window.scrollTo({top: 0, behavior: 'smooth'});
    } else {
        window.scrollTo({top: 0, behavior: 'smooth'});
        document.getElementById(typ3).style.display = "none";
    }
}

// Run Functions
document.addEventListener('DOMContentLoaded', function() {
    innerPage("Calendar");
    innerPage("PDF-Dark-Mode");
});

// Dark Mode App:
let modifiedPdfBytes;
let originalPdfData = null;
let originalFileName = "";
let currentRenderId = 0;

// Theme definitions
const themes = {
    classic: {
        r: 0,
        g: 0,
        b: 0,
        name: 'Classic'
    },
    claude: {
        r: 42,
        g: 37,
        b: 34,
        name: 'Claude Warm'
    },
    chatgpt: {
        r: 52,
        g: 53,
        b: 65,
        name: 'ChatGPT Cool'
    },
    sepia: {
        r: 40,
        g: 35,
        b: 25,
        name: 'Sepia'
    },
    midnight: {
        r: 25,
        g: 30,
        b: 45,
        name: 'Midnight Blue'
    },
    forest: {
        r: 25,
        g: 35,
        b: 30,
        name: 'Forest Green'
    }
};

// Retrieve PDF JS's
const pdfJsSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js";
const pdfWorkerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";
const pdfLibSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.11.0/pdf-lib.min.js";
let pdfLibReadyPromise = null;

// Load Libraries
function loadPdfLibraries() {
    if (pdfLibReadyPromise) return pdfLibReadyPromise;
    pdfLibReadyPromise = new Promise((resolve, reject) => {
        const pdfJsScript = document.createElement('script');
        pdfJsScript.src = pdfJsSrc;
        pdfJsScript.crossOrigin = 'anonymous';
        pdfJsScript.referrerPolicy = 'no-referrer';
        pdfJsScript.onload = () => {
            pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;
            const pdfLibScript = document.createElement('script');
            pdfLibScript.src = pdfLibSrc;
            pdfLibScript.crossOrigin = 'anonymous';
            pdfLibScript.referrerPolicy = 'no-referrer';
            pdfLibScript.onload = () => resolve();
            pdfLibScript.onerror = reject;
            document.head.appendChild(pdfLibScript);
        };
        pdfJsScript.onerror = reject;
        document.head.appendChild(pdfJsScript);
    });
    return pdfLibReadyPromise;
}

// Wait for pdfLibraries
async function ensurePdfLibraries() {
    try {
        await loadPdfLibraries();
        //document.getElementById('fileInput').click(); // open file picker
    } catch (e) {
        alert("Unable to load PDF libraries. Please check your connection and try again.");
        throw e;
    }
}

// Apply Theme
function applyThemeBackground(theme) {
    document.getElementById('PDF-Dark-Mode_DIV').style.backgroundColor = `rgb(${theme.r}, ${theme.g}, ${theme.b})`;
}
const selector = document.getElementById('themeSelector');
if (selector) {
    applyThemeBackground(themes[selector.value]);
}

// Handle PDF File
function handleFile(file) {
    originalFileName = file.name.replace(/\.pdf$/i, '');
    const fileReader = new FileReader();
    fileReader.onload = async function() {
        const fileData = new Uint8Array(this.result);
        await ensurePdfLibraries();
        originalPdfData = fileData;
        const progressContainer = document.getElementById('progressContainer');
        progressContainer.style.display = 'block';
        document.getElementById('downloadBtn').style.display = 'none';
        await renderPDF(fileData);
    };
    fileReader.readAsArrayBuffer(file);
}

// Handle File Change
function handleFileInputChange(event) {
    if (event.target.files.length > 0) {
        handleFile(event.target.files[0]);
    }
}

// Hangle Drag and Drop
function handleDragOver(event) {
    event.preventDefault();
}

// Handle Drag and Drop
function handleDrop(event) {
    event.preventDefault(); // Prevent default browser behavior
    if (event.dataTransfer.files.length > 0) {
        handleFile(event.dataTransfer.files[0]); // Your existing file handler
    }
}

// Change Theme
async function changeTheme() {
    const selectedTheme = document.getElementById('themeSelector').value;
    applyThemeBackground(themes[selectedTheme]);
    if (originalPdfData) {
        await ensurePdfLibraries();
        const progressContainer = document.getElementById('progressContainer');
        progressContainer.style.display = 'block';
        document.getElementById('downloadBtn').style.display = 'none';
        await renderPDF(originalPdfData);
    }
}

// Handle Fild Upload Button
async function handleFileUploadClick() {
    try {
        await loadPdfLibraries();
    } catch (e) {
        // ignore errors
    }
}

// Render PDF
async function renderPDF(pdfData) {
    const renderId = ++currentRenderId;
    const selectedTheme = document.getElementById('themeSelector').value;
    const theme = themes[selectedTheme];
    applyThemeBackground(theme);

    const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;

    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const pdfContainer = document.getElementById('pdfContainer');
    const progressContainer = document.getElementById('progressContainer');

    modifiedPdfBytes = null;
    progressBar.style.width = '0';
    progressText.innerText = `0/${pdf.numPages}`;
    pdfContainer.innerHTML = '';

    const CHUNK_SIZE = 50; // optional chunking for memory management
    const totalPages = pdf.numPages;
    const chunks = [];

    for (let chunkStart = 0; chunkStart < totalPages; chunkStart += CHUNK_SIZE) {
        if (renderId !== currentRenderId) return;

        const chunkDoc = await PDFLib.PDFDocument.create();
        const chunkEnd = Math.min(chunkStart + CHUNK_SIZE, totalPages);

        for (let i = chunkStart; i < chunkEnd; i++) {
            if (renderId !== currentRenderId) return;

            const page = await pdf.getPage(i + 1);
            const scale = window.devicePixelRatio > 1 ? 2 : 1.5;
            const viewport = page.getViewport({ scale });
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = viewport.width;
            canvas.height = viewport.height;
            canvas.style.border = "1px solid white";
            canvas.style.marginTop = "10px";

            await page.render({ canvasContext: ctx, viewport }).promise;

            // Apply dark mode pixel-wise to all pages
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            const bgR = theme.r;
            const bgG = theme.g;
            const bgB = theme.b;

            for (let j = 0; j < data.length; j += 4) {
                const r = data[j];
                const g = data[j + 1];
                const b = data[j + 2];
                const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
                const factor = 1 - (brightness / 255);

                data[j]     = bgR + (255 - bgR) * factor;
                data[j + 1] = bgG + (255 - bgG) * factor;
                data[j + 2] = bgB + (255 - bgB) * factor;
            }
            ctx.putImageData(imageData, 0, 0);

            // Append **all pages** to DOM
            canvas.style.maxWidth = '100%';
            canvas.style.height = 'auto';
            pdfContainer.appendChild(canvas);

            // Convert canvas to PNG for PDF
            const imgBytes = await new Promise(resolve =>
                canvas.toBlob(blob => blob.arrayBuffer().then(resolve), 'image/png')
            );

            const jpgImage = await chunkDoc.embedPng(imgBytes);
            const newPage = chunkDoc.addPage([viewport.width, viewport.height]);
            newPage.drawImage(jpgImage, {
                x: 0,
                y: 0,
                width: viewport.width,
                height: viewport.height
            });

            page.cleanup();

            // Update progress
            const percent = ((i + 1) / totalPages) * 100;
            progressBar.style.width = `${percent}%`;
            progressText.innerText = `${i + 1}/${totalPages}`;
        }

        const chunkBytes = await chunkDoc.save();
        chunks.push(chunkBytes);
    }

    progressText.innerText = "Merging PDF chunks...";

    // Merge all chunks into final PDF
    const finalPdfDoc = await PDFLib.PDFDocument.create();
    for (let i = 0; i < chunks.length; i++) {
        if (renderId !== currentRenderId) return;
        const chunkDoc = await PDFLib.PDFDocument.load(chunks[i]);
        const copiedPages = await finalPdfDoc.copyPages(chunkDoc, chunkDoc.getPageIndices());
        copiedPages.forEach(page => finalPdfDoc.addPage(page));
        chunks[i] = null;
    }

    progressText.innerText = "Finalizing...";
    modifiedPdfBytes = await finalPdfDoc.save();

    if (renderId !== currentRenderId) return;
    progressContainer.style.display = 'none';
    triggerDownload();
}

function triggerDownload() {
    if (modifiedPdfBytes) {
        const selectedTheme = document.getElementById('themeSelector').value;
        const themeName = themes[selectedTheme].name.toLowerCase().replace(/\s+/g, '_');
        const blob = new Blob([modifiedPdfBytes], {
            type: 'application/pdf'
        });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${originalFileName}_${themeName}_dark.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        document.getElementById('downloadBtn').style.display = 'block';
    }
}
function triggerDownload() {
    if (modifiedPdfBytes) {
        const selectedTheme = document.getElementById('themeSelector').value;
        const themeName = themes[selectedTheme].name.toLowerCase().replace(/\s+/g, '_');
        const blob = new Blob([modifiedPdfBytes], {
            type: 'application/pdf'
        });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${originalFileName}_${themeName}_dark.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        document.getElementById('downloadBtn').style.display = 'block';
    }
}
