import { IItem, IToDoModel } from "../types";
import { EventEmitter } from "./EventEmitter";
//класс имплементирует ToDoModel
// прямой доступ к данным мы не предоставляем

//В ToDoModel делаем класс дочерним  расширяет класс EventEmitter(родитель)
export class ToDoModel extends EventEmitter implements IToDoModel {
  //_items чистое свойство поля класса указываем как protected потому что получить напрямую доступ нельзя любой доступ может быть только через set и get
  protected _items: IItem[];

  // конструктор записывает пустой массив
  constructor() {
    //как только делаем класс дочерним от какого то используем ключевое слово -  super()
    super();
    this._items = [];
  }

  //set позволяет сохранять готовый массив. данные IItem
  set items(data: IItem[]) {
    this._items = data;
    //вызываем событие изменения, (название событию мы придумываем сами ('changed'))
    this.emit("changed new array");
  }
  //get возвращает тот массив который хранится в классе
  get items() {
    return this._items;
  }

  //При каждом изменение данных в нашем приложении , генерируем событие
  //метод addItem получаем данные в виде строки-это название нашего дела добавление элемента
  addItem(data: string) {
    //берем максимальный номер id и +1 так мы к каждому новому делу присваеваем свой id
    const uniqueId: number =
      Math.max(...this._items.map((item) => Number(item.id))) + 1;
    //создаем новый объект newItem id преобразуем в строку
    const newItem: IItem = { id: String(uniqueId), name: data };
    //push добавили его в наш массив
    this._items.push(newItem);
    //вызываем событие изменения, (название событию мы придумываем сами расшифровываем для чего нужно этто событие пример 'changed  adding an element' ('changed'))
    this.emit("changed");
    //вернули
    return newItem;
  }

  //удаление элемент. берем массив item и при помоще filter  в нем только те элементы у которых id не равен тому что мы передал
  removeItem(id: string) {
    //filter фильтрует массив, оставляя только те элементы, которые удовлетворяют условию (в нашем случае id не ра��но id который передали) и возвращает новый массив с этими элементами. и в итоге у нас остается только тот массив, в котором id не с
    this._items = this._items.filter((item) => item.id !== id);
    //вызываем событие изменения, (название событию мы придумываем сами расшифровываем для чего нужно этто событие пример 'changed removal' ('changed'))
    this.emit("changed");
  }

  //редактируем название дела. find находит в массиве первый элемент, который удовлетворяет условию (в нашем случае id совпадает с id который передали) и заменяет его название на новое. и в итоге у нас остается только одно дело
  editItem(id: string, name: string) {
    //find находит в массиве первый элемент, который удовлетворяет условию (в нашем случае id совпадает с id который передали) и заменяет его название на новое. и в итоге у нас остается только одно дело
    const editedItem = this._items.find((item) => item.id === id);
    //если такой элемент найден то заменяем его название на новое. и в итоге у нас остается только одно дело, которое мы хотели изменить
    editedItem.name = name;
    //вызываем событие изменения, (название событию мы придумываем сами расшифровываем для чего нужно этто событие пример 'changed editing' ('changed'))
    this.emit("changed");
  }

  // метод который позволяет получить дело по id
  getItem(id: string) {
    //find находит в массиве первый элемент, который удовлетворяет условию (в нашем случае id совпадает с id который передали) и возвращает этот элемент. и в итоге у нас остается только одно дело, которое мы хотели получить
    return this._items.find((item) => item.id === id);
  }
}
