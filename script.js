function showSuccess() {
    alert('Success! Інформація була зчитана.');
}

document.getElementById('fetchButton').addEventListener('click', fetchUsersInfo);

function fetchUsersInfo() {
    const promises = [];

    for (let i = 0; i < 5; i++) {
      promises.push(fetch('https://randomuser.me/api').then(response => response.json()));
    }

    Promise.all(promises)
      .then(usersData => {
        const usersInfoContainer = document.getElementById('user-info');
        usersInfoContainer.innerHTML = '';

        usersData.forEach(userData => {
          const user = userData.results[0];
          const userInfo = document.createElement('div');
          userInfo.className = 'user-card';
          userInfo.innerHTML = `
            <img src="${user.picture.large}" alt="User Picture">
            <p>Ім'я: ${user.name.first} ${user.name.last}</p>
            <p>Номер: ${user.cell}</p>
            <p>Місто: ${user.location.city}</p>
            <p>Країна: ${user.location.country}</p>
          `;
          usersInfoContainer.appendChild(userInfo);
        });
      })
      .catch(error => console.error('Помилка отримання даних:', error));
}