PROJECT NAME : TriAPI

GROUP MEMBERS: PREETHAM KUMAR 
               AVIRAL
               EMMANUEL

ABOUT:

The TriAPI project successfully integrates real-time weather, news, and event data into a single, cohesive platform. By focusing on user experience and providing accurate, timely information, the application ensures that users can easily access vital updates in a user-friendly interface. The inclusion of additional features and error-handling mechanisms further strengthens its usability, making it a reliable tool for anyone seeking up-to-date information. The TriAPI project showcases the power of seamless integration and serves as an efficient, accessible platform for real-time data management.

PAGES:
MAIN PAGE  - Home page (NASA page is implemented at the bottom of this page).

NEWS PAGE  -the news page utilises News api from newsapi.org  which shows latest news articles . we can also serach for any article with Keyword   or phrase. Eg: find all articles containing the word 'Microsoft'.
Date published. Eg: find all articles published yesterday.
Source domain name. Eg: find all articles published on thenextweb.com.

NASA PAGE  - The NASA Picture of the Day page uses the NASA Open API to fetch NASA's daily featured image, along with a description and the name of the photographer who captured it.

WEATHER PAGE - This weather application allows users to search for current weather data and forecasts for any city or country around the world. By integrating with the OpenWeatherMap API, it provides detailed weather information, including:

1. Current weather conditions (temperature, humidity, wind speed, atmospheric pressure, etc.)
2. 5-day weather forecast
3. Interactive world weather map

EVENT PAGE -The Event Search Application is a dynamic web page that allows users to explore events happening around the world. It integrates modern web technologies to deliver a responsive, user-friendly experience. Users can search for events based on specific keywords, view detailed event information, and subscribe to updates via email.

RADIO PAGE -The "Radio Station" page is part of the TriAPI platform, designed to interact with live radio stations via APIs. This page enables users to explore real-time data from online radio stations, such as their current status, track history, and upcoming tracks. With a modern design and interactive features, the page delivers a seamless experience for users who want to stay updated with their favorite radio stations.

API Used and its Capabilities

I  NEWS API from https://newsapi.org/
News API is a simple HTTP REST API for searching and retrieving live articles from all over the web. 
What top stories is TechCrunch running right now?
What new articles were published about the next iPhone today?
Has my company or product been mentioned or reviewed by any blogs recently?
You can search for articles with any combination of the following criteria:
•	Keyword or phrase. Eg: find all articles containing the word 'Microsoft'.
•	Date published. Eg: find all articles published yesterday.
•	Source domain name. Eg: find all articles published on thenextweb.com. 
•	Language. Eg: find all articles written in English.
The results are sorted in the following orders:
•	Date published
•	Relevancy to search keyword
•	Popularity of source

II NASA OPEN API from https://api.nasa.gov/
The objective of this API  is to make NASA data, including imagery, eminently accessible to application developers. 
It is very efficient in providing best picture of the day with a description and the person who took the photo by Nasa.

III OpenWeatherMap API: Provides weather data (current weather, forecast, and weather maps)
API Usage
Current Weather:
Endpoint: https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
Description: Retrieves the current weather data for the specified city.
Weather Forecast:
Endpoint: https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
Description: Fetches the 5-day forecast for the specified city.

IV PredictHQ API
This application utilizes the PredictHQ API to retrieve event data.
Capabilities of PredictHQ API
•	Search Events:
The API enables searching for events based on:
o	Keywords: Fetch events that match user-provided search terms.
o	Categories: Filter by event types such as music, business, sports, etc.
o	Date Range: Query events happening within a specific timeframe.
o	Location: Retrieve events occurring in a specific geographical area.

V Radio.co API
The page integrates with the Radio.co Public API, a platform that provides real-time data about radio stations.


Weather Map:
Endpoint: https://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={API key}
Description: Provides weather map data (used for displaying global weather conditions).



RUNNING THE FILE:

It can be run locally by using live server extention.
