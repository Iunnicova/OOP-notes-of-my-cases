import { IItem, IToDoModel } from "../types";
// //класс имплементирует ToDoModel
// // прямой доступ к данным мы не предоставляем

export class ToDoModel implements IToDoModel{

// 	//_items чистое свойство поля класса указываем как protected потому что получить напрямую доступ нельзя любой доступ может быть только через set и get
    protected _items: IItem[]

		// конструктор записывает пустой массив
    constructor() {
        this._items = [];
    }

// 		//set позволяет сохранять готовый массив. данные IItem
    set items(data: IItem[]) {
        this._items = data;
    }
// //get возвращает тот массив который хранится в классе
    get items() {
        return this._items;
    }

// 		//метод addItem получаем данные в виде строки-это название нашего дела
    addItem (data: string)  {
// 			//берем максимальный номер id и +1 так мы к каждому новому делу присваеваем свой id
        const uniqueId: number = Math.max(...this._items.map(item => Number(item.id))) + 1;
// 				//создаем новый объект newItem id преобразуем в строку
        const newItem: IItem = {id: String(uniqueId), name: data};
// 				//push добавили его в наш массив
        this._items.push(newItem)
// 				//вернули
        return newItem
    };

// 		//удаление элемент. берем массив item и при помоще filter  в нем только те элементы у которых id не равен тому что мы передал
    removeItem (id: string) {
        this._items = this._items.filter(item => item.id === id)
    }
}