document.addEventListener('DOMContentLoaded', function () {
    const contentSection = document.getElementById('content');

    if (contentSection) {
        const form = document.getElementById('postForm');
        const textField = document.getElementById('postText');
        const imageUrlField = document.getElementById('postImageUrl');

        // Função para adicionar postagens em texto e imagem
        function addPost(text, imageUrl) {
            const postDiv = document.createElement('div');
            postDiv.className = 'post';

            if (text) {
                const textParagraph = document.createElement('p');
                textParagraph.textContent = text;
                postDiv.appendChild(textParagraph);

                // Adiciona quebra de linha entre o texto e o botão de remoção
                const lineBreak = document.createElement('br');
                postDiv.appendChild(lineBreak);
            }

            if (imageUrl) {
                const image = document.createElement('img');
                image.src = imageUrl;
                postDiv.appendChild(image);
            }

            // Adiciona botão para remover postagem
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.addEventListener('click', function () {
                removePost(postDiv);
            });
            postDiv.appendChild(removeButton);

            contentSection.appendChild(postDiv);
        }

        // Função para salvar postagens no localStorage
        function savePost(text, imageUrl) {
            let savedPosts = JSON.parse(localStorage.getItem('savedPosts')) || [];
            savedPosts.push({ text, imageUrl });
            localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
        }

        // Função para remover postagem
        function removePost(postDiv) {
            postDiv.remove();
            updateLocalStorage();
        }

        // Função para carregar postagens do localStorage
        function loadPosts() {
            let savedPosts = JSON.parse(localStorage.getItem('savedPosts')) || [];
            savedPosts.forEach(post => addPost(post.text, post.imageUrl));
        }

        // Função para atualizar o localStorage após remoção de postagem
        function updateLocalStorage() {
            let posts = document.querySelectorAll('.post');
            let savedPosts = [];
            posts.forEach(post => {
                savedPosts.push({
                    text: post.querySelector('p').textContent,
                    imageUrl: post.querySelector('img') ? post.querySelector('img').src : null
                });
            });
            localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
        }

        // Adicionando evento de submit ao formulário
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const text = textField.value;
            const imageUrl = imageUrlField.value;

            addPost(text, imageUrl);
            savePost(text, imageUrl);

            // Limpa os campos após adicionar a postagem
            textField.value = '';
            imageUrlField.value = '';
        });

        // Carregando postagens ao carregar a página
        loadPosts();
    }
});
