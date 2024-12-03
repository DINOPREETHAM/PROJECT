const stationIdInput = document.getElementById('stationId');
const statusDiv = document.getElementById('status');
const historyDiv = document.getElementById('history');
const nextTrackDiv = document.getElementById('nextTrack');

document.getElementById('getStatus').addEventListener('click', () => {
    const stationId = stationIdInput.value;
    if (stationId) {
        getStationStatus(stationId);
    } else {
        alert('Please enter a station ID');
    }
});

document.getElementById('getHistory').addEventListener('click', () => {
    const stationId = stationIdInput.value;
    if (stationId) {
        getStationHistory(stationId);
    } else {
        alert('Please enter a station ID');
    }
});

document.getElementById('getNextTrack').addEventListener('click', () => {
    const stationId = stationIdInput.value;
    if (stationId) {
        getNextTrack(stationId);
    } else {
        alert('Please enter a station ID');
    }
});

// Fetch Station Status
function getStationStatus(stationId) {
    fetch(`https://public.radio.co/stations/${stationId}/status`)
        .then(response => response.json())
        .then(data => {
            const status = data.status;
            const currentTrack = data.current_track ? data.current_track.title : 'No track playing';
            statusDiv.innerHTML = `
                <h2>Station Status</h2>
                <p>Status: ${status}</p>
                <p>Current Track: ${currentTrack}</p>
            `;
        })
        .catch(error => {
            statusDiv.innerHTML = `<p>Error fetching station status: ${error}</p>`;
        });
}

// Fetch Station History
function getStationHistory(stationId) {
    fetch(`https://public.radio.co/stations/${stationId}/history`)
        .then(response => response.json())
        .then(data => {
            const tracks = data.tracks || [];
            let historyHTML = `<h2>Track History</h2>`;
            if (tracks.length) {
                tracks.forEach(track => {
                    historyHTML += `
                        <p><strong>${track.title}</strong> - ${track.start_time}</p>
                        <img src="${track.artwork_url}" alt="Track artwork" width="100">
                    `;
                });
            } else {
                historyHTML += `<p>No track history available.</p>`;
            }
            historyDiv.innerHTML = historyHTML;
        })
        .catch(error => {
            historyDiv.innerHTML = `<p>Error fetching track history: ${error}</p>`;
        });
}

// Fetch Next Track
function getNextTrack(stationId) {
    fetch(`https://public.radio.co/stations/${stationId}/next`)
        .then(response => response.json())
        .then(data => {
            const nextTrack = data.next_track ? data.next_track.title : 'No upcoming track';
            nextTrackDiv.innerHTML = `
                <h2>Next Track</h2>
                <p>Next Track: ${nextTrack}</p>
                <img src="${data.next_track.artwork_url}" alt="Next track artwork" width="100">
            `;
        })
        .catch(error => {
            nextTrackDiv.innerHTML = `<p>Error fetching next track: ${error}</p>`;
        });
}
