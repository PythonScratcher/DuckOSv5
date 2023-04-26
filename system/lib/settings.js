document.addEventListener('DOMContentLoaded', function() {
            const settingsbtn = document.getElementById('settingsbtn');
            const settingsPage = document.getElementById('settingspage');

            function toggleSettings(e) {
                e.stopPropagation();
                if (settingsPage.classList.contains('show')) {
                    settingsPage.classList.add('hide');
                    setTimeout(() => {
                        settingsPage.classList.remove('show');
                        settingsPage.classList.remove('hide');
                    }, 200);
                } else {
                    settingsPage.classList.add('show');
                }
            }

            function hideSettings() {
                if (settingsPage.classList.contains('show')) {
                    settingsPage.classList.add('hide');
                    setTimeout(() => {
                        settingsPage.classList.remove('show');
                        settingsPage.classList.remove('hide');
                    }, 200);
                }
            }

            function preventPropagation(e) {
                e.stopPropagation();
            }

            settingsbtn.addEventListener('click', toggleSettings);
            settingsPage.addEventListener('click', preventPropagation);
            document.addEventListener('click', hideSettings);
        });