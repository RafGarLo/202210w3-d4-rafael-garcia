import { Header } from './components/header.js';
import { Main } from './components/main.js';
import { SeriesContainer } from './components/series-container.js';
import { SeriesPending } from './components/series-pending.js';
import { SeriesWatched } from './components/series-watched.js';

new Header('div.container');
new Main('body');
new SeriesContainer('main');
new SeriesPending('.series');
new SeriesWatched('.series');
