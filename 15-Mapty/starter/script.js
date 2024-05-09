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
  // ovviamente per ogni istanza vengono calcolate nuovamnete
  //che siano dirette o child
  id = Date.now();
  date = new Intl.DateTimeFormat(navigator.locale, { day: "numeric", month: "long", }).format(new Date());
  constructor(coords, distance, duration) {
    this.distance = distance;
    this.duration = duration;
    this.coords = coords;
  }
}

class Running extends Workout {
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.type = "running";
    this.calcPace()
  }
  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  constructor(coords, distance, duration, elevation) {
    super(coords, distance, duration);
    this.elevationGain = elevation;
    this.calcSpeed();
    this.type = "cycling";

  }
  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}



class App {
  #map;
  #coords;
  #workout = [];
  constructor() {
    this._getPosition();
    form.addEventListener("submit", this._newWorkout.bind(this));
    inputType.addEventListener("change", this._toggleElevationField.bind(this));
    containerWorkouts.addEventListener("click", this._hoverWorkout.bind(this));

  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), () => alert("Error"))
    }
  }
  _loadMap(pos) {
    const { latitude: lat, longitude: lon } = pos.coords;
    this.#map = L.map('map').setView([lat, lon], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.#map);
    L.marker([lat, lon]).addTo(this.#map)
      .bindPopup('YOU')
      .openPopup();
    this.#map.addEventListener("click", this._showForm.bind(this));
    this._getLocalDate();
  }

  _showForm(e) {
    this.#coords = e.latlng;
    form.classList.remove('hidden');
    inputDistance.focus();
  }
  _toggleElevationField() {
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');

  }
  _newWorkout(e) {
    e.preventDefault();
    const data = [inputDistance.value, inputDuration.value, inputType.value == 'running' ? inputCadence.value : inputElevation.value];
    const validation = data.every(el => el && Number.parseFloat(el));
    if (!validation) return;
    const workout = inputType.value == 'running' ? new Running(this.#coords, ...data) : new Cycling(this.#coords, ...data);
    this.#workout.push(workout);
    localStorage.setItem('workout', JSON.stringify(this.#workout));
    this._renderWorkout(workout);
    const { lat, lng } = this.#coords;
    L.marker([lat, lng]).addTo(this.#map)
      .bindPopup(L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: "running-popup"
      }))
      .setPopupContent(`${(workout.type === "running") ? "🏃‍♂️" : "🚴‍♀️"}${inputType.value.at(0).toUpperCase() + inputType.value.slice(1)} on ${workout.date}`)
      .openPopup();
    //clear Input
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';
    form.classList.add('hidden');
  }
  _renderWorkout(workout) {
    console.log(this.#workout);
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
    containerWorkouts.insertAdjacentHTML('beforeend', html);

  }
  _hoverWorkout(e) {
    if (!e.target.closest(".workout")) return;
    const work = e.target.closest(".workout");
    const wk = this.#workout.find(el => el.id == work.dataset.id);
    const { lat, lng } = wk.coords;
    this.#map.setView([lat, lng], 13, { animate: true, pan: { duration: 0.6, easeLinearity: 0.3 } });
  }
  _getLocalDate() {
    const data = JSON.parse(localStorage.getItem('workout'));
    if (!data) return;
    this.#workout = data;
    console.log(this.#workout);
    this._renderLocalData();

  }

  _renderLocalData() {
    this.#workout.forEach(el => {
      L.marker([el.coords.lat, el.coords.lng]).addTo(this.#map)
        .bindPopup(L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: "running-popup"
        }))
        .setPopupContent(`${(el.type === "running") ? "🏃‍♂️" : "🚴‍♀️"}${el.type.at(0).toUpperCase() + inputType.value.slice(1)} on ${el.date}`)
        .openPopup();
      this._renderWorkout(el);
    })
  }
}

const app = new App;







