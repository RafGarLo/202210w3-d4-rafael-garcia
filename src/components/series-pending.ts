import { ISeries, SERIES } from '../models/series-data.js';
import { Store } from '../services/storage.js';
import { Component } from './component.js';

export class SeriesPending extends Component {
  template!: string;
  series: Array<ISeries>;
  storeService: Store<ISeries>;
  constructor(public selector: string) {
    super();
    this.storeService = new Store<ISeries>();
    if (this.storeService.getStore().length === 0) {
      this.series = [...SERIES];
      this.storeService.setStore(this.series);
    } else {
      this.series = this.storeService.getStore();
    }
    this.manageComponent();
  }
  manageComponent() {
    this.template = this.createTemplate();
    this.render(this.selector, this.template);
    setTimeout(() => {
      document
        .querySelectorAll('.icon--delete')
        .forEach((item) =>
          item.addEventListener('click', this.handlerEraser.bind(this))
        );
    }, 100);
  }

  createTemplate() {
    const unwatched = this.series.filter((item) => item.watched === false);
    let template = `<h2 class="section-title">Series list</h2>
    <section class="series-pending">
      <h3 class="subsection-title">Pending series</h3>
      <p class="info">You have ${unwatched.length} series pending to watch</p>
      <!--<p class="info">Congrats! You've watched all your series</p>-->`;
    this.series.forEach((item: ISeries) => {
      if (`${item.watched}`)
        template += `
      <li class="serie">
            <img
              class="serie__poster"
              src="${item.poster}"
              alt="${item.name}The Sopranos poster"
            />
            <h4 class="serie__title">${item.name}</h4>
            <p class="serie__info">${item.creator} (${item.year})</p>
            <ul class="score">
              <li class="score__star">
                <i class="icon--score fas fa-star" title="1/5"></i>
              </li>
              <li class="score__star">
                <i class="icon--score fas fa-star" title="2/5"></i>
              </li>
              <li class="score__star">
                <i class="icon--score fas fa-star" title="3/5"></i>
              </li>
              <li class="score__star">
                <i class="icon--score fas fa-star" title="4/5"></i>
              </li>
              <li class="score__star">
                <i class="icon--score fas fa-star" title="5/5"></i>
              </li>
            </ul>
            <i class="fas fa-times-circle icon--delete"></i>
          </li>`;
    });
    template += `</ul>
            </section>`;
    return template;
  }
  handlerEraser(ev: Event) {
    const deletedID = (ev.target as HTMLElement).id;
    this.series = this.series.filter(
      (item) => item.id !== +(deletedID as string)
    );
    this.storeService.setStore(this.series);
    this.manageComponent();
  }
}
