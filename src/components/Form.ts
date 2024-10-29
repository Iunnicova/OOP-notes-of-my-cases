//** */ МОДУЛЬ ДЛЯ СОЗДАНИЯ ФОРМЫ С КОТОРОЙ ПРЕДСТОИТ РАБОТАТЬ ДЛЯ ДОБАВЛЕНИЕ НОВЫХ ДЕЛ

import { EventEmitter, IEvents } from "./EventEmitter";

// класс отвечает за отображение формы и взаимодействие с пользователем

export interface IForm extends IEvents {
  //текст кнопки
  buttonText: string;
  //поле ввода
  placeholder: string;
  // метод рендерит форму и возвращает HTML
  render(): HTMLFormElement;
  //метод заполняет поле ввода данными
  setValue(data: string): void;
  //мутод возвращает данные из поля ввода
  getValue(): string;
  //метод очищает поле ввода
  clearValue(): void;
}

//интерфейс КОНСТРУКТОР
export interface IFormConstructor {
  new (formTemplate: HTMLTemplateElement): IForm;
}
//описываем свойства
export class Form extends EventEmitter implements IForm {
  protected formElement: HTMLFormElement;
  protected inputField: HTMLInputElement;
  protected submitButton: HTMLButtonElement;

  //получает в конструктор темплейт.  сохраняем их в полях класса
  constructor(formTemplate: HTMLTemplateElement) {
    super();
    this.formElement = formTemplate.content
      .querySelector(".todos__form")
      .cloneNode(true) as HTMLFormElement;
    //сохраняем их в полях класса
    this.inputField = this.formElement.querySelector(".todo-form__input");
    this.submitButton = this.formElement.querySelector(
      ".todo-form__submit-btn"
    );

    // устанавливаем слушатель на события сабмит форма
    this.formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      //генерируем событие сомбит и в качестве данных передаем значения из поля вввода
      this.emit("submit", { value: this.inputField.value });
    });
  }

  //рендерит форму и возвращает HTML
  render() {
    return this.formElement;
  }

  //заполняет поле ввода данными и устанавливает текст кнопки
  setValue(data: string) {
    this.inputField.value = data;
  }

  //возвращает данные из поля ввода и устанавливает текст кнопки
  getValue() {
    return this.inputField.value;
  }

  //очищает поле ввода и устанавливает текст кнопки
  clearValue() {
    this.formElement.reset();
  }

  //устанавливает текст кнопки
  set buttonText(data: string) {
    this.submitButton.textContent = data;
  }

  //устанавливает текст placeholder поля ввода
  set placeholder(data: string) {
    this.inputField.placeholder = data;
  }
}
