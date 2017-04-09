class Ranking extends Service {

  constructor() {
    super();
    this._ranking = [];
  }

  command() {
    return 'Ranking Update';
  }

  result() {
    return '';
  }

  register(newUser) {
    this._ranking.push(newUser);
    this._dirty = true;
  }

  sort() {
    this._ranking.sort(function (a, b) {
      return a.score - b.score;
    });
  }

  render() {
    super.render();
    if(this._dirty) {
      this.sort();
      this.cut();
      this._dirty = false;
    }
  }

  cut() {
    const len = this._ranking.length;
    const max = 30;
    if(len > max) {
      this._ranking.splice(max - 1, len);
    }
  }

}

module.exports = Ranking;
