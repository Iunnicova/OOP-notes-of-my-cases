// import { Item } from './../components/Item';
// описываю интерфейсы, которые мне понадобятся

// интерфейс карточки IItem с двумя I чтоб не путаться
export interface IItem {
	id: string;
	name: string;
}

//интерфейс модель для хранения данных
export interface IToDoModel {
	//массив объектов с нашими делами
	items: IItem[];
	//добавляем новые данные (назвние дел) в строковом формате => возвращыет полнаценный объект IItem /data-название дела
	addItem:(data: string) => IItem;
//удаляем какой-то существующий объект. обязательно указываем id => в случае удаления ничего не возвращает void
removeItem:(id: string) => void;
}