// Инициализация TON Connect UI
const tonConnectUI = new TonConnectUI.TonConnectUI({
    manifestUrl: 'https://rrts-production.up.railway.app/tonconnect-manifest.json', // Замените <YOUR_APP_URL> на ваш URL
    buttonRootId: 'ton-connect'
});

// Функция для подключения к кошельку
async function connectToWallet() {
    try {
        const connectedWallet = await tonConnectUI.connectWallet();
        console.log('Кошелек подключен:', connectedWallet);
        showNotification('Кошелек подключен успешно!', 'success');
    } catch (error) {
        console.error("Ошибка при подключении к кошельку:", error);
        showNotification('Ошибка при подключении к кошельку.', 'error');
    }
}

// Функция для отображения уведомлений
function showNotification(message, type) {
    const statusDiv = document.getElementById('transaction-status');
    statusDiv.innerText = message;
    statusDiv.className = `status ${type}`;

    // Сброс класса после отображения
    setTimeout(() => {
        statusDiv.className = 'status';
    }, 3000);
}

// Добавляем обработчик клика на TON Connect кнопку
document.getElementById('ton-connect').addEventListener('click', connectToWallet);

// Обработка отправки транзакции
document.getElementById('send-transaction-btn').addEventListener('click', async () => {
    try {
        // Убедитесь, что кошелек подключен
        const connectedWallet = await tonConnectUI.getConnectedWallet();
        if (!connectedWallet) {
            showNotification('Пожалуйста, подключите кошелек сначала.', 'error');
            return;
        }

        // Пример транзакции
        const transaction = {
            messages: [
                {
                    address: "EQBDT2vmEdKWRNVcdHiRP3k2JXMsfS5VU-GguXIc2UUBV2tk", // Адрес получателя
                    amount: "20000000" // Сумма в nanotons
                }
            ]
        };

        // Отправка транзакции
        const result = await tonConnectUI.sendTransaction(transaction);
        console.log('Транзакция отправлена:', result);
        showNotification('Transaction Sent', 'success');
    } catch (error) {
        console.error("Ошибка при отправке транзакции:", error);
        showNotification('Transaction Failed', 'error');
    }
});
