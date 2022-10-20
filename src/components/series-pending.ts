import { ISeries } from '../models/series-data.js';
import { Component } from './component.js';

export class SeriesPending extends Component {
  template!: string;
  series: Array<S>;
  storeService: Store<S>;
  constructor(public selector: string) {
    super();
    this.storeService = new Store<S>();
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
    //new AddPet('########', this.handleAdd.bind(this));
  }

  createTemplate() {
    let template = `<h2 class="section-title">Series list</h2>
    <section class="series-pending">
      <h3 class="subsection-title">Pending series</h3>
      <p class="info">You have 4 series pending to watch</p>
      <!--<p class="info">Congrats! You've watched all your series</p>-->`;
    this.series.forEach((item: ISeries) => {
      `<li class="serie">
              <img
                class="serie__poster"
                src="https://m.media-amazon.com/images/M/MV5BZGJjYzhjYTYtMDBjYy00OWU1LTg5OTYtNmYwOTZmZjE3ZDdhXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg"
                alt="The Sopranos poster"
              />
              <h4 class="serie__title">The Sopranos</h4>
              <p class="serie__info">David Chase (1999)</p>
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
            </li>;`;
    });
    template += `</ul>
            </section>`;
    return template;
  }

  handlerEraser(deletedID: number) {
    this.series = this.series.filter((item) => item.id !== +deletedID);
    this.storeService.setStore(this.series);
    this.manageComponent();
  }
  handlerAdoption(changeId: number) {
    const i = this.series.findIndex((item) => item.id === changeId);
    this.series[i].isAdopted = !this.series[i].isAdopted;
    this.storeService.setStore(this.series);
  }
}
