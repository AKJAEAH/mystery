const questions = [
    {
        text: {
            en: 'Sometimes fear, sometimes happy. Sometimes war, sometimes peace.',
            ru: 'Иногда страх, иногда счастье. Иногда война, иногда мир.',
            tr: 'Bazen korku, bazen mutluluk. Bazen savaş, bazen barış.'
        },
        correctIcon: 'cinema',
        icons: [
            { src: 'https://www.iconarchive.com/download/i103468/paomedia/small-n-flat/shop.1024.png', label: { en: 'Shop', ru: 'Магазин', tr: 'Dükkan' }},
            { src: 'https://icons.iconarchive.com/icons/paomedia/small-n-flat/512/house-icon.png', label: { en: 'House', ru: 'Дом', tr: 'Ev' }},
            { src: 'https://cdn-icons-png.freepik.com/256/8176/8176383.png?semt=ais_hybrid', label: { en: 'Bank', ru: 'Банк', tr: 'Banka' }},
            { src: 'https://cdn-icons-png.flaticon.com/512/2084/2084175.png', label: { en: 'Airport', ru: 'Аэропорт', tr: 'Havaalanı' }},
            { src: 'https://cdn-icons-png.freepik.com/512/4320/4320350.png', label: { en: 'Hospital', ru: 'Больница', tr: 'Hastane' }},
            { src: 'https://cdn.iconscout.com/icon/free/png-256/free-cinema-2540593-2125137.png?f=webp&w=256', label: { en: 'Cinema', ru: 'Кино', tr: 'Sinema' }},
            { src: 'https://cdn-icons-png.flaticon.com/512/7674/7674898.png', label: { en: 'Nightclub', ru: 'Ночной клуб', tr: 'Gece kulübü' }},
            { src: 'https://cdn-icons-png.flaticon.com/512/3499/3499102.png', label: { en: 'Barber', ru: 'Парикмахер', tr: 'Berber' }},
            { src: 'https://cdn-icons-png.flaticon.com/512/433/433102.png', label: { en: 'Park', ru: 'Парк', tr: 'Park' }}
        ]
    },
    // Diğer sorular burada tanımlanabilir...
];

let currentQuestionIndex = 0;
let attemptsLeft = 3;
let darkMode = false;
let currentLanguage = 'en'; // Varsayılan dil İngilizce

function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        document.getElementById('question').innerText = question.text[currentLanguage];
        document.getElementById('attempts').innerText = getAttemptsText();

        const iconsGrid = document.getElementById('icons-grid');
        iconsGrid.innerHTML = ''; // Mevcut simgeleri sil

        question.icons.forEach((item) => {
            const { src, label } = item;
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('icon-container');

            const img = document.createElement('img');
            img.src = src;
            img.alt = label[currentLanguage];
            img.id = label.en.toLowerCase(); // ID'yi İngilizce adıyla ayarla
            img.classList.add('icon-image');

            const imgLabel = document.createElement('p');
            imgLabel.innerText = label[currentLanguage];
            imgLabel.classList.add('icon-label');

            imgContainer.appendChild(img);
            imgContainer.appendChild(imgLabel);

            imgContainer.addEventListener('click', () => handleIconClick(img.id, question));

            iconsGrid.appendChild(imgContainer);
        });
    }
}

function handleIconClick(clickedIconId, question) {
    if (clickedIconId === question.correctIcon) {
        alert(getCorrectAlertText());
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            document.getElementById('question').innerText = getCompletionText();
            document.getElementById('icons-grid').innerHTML = '';
            document.getElementById('attempts').innerText = '';
        }
    } else {
        attemptsLeft--;
        if (attemptsLeft > 0) {
            alert(getWrongAlertText());
            document.getElementById('attempts').innerText = getAttemptsText();
        } else {
            alert(getGameOverText());
            document.getElementById('question').innerText = getGameOverText();
            document.getElementById('icons-grid').innerHTML = '';
            document.getElementById('attempts').innerText = '';
        }
    }
}

function toggleDarkMode() {
    const body = document.body;
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const questionPanel = document.getElementById('question-panel');
    const sidePanel = document.getElementById('side-panel');
    const infoPanel = document.getElementById('info-panel');

    darkMode = !darkMode;
    if (darkMode) {
        body.classList.add('dark-mode');
        questionPanel.classList.add('dark-mode');
        sidePanel.classList.add('dark-mode');
        infoPanel.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<ion-icon name="moon-outline"></ion-icon>';
    } else {
        body.classList.remove('dark-mode');
        questionPanel.classList.remove('dark-mode');
        sidePanel.classList.remove('dark-mode');
        infoPanel.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<ion-icon name="moon"></ion-icon>';
    }
}

function changeLanguage(language) {
    currentLanguage = language;
    loadQuestion();
    document.getElementById('attempts').innerText = getAttemptsText();
    document.getElementById('dark-mode-toggle').setAttribute('title', getDarkModeToggleTitle());
}

function getAttemptsText() {
    switch (currentLanguage) {
        case 'ru':
            return `Осталось попыток: ${attemptsLeft}`;
        case 'tr':
            return `Kalan Hak: ${attemptsLeft}`;
        default:
            return `Attempts Left: ${attemptsLeft}`;
    }
}

function getCorrectAlertText() {
    switch (currentLanguage) {
        case 'ru':
            return 'Правильно! Переход на следующий уровень.';
        case 'tr':
            return 'Doğru! Bir sonraki seviyeye geçiliyor.';
        default:
            return 'Correct! Moving to the next level.';
    }
}

function getWrongAlertText() {
    switch (currentLanguage) {
        case 'ru':
            return `Неправильный значок. Попробуйте еще раз. Осталось попыток: ${attemptsLeft}`;
        case 'tr':
            return `Yanlış simge. Tekrar deneyin. Kalan hak: ${attemptsLeft}`;
        default:
            return `Wrong icon. Try again. Attempts left: ${attemptsLeft}`;
    }
}

function getGameOverText() {
    switch (currentLanguage) {
        case 'ru':
            return 'Вы использовали все попытки. Игра окончена.';
        case 'tr':
            return 'Tüm haklarınızı kullandınız. Oyun bitti.';
        default:
            return 'You have used all attempts. Game over.';
    }
}

function getCompletionText() {
    switch (currentLanguage) {
        case 'ru':
            return 'Поздравляю, вы завершили все вопросы!';
        case 'tr':
            return 'Tebrikler, tüm soruları tamamladınız!';
        default:
            return 'Congratulations, you completed all questions!';
    }
}

function getDarkModeToggleTitle() {
    switch (currentLanguage) {
        case 'ru':
            return 'Переключить темный режим';
        case 'tr':
            return 'Karanlık Modu Değiştir';
        default:
            return 'Toggle Dark Mode';
    }
}

document.getElementById('english-flag').addEventListener('click', () => changeLanguage('en'));
document.getElementById('russian-flag').addEventListener('click', () => changeLanguage('ru'));
document.getElementById('turkish-flag').addEventListener('click', () => changeLanguage('tr'));

const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('click', toggleDarkMode);

document.addEventListener('DOMContentLoaded', loadQuestion);
