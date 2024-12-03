document.addEventListener("DOMContentLoaded", () => {
    const ACCESS_TOKEN = "SxauudzmmhoiX1oHEPYbrRWgTRTejwJRBIuaELDQ";
    const apiUrl = `https://api.predicthq.com/v1/events`;

    async function fetchEvents() {
        const query = document.getElementById("searchQuery").value.trim();
        const feedback = document.getElementById("feedback");
        const eventsContainer = document.getElementById("eventsContainer");

        // Reset feedback and results
        feedback.classList.add("hidden");
        feedback.textContent = "";
        eventsContainer.innerHTML = "";

        if (!query) {
            feedback.textContent = "Please enter a search term.";
            feedback.className = "error";
            feedback.classList.remove("hidden");
            return;
        }

        try {
            // Fetch data from the PredictHQ API
            const response = await fetch(`${apiUrl}?q=${query}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${ACCESS_TOKEN}`,
                },
            });

            if (!response.ok) throw new Error(`Failed to fetch events: ${response.statusText}`);

            const data = await response.json();
            renderEvents(data);
        } catch (error) {
            feedback.textContent = `Error: ${error.message}`;
            feedback.className = "error";
            feedback.classList.remove("hidden");
        }
    }

    // Function to render events
    function renderEvents(data) {
        const eventsContainer = document.getElementById("eventsContainer");

        if (data.results && data.results.length > 0) {
            data.results.forEach((event) => {
                const eventCard = createEventCard(
                    event.title,
                    event.start,
                    event.location ? event.location.join(", ") : "N/A",
                    event.description || "No description available",
                    event.url || "#"
                );
                eventsContainer.appendChild(eventCard);
            });
        } else {
            const noResults = document.createElement("p");
            noResults.textContent = "No events found for this search.";
            eventsContainer.appendChild(noResults);
        }
    }

    // Helper function to create an event card
    function createEventCard(name, date, location, description, url) {
        const card = document.createElement("div");
        card.className = "event";
        card.innerHTML = `
            <a href="${url}" target="_blank" class="event-link">
                <h3>${name}</h3>
                <p><strong>Date:</strong> ${new Date(date).toLocaleString()}</p>
                <p><strong>Location:</strong> ${location}</p>
                <p>${description}</p>
            </a>
        `;
        return card;
    }

    // Email validation function
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Handle subscription
    function handleSubscription() {
        const emailInput = document.getElementById("emailInput").value.trim();
        const subscriptionFeedback = document.getElementById("subscriptionFeedback");

        // Reset feedback message
        subscriptionFeedback.classList.add("hidden");
        subscriptionFeedback.textContent = "";

        if (!validateEmail(emailInput)) {
            subscriptionFeedback.textContent = "Please enter a valid email address.";
            subscriptionFeedback.className = "error";
            subscriptionFeedback.classList.remove("hidden");
            return;
        }

        // Mock subscription success
        subscriptionFeedback.textContent = `Successfully subscribed with email: ${emailInput}`;
        subscriptionFeedback.className = "success";
        subscriptionFeedback.classList.remove("hidden");

        // Optionally, send email to a server here
    }

    document.getElementById("searchBtn").addEventListener("click", fetchEvents);
    document.getElementById("subscribeBtn").addEventListener("click", handleSubscription);
});
