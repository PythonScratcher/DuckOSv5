window.addEventListener('load', function() {
    var loadingPage = document.querySelector('.loading-page');
    setTimeout(function() {
        loadingPage.classList.add('fade-out');
        setTimeout(function() {
            loadingPage.style.display = 'none';
        }, 500);
    }, 3000);
});
