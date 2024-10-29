export interface IPopup {
  content: HTMLElement;
  open(): void;
  close(): void;
}

export class Popup implements IPopup {
  protected closeButton: HTMLButtonElement;
  protected _content: HTMLElement;

  //в данном классе принимаем в конструктор контейнер(элемент нашей разметки  <div class="popup">)
  constructor(protected container: HTMLElement) {
    //нахоим кнопку закрыти
    this.closeButton = container.querySelector(".popup__close");
    //находим контент, в который будем добавлять что-то
    this._content = container.querySelector(".popup__content");
    // на кнопку закрытия устанавливаем слушатель при клике попап будет закрываться метод .close
    this.closeButton.addEventListener("click", this.close.bind(this));
    // добавляем слушатель на всю область попапа, если кликнут на любом месте попап закрывается метод.close
    this.container.addEventListener("click", this.close.bind(this));
    // добавляем слушатель на контейнер попапа, чтобы кликнуть внутри попапа не закрывался(event.stopPropagation()), мы его отменяем
    this.container
      .querySelector(".popup__container")
      .addEventListener("click", (event) => event.stopPropagation());
  }

  //для установки внутреннего содержимого рорара будем использовать set content в который будем передовать элемент разметки с этой начинкой
  set content(value: HTMLElement) {
    this._content.replaceChildren(value);
  }

  //методы открытия попапа
  open() {
    this.container.classList.add("popup_is-opened");
  }

  //метод закрытия попапа
  close() {
    //удаляем класс открытия попапа чтобы он стал закрытым и не занимал места в памяти, т.к. он уже нам больше не нужен
    this.container.classList.remove("popup_is-opened");
    //очищаем содержимое попапа чтобы он не занимал места в памяти, т.к. он уже нам больше не нужен
    this.content = null;
  }
}
