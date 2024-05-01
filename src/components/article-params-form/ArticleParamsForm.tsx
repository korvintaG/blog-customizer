import styles from './ArticleParamsForm.module.scss';

import clsx from 'clsx';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState, useRef, SyntheticEvent } from 'react';
import { Text } from 'components/text';
import { Select } from 'components/select';
import {
	ArticleStateType,
	defaultArticleState,
	OptionType,
	fontSizeOptions,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { RadioGroup } from 'components/radio-group';
import { Separator } from 'components/separator';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

/**
 * Тип пропсов компонента ArticleParamsForm
 */
export type ArticleParamsFormProps = {
	onSet: (newSet: ArticleStateType) => void; // при смене настроек
	currentState: ArticleStateType; // начальное состояние
};

/**
 * Компонент панели задания условий ArticleParamsForm
 * @onSet - функция смены набора состояний
 * @currentState - текущее состояние всего блога
 */
export const ArticleParamsForm = ({
	onSet,
	currentState,
}: ArticleParamsFormProps) => {
	const [isOpen, setOpen] = useState(false); // Открытие-закрытие формы

	// для полей формы
	const [fontFamilyOption, setFontFamilyOption] = useState<OptionType>(
		currentState.fontFamilyOption
	);
	const [fontSizeOption, setFontSizeOption] = useState<OptionType>(
		currentState.fontSizeOption
	);
	const [fontColor, setFontColor] = useState<OptionType>(
		currentState.fontColor
	);
	const [backgroundColor, setBackgroundColor] = useState<OptionType>(
		currentState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState<OptionType>(
		currentState.contentWidth
	);

	const rootRef = useRef<HTMLDivElement | null>(null); // для хука Ref

	// запуск пользовательского хука для отлавливания клика за пределами сайдбара
	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: setOpen,
		eventName: 'mousedown', // устанавливаем другое название события, чтобы не конфликтовало с компонентой Select
	});

	/**
	 * Обработка нажатия кнопки <Применить>
	 * @param e - SyntheticEvent - стандартный тип переменной обработчика события
	 */
	const handleSubmit = (e: SyntheticEvent): void => {
		e.preventDefault();
		onSet({
			fontFamilyOption,
			fontSizeOption,
			fontColor,
			backgroundColor,
			contentWidth,
		});
	};

	/**
	 * Обработка нажатия кнопки <Сбросить>
	 * @param e - SyntheticEvent - стандартный тип переменной обработчика события
	 */
	const handleReset = (e: SyntheticEvent): void => {
		e.preventDefault();
		setFontFamilyOption(defaultArticleState.fontFamilyOption);
		setFontSizeOption(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		onSet(defaultArticleState);
	};

	/**
	 * Функция переключения открытости сайдбара
	 */
	const toggleOpen = (): void => setOpen(!isOpen);

	return (
		<div ref={rootRef}>
			{' '}
			{/* сделали div, чтобы работал клик за пределами модального окна */}
			<ArrowButton onClick={toggleOpen} isOpen={isOpen} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' uppercase size={31} weight={800}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифты'
						options={fontFamilyOptions}
						selected={fontFamilyOption}
						onChange={setFontFamilyOption}></Select>
					<RadioGroup
						options={fontSizeOptions}
						name='FontSize'
						title='Размер шрифта'
						selected={fontSizeOption}
						onChange={setFontSizeOption}></RadioGroup>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={fontColor}
						onChange={setFontColor}></Select>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={backgroundColor}
						onChange={setBackgroundColor}></Select>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={contentWidth}
						onChange={setContentWidth}></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
