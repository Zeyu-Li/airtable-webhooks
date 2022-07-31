/**
 * Does not work
 */
export default class DataHandler {
  constructor() {
    this.data = [];
  }
  get data() {
    return this.data;
  }
  setData(item) {
    this.data.push([2, 2, 6]);
  }
}
