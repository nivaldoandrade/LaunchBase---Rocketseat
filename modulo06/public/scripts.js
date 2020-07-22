function confirmationDelete(formDelete) {
    formDelete.addEventListener("click", (e) => {
        const confirmation = confirm("Deseja deletar?");
        if(!confirmation) {
            e.preventDefault();
        }
    });
};

const formDelete = document.querySelector("#button-delete");
if(formDelete) {
    confirmationDelete(formDelete);
}

const Mask = {
    apply(input, func) {
        setTimeout(() => {
            input.value = Mask[func](input.value);
        }, 1);  
    },
    formatBRL(value) {
        value = value.replace(/\D/g, "");

        return Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL'
        }).format(value/100);
    },
    cpfCnpj(value) {
        value = value.replace(/\D/g, "");

        if(value.length > 14) {
            value = value.slice(0, -1);
        }
        
        if(value.length > 11) {
            value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d)/, "$1.$2.$3/$4-$5");
        } else {
            value = value.replace(/(\d{3})(\d{3})(\d{3})(\d)/, "$1.$2.$3-$4");
        };

        return value;
    },
    cep(value) {
        value = value.replace(/\D/g, "");

        if(value.length > 8) {
            value =  value.slice(0, -1);
        };

        value = value.replace(/(\d{5})(\d)/, "$1-$2");

        return value;
    }
};

const Validate = {
    apply(input, func) {
        Validate.clearErrors(input);

        let results = Validate[func](input.value);
        input.value = results.value;

        if(results.error) 
            Validate.displayError(input, results.error);

    },
    isEmail(value) {
        let error = null;

        const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if(!value.match(emailFormat)) 
            error = "Email inválido"
        

        return {
            error,
            value,
        }
    },
    isCpfCnpj(value) {
        let error = null;

        const clearValue = value.replace(/\D/g, "");

        if(clearValue.length > 11 && clearValue.length !== 14) {
            error = 'CPNJ inválido';
        } 
        else if(clearValue.length < 12 && clearValue.length !== 11) {
            error = 'CPF inválido';
        };

        return {
            error,
            value,
        };
    },
    isCep(value) {
        let error = null;

        const clearValue = value.replace(/\D/g, "");

        if(clearValue.length > 8) {
            error = 'CEP inválido'
        };

        return {
            error,
            value,
        };
    },
    displayError(input, error) {
        const div = document.createElement('div');
        div.classList.add('error');
        div.innerHTML = error;
        input.parentNode.appendChild(div);
        input.focus();
    },
    clearErrors(input) {
        const error = input.parentNode.querySelector('.error');
        
        if(error) {
            error.remove();
        }
    },
}

const PhotosUpload = {
    input: '',
    previewDiv: document.getElementById('photos-preview'),
    uploadLimit: 6,
    files:[],
    handleFileInput(event) {
        const { files: fileList} = event.target;
        PhotosUpload.input = event.target;

        if(PhotosUpload.hasLimit(event)) return

        Array.from(fileList).forEach( file => {
            PhotosUpload.files.push(file)

            const reader = new FileReader();

            reader.onload = () => {
                const image = new Image();
                image.src = String(reader.result);

                const div = PhotosUpload.getCreateDiv(image);

               PhotosUpload.previewDiv.appendChild(div);

            };

            reader.readAsDataURL(file);
        });
		
		PhotosUpload.input.files = PhotosUpload.getAllFiles();
    },
    hasLimit(event) {
        const { uploadLimit, input, previewDiv } = PhotosUpload;
        const { files: fileList } = input;

        if(fileList.length > uploadLimit) {
            alert('Enviar no máximo 6 fotos');
            event.preventDefault();
            return true;
        }

        const photoDiv = [];

        previewDiv.childNodes.forEach(item => {
            if (item.classList && item.classList == 'photos') {
                photoDiv.push(item);
            };
        });

        const totalPhotos = fileList.length + photoDiv.length;

        if(totalPhotos > uploadLimit) {+
            alert("Voce ultrapassou o limite de fotos! Limite: 6 fotos")
            event.preventDefault();
            return true;
        }

        return false;
    },
    getAllFiles() {
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer();
        PhotosUpload.files.forEach(file => dataTransfer.items.add(file));

        return dataTransfer.files;
    }, 
    getCreateDiv(image) {
        const div = document.createElement('div');
        div.classList.add('photos');

        div.appendChild(image);
        div.appendChild(PhotosUpload.getCreateButtonRemove());
        div.appendChild(PhotosUpload.getCreateButtonFeatured());
        
        return div;
    },
    getCreateButtonFeatured() {
        const button = document.createElement('a');
        button.innerHTML = 'Imagem de destaque';
        button.onclick = PhotosUpload.addFetuaredImg; 
        return button
    },
    getCreateButtonRemove() {
        const button = document.createElement('i');
        button.classList.add('material-icons');
        button.onclick = PhotosUpload.removePhoto; 
        button.innerHTML = 'close';
        return button
    },
    removePhoto(event) {
        const photoDiv = event.target.parentNode;
        const photoDivAll = Array.from(PhotosUpload.previewDiv.querySelectorAll('.photos'));
        const index = photoDivAll.indexOf(photoDiv);

        PhotosUpload.files.splice(index-1, 1);
        PhotosUpload.input.files = PhotosUpload.getAllFiles();

        photoDiv.remove();
    },
    removeFile(event) {
        const photoDiv = event.target.parentNode;

        if(photoDiv.id) {
            const inputRemove = document.querySelector("input[name='remove_files']");

            if(inputRemove) {
                inputRemove.value += `${photoDiv.id},`;
            }
        };
        
        photoDiv.remove();
    },
    addFetuaredImg(event) {
        const photoDiv = event.target.parentNode;
        const photoDivAll = Array.from(PhotosUpload.previewDiv.querySelectorAll('.photos'));
        const index = photoDivAll.indexOf(photoDiv)
        const inputFetuared = PhotosUpload.previewDiv.querySelector('input[name="image_fetuared"]');

        inputFetuared.value = index;

        photoDivAll.forEach(photo => photo.classList.remove('active'));

        photoDiv.classList.add('active');
        
    },
}

const ImageGallery = {
    highlight: document.querySelector('.gallery .highlight > img'),
    preview: document.querySelectorAll('.gallery .gallery-preview > img'), 
    setImage(event) {
        const { target } = event;
        ImageGallery.preview.forEach(image => image.classList.remove('active'));
        target.classList.add("active");

        ImageGallery.highlight.src = target.src;
        Lightbox.image.src = target.src;
    },
}

const Lightbox = {
    target: document.querySelector('.highlight .lightbox-target'),
    image: document.querySelector('.highlight .lightbox-target > img'),
    closeButton: document.querySelector('.highlight .lightbox-target .lightbox-close'),
    open() {
        Lightbox.target.style.opacity = 1;
        Lightbox.target.style.top = 0;
        Lightbox.target.style.bottom = 0;
        Lightbox.closeButton.style.top = 0;
    },
    close() {
        Lightbox.target.style.opacity = 0;
        Lightbox.target.style.top = '100%';
        Lightbox.target.style.bottom = 'initial';
        Lightbox.closeButton.style.top = '-80px';
    },
}
