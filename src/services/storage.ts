export class Store<S> {
  constructor(public store: string = 'Series') {}
  getStore(): Array<S> {
    const dataString = localStorage.getItem(this.store);
    if (!dataString) return [];
    return JSON.parse(dataString);
  }
  setStore(data: Array<S>) {
    localStorage.setItem(this.store, JSON.stringify(data));
  }
}
