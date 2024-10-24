import { IItem } from "../types";
// МОДУЛЬ ПО СОЗДАНИЮ КАРТОЧЕК И СОЗДАНИЕ ФУНКЦИИ В КОТОРЫХ МЫ БУДЕМ ОПИСЫВАТЬ ДЕЙСТВИЕ КОТОРЫЕ БУДУТ ВЫПОЛНЯТСЯ С ЭТОЙ КАРТОЧКОЙ

//Объект Item предназначен для того чтобы создавать разметку карточки и с помощью методов нам будет удобно с ней в последсевии работать

// описывает объект
export interface IViewItem {
  id: string; //set get
  name: string; //set get
  render(item: IItem): HTMLElement;
  //принимает функцию и ее устанавливает как обработчик для кнопки удаления
  setDeleteHandler(handleDeleteItem: Function): void;
  //принимает функцию и ее устанавливать как обработчик для кнопки копирования
  setCopyHandler(handleCopyItem: Function): void;
	//метод установки слушателя для редактирования
	setEditHandler(handleCopyItem: Function): void; 
}

//интерфейс для конструктора описывает параметры
export interface IViewItemConstructor {
  //содержит конструкцию new , описывает параметры template которые принимает конструктор HTMLTemplateElement,
  new (template: HTMLTemplateElement): IViewItem; //тип объекта который получается на выходе IViewItem
}

//класс имплементирует интерфейс IViewItem
export class Item implements IViewItem {
  //itemElement элемент разметки который будет создаватся за счет этого класс для вывода карточки на экран будем 	сохранять в отдельном свойстве
  protected itemElement: HTMLElement;
  // title элемент в котором будет хранить название карточки сохпраним как свойство класса и сможем в последсевии быстро к нему обращатсяться
  protected title: HTMLElement;
  //поле для хранения кнопки (удаления)
  protected deleteButton: HTMLButtonElement;
  //поле для хранения кнопки (копирования)
  protected copyButton: HTMLButtonElement;
	//поле для хранения кнопки (редактирования)
	protected editButton: HTMLButtonElement;
  //определяем новое свойство которое будет отвечать за хранение id задач. даем название с черточкой-будем использовать set и get
  protected _id: string;
  //поле для хранения обработчика кнопки
  protected handleDeleteItem: Function;
  //поле для хранения обработчика кнопки
  protected handleCopyItem: Function;
	//поле для хранения обработчика кнопки
	protected handleEditItem: Function;

  //конструктор это та функция которая вызывается при создание экземпляра  класса карточки т.е  как только написали new и указали свой класс у нас запускается функция конструктора те параметры которые прописываются в функции конструктор нужно будет заполнять и передовать аргументы в них при создании экземпляра. Мы пишем new название класса и дальше в скобочках перечисляются аргументы которые попадут в функцию конструктор.Функция сонструктор предназначена для какого то начального заполнения и создания вот того самого объекта с которым в последствие буду работать
  constructor(template: HTMLTemplateElement) {
    // Мы кланируем наш элемент из темплейта.. as HTMLElement  - в конце принудительно говорим, что нам нужн HTMLElement документ. из HTML<li class="todo-item">
    this.itemElement = template.content
      .querySelector(".todo-item")
      .cloneNode(true) as HTMLElement;
    //находим элемент в котором хранится название карточки работаем с itemElement в нем находим элемент, нужный нам текст, само название той карточки которое мы добавляем. из HTML<span class="todo-item__text"></span>
    this.title = this.itemElement.querySelector(".todo-item__text");
    //находим кнопку удаления по классу
    this.deleteButton = this.itemElement.querySelector(".todo-item__del");
    //находим кнопку копирования по классу
    this.copyButton = this.itemElement.querySelector(".todo-item__copy");

		//находим кнопку редактирования по классу
		this.editButton = this.itemElement.querySelector(".todo-item__edit");
    //сохранив это в полях класса мы можем использовать эти свойства в любом методе который будет в нашем классе
  }

  //добавляем set get для работы с id и названием
  //когда будем сохранять новый id будем его записывать в id
  set id(value: string) {
    this._id = value;
  }

  get id(): string {
    return this._id || "";
  }

  // если передаем новое название ,то мы его записываем в textContent элемента title
  set name(value: string) {
    this.title.textContent = value;
  }

  get name(): string {
    return this.title.textContent || "";
  }

  //метод для установки слушателя на кнопку удаления. При клике на кнопку мы будем вызывать нашу функцию обработчика удаления, передавая в нее экземпляр класса текущей карточки. Таким образом мы сможем удалить карточку в любом м
  setDeleteHandler(handleDeleteItem: Function) {
		// сохраняем его в  классе
    this.handleDeleteItem = handleDeleteItem;
		// устанавливаем как обработчик на кнопку клик
    this.deleteButton.addEventListener("click", (evt) => {
			//в качестве параметра будем передавать экземпляр самого класса для того чтобы можно было в обработчике прописать любые действия, которые нам могут понадобиться
      this.handleDeleteItem(this);
    });
  }

  //метод для установки слушателя на кнопку копирования
  setCopyHandler(handleCopyItem: Function) {
    // сохраняем его в  классе
    this.handleCopyItem = handleCopyItem;
    // устанавливаем как обработчик на кнопку клик
    this.copyButton.addEventListener("click", (evt) => {
      //в качестве параметра будем передавать экземпляр самого класса для того чтобы можно было в обработчике прописать любые действия, которые нам могут понадобиться
      this.handleCopyItem(this);
    });
  }
	//метод для установки слушателя на кнопку редактирования
	setEditHandler(handleEditItem: Function) {
		// сохраняем его в  классе
    this.handleEditItem = handleEditItem;
    // устанавливаем как обработчик на кнопку клик
    this.editButton.addEventListener("click", (evt) => {
      //в качестве параметра будем передавать экземпляр самого класса для того чтобы можно было в обработчике прописать любые действия, которые нам могут понадобиться
      this.handleEditItem(this);
    });
  }
	
  // метод render тот самый метод который будет нам возвращать разметку карточки. Выносим этот функционал в отдельнвый метод мы знаем что текст карточки будет меняться в будущем карточки будут копироватся удалаться или редоктироватся. если мы хотим получить карточку с какимто другим названием не item то мы можем вызвать метод рендер с переданным новым названием. и нам вернется карточка текст которой будет изменен.
  //IItem - добавляем с интерфейса папка type
  //хранение имени в рендере будет при помощи сеттера, что бы код не дублировался
  render(item: IItem) {
    this.name = item.name;
    this.id = item.id;
    return this.itemElement;
  }
}
