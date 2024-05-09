'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const elementInput = [inputDistance, inputDuration, inputCadence, inputElevation];

class Workout {
  options = { day: "numeric", month: "long" };
  date = new Intl.DateTimeFormat(navigator.locale, this.options).format(new Date());
  id = (Date.now() + "").slice(-10);
  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance; //km
    this.duration = duration;//h
  }
}
class Running extends Workout {
  type = "running";
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration)
    this.cadence = cadence;
    this.calcPace();
  }
  calcPace() {
    //min/km
    this.pace = (this.duration / this.distance).toFixed(2);
    return this.pace
  }
}
class Cycling extends Workout {
  type = "cycling";
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration)
    this.elevationGain = elevationGain;
    this.calcSpeed();
  }
  calcSpeed() {
    this.speed = (this.distance / (this.duration / 60)).toFixed(2);
    return this.speed;
  }
}

// Application achitecture
class App {
  #map;
  #mapEvent;
  localStrorage = localStorage.getItem("workout");
  #markerOption = {
    maxWidth: 250,
    minWidth: 100,
    autoClose: false,
    closeOnClick: false,
    className: 'running-popup'
  }
  #workout = [];
  constructor() {
    this._getPosition();
    form.addEventListener("submit", this._newWorkout.bind(this));
    inputType.addEventListener("change", this._toggleElevationField)
    containerWorkouts.addEventListener("click", this._renderMapOnClick.bind(this))
  }
  _getPosition() {
    if (navigator.geolocation)
      //2 callback come input
      //1 solo in caso di successo 
      //2 in caso di errore
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), () => alert("Error"));
  }
  _loadMap(pos) {
    const { latitude, longitude } = pos.coords;
    this.#map = L.map('map').setView([latitude, longitude], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.#map);
    this.#map.on('click', this._showForm.bind(this));
    this.localStrorage && this._loadLocalWorkout(JSON.parse(this.localStrorage));

  }
  _showForm(ev) {
    this.#mapEvent = ev;
    form.classList.remove("hidden");
    inputDistance.focus();
  }
  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }
  _newWorkout(e) {
    e.preventDefault();
    let workout;
    //check data form  
    if (!this._validation()) return alert("input have to be positive Number!");

    const { lat, lng } = this.#mapEvent.latlng;
    if (inputType.value === "running") {
      workout = new Running([lat, lng], inputDistance.value, inputDuration.value, inputCadence.value);
    }
    if (inputType.value === "cycling") {
      workout = new Cycling([lat, lng], inputDistance.value, inputDuration.value, inputElevation.value);
      this.#markerOption.className = "cycling-popup";
    }
    this.#workout.push(workout);
    //rendere on map
    this._renderWorkoutMarker(workout);
    //Render Workout LIST
    this._renderWorkout(workout);
    //HIde form clear filed
    e.currentTarget.classList.add('hidden');
    this._resetField();
    //Set localStorage Workout
    this._setLocalStorage();
  }
  _renderWorkoutMarker(workout) {
    L.marker(workout.coords).addTo(this.#map)
      .bindPopup(L.popup(this.#markerOption))
      .setPopupContent(workout.type.at(0).toUpperCase() + workout.type.slice(1) + " on " + workout.date)
      .openPopup();
  }
  _renderWorkout(workout) {
    const html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
      <h2 class="workout__title">${workout.type.at(0).toUpperCase() + workout.type.slice(1)} on ${workout.date}</h2>
      <div class="workout__details">
        <span class="workout__icon">${(workout.type === "running") ? "🏃‍♂️" : "🚴‍♀️"}</span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${(workout.type === "running") ? workout.pace : workout.speed}</span>
        <span class="workout__unit">${(workout.type === "running") ? "min/km" : "km/h"}</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">${(workout.type === "running") ? "⛰" : "🦶🏼"}</span>
        <span class="workout__value">${(workout.type === "running") ? workout.cadence : workout.elevationGain}</span>
        <span class="workout__unit">${(workout.type === "running") ? "spm" : "m"}</span>
      </div>
    </li>`
    containerWorkouts.insertAdjacentHTML("beforeend", html);
  }
  _renderMapOnClick(e) {
    const a = e.target.closest(".workout");
    if (!a) return;
    const findCoord = this.#workout.find(el => el.id === a.dataset.id);
    if (!findCoord) return;
    this.#map.setView(findCoord.coords, 13, {
      animate: true,
      pan: {
        duration: 1,
        easeLinearity: 0.15
      }
    });
  }
  _setLocalStorage() {
    localStorage.setItem("workout", JSON.stringify(this.#workout));
  }
  _loadLocalWorkout(localStrorage) {
    this.#workout = localStrorage;
    this.#workout.forEach(el => {
      this._renderWorkoutMarker(el);
      this._renderWorkout(el);
    })
  }
  _resetField() {
    elementInput.forEach(el => {
      el.value = "";
      el.blur();
    })
  }
  _validation() {
    const fieldCheck = [inputDistance.value, inputDuration.value, (inputType.value === "running" ? inputCadence.value : inputElevation.value)];
    return fieldCheck.every(el => el > 0 && isFinite(el));;
  }
}


const app = new App();






