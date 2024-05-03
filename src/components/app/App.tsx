import { useState, CSSProperties } from 'react';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from '../../constants/articleProps';

import styles from '../../styles/index.module.scss';

export const App = () => {
	const [ArticleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': ArticleState.fontFamilyOption.value,
					'--font-size': ArticleState.fontSizeOption.value,
					'--font-color': ArticleState.fontColor.value,
					'--container-width': ArticleState.contentWidth.value,
					'--bg-color': ArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onSet={setArticleState} currentState={ArticleState} />
			<Article />
		</main>
	);
};
