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
};

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

            PhotosUpload.input.files = PhotosUpload.getAllFiles();

            reader.readAsDataURL(file);
        });
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
        PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files
    }, 
    getCreateDiv(image) {
        const div = document.createElement('div');
        div.classList.add('photos');

        div.onclick = PhotosUpload.removePhoto;

        div.appendChild(image);
        div.appendChild(PhotosUpload.getCreateButton());

        return div;
    },
    getCreateButton() {
        const button = document.createElement('i');
        button.classList.add('material-icons');
        button.innerHTML = 'close';
        return button
    },
    removePhoto(event) {
        const photoDiv = event.target.parentNode;
        const photoArray = Array.from(PhotosUpload.previewDiv.children);
        const index = photoArray.indexOf(photoDiv);

        PhotosUpload.files.splice(index, 1);
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
}

