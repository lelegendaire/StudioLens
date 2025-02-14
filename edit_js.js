const slider = document.querySelector(".slider input");
const image_preview = document.querySelector(".image_preview");
const drag_line = document.querySelector(".slider .drag-line");
const profile = document.querySelector(".settings .profile");
const download_btn = document.querySelector(".settings i.bx-download");
const cog_btn = document.querySelector(".settings i.bx-cog");
const imgs_edit = document.querySelectorAll(".nb_img_generer img");
const reload_btn = document.querySelector(".settings i.bx-refresh");
const magic_btn = document.querySelector(".settings i.bxs-magic-wand");
const img = document.querySelector(".image_preview .after_img");
const dragLine = document.querySelector(".slider .drag-line");
const nb_img_generer_image = document.querySelectorAll(".nb_img_generer .image");
const parameters = [
  {
    id: "exposition",
    label: "Exposition",
    min: -5,
    max: 5,
    value: 0,
    step: 0.1,
  },
  {
    id: "contraste",
    label: "Contraste",
    min: -100,
    max: 100,
    value: 0,
    step: 1,
  },
  {
    id: "hautesLumieres",
    label: "Hautes Lumières",
    min: -100,
    max: 100,
    value: 0,
    step: 1,
  },
  {
    id: "ombres",
    label: "Ombres",
    min: -100,
    max: 100,
    value: 0,
    step: 1,
  },
  {
    id: "blancs",
    label: "Blancs",
    min: -100,
    max: 100,
    value: 0,
    step: 1,
  },
  {
    id: "noirs",
    label: "Noirs",
    min: -100,
    max: 100,
    value: 0,
    step: 1,
  },
  {
    id: "temperature",
    label: "Température",
    min: -100,
    max: 100,
    value: 0,
    step: 1,
  },
  {
    id: "teinte",
    label: "Teinte",
    min: -100,
    max: 100,
    value: 0,
    step: 1,
  },
  {
    id: "vibrance",
    label: "Vibrance",
    min: -100,
    max: 100,
    value: 0,
    step: 1,
  },
  {
    id: "saturation",
    label: "Saturation",
    min: -100,
    max: 100,
    value: 0,
    step: 1,
  },
];
const value_filter = []
slider.oninput = () => {
  let sliderVal = slider.value;
  dragLine.style.left = sliderVal + "%";
  img.style.width = sliderVal + "%";
};
profile.addEventListener("click", function () {
  const wrapper_cog = document.querySelector(".wrapper_cog");
  if (wrapper_cog) {
    reset_card();
  } else {
    const wrapper_cog = document.createElement("div");
    wrapper_cog.classList.add("wrapper_cog");
    const settingsCard = document.createElement("div");
    settingsCard.classList.add("settings-card");
    setTimeout(() => {
      wrapper_cog.classList.add("reveal");
    }, 50);

    const header = document.createElement("div");
    header.classList.add("header-settings-card");
    const title = document.createElement("h3");
    title.textContent = "Historique de l'utilisateur";
    const i_cross = document.createElement("i");
    i_cross.classList.add("bx", "bx-x");

    header.appendChild(title);
    header.appendChild(i_cross);
    settingsCard.appendChild(header);
    wrapper_cog.appendChild(settingsCard);
    document.body.appendChild(wrapper_cog);

    const searchBar = document.createElement("div");
    searchBar.classList.add("search-bar");

    const IsearchBar = document.createElement("div");
    IsearchBar.classList.add("i_search-bar");
    const I_search = document.createElement("i");
    I_search.classList.add("bx", "bx-search");
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.id = "search-input";
    searchInput.placeholder = "Rechercher par nom ou date...";
    searchBar.appendChild(IsearchBar);
    IsearchBar.appendChild(I_search);
    IsearchBar.appendChild(searchInput);
    wrapper_cog.appendChild(searchBar);

    const loadingSpinner = document.createElement("div");
    loadingSpinner.classList.add("loading-spinner");
    const spinnerIcon = document.createElement("i");
    spinnerIcon.classList.add("bx", "bx-loader-alt");
    loadingSpinner.appendChild(spinnerIcon);
    wrapper_cog.appendChild(loadingSpinner);
    // Simuler un délai de chargement (remplacez ceci par votre logique réelle)
    setTimeout(() => {
      // Supprimer le spinner de chargement une fois le chargement terminé
      wrapper_cog.removeChild(loadingSpinner);
      const historique = JSON.parse(localStorage.getItem('historiqueFichiers'));
      let filteredHistorique = historique.slice().reverse();
      let currentPage = 1;
      const itemsPerPage = 3;

      function formatDate(date) {
        const today = new Date();
        const fileDate = new Date(date);

        // Vérifier si la date du fichier correspond à aujourd'hui
        if (
          fileDate.getDate() === today.getDate() &&
          fileDate.getMonth() === today.getMonth() &&
          fileDate.getFullYear() === today.getFullYear()
        ) {

          // Si oui, retourner l'heure au format HH:MM
          return fileDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        } else {

          // Sinon, retourner la date au format JJ/MM/AAAA
          return fileDate.toLocaleDateString('fr-FR');
        }
      }

      function updatePagination(pageInfo, prevPageButton, nextPageButton) {
        const totalPages = Math.ceil(filteredHistorique.length / itemsPerPage);
        pageInfo.textContent = `Page ${currentPage} sur ${totalPages}`;
        prevPageButton.disabled = currentPage === 1;
        nextPageButton.disabled = currentPage === totalPages;
      }

      function displayFiles() {
        // Supprimer les anciens éléments .file_picture
        wrapper_cog.querySelectorAll(".file_picture").forEach(el => el.remove());

        // Créer et ajouter les nouveaux éléments .file_picture
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageFiles = filteredHistorique.slice(start, end);

        pageFiles.forEach(fichier => {
          const file_picture = document.createElement("div");
          file_picture.classList.add("file_picture");
          const file_picture_img = document.createElement("img");
          file_picture_img.classList.add("file_picture_img");
          file_picture_img.src = fichier.ref;
          const file_picture_info = document.createElement("div");
          file_picture_info.classList.add("file_picture_info");
          const file_picture_nom = document.createElement("p");
          let fileName = fichier.nom;
          if (fileName.length >= 20) {
            let splitName = fileName.split('.');
            fileName = splitName[0].substring(0, 13) + '... .' + splitName[1];
          }

          file_picture_nom.textContent = fileName;
          const file_picture_taille = document.createElement("p");
          if (fichier.taille === 0) {
            file_picture_taille.textContent = "Lien";
          } else {

            file_picture_taille.textContent = (fichier.taille / (1024 * 1024)).toFixed(2) + ' MB';
          }
          const file_picture_date = document.createElement("p");
          file_picture_date.textContent = formatDate(fichier.date); // Utilisation de la fonction formatDate
          file_picture_info.appendChild(file_picture_nom);
          file_picture_info.appendChild(file_picture_taille);
          file_picture_info.appendChild(file_picture_date);
          const file_picture_statut = document.createElement("div");
          file_picture_statut.classList.add("file_picture_statut");
          const file_picture_statut_i = document.createElement("i");
          const statut = fichier.isDeleted ? 'Supprimé' : 'Uploadé';
          const dateSuppression = fichier.isDeleted ? ` (Supprimé le : ${new Date(fichier.dateSuppression).toLocaleString()})` : '';
          if (statut === "Supprimé") {
            file_picture_statut_i.classList.add("bx", "bx-x-circle");
            file_picture_statut_i.style.color = "red";
            file_picture_date.textContent = formatDate(fichier.date) + "|" + dateSuppression; // Utilisation de la fonction formatDate
          } else {
            file_picture_statut_i.classList.add("bx", "bx-check-circle");
          }

          const file_picture_reload = document.createElement("div");
          file_picture_reload.classList.add("file_picture_reload");
          const file_picture_reload_i = document.createElement("i");
          file_picture_reload_i.classList.add("bx", "bx-link-external");

          file_picture.appendChild(file_picture_img);
          file_picture.appendChild(file_picture_info);

          file_picture.appendChild(file_picture_statut);
          file_picture_statut.appendChild(file_picture_statut_i);
          file_picture.appendChild(file_picture_reload);
          file_picture_reload.appendChild(file_picture_reload_i);
          wrapper_cog.appendChild(file_picture);

          file_picture_reload_i.addEventListener("click", function () {
            const reglage_pref = localStorage.getItem("Reglage")
            const reglage_value = JSON.parse(reglage_pref);
            Img_to_filter_img(fichier.ref, reglage_value);
          });
        });

        // Créer et ajouter la pagination après les éléments .file_picture

        const pagination = document.createElement("div");
        pagination.classList.add("pagination");
        const prevPageButton = document.createElement("button");
        prevPageButton.id = "prev-page";
        const i_prevPageButton = document.createElement("i");
        i_prevPageButton.classList.add("bx", "bx-chevron-left")
        const nextPageButton = document.createElement("button");
        nextPageButton.id = "next-page";
        const i_nextPageButton = document.createElement("i");
        i_nextPageButton.classList.add("bx", "bx-chevron-right")

        const pageInfo = document.createElement("span");
        pageInfo.id = "page-info";
        pagination.appendChild(prevPageButton);
        prevPageButton.appendChild(i_prevPageButton)
        pagination.appendChild(pageInfo);
        pagination.appendChild(nextPageButton);
        nextPageButton.appendChild(i_nextPageButton)
        wrapper_cog.appendChild(pagination);

        updatePagination(pageInfo, prevPageButton, nextPageButton);

        // Gestion des événements de pagination
        prevPageButton.addEventListener("click", function () {
          if (currentPage > 1) {
            currentPage--;
            const pagination = document.querySelector(".wrapper_cog .pagination");

            pagination.remove()
            displayFiles();

          }
        });

        nextPageButton.addEventListener("click", function () {
          const totalPages = Math.ceil(filteredHistorique.length / itemsPerPage);
          if (currentPage < totalPages) {
            currentPage++;
            const pagination = document.querySelector(".wrapper_cog .pagination");

            pagination.remove()
            displayFiles();
          }
        });
      }

      searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.toLowerCase();
        filteredHistorique = historique.slice().reverse().filter(fichier => {
          return fichier.nom.toLowerCase().includes(searchTerm) || fichier.date.toString().includes(searchTerm);
        });
        currentPage = 1;
        const pagination = document.querySelector(".wrapper_cog .pagination");

        pagination.remove()
        displayFiles();
      });

      displayFiles();

      i_cross.addEventListener("click", function () {
        reset_card();
      });
    }, Math.floor(Math.random() * (Math.floor(2000) - Math.ceil(100) + 1)) + Math.ceil(100))
  }
});
cog_btn.addEventListener("click", function () {
  const wrapper_cog = document.querySelector(".wrapper_cog");
  if (wrapper_cog) {
    reset_card();
  } else {
    const wrapper_cog = document.createElement("div");
    wrapper_cog.classList.add("wrapper_cog");
    const settingsCard = document.createElement("div");
    settingsCard.classList.add("settings-card");
    setTimeout(() => {
      wrapper_cog.classList.add("reveal")
    }, 10);

    const header = document.createElement("div");
    header.classList.add("header-settings-card");
    // Ajouter un titre à la carte
    const title = document.createElement("h3");
    title.textContent = "Paramètres de l'image";
    const i_cross = document.createElement("i");
    i_cross.classList.add("bx", "bx-x");

    header.appendChild(title);
    header.appendChild(i_cross);
    settingsCard.appendChild(header);

    // Définir les paramètres et leurs valeurs initiales

    const input_couleur = [
      {
        id: "teinte",
        label: "Teinte",
        min: -100,
        max: 100,
        value: 0,
        step: 1,
      },
      {
        id: "vibrance",
        label: "Vibrance",
        min: -100,
        max: 100,
        value: 0,
        step: 1,
      },
      {
        id: "saturation",
        label: "Saturation",
        min: -100,
        max: 100,
        value: 0,
        step: 1,
      },
    ];
    const couleurs = [
      {
        id: "rouge",
        label: "Rouge",
        min: -100,
        max: 100,
        value: 0,
        step: 1,
      },
      {
        id: "orange",
        label: "Orange",
        min: -100,
        max: 100,
        value: 0,
        step: 1,
      },
      {
        id: "jaune",
        label: "Jaune",
        min: -100,
        max: 100,
        value: 0,
        step: 1,
      },
      {
        id: "vert",
        label: "Vert",
        min: -100,
        max: 100,
        value: 0,
        step: 1,
      },
      {
        id: "bleuClair",
        label: "Bleu Clair",
        min: -100,
        max: 100,
        value: 0,
        step: 1,
      },
      {
        id: "violet",
        label: "Violet",
        min: -100,
        max: 100,
        value: 0,
        step: 1,
      },
      {
        id: "Bleu foncé",
        label: "Bleu Foncé",
        min: -100,
        max: 100,
        value: 0,
        step: 1,
      },
      {
        id: "rose",
        label: "Rose",
        min: -100,
        max: 100,
        value: 0,
        step: 1,
      },
    ];
    // Créer les éléments pour chaque paramètre
    parameters.forEach((param) => {
      imgs_edit.forEach((img_selected, i) => {
        if (img_selected.classList.contains("select")) {
          const reglage_pref = JSON.parse(localStorage.getItem("Reglage"))
          const originalValue = reglage_pref[param.id] !== undefined
          ? reglage_pref[param.id] // Valeur sauvegardée
          : value_filter?.[i]?.[param.id] !== undefined
            ? value_filter[i][param.id]  // Utilisez `value_filter` si disponible
            : position_filter[i][param.id]; // Sinon, utilisez `position_filter`
          const label = document.createElement("label");

          const value = originalValue;
          const input = document.createElement("input");
          input.type = "range";
          input.id = param.id;
          input.min = param.min;
          input.max = param.max;
          input.value = value !== undefined ? value : reglage_pref[param.id]; // Utilise la valeur correspondante ou une valeur par défaut
          input.step = param.step;

          const valueSpan = document.createElement("span");
          valueSpan.id = `${param.id}-value`;
          valueSpan.textContent = input.value;

          // Mettre à jour la valeur affichée en temps réel
          input.addEventListener("input", function () {
            valueSpan.textContent = this.value;
          });

          label.appendChild(document.createTextNode(param.label + ": "));
          label.appendChild(input);
          label.appendChild(valueSpan);

          settingsCard.appendChild(label);
        }
      });
    });

    const paramètre_chaque_couleur = document.createElement("div");
    paramètre_chaque_couleur.classList.add("paramètre_chaque_couleur");
    settingsCard.appendChild(paramètre_chaque_couleur);
    couleurs.forEach((couleur) => {
      const couleur_div = document.createElement("div");
      couleur_div.classList.add("couleur_div");
      const couleur_h2 = document.createElement("h2");
      couleur_h2.textContent = couleur.label;
      couleur_div.appendChild(couleur_h2);
      for (let i = 0; i < 3; i++) {
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.type = "range";
        input.id = input_couleur[i].id;
        input.min = input_couleur[i].min;
        input.max = input_couleur[i].max;
        input.value = input_couleur[i].value;
        input.step = input_couleur[i].step;
        const valueSpan = document.createElement("span");
        valueSpan.id = `${input_couleur[i].id}-value`;
        valueSpan.textContent = input_couleur[i].value;
        // Mettre à jour la valeur affichée en temps réel
        input.addEventListener("input", function () {
          valueSpan.textContent = this.value;
        });

        label.appendChild(
          document.createTextNode(input_couleur[i].label + ": ")
        );
        label.appendChild(input);
        label.appendChild(valueSpan);

        couleur_div.appendChild(label);
      }
      paramètre_chaque_couleur.appendChild(couleur_div);
      settingsCard.appendChild(paramètre_chaque_couleur);
    });

    


    const btn_save = document.createElement("button");
    btn_save.classList.add("btn_save");
    btn_save.textContent = "Sauvegarder";
    // Ajouter la carte de paramétrage au wrapper
    settingsCard.appendChild(btn_save);
    btn_save.addEventListener("click", function () {
      updateImage();
      reset_card();
    });
    i_cross.addEventListener("click", function () {
      updateImage();
      reset_card();
    });
    wrapper_cog.appendChild(settingsCard);

    // Ajouter le wrapper au body
    document.body.appendChild(wrapper_cog);
    document.querySelectorAll('input[type="range"]').forEach((slider) => {
      slider.addEventListener("input", updateImage);
    });
    function updateImage() {
      function getFilterValues() {
        return {
          exposition: parseFloat(
            document.getElementById("exposition").value
          ),
          contraste: parseFloat(document.getElementById("contraste").value),
          hautesLumieres: parseFloat(
            document.getElementById("hautesLumieres").value
          ),
          ombres: parseFloat(document.getElementById("ombres").value),
          blancs: parseFloat(document.getElementById("blancs").value),
          noirs: parseFloat(document.getElementById("noirs").value),
          temperature: parseFloat(
            document.getElementById("temperature").value
          ),
          teinte: parseFloat(document.getElementById("teinte").value),
          vibrance: parseFloat(document.getElementById("vibrance").value),
          saturation: parseFloat(
            document.getElementById("saturation").value
          ),
        };
      }

      let variable_personnalise = getFilterValues();
      // Convertir l'objet en chaîne JSON
      const variable_personnalise_local = JSON.stringify(variable_personnalise);

      // Stocker dans le localStorage
      localStorage.setItem("Reglage", variable_personnalise_local);
      const beforeImg = document.querySelector(
        ".preview_right .image_preview .before_img"
      );
      let img = new Image();
      img.src = beforeImg.style.backgroundImage.slice(5, -2);

      img.onload = function () {
        let afterImg = document.querySelector(
          ".preview_right .image_preview .after_img"
        );
        afterImg.style.backgroundImage =
          "url(" + displayFilteredImage(img, variable_personnalise) + ")";
      };
    }
  }
});

function reset_card() {
  const card = document.querySelector(".wrapper_cog");
  if (card) {
    card.style.transform = "scale(0)";
    setTimeout(() => {
      card.remove();
    }, 300);
  }
}
reload_btn.addEventListener("click", function () {
  popup_notif_create("Êtes-vous sûr de vouloir abandonner votre projet ?", true, true).then((confirmation) => {
    if (confirmation) {
      window.location.href = "index.html";
    }
  });
});
magic_btn.addEventListener("click", function () {
  function new_value_of_filter() {
    let newValues = {};
    parameters.forEach((param) => {
      imgs_edit.forEach((img_selected, i) => {
        if (img_selected.classList.contains("select")) {
          const originalValue = position_filter[i][param.id];

          // Calculer une variation (ex : entre -10% et +10% de la valeur originale)
          const variation = originalValue * (Math.random() * 0.4 - 0.1); // Variation entre -10% et +10%
          newValues[param.id] = originalValue + variation;
        }
      });
    })
    return newValues; // Renvoie les nouvelles valeurs ajustées
  }

  let variable_personnalise = new_value_of_filter();

  value_filter[0] = variable_personnalise; // Mise à jour des valeurs pour l'image sélectionnée

  const beforeImg = document.querySelector(
    ".preview_right .image_preview .before_img"
  );

  let img = new Image();
  img.src = beforeImg.style.backgroundImage.slice(5, -2);

  img.onload = function () {
    let afterImg = document.querySelector(
      ".preview_right .image_preview .after_img"
    );

    // Afficher l'image avec le filtre modifié
    afterImg.style.backgroundImage =
      "url(" + displayFilteredImage(img, variable_personnalise) + ")";
  };
});

download_btn.addEventListener("click", function () {
  let afterImg = document.querySelector(
    ".preview_right .image_preview .after_img"
  );
  // Récupérer l'URL de l'image modifiée depuis le style de `afterImg`
  let imageURL = afterImg.style.backgroundImage.slice(5, -2);

  // Créer un lien de téléchargement temporaire
  let link = document.createElement("a");
  link.href = imageURL;

  // Définir le nom du fichier à télécharger
  link.download = "image_modifiee.png";

  // Ajouter le lien à la page et déclencher le téléchargement
  document.body.appendChild(link);
  link.click();

  // Supprimer le lien après le téléchargement
  document.body.removeChild(link);
});
imgs_edit.forEach((img,i) => {
  img.addEventListener("click", function () {
    const imgSrc = img.src;
    imgs_edit.forEach((image) => {
      image.classList.remove("select");
    });

    // Ajouter la classe 'select' seulement à l'image cliquée
    img.classList.add("select");
    let afterImg = document.querySelector(
      ".preview_right .image_preview .after_img"
    );

    afterImg.style.backgroundImage = "url(" + imgSrc + ")";
    
    localStorage.setItem("Reglage", JSON.stringify(position_filter[i])); 

  });
});
let position_filter = [
  (variable_couleur_sunset = {
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
  }),
  (variable_couleur_cinema_noir = {
    exposition: -1.5, // Réduire l'exposition pour assombrir l'image
    contraste: 20, // Augmenter légèrement le contraste pour accentuer les détails en noir et blanc
    hautesLumieres: -30, // Réduire les hautes lumières pour éviter qu'elles soient trop intenses
    ombres: -60, // Assombrir les ombres pour un effet plus dramatique
    blancs: 10, // Ajustement modéré des blancs pour préserver les détails clairs
    noirs: -50, // Réduire les noirs pour un effet plus intense
    temperature: 0, // Neutraliser la température pour un effet noir et blanc pur
    teinte: 0, // Neutraliser la teinte pour un effet noir et blanc pur
    vibrance: 0, // Désactiver la vibrance pour éviter toute intensification des couleurs
    saturation: -100, // Réduire la saturation à -100 pour convertir l'image en noir et blanc
  }),
  (variable_couleur_hiver = {
    exposition: -0.3, // Légère réduction pour un effet froid
    contraste: 10, // Maintenir un bon niveau de détails
    hautesLumieres: -20, // Diminuer l'intensité des lumières
    ombres: -10, // Légère réduction des ombres
    blancs: 5, // Maintenir la luminosité des détails blancs
    noirs: -30, // Accentuer les noirs pour un contraste fort
    temperature: -20, // Ajouter des tons froids et bleus
    teinte: 0, // Neutraliser les couleurs
    vibrance: -10, // Réduire légèrement les couleurs pour une ambiance glacée
    saturation: -15, // Réduire la saturation pour un effet désaturé
  }),
  (variable_couleur_vintage = {
    exposition: 0.2, // Légère augmentation pour plus de luminosité
    contraste: 15, // Réduire pour un effet adouci
    hautesLumieres: -25, // Diminuer pour un effet plus doux
    ombres: 15, // Relever légèrement les ombres
    blancs: -10, // Réduire les blancs pour une teinte plus vieillie
    noirs: -5, // Atténuer légèrement les noirs
    temperature: 15, // Ajouter des tons chauds jaunâtres
    teinte: 10, // Légère teinte verte pour un effet rétro
    vibrance: 10, // Légère augmentation de la vibrance
    saturation: -20, // Réduire la saturation pour un look vieilli
  }),
  (variable_couleur_nocturne = {
    exposition: -1.5, // Réduire pour une ambiance plus sombre
    contraste: 20, // Augmenter pour un meilleur contraste dans l'obscurité
    hautesLumieres: -30, // Réduire pour éviter les éclats lumineux
    ombres: -50, // Assombrir considérablement les ombres
    blancs: -20, // Diminuer les blancs pour une lumière diffuse
    noirs: -60, // Renforcer les noirs pour un effet de nuit profonde
    temperature: -10, // Refroidir l'image pour des tons bleutés
    teinte: 0, // Neutraliser la teinte
    vibrance: -10, // Réduire légèrement la vibrance
    saturation: -5, // Réduire la saturation pour un effet plus neutre
  }),
  (variable_couleur_urbain = {
    exposition: 0.1, // Maintenir la luminosité
    contraste: 30, // Augmenter fortement le contraste
    hautesLumieres: 20, // Intensifier les lumières
    ombres: -20, // Assombrir les ombres pour un effet dramatique
    blancs: 15, // Augmenter les détails lumineux
    noirs: -40, // Accentuer les noirs pour un contraste élevé
    temperature: 5, // Ajouter une légère chaleur
    teinte: 0, // Neutre
    vibrance: 20, // Augmenter la vibrance pour des couleurs intenses
    saturation: 15, // Renforcer les couleurs pour un effet vif
  }),
  (variable_couleur_pastel = {
    exposition: 0.5, // Augmenter légèrement la luminosité
    contraste: -10, // Réduire pour un effet doux
    hautesLumieres: 10, // Légère augmentation pour garder des détails
    ombres: 20, // Remonter les ombres pour adoucir les contrastes
    blancs: 5, // Légère augmentation des blancs
    noirs: -15, // Réduire légèrement les noirs
    temperature: 10, // Ajouter de la chaleur pour des tons doux
    teinte: 5, // Légère teinte rosée
    vibrance: 15, // Augmenter pour un effet pastel
    saturation: -10, // Réduire la saturation pour des couleurs plus douces
  }),
];


function Img_to_filter_img(image_pour_filtre, reglage) {
  let beforeImg = document.querySelector(
    ".preview_right .image_preview .before_img"
  );
  let afterImg = document.querySelector(
    ".preview_right .image_preview .after_img"
  );

  beforeImg.style.backgroundImage = "url(" + image_pour_filtre + ")  ";



  // Fonction pour appliquer l'exposition et le contraste


  let img = new Image();
  img.src = image_pour_filtre;
  img.onload = function () {
    // Récupération des dimensions naturelles de l'image
    let naturalWidth = img.naturalWidth;
    let naturalHeight = img.naturalHeight;

    // Récupération de la largeur de l'écran
    const screenWidth = parseFloat(window.getComputedStyle(document.body).getPropertyValue("width"));
    const screenHeight = parseFloat(window.getComputedStyle(document.body).getPropertyValue("height"));




     
    while ((naturalWidth > 850 || naturalHeight > 670) && screenWidth > 738) {
      // Si l'image est grande, réduction de moitié
      naturalWidth /= 1.1
      naturalHeight /= 1.1
    } 
    const reducedWidth = naturalWidth;
    const reducedHeight = naturalHeight;
    image_preview.style.width = reducedWidth + "px";
    image_preview.style.height = reducedHeight + "px";
    drag_line.style.height = reducedHeight + "px";
    nb_img_generer_image.forEach((img_rescale) =>{
      img_rescale.style.height = (screenHeight/6) + "px";
      img_rescale.style.width = (150 * (screenHeight/6))/120 + "px";
    })
     if (screenWidth < 738) {
      // Si la largeur de l'écran est petite, ajuster en fonction de la largeur de l'écran
      const scaledHeight = (screenWidth * naturalHeight) / naturalWidth;

      image_preview.style.width = screenWidth + "px";
      image_preview.style.height = scaledHeight + "px";
      drag_line.style.height = scaledHeight + "px";
      const track = document.getElementById("image-track");
      const scrolimg = document.querySelector(".scroll_img");

      // Fonction pour gérer les événements de départ (mousedown / touchstart)
      const handleStart = (e) => {
        // Récupérer la position initiale (clientX pour souris ou touches[0].clientX pour tactile)
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        track.dataset.mouseDownAt = clientX;
      };

      // Fonction pour gérer les événements de fin (mouseup / touchend)
      const handleEnd = () => {
        track.dataset.mouseDownAt = "0";
        track.dataset.prevPercentage = track.dataset.percentage;
      };

      // Fonction pour gérer le mouvement (mousemove / touchmove)
      const handleMove = (e) => {
        // Vérifier si une interaction a commencé
        if (track.dataset.mouseDownAt === "0") return;

        // Récupérer la position actuelle (clientX pour souris ou touches[0].clientX pour tactile)
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;

        const mouseDelta = parseFloat(track.dataset.mouseDownAt) - clientX,
          maxDelta = window.innerWidth / 2;

        const percentage = (mouseDelta / maxDelta) * -100,
          nextPercentageUnconstrained =
            parseFloat(track.dataset.prevPercentage) + percentage,
          nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

        track.dataset.percentage = nextPercentage;

        track.animate(
          {
            transform: `translate(${nextPercentage}%, 0%)`,
          },
          { duration: 1200, fill: "forwards" }
        );

        for (const image of track.getElementsByClassName("image")) {
          image.animate(
            {
              objectPosition: `${100 + nextPercentage}% center`,
            },
            { duration: 1200, fill: "forwards" }
          );
        }
      };

      // Écouteurs pour les événements de souris
      scrolimg.addEventListener("mousedown", handleStart);
      scrolimg.addEventListener("mouseup", handleEnd);
      scrolimg.addEventListener("mousemove", handleMove);

      // Écouteurs pour les événements tactiles
      scrolimg.addEventListener("touchstart", handleStart);
      scrolimg.addEventListener("touchend", handleEnd);
      scrolimg.addEventListener("touchmove", handleMove);
    } else {
      // Sinon, garder les dimensions naturelles
      image_preview.style.width = naturalWidth + "px";
      image_preview.style.height = naturalHeight + "px";
      drag_line.style.height = naturalHeight + "px";
    }

    const nb_img_generer = document.querySelectorAll(".nb_img_generer img");
    let afterImg = document.querySelector(
      ".preview_right .image_preview .after_img"
    );

    afterImg.style.backgroundImage =
      "url(" + displayFilteredImage(img, reglage) + ")";

    nb_img_generer[0].src = displayFilteredImage(
      img,
      reglage
    );
    nb_img_generer[1].src = displayFilteredImage(
      img,
      variable_couleur_cinema_noir
    );
    nb_img_generer[2].src = displayFilteredImage(
      img,
      variable_couleur_hiver
    );
    nb_img_generer[3].src = displayFilteredImage(
      img,
      variable_couleur_vintage
    );
    nb_img_generer[4].src = displayFilteredImage(
      img,
      variable_couleur_nocturne
    );
    //nb_img_generer[5].src = applyFilters(img, variable_couleur_urbain);
    //nb_img_generer[6].src = applyFilters(img, variable_couleur_pastel);
  };
}
function applyAllFilters(rawData, width, height, filters) {
  let imageData = new Uint8ClampedArray(rawData); // Commence avec les données RAW

  // Appliquer les filtres selon les paramètres fournis
  if (
    filters.exposition !== undefined &&
    filters.contraste !== undefined
  ) {
    imageData = applyExposureContrast(
      imageData,
      width,
      height,
      filters.exposition,
      filters.contraste
    );
  }
  if (filters.temperature !== undefined) {
    imageData = applyTemperature(imageData, filters.temperature);
  }
  if (filters.teinte !== undefined) {
    imageData = applyTint(imageData, filters.teinte);
  }
  if (filters.saturation !== undefined) {
    imageData = applySaturation(imageData, filters.saturation);
  }
  if (filters.vibrance !== undefined) {
    imageData = applyVibrance(imageData, filters.vibrance);
  }

  return imageData;
}
function applyExposureContrast(data, width, height, exposure, contrast) {
  const newData = new Uint8ClampedArray(data); // Copie pour non-destructivité
  for (let i = 0; i < newData.length; i += 4) {
    newData[i] = newData[i] * (1 + exposure / 5) + contrast;
    newData[i + 1] = newData[i + 1] * (1 + exposure / 5) + contrast;
    newData[i + 2] = newData[i + 2] * (1 + exposure / 5) + contrast;
  }
  return newData;
}

// Fonction pour appliquer la température de couleur
function applyTemperature(data, temperature) {
  const newData = new Uint8ClampedArray(data);
  for (let i = 0; i < newData.length; i += 4) {
    newData[i] += temperature; // Rouge
    newData[i + 2] -= temperature; // Bleu
  }
  return newData;
}

// Fonction pour appliquer la teinte
function applyTint(data, tint) {
  const newData = new Uint8ClampedArray(data);
  for (let i = 0; i < newData.length; i += 4) {
    let avg = (newData[i] + newData[i + 1] + newData[i + 2]) / 3;
    newData[i] += (avg - newData[i]) * (tint / 100);
    newData[i + 1] += (avg - newData[i + 1]) * (tint / 100);
    newData[i + 2] += (avg - newData[i + 2]) * (tint / 100);
  }
  return newData;
}

// Fonction pour appliquer la saturation
function applySaturation(data, saturation) {
  const newData = new Uint8ClampedArray(data);
  for (let i = 0; i < newData.length; i += 4) {
    let lum =
      0.3 * newData[i] + 0.59 * newData[i + 1] + 0.11 * newData[i + 2];
    newData[i] = lum + (newData[i] - lum) * (1 + saturation / 100);
    newData[i + 1] =
      lum + (newData[i + 1] - lum) * (1 + saturation / 100);
    newData[i + 2] =
      lum + (newData[i + 2] - lum) * (1 + saturation / 100);
  }
  return newData;
}

// Fonction pour appliquer la vibrance
function applyVibrance(data, vibrance) {
  const newData = new Uint8ClampedArray(data);
  for (let i = 0; i < newData.length; i += 4) {
    let maxColor = Math.max(newData[i], newData[i + 1], newData[i + 2]);
    let vibranceFactor = 1 + vibrance / 100;
    if (maxColor < 128) {
      newData[i] *= vibranceFactor;
      newData[i + 1] *= vibranceFactor;
      newData[i + 2] *= vibranceFactor;
    }
  }
  return newData;
}
function createRawImageData(img) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0, img.width, img.height);
  return ctx.getImageData(0, 0, canvas.width, canvas.height).data;
}

function applyFilters(img, variable) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0, img.width, img.height);

  // Obtenez les données de l'image
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  let exposition = variable.exposition;
  let contraste = variable.contraste;
  let hautesLumieres = variable.hautesLumieres;
  let ombres = variable.ombres;
  let blancs = variable.blancs;
  let noirs = variable.noirs;
  let temperature = variable.temperature;
  let teinte = variable.teinte;
  let vibrance = variable.vibrance;
  let saturation = variable.saturation;

  // Applique les filtres de lumière et de couleur
  for (let i = 0; i < data.length; i += 4) {
    // Luminosité et contraste
    data[i] = data[i] * (1 + exposition / 5) + contraste;
    data[i + 1] = data[i + 1] * (1 + exposition / 5) + contraste;
    data[i + 2] = data[i + 2] * (1 + exposition / 5) + contraste;

    // Température
    data[i] += temperature;
    data[i + 2] -= temperature;

    // Luminosité et contraste
    data[i] = data[i] * (1 + exposition / 5) + contraste;
    data[i + 1] = data[i + 1] * (1 + exposition / 5) + contraste;
    data[i + 2] = data[i + 2] * (1 + exposition / 5) + contraste;

    // Température
    data[i] += temperature; // Modifie la valeur du rouge (augmentation ou diminution)
    data[i + 2] -= temperature; // Modifie la valeur du bleu (augmentation ou diminution)

    // Teinte (rotation de la couleur)
    let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] += (avg - data[i]) * (teinte / 100);
    data[i + 1] += (avg - data[i + 1]) * (teinte / 100);
    data[i + 2] += (avg - data[i + 2]) * (teinte / 100);

    // Saturation
    let lum = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
    data[i] = lum + (data[i] - lum) * (1 + saturation / 100);
    data[i + 1] = lum + (data[i + 1] - lum) * (1 + saturation / 100);
    data[i + 2] = lum + (data[i + 2] - lum) * (1 + saturation / 100);

    // Vibrance (augmentation de la saturation uniquement pour les couleurs sous-saturées)
    let maxColor = Math.max(data[i], data[i + 1], data[i + 2]);
    let vibranceFactor = 1 + vibrance / 100;
    if (maxColor < 128) {
      data[i] *= vibranceFactor;
      data[i + 1] *= vibranceFactor;
      data[i + 2] *= vibranceFactor;
    }

    // Applique des corrections pour chaque canal de couleur spécifique
    // Ex. Rouge, Vert, Bleu, etc.
  }

  // Mettre à jour le canvas avec les nouvelles données d'image
  ctx.putImageData(imageData, 0, 0);

  return canvas.toDataURL();
}
function displayFilteredImage(img, filters) {
  img.crossOrigin = "Anonymous";
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0, img.width, img.height);

  // Obtenir les données RAW de l'image
  const rawData = ctx.getImageData(
    0,
    0,
    canvas.width,
    canvas.height
  ).data;

  // Appliquer les filtres
  const filteredData = applyAllFilters(
    rawData,
    canvas.width,
    canvas.height,
    filters
  );

  // Mettre à jour le canvas avec les nouvelles données
  const imageData = new ImageData(
    filteredData,
    canvas.width,
    canvas.height
  );
  ctx.putImageData(imageData, 0, 0);

  return canvas.toDataURL();
}
let uploadedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
const reglage_pref = JSON.parse(localStorage.getItem("Reglage"))
if (uploadedFiles.length > 0) {
  let uploadedFile = uploadedFiles[0]; // Il n'y a qu'un seul fichier dans le localStorage
  if (uploadedFiles.type === "link") {
    console.log("link")
  }
  if(reglage_pref){
    Img_to_filter_img(uploadedFile.ref, reglage_pref)
  } else{

    Img_to_filter_img(uploadedFile.ref, variable_couleur_sunset)
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

