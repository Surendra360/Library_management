
    const currentTimeElement = document.getElementById('current-time');

    function updateTime() {
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const seconds = currentTime.getSeconds();
        const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        currentTimeElement.textContent = timeString;
    }

    updateTime(); // initial update
    setInterval(updateTime, 1000); // update every 1 second
