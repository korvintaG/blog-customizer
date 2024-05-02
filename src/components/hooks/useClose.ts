import { useEffect } from 'react';

/**
 * Тип пропсов хука закрытия окна
 */
type TUseClose = {
	isOpen: boolean;
	onClose: () => void;
	rootRef: React.RefObject<HTMLElement>;
};

/**
 * Пользовательский хук закрытия модального окна при клике за его пределами или нажатию Esc
 * @isOpen - состояние окна - закрыто/открыто
 * @onClose - функция вызывающаяся при закрытии
 * @rootRef - корневой элемент модального окна
 */
export function useClose({ isOpen, onClose, rootRef }: TUseClose) {
	useEffect(() => {
		if (!isOpen) return; // останавливаем действие эффекта, если закрыто

		function handleClickOutside(event: MouseEvent) {
			const { target } = event;

			const isOutsideClick =
				target instanceof Node && // проверяем, что это `DOM`-элемент
				rootRef.current &&
				!rootRef.current.contains(target); // проверяем, что кликнули на элемент, который находится не внутри блока
			if (isOutsideClick) {
				onClose();
			}
		}

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscape);
		document.addEventListener('mousedown', handleClickOutside);

		//  Обязательно удаляем обработчики в `clean-up`- функции
		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.removeEventListener('mousedown', handleClickOutside);
		};

		// Обязательно следим за `isOpen`, чтобы срабатывало только при открытии,
		// а не при любой перерисовке компонента
	}, [isOpen, onClose, rootRef]);
}
