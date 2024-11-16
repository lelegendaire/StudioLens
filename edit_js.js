const slider = document.querySelector(".slider input");
    const image_preview = document.querySelector(".image_preview");
    const drag_line = document.querySelector(".slider .drag-line");
    const download_btn = document.querySelector(".settings i.bx-download");
    const cog_btn = document.querySelector(".settings i.bx-cog");
    const imgs_edit = document.querySelectorAll(".nb_img_generer img");
    const reload_btn = document.querySelector(".settings i.bx-refresh");
    const img = document.querySelector(".image_preview .after_img");
    const dragLine = document.querySelector(".slider .drag-line");

    slider.oninput = () => {
      let sliderVal = slider.value;
      dragLine.style.left = sliderVal + "%";
      img.style.width = sliderVal + "%";
    };
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
          wrapper_cog.style.transform = "scale(100%) translateY(0%)";
        }, 50);

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
              const label = document.createElement("label");

              const value = position_filter[i][param.id];
              const input = document.createElement("input");
              input.type = "range";
              input.id = param.id;
              input.min = param.min;
              input.max = param.max;
              input.value = value !== undefined ? value : param.defaultValue; // Utilise la valeur correspondante ou une valeur par défaut
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
          reset_card();
        });
        wrapper_cog.appendChild(settingsCard);

        // Ajouter le wrapper au body
        document.body.appendChild(wrapper_cog);
        document.querySelectorAll('input[type="range"]').forEach((slider) => {
          console.log("yes");
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
        card.style.transform = "scale(90%) translateY(10%)";
        setTimeout(() => {
          card.remove();
        }, 50);
      }
    }
    reload_btn.addEventListener("click", function () {
      localStorage.removeItem("uploadedFiles");
      window.location.href = "index.html";
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
    imgs_edit.forEach((img) => {
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
    let uploadedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];

    if (uploadedFiles.length > 0) {
      let uploadedFile = uploadedFiles[0]; // Il n'y a qu'un seul fichier dans le localStorage

      let beforeImg = document.querySelector(
        ".preview_right .image_preview .before_img"
      );
      let afterImg = document.querySelector(
        ".preview_right .image_preview .after_img"
      );

      beforeImg.style.backgroundImage = "url(" + uploadedFile.ref + ")  ";

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
      // Fonction pour appliquer l'exposition et le contraste
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

      let img = new Image();
      img.src = uploadedFile.ref;
      img.onload = function () {
        // Récupération des dimensions naturelles de l'image
const naturalWidth = img.naturalWidth;
const naturalHeight = img.naturalHeight;

// Récupération de la largeur de l'écran
const screenWidth = parseFloat(window.getComputedStyle(document.body).getPropertyValue("width"));
console.log(screenWidth)
if ((naturalWidth > 850 || naturalHeight > 670) && screenWidth > 738) {
    // Si l'image est grande, réduction de moitié
    const reducedWidth = naturalWidth / 2;
    const reducedHeight = naturalHeight / 2;

    image_preview.style.width = reducedWidth + "px";
    image_preview.style.height = reducedHeight + "px";
    drag_line.style.height = reducedHeight + "px";
} else if (screenWidth < 738) {
    // Si la largeur de l'écran est petite, ajuster en fonction de la largeur de l'écran
    const scaledHeight = (screenWidth * naturalHeight) / naturalWidth;

    image_preview.style.width = screenWidth + "px";
    image_preview.style.height = scaledHeight + "px";
    drag_line.style.height = scaledHeight + "px";
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
          "url(" + displayFilteredImage(img, variable_couleur_sunset) + ")";

        nb_img_generer[0].src = displayFilteredImage(
          img,
          variable_couleur_sunset
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

    const track = document.getElementById("image-track");

    window.onmousedown = (e) => {
      track.dataset.mouseDownAt = e.clientX;
    };
    window.onmouseup = () => {
      track.dataset.mouseDownAt = "0";
      track.dataset.prevPercentage = track.dataset.percentage;
    };

    window.onmousemove = (e) => {
      if (track.dataset.mouseDownAt === "0") return;

      const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

      const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained =
          parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(
          Math.min(nextPercentageUnconstrained, 0),
          -100
        );

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
