import styles from './ArticleParamsForm.module.scss';

import clsx from 'clsx';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState, useRef, FormEvent } from 'react';
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
import { useClose } from '../hooks/useClose';

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
	const [isMenuOpen, setMenuOpen] = useState(false); // Открытие-закрытие формы

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
	useClose({
		isOpen: isMenuOpen,
		onClose: () => setMenuOpen(false),
		rootRef,
	});

	/**
	 * Обработка нажатия кнопки <Применить>
	 * @param e - FormEvent<HTMLFormElement> - стандартный тип переменной обработчика события
	 */
	const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
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
	 * @param e - FormEvent<HTMLFormElement> - стандартный тип переменной обработчика события
	 */
	const handleReset = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		setFontFamilyOption(defaultArticleState.fontFamilyOption);
		setFontSizeOption(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		onSet(defaultArticleState);
	};

	return (
		<div ref={rootRef}>
			{/* сделали div, чтобы работал клик за пределами модального окна */}
			<ArrowButton onClick={setMenuOpen} isOpen={isMenuOpen} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
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
						onChange={setFontFamilyOption}
					/>
					<RadioGroup
						options={fontSizeOptions}
						name='FontSize'
						title='Размер шрифта'
						selected={fontSizeOption}
						onChange={setFontSizeOption}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={fontColor}
						onChange={setFontColor}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={backgroundColor}
						onChange={setBackgroundColor}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={contentWidth}
						onChange={setContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
