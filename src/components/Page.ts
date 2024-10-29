//класс хранит в себе 2 контейнера отвечает за блок <main class="content">

export interface IPage {
  formContainer: HTMLElement;
  todoContainer: HTMLElement[];
}

export class Page implements IPage {
  //отображается форма
  _formContainer: HTMLElement;
  //отображается список наших дел
  _todoContainer: HTMLElement;

  //в конструктор передаем сонтейнер самой страницы блок <main class="content">
  constructor(protected container: HTMLElement) {
    this._formContainer = this.container.querySelector(".todo-form-container");
    this._todoContainer = this.container.querySelector(".todos__list");
  }
  //устанавливает содержимое для списка дел, передаем массив из
  set todoContainer(items: HTMLElement[]) {
    this._todoContainer.replaceChildren(...items);
  }

  //устанавливает форму передаем сгенерированную форму, разметку самой формы
  set formContainer(formElement: HTMLFormElement | null) {
    if (formElement) {
      this._formContainer.replaceChildren(formElement);
    } else {
      this._formContainer.innerHTML = "";
    }
  }
}
