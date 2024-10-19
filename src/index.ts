//*++ ОСНОВНАЯ ЛОГИКА
//**ОБЪЯСНЕНИЕ КОДА; ОСНОВНОЙ СКРИПТ С ОСНОВНОЙ ЛОГИКОЙ**

//для того чтобы у нас создавался экземпляр карточки нам нужно будет импортировать сам класс class Item
import "./styles/styles.css";
import { Page } from "./components/Page";
import { ToDoModel } from "./components/ToDoModel";
import { Form } from "./components/Form";
import { Item } from "./components/Item";
import { todos } from "./utils/constants";

const contentElement = document.querySelector(".content") as HTMLElement;

// находим темплейт для функции он находится в HTML <template id="todo-item-template"> # это id. в конце принудительно говорим, что нам нужет HTML HTMLTemplateElement.
const itemTemplate = document.querySelector(
  "#todo-item-template"
) as HTMLTemplateElement;

const formTemplate = document.querySelector(
  "#todo-form-template"
) as HTMLTemplateElement;

//создаем экземпдяр класса pege передаем в него contentElement чем он будет управлять
const page = new Page(contentElement);

//для того чтобы у нас создавался экземпляр модели ToDoModel нам нужно будет импортировать сам класс class ToDoModel
const todoArray = new ToDoModel();

//заполняем массив из наших дел
todoArray.items = todos;

//разметка формы которую мы устанавливаем для нашей страницы
const todoForm = new Form(formTemplate);
todoForm.setHandler(handleSubmitForm);

//добавляем форму в контейнер нашей страницы setup
page.formContainer = todoForm.render();

// даем возможность пользователю /добавлять новые дела/. добавление нового дела в массив
function handleSubmitForm(data: string) {
	//берем todoArray это наша модель у нее есть метод addItem .В массив передается новая запись
  todoArray.addItem(data);
	//очищаем поле ввода дела чтобы пользователь мог добавить еще одно дело. clearValue() это метод который очищает поле ввода
  todoForm.clearValue();
	//выводим на страницу новые карточки с новыми делами
  renderTodoItems();
  }

	//функция которая генерирует /отображает имеющиеся дела/ карточки на странице из массива, при работе методом мар формируется массив из готовых карточек
function renderTodoItems() {
  page.todoContainer = todoArray.items.map(item => {
		
  const todoItem = new Item(itemTemplate);
	
  const itemElement = todoItem.render(item)
  return(itemElement)
	//Делаем это в обратном порядке, чтобы последний добавленный был первым в списке
}).reverse();
}

//выводим на страницу карточки всех дел из массива
renderTodoItems();