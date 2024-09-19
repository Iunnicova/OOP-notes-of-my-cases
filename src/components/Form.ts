//** */ МОДУЛЬ ДЛЯ СОЗДАНИЯ ФОРМЫ С КОТОРОЙ ПРЕДСТОИТ РАБОТАТЬ ДЛЯ ДОБАВЛЕНИЕ НОВЫХ ДЕЛ
 
// класс отвечает за отображение формы и взаимодействие с пользователем 
export class Form {
	protected formElement: HTMLFormElement;
	protected inputField: HTMLInputElement;

	// конструктор будет принемать саму форму в HTML "class="todo-form__input" второй параметр handleFormSubmit- обработчик который нужно вызывать если пользователь за сомбмитит форму
	constructor(formElement: HTMLFormElement, protected handleFormSubmit: Function) {
			this.formElement = formElement;
			this.inputField = this.formElement.querySelector('.todo-form__input')
			// добавляем обработчик события submit к форме. при сабмите формы мы вызываем функцию handleFormSubmit и передаем в нее введенное значение из поля ввода.
			this.formElement.addEventListener('submit', (evt) => {
				// отключаем действие по умолчанию(если забыть после перезагрузки сабмин не будет работать)
					evt.preventDefault();
					// вызываем обработчит и передаем ему значение из поля ввода
					this.handleFormSubmit(this.inputField.value)
			})
	}

	// метод рендер возвращает нам элемент формы
	render() {
			return this.formElement
	}

	// метод setValue позволяет заполнить форму, получает данные в форме строки
	setValue(data: string) {
			this.inputField.value = data;
	}

	// метод getValue возвращает значение из поля ввода
	getValue() {
			return this.inputField.value
	}

	// метод clearValue очищает форму
	clearValue() {
			this.formElement.reset();
	}
}