/**
 * Personality Test
 */

const TEST = [
  {
    content: '気になる人ができたら、自分からDMやLINEでアクションを起こす方だ。',
    yes: 'E',
    no: 'I'
  },
  {
    content: '恋愛は感情よりも合理的に考えて行動するタイプだ。',
    yes: 'T',
    no: 'F'
  },
  {
    content: '気になる相手のSNSの「いいね」や投稿が気になってついチェックしてしまう。',
    yes: 'A',
    no: 'P'
  },
  {
    content: '恋愛にドキドキ感や“非日常”を求めるタイプだ。',
    yes: 'F',
    no: 'T'
  },
  {
    content: '恋愛中は感情のままに行動して、後から後悔することがある。',
    yes: 'E',
    no: 'I'
  },
  {
    content: '「なんか好き」が理由になる恋愛もアリだと思う。',
    yes: 'A',
    no: 'P'
  },
  {
    content: 'デートの計画は、きっちり決めておきたいタイプだ。',
    yes: 'P',
    no: 'A'
  },
  {
    content: '好きな人にはすぐ気持ちを伝えるより、まず距離感を探る。',
    yes: 'I',
    no: 'E'
  }
]

export default class PersonalityTest {
  constructor() {
    this.elem = document.getElementById('test');
    if (!this.elem) return
    
    // 設問テンプレートを準備
    this.ready();
    this.index = 0; // 「診断スタート」の表示が0

    const buttons = document.querySelectorAll('.personalityTest__button');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        if (this.index < TEST.length) {
          this.next();
          this.index++;
        }
      });
    });
  }

  ready() {
    const template = document.getElementById('template');

    TEST.forEach((test, i) => {
      const clone = template.content.cloneNode(true);
      const main = clone.querySelector('.personalityTest__main');
      const content = clone.querySelector('.personalityTest__content');

      main.classList.add('personalityTest__main--collapse');
      main.dataset.index = i + 1;
      content.textContent = test.content;

      this.elem.appendChild(clone);
    });
  }

  next() {
    const prev = document.querySelector(`[data-index="${this.index}"]`);
    this.hide(prev)

    const next = document.querySelector(`[data-index="${this.index + 1}"]`);
    this.show(next);
  }

  hide(elem) {
    this.animationEnd(elem, () => {
      elem.classList.add('personalityTest__main--leave');
    }).then(() => {
      elem.classList.add('personalityTest__main--collapse');
      elem.classList.remove('personalityTest__main--leave');
    });
  }

  show(elem) {
    elem.classList.remove('personalityTest__main--collapse');
    this.animationEnd(elem, () => {
      elem.classList.add('personalityTest__main--enter');
    }).then(() => {
      elem.classList.remove('personalityTest__main--enter');
    });
  }

  animationEnd(elem, func) {
    // CSSアニメの完了を監視
    let callback;
    const promise = new Promise((resolve, reject) => {
      callback = () => resolve(elem);
      elem.addEventListener('animationend', callback);
    });
    func();
    promise.then((elem) => {
      elem.removeEventListener('animationend', callback);
    });
    return promise;
  }
}
