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
];

const TYPE = {
  EFA: '情熱ピュア派',
  EFP: 'フリースピリット派',
  ETA: '恋愛プロデューサー型',
  ETP: 'クールマスター型',
  IFA: '沼りロマンチスト型',
  IFP: 'ふわふわ夢見系',
  ITA: '慎重な観察者型',
  ITP: '理論派マイペース型'
}

export default class PersonalityTest {
  constructor() {
    this.elem = document.getElementById('test');
    if (!this.elem) return;
    
    // 設問テンプレートを準備
    this.ready();
    this.index = 0; // 「診断スタート」の表示が0

    const buttons = document.querySelectorAll('.personalityTest__button');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        if (this.index < TEST.length) {
          this.goToNext();
          this.index++;
        } else {
          this.goToResult();
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
      const radios = clone.querySelectorAll('input[type="radio"]')

      main.classList.add('personalityTest__main--collapse');
      main.dataset.index = i + 1;
      content.textContent = test.content;
      radios.forEach((radio) => {
        radio.setAttribute('name', `q${i + 1}`);
      })

      this.elem.appendChild(clone);
    });
  }

  goToNext() {
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

  goToResult() {
    const arr = [];
    const checkedRadios = document.querySelectorAll('input[type="radio"]:checked');

    checkedRadios.forEach((radio, i) => {
      arr.push(TEST[i][radio.value]);
    });

    const counts = this.countParams(arr);
    this.getType(counts);
  }

  countParams(arr) {
    return arr.reduce((acc, cur) => {
      acc[cur] = (acc[cur] || 0) + 1;
      return acc;
    }, {});
  }

  getType(counts) {
    const EI = (counts['E'] < counts['I']) ? 'I' : 'E';
    const FT = (counts['F'] < counts['T']) ? 'T' : 'F';
    const AP = (counts['A'] < counts['P']) ? 'P' : 'A';

    const type = `${EI}${FT}${AP}`;
    this.debugTest(counts, type);
  }

  debugTest(counts, type) {
    const content = document.querySelector('.personalityTest__result');
    const html = `<ul>` + 
      Object.entries(counts)
        .map(([key, value]) => `<li>${key}: ${value}</li>`)
        .join("") +
      `</ul>`;
    content.innerHTML = `<h3>${TYPE[type]}(${type})</h3>${html}`;
    this.goToNext();
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
