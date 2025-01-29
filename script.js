window.onload = displayUploadedFile;
// Initialisation de l'historique dans le localStorage
if (!localStorage.getItem('historiqueFichiers')) {
    localStorage.setItem('historiqueFichiers', JSON.stringify([]));
}
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
        popup_notif_create("Télécharger une photo, ou veuillez appuyer sur 'entrer' pour le lien", "oui")
    }
});
form.addEventListener('click', (event) => {
    popup_notif_create("Nous prenons seulement JPEG, PNG, GIF, WEBP, BMP, SVG, TIFF, AVIF", true, true).then((confirmation) => {
        if (confirmation) {
            let uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];

            if (uploadedFiles.length > 0) {
                let uploadedFile = uploadedFiles[0]; // Il n'y a qu'un seul fichier dans le localStorage
                setTimeout(() => {

                    popup_notif_create("Vous avez déjà importé un fichier", "oui")
                }, 100)
            } else if (linkImg.value) {
                popup_notif_create("Vous avez déjà importé un fichier par le lien", "oui")
            } else {

                fileInput.click();
            }
        }
    });
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
        }

        ajouterFichierAuHistorique(files[0])
        uploadFile(fileName, files[0]);
        // Vous pouvez ici ajouter du code pour traiter ou afficher le fichier sélectionné
    }
});
const imageDisplay = document.getElementById("image_display");

// Ajoutez un événement pour détecter les changements de l'input
linkImg.addEventListener("keydown", function (event) {
    // Vérifie si la touche est un caractère imprimable
    const isPrintable = event.key.length === 1 && !event.ctrlKey && !event.metaKey;

    if (isPrintable) {
        handleImageInput(event); // Appel de la fonction uniquement pour les caractères imprimables
    }
});


linkImg.addEventListener("input", function (event) {
    handleImageInput(event); // Appel immédiat dès la saisie d'un nouveau caractère
});
function handleImageInput(event) {
    let uploadedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];

    // Si un fichier existe déjà, bloquer et vider l'entrée
    if (uploadedFiles.length > 0) {
        popup_notif_create("Vous devez supprimer votre fichier téléchargé", "oui");
        linkImg.value = "";
        return; // Sortir de la fonction
    }

    const imageUrl = linkImg.value.trim(); // Enlever les espaces au début et à la fin

    if (imageUrl) {
        const img = new Image(); // Crée un objet Image
        img.src = imageUrl;

        img.onload = function () { // Vérifie si l'image est valide
            // Afficher et traiter l'image
            imageDisplay.src = imageUrl;
            imageDisplay.style.display = "block";

            const match = imageUrl.split('/').pop(); // Extraire la dernière partie de l'URL
            const name_all = match.split('?')[0]; // Retirer les paramètres après '?'

            let name = name_all;
            if (name_all.length >= 12) {
                let splitName = name_all.split('.');
                if (splitName.length > 1) {
                    // Cas avec extension
                    name = splitName[0].substring(0, 13) + '... .' + splitName[1];
                } else {
                    // Cas sans extension
                    name = name_all.substring(0, 13) + '...';
                }
            }

            // Ajouter au stockage local et à l'historique
            ajouterLienAuHistorique(name, 0, imageUrl);
            uploadedFiles.push({ name, size: 0, ref: imageUrl, type: "link" });
            localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles));
        };

        img.onerror = function () { // Si l'image est invalide
            popup_notif_create("L'image n'existe pas ou le lien est invalide.", "non");
            imageDisplay.style.display = "none"; // Cache l'image
        };
    }
    else {
        // Masquer l'image si aucune URL n'est fournie
        imageDisplay.style.display = "none";
    }
}
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
        ajouterFichierAuHistorique(file)
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
                popup_notif_create("Vous avez déjà téléchargé un fichier. Supprimez-le pour en télécharger un autre.", "oui")
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
                popup_notif_create("Êtes-vous sûr de vouloir supprimer ce fichier ?", true, true).then((confirmation) => {
                    if (confirmation) {
                        supprimerFichier()
                        // Supprime le fichier du stockage local
                        uploadedFiles = uploadedFiles.filter(f => f.name !== name);
                        localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));

                        // Supprime le nœud HTML
                        deleteButton.closest('.row').remove();
                        document.querySelector(".separator2").remove()
                    }
                })
            });
        }
    }, 250); // Met à jour la progression toutes les 250 millisecondes
}
function ajouterFichierAuHistorique(file) {
    const historique = JSON.parse(localStorage.getItem('historiqueFichiers'));
    var reader = new FileReader();
    reader.addEventListener("load", function () {
        const photoUrl = reader.result;
        const nouvelElement = {
            nom: file.name,
            taille: file.size,
            date: new Date().toISOString(),
            ref: photoUrl,
            isDeleted: false, // Le fichier n'est pas supprimé
        };
        // Ajoute le fichier si la limite de 1 fichier n'est pas dépassée

        historique.push(nouvelElement);
        localStorage.setItem('historiqueFichiers', JSON.stringify(historique));
    });
    reader.readAsDataURL(file);

}
function ajouterLienAuHistorique(name, size, ref) {
    const historique = JSON.parse(localStorage.getItem('historiqueFichiers'));


    const nouvelElement = {
        nom: name,
        taille: size,
        date: new Date().toISOString(),
        ref: ref,
        isDeleted: false, // Le fichier n'est pas supprimé
        reglage: {
            exposition: 0, // Réduire légèrement l'exposition pour éviter la surexposition
            contraste: -5, // Augmenter le contraste pour plus de profondeur
            hautesLumieres: 10, // Modérer l'intensité des hautes lumières
            ombres: -10, // Légèrement éclaircir les ombres pour plus de détails
            blancs: 20, // Réduire légèrement les blancs pour éviter la surexposition
            noirs: -25, // Renforcer les noirs pour plus de profondeur
            temperature: 20, // Ajouter des tons chauds, mais sans trop saturer
            teinte: -30, // Garder une légère teinte chaude pour ne pas altérer l'équilibre
            vibrance: 10, // Augmenter la vibrance de manière plus modérée
            saturation: 15, // Renforcer les couleurs sans surcharger
        },
    };
    // Ajoute le fichier si la limite de 1 fichier n'est pas dépassée

    historique.push(nouvelElement);
    localStorage.setItem('historiqueFichiers', JSON.stringify(historique));


}
function delete_file() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    console.log(deleteButtons)
    deleteButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {

            popup_notif_create("Êtes-vous sûr de vouloir supprimer ce fichier ?", true, true).then((confirmation) => {
                if (confirmation) {
                    supprimerFichier()
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
    });
}
function supprimerFichier() {
    const historique = JSON.parse(localStorage.getItem('historiqueFichiers'));
    let uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
    if (uploadedFiles.length > 0) {
        let uploadedFile = uploadedFiles[0]; // Il n'y a qu'un seul fichier dans le localStorage
        console.log(uploadedFile.size)
    }
    console.log(historique[0].taille)
    const index = historique.findIndex(f => f.taille === uploadedFiles[0].size && !f.isDeleted);
    if (index !== -1) {
        console.log(index)
        historique[index].isDeleted = true; // Marque comme supprimé
        historique[index].dateSuppression = new Date().toISOString(); // Ajoute la date de suppression
        localStorage.setItem('historiqueFichiers', JSON.stringify(historique));
    } else {
        console.log(index)
    }
}
function popup_notif_create(text_popup, valid, annul) {
    return new Promise((resolve, reject) => {
        const existingPopup = document.querySelector(".popup_notif");
        if (existingPopup) {
            existingPopup.classList.add("shake");
            setTimeout(() => {
                existingPopup.classList.remove("shake");
            }, 200);
            return;
        }

        const popup_notif = document.createElement("div");
        popup_notif.classList.add("popup_notif");
        setTimeout(() => {
            popup_notif.classList.add("active"); // Animation d'entrée
        }, 10);

        document.body.appendChild(popup_notif);

        const popup_text = document.createElement("h4");
        popup_text.textContent = text_popup;
        popup_text.style.textAlign = "center"; // Centrage du texte
        popup_notif.appendChild(popup_text);

        const popup_btn = document.createElement("div");
        popup_btn.classList.add("popup_notif_btn");
        popup_notif.appendChild(popup_btn);

        if (valid) {
            const popup_btn_valid = document.createElement("button");
            popup_btn_valid.textContent = "Validez";
            popup_btn.appendChild(popup_btn_valid);
            popup_btn_valid.addEventListener("click", () => {
                popup_notif.style.transform = "scale(0)"; // Animation de sortie
                setTimeout(() => {
                    popup_notif.remove();
                }, 300);
                resolve(true); // Résout la promesse avec `true`
            });
        }

        if (annul) {
            const popup_btn_annul = document.createElement("button");
            popup_btn_annul.textContent = "Annulez";
            popup_btn.appendChild(popup_btn_annul);
            popup_btn_annul.addEventListener("click", () => {
                popup_notif.style.transform = "scale(0)"; // Animation de sortie
                setTimeout(() => {
                    popup_notif.remove();
                }, 300);
                resolve(false); // Résout la promesse avec `false`
            });
        }
    });
}

