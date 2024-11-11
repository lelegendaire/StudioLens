window.onload = displayUploadedFile;
const form = document.querySelector(".wrapper form");
const dropZone = document.querySelector('.drop-zone');
const fileInput = document.querySelector(".file-input");
const linkImg = document.getElementById("link_img");
const uploadedArea = document.querySelector('.uploaded-area');
const progressArea = document.querySelector('.progress-area');
const generate_btn = document.querySelector('.generate_btn');
const scrolling_gallery_img = document.querySelectorAll('.scrolling_gallery .scroll.imgbx div img');
let Img_src = [
    "https://cdn.pixabay.com/photo/2023/11/01/11/07/path-8357152_640.jpg",
    "https://cdn.pixabay.com/photo/2024/02/07/14/02/tree-8559118_1280.jpg",
    "https://cdn.pixabay.com/photo/2024/02/07/18/00/mushroom-8559536_640.jpg",
    "https://cdn.pixabay.com/photo/2024/04/10/22/52/autumn-8688873_640.jpg",
    "https://cdn.pixabay.com/photo/2024/03/09/16/59/typewriter-8622984_640.jpg",
    "https://cdn.pixabay.com/photo/2024/04/08/11/42/doggy-8683291_640.jpg",
    "https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455_1280.jpg",
    "https://cdn.pixabay.com/photo/2021/08/08/10/34/ocean-6530523_640.jpg",
    "https://cdn.pixabay.com/photo/2022/05/05/01/05/nature-7175030_640.jpg",
    "https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989_640.jpg",
    "https://cdn.pixabay.com/photo/2022/09/02/13/35/mountains-7427623_640.jpg",
    "https://cdn.pixabay.com/photo/2022/11/12/16/42/elk-7587415_640.jpg",
    "https://cdn.pixabay.com/photo/2022/08/15/09/14/koyasan-temple-7387445_640.jpg",
    "https://cdn.pixabay.com/photo/2018/08/14/09/59/mountains-3605113_640.jpg",
    "https://cdn.pixabay.com/photo/2014/08/15/11/29/beach-418742_640.jpg",
    "https://cdn.pixabay.com/photo/2022/10/02/15/42/sunrise-7493833_640.jpg",
    "https://cdn.pixabay.com/photo/2018/05/30/00/24/thunderstorm-3440450_640.jpg",
    "https://cdn.pixabay.com/photo/2015/01/28/23/34/mountains-615428_640.jpg",
    "https://cdn.pixabay.com/photo/2022/11/14/08/37/park-7591049_640.jpg",
    "https://cdn.pixabay.com/photo/2016/02/09/19/57/aurora-1190254_640.jpg",
    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg",
    "https://cdn.pixabay.com/photo/2023/01/26/18/09/zebra-7746719_640.jpg",
    "https://cdn.pixabay.com/photo/2018/05/24/17/35/parrots-3427188_640.jpg",
    "https://cdn.pixabay.com/photo/2017/08/07/18/57/dog-2606759_640.jpg",
    "https://cdn.pixabay.com/photo/2015/10/28/15/05/lemurs-1010643_640.jpg",
    "https://cdn.pixabay.com/photo/2016/11/12/11/51/animals-1818690_640.jpg",
    "https://cdn.pixabay.com/photo/2021/05/14/21/49/elephants-6254556_640.jpg",
    "https://cdn.pixabay.com/photo/2015/06/19/21/33/seagulls-815304_640.jpg",
    "https://cdn.pixabay.com/photo/2016/10/07/13/00/bighorn-1721514_640.jpg",
    "https://cdn.pixabay.com/photo/2017/01/16/19/54/ireland-1985088_640.jpg",
    "https://cdn.pixabay.com/photo/2015/09/06/11/40/zebras-927272_640.jpg",
    "https://cdn.pixabay.com/photo/2017/04/30/18/33/kittens-2273598_640.jpg",
    "https://cdn.pixabay.com/photo/2022/11/07/18/29/bird-7576994_640.jpg",
    "https://cdn.pixabay.com/photo/2018/04/22/12/48/owl-3340957_640.jpg",
    "https://cdn.pixabay.com/photo/2016/09/10/19/56/lions-1660044_640.jpg",
    "https://cdn.pixabay.com/photo/2017/01/20/10/41/leopards-1994499_640.jpg",
    "https://cdn.pixabay.com/photo/2014/08/27/12/58/emperor-penguins-429128_640.jpg",
    "https://cdn.pixabay.com/photo/2015/08/22/15/39/giraffes-901009_640.jpg",
    "https://cdn.pixabay.com/photo/2014/06/16/20/52/gulls-370012_640.jpg",
    "https://cdn.pixabay.com/photo/2016/11/29/11/57/dolphins-1869337_640.jpg",
    "https://cdn.pixabay.com/photo/2014/04/17/18/04/insects-326693_640.jpg",
    "https://cdn.pixabay.com/photo/2022/01/03/05/45/sunset-6911736_640.jpg",
    "https://cdn.pixabay.com/photo/2022/09/11/09/26/sea-7446433_640.jpg",
    "https://cdn.pixabay.com/photo/2017/04/06/17/43/water-2208931_640.jpg",
    "https://cdn.pixabay.com/photo/2022/08/03/08/11/sea-7362107_640.jpg",
    "https://cdn.pixabay.com/photo/2021/09/24/02/48/sea-6651168_640.jpg",
    "https://cdn.pixabay.com/photo/2017/08/07/08/23/sea-2601374_640.jpg",
    "https://cdn.pixabay.com/photo/2017/02/08/17/24/fantasy-2049567_640.jpg",
    "https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg",
    "https://cdn.pixabay.com/photo/2021/09/20/21/32/lake-6641880_640.jpg",
    "https://cdn.pixabay.com/photo/2023/10/21/11/46/sunset-8331285_640.jpg",
    "https://cdn.pixabay.com/photo/2016/11/23/15/23/cosmos-1853491_640.jpg",
    "https://cdn.pixabay.com/photo/2012/11/28/08/54/milky-way-67504_640.jpg",
    "https://cdn.pixabay.com/photo/2011/12/14/12/17/galaxy-11098_640.jpg",
    "https://cdn.pixabay.com/photo/2020/07/27/14/34/stars-5442598_640.jpg",
    "https://cdn.pixabay.com/photo/2021/11/20/13/47/sky-6811874_640.jpg",
    "https://cdn.pixabay.com/photo/2016/02/09/16/35/night-1189929_640.jpg",
    "https://cdn.pixabay.com/photo/2019/10/04/18/36/milky-way-4526277_640.jpg",
    "https://cdn.pixabay.com/photo/2023/11/01/11/07/path-8357152_640.jpg",
    "https://cdn.pixabay.com/photo/2020/08/31/09/33/beach-5531919_640.jpg",
]
let index = 0; // Commence par la première image
scrolling_gallery_img.forEach((img, i) => {
    img.src = Img_src[(index + i) % Img_src.length];
})
generate_btn.addEventListener('click', () => {

    let uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
    const imageDisplay = document.getElementById("image_display");
    if (uploadedFiles.length > 0) {
        let uploadedFile = uploadedFiles[0]; // Il n'y a qu'un seul fichier dans le localStorage
        window.location.href = "edit.html"
    } else if (imageDisplay.src) {
        window.location.href = "edit.html"
    } else {
        alert("Télécharger une photo, ou veuillez appuyer sur 'entrer' pour le lien")
    }
});
form.addEventListener('click', (event) => {
    alert("Nous prenons seulement JPEG, PNG, GIF, WEBP, BMP, SVG, TIFF, AVIF")
    let uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];

    if (uploadedFiles.length > 0) {
        let uploadedFile = uploadedFiles[0]; // Il n'y a qu'un seul fichier dans le localStorage
        alert("Vous avez déjà importé un fichier")
    } else if (linkImg.value) {
        alert("Vous avez déjà importé un fichier par le lien")
    } else {

        fileInput.click();
    }
});
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => e.preventDefault());
    dropZone.addEventListener(eventName, (e) => e.stopPropagation());
});
// Gestion du drag and drop
dropZone.addEventListener('dragover', (e) => {

    dropZone.classList.add('dragover'); // Ajoute une classe lorsqu'on survole la zone
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover'); // Retire la classe quand on quitte la zone
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover'); // Retire la classe lorsque le fichier est déposé

    const files = e.dataTransfer.files; // Récupère le fichier déposé
    if (files.length) {
        fileInput.files = files; // Associe le fichier au file input
        console.log(files[0].name); // Log the name of the dropped file
        let fileName = files[0].name;
        if (fileName.length >= 12) {
            let splitName = fileName.split('.');
            fileName = splitName[0].substring(0, 13) + '... .' + splitName[1];
        } else {
            let splitName = fileName.split('.');
            fileName = splitName[0] + '...' + splitName[1];
        }

        uploadFile(fileName, files[0]);
        // Vous pouvez ici ajouter du code pour traiter ou afficher le fichier sélectionné
    }
});
const imageDisplay = document.getElementById("image_display");

// Ajoutez un événement pour détecter les changements de l'input
linkImg.addEventListener("keydown", function (event) {
    // Vérifier si l'utilisateur est dans l'input et appuie sur la touche "Entrée"
    if (event.key === "Enter" && document.activeElement === linkImg) {
        let uploadedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];

        if (uploadedFiles.length > 0) {
            // Si un fichier est déjà téléchargé, afficher une alerte et réinitialiser l'entrée
            alert("Vous devez supprimer votre fichier téléchargé");
            linkImg.value = "";
        } else {
            const imageUrl = linkImg.value;

            if (imageUrl) {
                // Si un lien d'image est fourni, l'afficher et l'ajouter à localStorage
                imageDisplay.src = imageUrl;
                imageDisplay.style.display = "block"; // Affiche l'image si un lien est présent
                const match = imageUrl.match(/\/([^\/]+\.(jpg|jpeg|png))$/i);
                const name_all = match ? match[1] : null;
                let name = name_all
                if (name_all.length >= 12) {
                    let splitName = name_all.split('.');
                    name = splitName[0].substring(0, 13) + '... .' + splitName[1];
                }
                uploadedFiles.push({ name, size: 0, ref: imageUrl, type: "link" });
                localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles));
            } else {
                // Cache l'image si aucun lien n'est présent
                imageDisplay.style.display = "none";
            }
        }
    }
});
linkImg.addEventListener("input", function () {
    let uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];

    if (uploadedFiles.length > 0) {
        let uploadedFile = uploadedFiles[0]; // Il n'y a qu'un seul fichier dans le localStorage
        alert("Vous devez supprimer votre fichier télécharger")
        linkImg.value = ""
    }
})

// Optionnel : masquer l'image au départ si aucun lien n'est entré
fileInput.onchange = ({ target }) => {
    let file = target.files[0];
    if (file) {
        let fileName = file.name;
        if (fileName.length >= 12) {
            let splitName = fileName.split('.');
            fileName = splitName[0].substring(0, 13) + '... .' + splitName[1];
        } else {
            let splitName = fileName.split('.');
            fileName = splitName[0] + '...' + splitName[1];
        }

        uploadFile(fileName, file);
    }
};

function displayUploadedFile() {
    let uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];

    if (uploadedFiles.length > 0) {
        let uploadedFile = uploadedFiles[0]; // Il n'y a qu'un seul fichier dans le localStorage

        let fileSize = (uploadedFile.size / (1024 * 1024)).toFixed(2) + ' MB';
        if (uploadedFile.type === "link") {
            let uploadedHTML = `<li class="row">
    <div class="content upload">
        <i class='bx bx-link'></i>
        <div class="details">
            <span class="name">${uploadedFile.name} • Enregistré</span>
            <span class="size">Lien</span>
        </div> 
    </div>
   
     <div class="icon">
<button class="delete-btn"><i class="bx bx-trash"></i></button>
<i class='bx bx-check'></i>
</div>
</li>
<div class="separator2"></div>`;
            uploadedArea.innerHTML = uploadedHTML;
        } else {
            let uploadedHTML = `<li class="row">
                                <div class="content upload">
                                    <i class='bx bx-file'></i>
                                    <div class="details">
                                        <span class="name">${uploadedFile.name} • Importé</span>
                                        <span class="size">${fileSize}</span>
                                    </div> 
                                </div>
                               
                                 <div class="icon">
                <button class="delete-btn"><i class="bx bx-trash"></i></button>
                <i class='bx bx-check'></i>
                </div>
                            </li>
                            <div class="separator2"></div>`;
            uploadedArea.innerHTML = uploadedHTML;
        }



    }
    delete_file()
}

// Appel de la fonction au chargement de la page

function uploadFile(name, file) {
    let fileSize = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
    let progressHTML = `<li class="row">
                       
                            <div class="content">     
                            <i class='bx bx-file'></i>
                                <div class="details">
                                    <span class="name">${name} • Importation</span>
                                    <span class="percent">0%</span>
                                   
                                </div>
                                
                                <div class="progress-bar">
                                    <div class="progress" style="width: 0%"></div>
                                </div>
                            </div>
                             <i class='bx bx-refresh'></i>
                        </li>
                        <div class="separator2"></div>`;

    uploadedArea.classList.add('onprogress');
    progressArea.innerHTML = progressHTML;

    let loaded = 0;
    let total = file.size;
    let progressInterval = setInterval(() => {
        loaded += 50000; // Simulating file upload progress
        let fileLoaded = Math.floor((loaded / total) * 100);

        let progress = progressArea.querySelector('.progress');
        let percent = progressArea.querySelector('.percent');
        progress.style.width = `${fileLoaded}%`;
        percent.innerText = `${fileLoaded}%`;

        if (loaded >= total) {
            clearInterval(progressInterval);
            progressArea.innerHTML = '';

            let uploadedHTML = `<li class="row">
                <div class="content upload">
                    <i class='bx bx-file'></i>
                    <div class="details">
                        <span class="name">${name} • Importé</span>
                        <span class="size">${fileSize}</span>
                    </div> 
                    
                </div>
                <div class="icon">
                <button class="delete-btn"><i class="bx bx-trash"></i></button>
                <i class='bx bx-check'></i>
                </div>
            </li>
            <div class="separator2"></div>`;

            uploadedArea.classList.remove('onprogress');
            uploadedArea.insertAdjacentHTML('afterbegin', uploadedHTML);

            // Vérifie s'il y a déjà un fichier stocké
            let uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];

            if (uploadedFiles.length >= 1) {
                alert("Vous avez déjà téléchargé un fichier. Supprimez-le pour en télécharger un autre.");
                return;
            }

            var reader = new FileReader();
            reader.addEventListener("load", function () {
                const photoUrl = reader.result;

                // Ajoute le fichier si la limite de 1 fichier n'est pas dépassée
                uploadedFiles.push({ name, size: file.size, ref: photoUrl });
                localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
            });

            // Lire le fichier en tant que Data URL
            reader.readAsDataURL(file);

            // Attache l'événement de suppression au bouton de suppression créé
            const deleteButton = uploadedArea.querySelector('.delete-btn');
            deleteButton.addEventListener('click', function () {
                if (confirm("Êtes-vous sûr de vouloir supprimer ce fichier ?")) {
                    // Supprime le fichier du stockage local
                    uploadedFiles = uploadedFiles.filter(f => f.name !== name);
                    localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));

                    // Supprime le nœud HTML
                    deleteButton.closest('.row').remove();
                    document.querySelector(".separator2").remove()
                }
            });
        }
    }, 250); // Met à jour la progression toutes les 250 millisecondes
}

function delete_file() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    console.log(deleteButtons)
    deleteButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            let confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce fichier ?");
            if (confirmation) {
                const parentContent = event.target.closest('.content');
                const fileNameElement = document.querySelector(".uploaded-area .name");
                const fileName = fileNameElement.textContent.split(' • ')[0];

                let uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];

                console.log("Avant la suppression : ", uploadedFiles);

                // Filtrer les fichiers pour exclure celui à supprimer
                uploadedFiles = uploadedFiles.filter(function (file) {
                    console.log("Comparaison : ", file.name, " avec ", fileName);
                    return file.name !== fileName;
                });

                console.log("Après la suppression : ", uploadedFiles);

                // Mettez à jour la liste des fichiers dans localStorage
                localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));

                // Supprimez le nœud HTML correspondant
                document.querySelector(".uploaded-area .row").remove();
                document.querySelector(".separator2").remove()

            }
        });
    });
}

