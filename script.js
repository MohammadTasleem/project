const timeDisplay = document.getElementById('time');
const alarmTimeInput = document.getElementById('alarm-time');
const alarmsList = document.getElementById('alarms-list');

let alarms = [];

function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;

    alarms.forEach((alarm, index) => {
        if (alarm.time === `${hours}:${minutes}`) {
            alert('Alarm ringing!');
            removeAlarm(index);
        }
    });
}

function setAlarm() {
    const alarmTime = alarmTimeInput.value;
    if (!alarmTime) {
        alert('Please set a valid alarm time.');
        return;
    }

    const alarm = {
        time: alarmTime,
        timeoutId: setTimeout(() => {
            alert('Alarm ringing!');
            removeAlarm(alarms.findIndex(a => a.time === alarmTime));
        }, new Date().setHours(...alarmTime.split(':')) - Date.now())
    };

    alarms.push(alarm);
    renderAlarms();
}

function removeAlarm(index) {
    clearTimeout(alarms[index].timeoutId);
    alarms.splice(index, 1);
    renderAlarms();
}

function renderAlarms() {
    alarmsList.innerHTML = '';
    alarms.forEach((alarm, index) => {
        const alarmItem = document.createElement('div');
        alarmItem.className = 'alarm-item';
        alarmItem.innerHTML = `
            <div class="alarm-time">${alarm.time}</div>
            <button class="alarm-remove" onclick="removeAlarm(${index})">Remove</button>
        `;
        alarmsList.appendChild(alarmItem);
    });
}

setInterval(updateTime, 1000);
