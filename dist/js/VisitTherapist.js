import Visit from "./visit.js";
import { item } from "./main.js";
import { doctorAPIService } from "./main.js";
import EditCardFormTherapist from "./editCardFormTherapist.js";

export default class VisitTherapist extends Visit {
  getAge(response) {
    this.age = response.age;
  }
  getID(response) {
    this.id = response.id;
  }
  getDoctor(response) {
    this.doctor = response.doctor;
  }
  showCard() {
    this.position = "beforeend";
    this.parentElement = document.querySelector(".main-content");
    this
      .createElement(`<div data-item=${this.id} data-doctor=${this.doctor}   class=' visit-therapist-card card-body visit-card-element'>
      <div   class='delete-card delete-card-${this.id}'> X </div>
      <div class='name'>Ім'я: ${this.name}</div>
      <div class='visit-doctor'>Лікар: ${this.doctor}</div>  
      </div>`);
  }
  createBtnShowMore() {
    this.position = "beforeend";
    this.parentElement = document.querySelector(
      `.visit-therapist-card[data-item="${this.id}"]`
    );
    this.createElement(`
      <button data-item=${this.id} type='submit' class='btn show-more'>Показати більше</button>
      `);
    this.btnShowMore = document.querySelector(
      `.show-more[data-item="${this.id}"]`
    );
    this.btnShowMore.addEventListener("click", () => {
      this.createElement(`
        <div class='purpose'>Мета візиту: ${this.purpose}</div>
        <div class='description'>Опис візиту: ${this.description}</div>
        <div class='lastVisit'>Вік: ${this.age}</div>
        <div class='visit-number'>Номер візиту: ${this.id}</div>  
        <button type='submit' class = 'btn edit edit-card-${this.id}'>Редагувати</button>
        `);
      this.btnShowMore.remove();
      this.editCard();
    });
  }
  deleteCard() {
    this.delete = document.querySelector(`.delete-card-${this.id}`);
    this.delete.addEventListener("click", () => {
      doctorAPIService.deleteCard(this.id);
      this.delete.parentNode.remove();
    });
  }
  editCard() {
    this.edit = document.querySelector(`.edit-card-${this.id}`);
    this.edit.addEventListener("click", () => {
      this.edit.parentNode.remove();
      const editCardForm = new EditCardFormTherapist();
      editCardForm.render(this.id);
    });
  }
  render(response) {
    this.getID(response);
    this.getDoctor(response);
    this.renderDefaultVisit(response);
    this.getAge(response);
    this.showCard();
    this.createBtnShowMore();
    this.deleteCard();
  }
}
