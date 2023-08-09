// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   // why the extra indent? Do I need to extract the variables here too?
   let missionTarget = document.getElementById('missionTarget');
        missionTarget.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name} </li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">
        `
}

function validateInput(testInput) {
    // testing numeric data to ensure countablility 
    if (testInput === "" || testInput === null || testInput === 0) {
        return `Empty` // Would 0000 return an invalid submission? or 0.0?
    } else if ((!isNaN(Number(testInput)))) {
        return `Is a Number`// used to check co/pilot entries // need a false statement that prompts the next condition
    } else {
        return 'Not a Number' // used to check fuel and cargo entries
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
   // gather user input while also  viability and functionality
   // DOM elements from index even though we didn't access the parent/sibling file (formulas are exported at the bottom)
   let pilotStatus = document.getElementById('pilotStatus');
   let copilotStatus = document.getElementById('copilotStatus');
   let fuelStatus = document.getElementById('fuelStatus');
   let launchStatus = document.getElementById('launchStatus');
   let cargoStatus = document.getElementById('cargoStatus');


   // all fields have an entry
   if (validateInput(pilot) === `Empty`|| validateInput(copilot) === `Empty`|| 
   validateInput(fuelLevel) === `Empty`||validateInput(cargoLevel) === `Empty`) {
       alert(`All fields are required`); 
       // Empty is a local variable defined in previous function (Don't mix up concepts with variables)
   } else if (validateInput(fuelLevel) === 'Not a Number' || validateInput(cargoLevel) === 'Not a Number') {
       // fuelLevel and cargoLevel are numbers +++ co/pilot are strings
       alert(`Please enter numerical values for Fuel Level and Cargo Mass`);
   } else if (validateInput(pilot)===`Is a Number`||validateInput(copilot)===`Is a Number`) {
       alert('Please do not enter numbers for name of pilot or co-pilot');
   } else { 
       // update co/pilot status
       pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
       copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
       list.style.visibility = 'visible'; // double check this with Carrie's recording about hidden visibility
   }


   //check fuel levels and update faulty items
   if (Number(fuelLevel) < 10000) {       
       list.style.visibility = 'visible';
       fuelStatus.innerHTML = `Not enough fuel for journey`;
       launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
       launchStatus.style.color = 'rgb(199, 37, 78)';
   } else if (Number(cargoLevel) > 10000) {
       list.style.visibility = 'visible';
       cargoStatus.innerHTML = `Cargo mass too heavy for launch`;
       launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
       launchStatus.style.color = 'rgb(199, 37, 78)';
   } else if (Number(cargoLevel) < 10000 && Number(fuelLevel) > 10000) {
       list.style.visibility = 'visible';
       fuelStatus.innerHTML = `Enough fuel for journey`;
       cargoStatus.innerHTML = `Cargo light enough for takeoff`;
       launchStatus.innerHTML = `Shuttle is Ready for Launch`;
       launchStatus.style.color = 'green';
   }
}



async function myFetch() {
    let planetsReturned;
    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json()
        });
    return planetsReturned;
}

function pickPlanet(planets) {
    let i = Math.floor(Math.random()*planets.length);
    return planets[i];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
