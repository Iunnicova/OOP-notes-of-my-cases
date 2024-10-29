//Презентер отвечает за отображение всего и за работу с данными, за взаимодейсьвие с классами, призентеру потребуется ссылка на модель, на необходимые интерфейсы для того что бы создавать экземпляры классов которые он будет создавать сам

import { IToDoModel } from "../types";
import { IViewItem, IViewItemConstructor } from "./Item";
import { IForm, IFormConstructor } from "./Form";
import { IPage } from "./Page";
import { IPopup } from "./Popup";

export class ItemPresenter {
  //поля класса
  protected itemTemplate: HTMLTemplateElement;
  protected formTemplate: HTMLTemplateElement;
  protected todoForm: IForm;
  protected todoEditForm: IForm;

  //поля класса, которые будут использоваться для обработки событий формы
  protected handleSubmitEditForm: (data: { value: string }) => void;

  constructor(
    //поля класса, как модель с данными
    protected model: IToDoModel,
    //поля класса, как форма для создания новых форм
    protected formConstructor: IFormConstructor,
    //передаем нашу страничку Page, интерфейс для отображения всех блоков form, списков, Page
    protected viewPageContainer: IPage,
    //передаем конструктор нашего Item, что бы можно было здесь создавать Item
    protected viewItemConstructor: IViewItemConstructor,
    //поля класса, как модальное окно для показа ошибок и подтверждений,получаем ссылку на модальное окно, на сам экземпляр класса
    protected modal: IPopup
  ) {
    //действие конструктора
    // находим темплейт и сохраняем их в полях класса он находится в HTML <template id="todo-item-template"> # это id. в конце принудительно говорим, что нам нужет HTML HTMLTemplateElement.
    this.itemTemplate = document.querySelector(
      "#todo-item-template"
    ) as HTMLTemplateElement;
    this.formTemplate = document.querySelector(
      "#todo-form-template"
    ) as HTMLTemplateElement;
  }

  //процесс инициализации, процесс при котором мы создает формочку(наполнение нашей странички) Page нужно наполнить
  init() {
    // здесь мы создаем форму(экземпляр ItemPresenter) отображается на главной странице и привязываем обработчик события формы к нашему экземпляру ItemPresenter
    this.todoForm = new this.formConstructor(this.formTemplate);
    this.todoForm.buttonText = "Добавить";
    this.todoForm.placeholder = "Следующее дело";
    // рундерим ее разметку,и сохраняем ее в formContainer

    this.viewPageContainer.formContainer = this.todoForm.render();
    //форма которая будет отображатся для редактирования
    this.todoEditForm = new this.formConstructor(this.formTemplate);
    this.todoEditForm.buttonText = "Изменить";
    this.todoEditForm.placeholder = "Новое название";

    //устанавливаем на форму события собмит
    this.model.on("changed", () => {
      this.renderView();
    });

    //*добавляем обработчик ко  всем событиям, обработчик создается с помощю ссылки на саму модель
    //берем экземпляр нашей класса модели с помощью on устанавливаем обработчик, указываем какое событие мы хотим обработать 'changed'
    this.model.on("changed", () => {
      //указываем функцию обработчика события
      //*страница будет перерендироваться в других местах рендер убираем
      this.renderView();
      //т.е при возникновение события 'changed' в модели , будем выполнять функцию колбек который выполнится,
    });

    //Ставим Обработчик события собмит и при возникновении этого события вызываем handleSubmitEditForm
    this.todoForm.on("submit", this.handleSubmitForm.bind(this));
    this.todoEditForm.on("submit", (data: { value: string }) =>
      this.handleSubmitEditForm(data)
    );
  }

  //функция принимает в качестве данных объект где есть
  //описывается работа с разными слоями, получает строку с данными(название нового дела)
  handleSubmitForm(data: { value: string }) {
    //здесь мы добавляем новое дело в нашу модель, value это строка с новым названием дела
    this.model.addItem(data.value);
    //очищаем поле ввода дела чтобы пользователь мог добавить еще одно дело. clearValue() это метод который очищает поле ввода
    this.todoForm.clearValue();
  }

  //создаем обработчик для копирования(будет получать в параметры item который нужно скопировать)
  handleCopyItem(item: { id: string }) {
    //создавать новый путем копирования(возмем из модели, получим объект по id(this.model.getItem(item.id)) id будем брать из item )
    const copyedItem = this.model.getItem(item.id);
    //добавляем новое дело в нашу модель, используем его название из скопированного дела, чтобы оно добавилось в список дел addItem
    this.model.addItem(copyedItem.name);
    //перерендерим все наши карточки с новыми делами
  }

  //создаем обработчик для удаления(будет получать в параметры item который нужно удалить)
  handleDeleteItem(item: { id: string }) {
    this.model.removeItem(item.id);
  }

  //создаем обработчик для редактирования(будет получать в параметры item который нужно редактировать)
  handleEditItem(item: { id: string }) {
    //получаем из модели данные текущего дела находим из массива, которое нужно редактировать, id будем брать из item.id
    const editedItem = this.model.getItem(item.id);
    //заполняем поле ввода новым названием текущего дела, id будем брать из item.id
    this.todoEditForm.setValue(editedItem.name);
    //генерируем контент для модального окна, у формы есть метод рендер который возвращает разметку форм, сохраняем ее как контент модального окна(сеттер который в попапе)
    this.modal.content = this.todoEditForm.render();

    //открываем модальное окно
    this.handleSubmitEditForm = (data: { value: string }) => {
      //изменяем название дела в модели на новое, id будем брать из item.id
      this.model.editItem(item.id, data.value);
      //перерендерим все наши карточки с новыми делами
      this.todoEditForm.clearValue();
      //закрываем модальное окно
      this.modal.close();
    };
    //запускаем рендеринг вьюх
    this.modal.open();
  }

  //метод который перерендерит все наши карточки с новыми делами из нашего массива items из модели
  renderView() {
    //создается список
    const itemList = this.model.items
      .map((item) => {
        //создаем новый экземпляр карточки ItemPresenter с нашими данными, используем интерфейс /viewItemConstructor/ который создавали для конструктора
        const todoItem = new this.viewItemConstructor(this.itemTemplate);
        //Вызываем метод on , который является слушателем события и говорим на какое событие мы подписываемся
        //устанавливаем обработчик для кнопки копирование	(bind - что бы не потерялся контекст)
        todoItem.on("copy", this.handleCopyItem.bind(this));
        //устанавливаем обработчик для кнопки удаление  (bind - что бы не потерялся контекст)
        todoItem.on("delete", this.handleDeleteItem.bind(this));
        //устанавливаем обработчик для кнопки редактирования  (bind - что бы не потерялся контекст)
        todoItem.on("edit", this.handleEditItem.bind(this));
        //добавляем карточку в массив с разметками карточек
        const itemElement = todoItem.render(item);
        return itemElement;
      })
      .reverse(); //Делаем это в обратном порядке, чтобы последний добавленный был первым в списке

    // сохраняем массив в туду контейнер
    this.viewPageContainer.todoContainer = itemList;
  }
}
