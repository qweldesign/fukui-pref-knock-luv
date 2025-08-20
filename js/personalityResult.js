/**
 * Personality Result
 */

export default class PersonalityResult {
  constructor() {
    this.elem = document.getElementById('result');
    if (!this.elem) return;

    const hash = location.hash;
    const types = ['efa', 'efp', 'eta', 'etp', 'ifa', 'ifp', 'ita', 'itp'];
    const type = hash.slice(1);
    if (types.includes(type)) {
      const template = document.getElementById(`type_${type}`);
      const clone = template.content.cloneNode(true);
      this.elem.appendChild(clone);
    } else {
      location.href = '../';
    }

    window.addEventListener('hashchange', () => {
      window.scrollTo(0, 0);
      location.reload();
    });
  }
}
