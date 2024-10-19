//** */ МОДУЛЬ ДЛЯ СОЗДАНИЯ ФОРМЫ С КОТОРОЙ ПРЕДСТОИТ РАБОТАТЬ ДЛЯ ДОБАВЛЕНИЕ НОВЫХ ДЕЛ
 
// класс отвечает за отображение формы и взаимодействие с пользователем

export interface IForm {
	//текст кнопки
	buttonText: string;
	//поле ввода
	placeholder: string;
	//метод обработчик события на отправку формы
	setHandler(handleFormSubmit: Function): void;
	// метод рендерит форму и возвращает HTML
	render(): HTMLFormElement;
	//метод заполняет поле ввода данными
	setValue(data: string): void;
	//мутод возвращает данные из поля ввода
	getValue(): string;
	//метод очищает поле ввода
	clearValue(): void;
}

export interface IFormConstructor {
    new (formTemplate: HTMLTemplateElement): IForm;
}
//описываем свойства
export class Form implements IForm{
	protected formElement: HTMLFormElement;
	protected inputField: HTMLInputElement;
	protected handleFormSubmit: Function;
	protected submitButton: HTMLButtonElement;

	//получает в конструктор темплейт.  сохраняем их в полях класса
	constructor(formTemplate: HTMLTemplateElement) {
		this.formElement = formTemplate.content.querySelector('.todos__form').cloneNode(true) as HTMLFormElement;
			//сохраняем их в полях класса
		this.inputField = this.formElement.querySelector('.todo-form__input');
		this.submitButton = this.formElement.querySelector(
			'.todo-form__submit-btn'
		);
		// добавляем обработчик события submit к форме. при сабмите формы мы вызываем функцию handleFormSubmit и передаем в нее введенное значение из поля ввода.
		this.formElement.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this.handleFormSubmit(this.inputField.value);
		});
	}

//передаем обработчик
	setHandler(handleFormSubmit: Function) {
		this.handleFormSubmit = handleFormSubmit;
	}

  //рендерит форму и возвращает HTML
	render() {
		return this.formElement;
	}

	//заполняет поле ввода данными и устанавливает текст кнопки
	setValue(data: string) {
		this.inputField.value = data;
	}

	//возвращает данные из поля ввода и устанавливает текст кнопки
	getValue() {
		return this.inputField.value;
	}

	//очищает поле ввода и устанавливает текст кнопки
	clearValue() {
		this.formElement.reset();
	}

	//устанавливает текст кнопки
	set buttonText(data: string) {
		this.submitButton.textContent = data;
	}

	//устанавливает текст placeholder поля ввода
	set placeholder(data: string) {
		this.inputField.placeholder = data;
	}
}
