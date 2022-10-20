import { Component } from './component.js';

export class SeriesContainer extends Component {
  template: string;
  constructor(public selector: string) {
    super();
    this.template = this.createTemplate();
    this.renderAdd(this.selector, this.template);
  }

  createTemplate() {
    return '<section class="series"><h2 class="section-title">Series list</h2></section>';
  }
}
