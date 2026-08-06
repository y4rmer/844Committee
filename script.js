
const gallery=document.getElementById("document-gallery");
const searchInput=document.getElementById("document-search");
const filterButtons=document.querySelectorAll(".filter-btn");

let currentFilter="all";
let documentData=[];

function loadDocuments(){

    documentData=response;

    displayDocuments();

}

function createCard(doc){

    const card=document.createElement("div");
    card.className="document-card";

    card.innerHTML=`
        <h3>${doc.name}</h3>

        <p><strong>Category:</strong> ${doc.category}</p>

        <a href="${doc.file}" target="_blank">
            <button class="open-btn">
                Open Document
            </button>
        </a>
    `;

    return card;

}

function displayDocuments(){

    const term=searchInput.value.toLowerCase();

    let docs=documentData.filter(doc=>{

        return currentFilter==="all" || doc.category===currentFilter;

    });

    docs=docs.filter(doc=>{

        return doc.name.toLowerCase().includes(term)
        || doc.category.toLowerCase().includes(term);

    });

    gallery.innerHTML="";

    if(docs.length===0){

        gallery.innerHTML="<h2 style='color:white'>No documents found.</h2>";
        return;

    }

    docs.forEach(doc=>{

        gallery.appendChild(createCard(doc));

    });

}

filterButtons.forEach(btn=>{

    btn.addEventListener("click",()=>{

        filterButtons.forEach(b=>b.classList.remove("active"));

        btn.classList.add("active");

        currentFilter=btn.dataset.filter;

        displayDocuments();

    });

});

searchInput.addEventListener("input",displayDocuments);

loadDocuments();
