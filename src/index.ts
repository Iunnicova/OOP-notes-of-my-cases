//*++ ОСНОВНАЯ ЛОГИКА
//**ОБЪЯСНЕНИЕ КОДА; ОСНОВНОЙ СКРИПТ С ОСНОВНОЙ ЛОГИКОЙ**
import { Form } from "./components/Form";
import { Item } from "./components/Item";
import { Page } from "./components/Page";
import { Popup } from "./components/Popup";
import { ToDoModel } from "./components/ToDoModel";
import { ItemPresenter } from "./components/ToDoPresenter";
import "./styles/styles.css";
import { todos } from "./utils/constants";

//создаем экземпляр ItemPresenter передаем в него itemContainer чем он будет управлять контейнер для контента
const contentElement = document.querySelector(".content") as HTMLElement;

//получаем ссылку на модальное окно, на сам экземпляр класса редактирование
const popupElement = document.querySelector(".popup") as HTMLElement;

//создаем нашу страничку
const itemContainer = new Page(contentElement);

//создаем модель
const todoArray = new ToDoModel();
//первоночально ее наполняем
todoArray.items = todos;

//создаем модальное окно, передаем в конструктор нашу ссылку на модальное окно, нашу страничку модального окна и нашу страничку контейнера для формы
const modal = new Popup(popupElement);

//создаем призентер, в конструктор призентера мы передаем нашу модель с данными todoArray, класс Form(жесткой завязки к классу нет),itemContainer(это наша страничка, мы ее передаем что бы в ней можно было разместить форму,карточки ) и класс Item (как класс конструктор который соответствует интерфуйсу )
const itemPresenter = new ItemPresenter(
  todoArray,
  Form,
  itemContainer,
  Item,
  modal
);

//вызываем init с помощью которого создается форма, разметка формы и устанавливается слушатель на кнопку сомбит
itemPresenter.init();

//выводим на экран нашу страничку с карточками и формой
itemPresenter.renderView();
