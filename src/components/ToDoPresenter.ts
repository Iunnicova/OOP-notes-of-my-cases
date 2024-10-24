//Презентер отвечает за отображение всего и за работу с данными, за взаимодейсьвие с классами, призентеру потребуется ссылка на модель, на необходимые интерфейсы для того что бы создавать экземпляры классов которые он будет создавать сам

import { IToDoModel } from "../types";
import { IViewItem, IViewItemConstructor } from "./Item";
import { IForm, IFormConstructor } from "./Form";
import { IPage } from "./Page";

export class ItemPresenter {
  //поля класса
  protected itemTemplate: HTMLTemplateElement;
  protected formTemplate: HTMLTemplateElement;
  protected todoForm: IForm;
  protected todoEditForm: IForm;

  constructor(
    //поля класса, как модель с данными
    protected model: IToDoModel,
    //поля класса, как форма для создания новых форм
    protected formConstructor: IFormConstructor,
    //передаем нашу страничку Page, интерфейс для отображения всех блоков form, списков, Page
    protected viewPageContainer: IPage,
    //передаем конструктор нашего Item, что бы можно было здесь создавать Item
    protected viewItemConstructor: IViewItemConstructor
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
    // здесь мы создаем форму(экземпляр ItemPresenter) и привязываем обработчик события формы к нашему экземпляру ItemPresenter
    this.todoForm = new this.formConstructor(this.formTemplate);
    // здесь мы устанавливаем обработчик события формы к нашему экземпляру ItemPresenter
    this.todoForm.setHandler(this.handleSubmitForm.bind(this));
    // рундерим ее разметку,и сохраняем ее в formContainer
    this.viewPageContainer.formContainer = this.todoForm.render();
  }

  //описывается работа с разными слоями, получает строку с данными(название нового дела)
  handleSubmitForm(data: string) {
    //здесь мы добавляем новое дело в нашу модель
    this.model.addItem(data);
    //перерендерим все наши карточки с новыми делами
    this.renderView();
    //очищаем поле ввода дела чтобы пользователь мог добавить еще одно дело. clearValue() это метод который очищает поле ввода
    this.todoForm.clearValue();
  }

  //создаем обработчик для копирования(будет получать в параметры item который нужно скопировать)
  handleCopyItem(item: IViewItem) {
    //создавать новый путем копирования(возмем из модели, получим объект по id(this.model.getItem(item.id)) id будем брать из item )
    const copyedItem = this.model.getItem(item.id);
    //добавляем новое дело в нашу модель, используем его название из скопированного дела, чтобы оно добавилось в список дел addItem
    this.model.addItem(copyedItem.name);
    //перерендерим все наши карточки с новыми делами
    this.renderView();
  }

  //создаем обработчик для удаления(будет получать в параметры item который нужно удалить)
  handleDeleteItem(item: IViewItem) {
    this.model.removeItem(item.id);
    this.renderView();
  }

  //метод который перерендерит все наши карточки с новыми делами из нашего массива items из модели
  renderView() {
    //создается список
    const itemList = this.model.items.map((item) => {
        //создаем новый экземпляр карточки ItemPresenter с нашими данными, используем интерфейс /viewItemConstructor/ который создавали для конструктора
        const todoItem = new this.viewItemConstructor(this.itemTemplate);
        //устанавливаем обработчик для кнопки копирование	(bind - что бы не потерялся контекст)
        todoItem.setCopyHandler(this.handleCopyItem.bind(this))
        //устанавливаем обработчик для кнопки удаление  (bind - что бы не потерялся контекст)
        todoItem.setDeleteHandler(this.handleDeleteItem.bind(this));
        //добавляем карточку в массив с разметками карточек
        const itemElement = todoItem.render(item);
        return itemElement;
      }).reverse(); //Делаем это в обратном порядке, чтобы последний добавленный был первым в списке

    // сохраняем массив в туду контейнер
    this.viewPageContainer.todoContainer = itemList;
  }
}

