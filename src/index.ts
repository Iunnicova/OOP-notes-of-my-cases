import { ToDoModel } from './components/ToDoModel';
   //*++ ОСНОВНАЯ ЛОГИКА
                   //**ОБЪЯСНЕНИЕ КОДА; ОСНОВНОЙ СКРИПТ С ОСНОВНОЙ ЛОГИКОЙ**

//для того чтобы у нас создавался экземпляр карточки нам нужно будет импортировать сам класс class Item
import {Form} from "./components/Form"
import { Item } from "./components/Item"
import "./styles/styles.css"
import { todos } from "./utils/constants"

// 1 на нашей страничке есть элемент ('.todos__list') он находится в HTML <ul class="todos__list"> который мы нашли. обычный список который есть у нас в разметке в него мы добавляем наши дела 28 строка
const contentElement = document.querySelector('.todos__list')
//2  находим темплейт для функции он находится в HTML <template id="todo-item-template"> # это id. в конце принудительно говорим, что нам нужет HTML HTMLTemplateElement.
const template = document.querySelector('#todo-item-template') as HTMLTemplateElement
//3 находим элемент формы
const formElement = document.querySelector('.todos__form') as HTMLFormElement;
//4 создаем экземпляр класса
const todoForm = new Form(formElement, handleSubmitForm)
 
// форма как экземпляр класса


// даем возможность пользователю добавлять новые дела. создаем форму как объект и повесить обраотчик/ Обработчик будет получать данные из формы "handleSubmitForm(data: string")
function handleSubmitForm(data: string) {
	// используя эту строку мы будем создавать новое дело с помощью класса Item
	const todoItem = new Item(template);
	// генерируем его разметку интерфейсв добавляем id 
	const itemElement = todoItem.render({id: '8', name: data})
	// добавляем его к нам на страницу
	contentElement.prepend(itemElement);
	// очищаем форму используя метод clearValue
	todoForm.clearValue();

}

// Мы создаем экземпляр класса и у него вызываем функцию render. Функция render находится в конце файла Item.ts
todos.forEach(item => {
//Обходя массив в цикле ьы берем и создаем экземпляр класса Item передаем туда наш темплейт
  const todoItem = new Item(template);
	//получив экземпляр класса мы можем вызвать у него метод render и передать в него название карточки с которым нам нужно получить разметку. создается с помощю метода объекта todoItem
	const itemElement = todoItem.render(item);
//и получив эту разметку мы добавляем ее к нам на страничку
  contentElement.prepend(itemElement);
})
 
// даем возможность пользователю добавлять новые дела. создаем форму как объект и повесить обраотчик



// //как проверить работу данных сервера 
// const todoArray = new ToDoModel();
// todoArray.items = todos;
// //+создать новый метод что показовал коректное изменение
// console.log(todoArray.items.map(item => item));
// console.log(todoArray.addItem('Создать класс с данными'));
// console.log(todoArray.items);
// todoArray.removeItem('2');
// console.log(todoArray.items);