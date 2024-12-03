 var date = document.querySelector(".date"); // select the date element
 var image = document.querySelector(".image"); // select the image element
 var explanation = document.querySelector(".explanation"); // select the explanation element
 var link = document.querySelector(".link"); // select the link element
 var apiKey = "ZEToI2isB9a0C53HlUM5e94bUbBFfFZDJSaAioOf"; // api key
 var url = "https://api.nasa.gov/planetary/apod?api_key=" + apiKey; //  API url

 
 fetch(url)
   .then(function(response) {
     return response.json(); //Parsing
   })
   .then(function(data) {
     date.textContent = data.date; 
     image.src = data.url; 
     explanation.textContent = data.explanation; 
     link.href = data.hdurl; 
     link.textContent = data.title; 
   })
   .catch(function(error) {
     //error Handling 
     console.log(error); //If any error  log to console
   });