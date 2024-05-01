import { useEffect } from 'react';

/**
 * Тип пропсов пользовательского хука, который может закрывать элемент при клыце мышкой за пределами элемента
 */
type UseOutsideClickClose = {
	isOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLDivElement>;
	eventName?: 'click' | 'mousedown' | 'mouseup';
};

/**
 * Пользовательский хук действия по нажатию клавиши мыши за пределами html элемента
 * {
 * @isOpen - признак активности элемента
 * @rootRef - ref корневого элемента
 * @onClose - событие на закрытие
 * @onChange - событие на изменение
 * @eventName - название события, на которое вешается обработчик события
 * }
 */
export const useOutsideClickClose = ({
	isOpen,
	rootRef,
	onClose,
	onChange,
	eventName = 'click',
}: UseOutsideClickClose) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				isOpen && onClose?.();
				onChange?.(false);
			}
		};

		window.addEventListener(eventName, handleClick);

		return () => {
			window.removeEventListener(eventName, handleClick);
		};
	}, [onClose, onChange, isOpen]);
};
