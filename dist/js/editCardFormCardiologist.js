import DoctorAPIService from "./doctorAPIService.js";
import Form from "./form.js";
import { doctorAPIService } from "./main.js";

export default class EditCardFormCardiologist extends Form {
  createEditForm() {
    this.position = "beforeend";
    this.parentElement = document.querySelector(".form-data");
    this.createElement(`
        <div class = 'edit-name'>Змініть ім'я:</div>
        <input type"text" class='edit-name-input'>
        <div class = 'edit-purpose'>Змініть мету візиту:</div>
        <input type"text" class='edit-purpose-input'>
        <div class = 'edit-description'>Змініть опис візиту:</div>
        <input type"text" class='edit-description-input'>
        <div class = 'edit-age'>Змініть вік:</div>
        <input type"text" class='edit-age-input'>
        <div class = 'edit-diseases'>Змініть захворювання:</div>
        <input type"text" class='edit-diseases-input'>
        <div class = 'edit-pressure'>Змініть тиск:</div>
        <input type"text" class='edit-pressure-input'>
        <button type='submit' class='btn edit-card-btn'>Редагувати</button>
      `);
  }
  trackEditBtn(id) {
    this.editBtn = document.querySelector(".edit-card-btn");
    this.editBtn.addEventListener("click", () => {
      this.editName = document.querySelector(".edit-name-input").value;
      this.editPurpose = document.querySelector(".edit-purpose-input").value;
      this.editDescription = document.querySelector(
        ".edit-description-input"
      ).value;
      this.editAge = document.querySelector(".edit-age-input").value;
      this.editDiseases = document.querySelector(".edit-diseases-input").value;
      this.editPressure = document.querySelector(".edit-pressure-input").value;
      doctorAPIService.changeCard(
        id,
        this.editName,
        this.editPurpose,
        this.editDescription,
        this.editAge,
        (this.doctor = "Сardiologist"),
        this.editDiseases,
        this.editPressure
      );
      this.position = "beforeend";
      this.parentElement = document.querySelector(".main-content");
      this
        .createElement(`<div data-item=${id}  class='visit-therapist-card visit-card-element'>
        <div class='delete-card delete-card-${id}'> X </div>
        <div class='name'>Ім'я: ${this.editName}</div>
        <div class='visit-doctor'>Лікар: ${this.doctor}</div>  
        <div class='purpose'>Мета візиту: ${this.editPurpose}</div>
        <div class='description'>Опис візиту: ${this.editDescription}</div>
        <div class='lastVisit'>Вік: ${this.editAge}</div>
        <div class='visit-number'>Номер візиту: ${id}</div>  
        <div class='editDiseases'>Перенесені захворювання серцево-судинної системи: ${this.editDiseases}</div>
        <div class='editPressure'>Тиск: ${this.editPressure}</div>
        </div>`);
      this.delete = document.querySelector(`.delete-card-${id}`);
      this.delete.addEventListener("click", () => {
        doctorAPIService.deleteCard(id);
        this.delete.parentNode.remove();
      });
      document.querySelector(".form-data").remove();
    });
  }
  render(id) {
    this.renderDefaultForm();
    this.createEditForm();
    this.trackEditBtn(id);
  }
}
