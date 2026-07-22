import React, { useState, useEffect, useRef } from 'react';

export default function KanjiLearningApp() {
  const [data, setData] = useState([]);
  const [currentSet, setCurrentSet] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const [learningRecord, setLearningRecord] = useState({});
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });
  const [isPressed, setIsPressed] = useState(false);
  const [showAnswerAfterUnlearn, setShowAnswerAfterUnlearn] = useState(false);
  const pressTimerRef = useRef(null);
  const minSwipeDistance = 50;

  // データの読み込み
  useEffect(() => {
    const kokugoData = [
      { id: 1, kanji: '哀哀父母', yomi: 'あいあいふぼ', imi: '自分を生んで苦労を重ねてくれた父母の死を悼み、その恩に報いることができず哀しむこと。', difficulty: 'kyu3' },
      { id: 2, kanji: '哀糸豪竹', yomi: 'あいしごうちく', imi: '悲しい音をだす琴と、力強く明るい音をだす笛の見事な管弦は、人を感動させること。', difficulty: 'kyu3' },
      { id: 3, kanji: '愛多憎生', yomi: 'あいたぞうせい', imi: '愛や恩を多くもらいすぎると、憎しみやねたみを生むということ。', difficulty: 'kyu3' },
      { id: 4, kanji: '安穏無事', yomi: 'あんのんぶじ', imi: '何事もなく、世の中や暮らしが穏やかで安らかなさま。', difficulty: 'kyu3' },
      { id: 5, kanji: '衣冠盛事', yomi: 'いかんせいじ', imi: '名門の家に生まれてさらに功績を上げた後に、家の名声を引き継ぐこと。', difficulty: 'kyu3' },
      { id: 6, kanji: '意気衝天', yomi: 'いきしょうてん', imi: '気力が天を衝くほど高く充実している様子。', difficulty: 'kyu3' },
      { id: 7, kanji: '意気自如', yomi: 'いきじじょ', imi: '心の持ち方がいつも通りで平静な様子。', difficulty: 'kyu3' },
      { id: 8, kanji: '意気揚揚', yomi: 'いきようよう', imi: '威勢がよく誇らしげに振る舞う様子。', difficulty: 'kyu3' },
      { id: 9, kanji: '一栄一辱', yomi: 'いちえいいちじょく', imi: '人の世は、良いときもあれば悪いときもあるということ。', difficulty: 'kyu3' },
      { id: 10, kanji: '一言芳恩', yomi: 'いちごんほうおん', imi: 'ひと言声をかけてもらったことに対して感謝すること。', difficulty: 'kyu3' },
      { id: 11, kanji: '一樹百穫', yomi: 'いちじゅひゃっかく', imi: '人材を育成することは、大きな利益につながるということ。', difficulty: 'kyu3' },
      { id: 12, kanji: '一諾千金', yomi: 'いちだくせんきん', imi: '決して裏切らない、一度約束したことは守らなければならないというたとえ。', difficulty: 'kyu3' },
      { id: 13, kanji: '一了百了', yomi: 'いちりょうひゃくりょう', imi: '一つが解決すれば、すべてのことが解決すること。', difficulty: 'kyu3' },
      { id: 14, kanji: '一喜一憂', yomi: 'いっきいちゆう', imi: '物事の状況が変化するたびに喜んだり心配したりすること。', difficulty: 'kyu3' },
      { id: 15, kanji: '一騎当千', yomi: 'いっきとうせん', imi: '並外れた能力を持つ勇敢な人のこと。', difficulty: 'kyu3' },
      { id: 16, kanji: '一球入魂', yomi: 'いっきゅうにゅうこん', imi: '野球で、精神を集中して一球一球を投げること。', difficulty: 'kyu3' },
      { id: 17, kanji: '一虚一実', yomi: 'いっきょいちじつ', imi: 'さまざまに変化して、予測が難しいことのたとえ。', difficulty: 'kyu3' },
      { id: 18, kanji: '空中楼閣', yomi: 'くうちゅうのろうかく', imi: '土台のない蜃気楼で現れた建物という意味から、根拠がなく現実的ではない考えや議論のこと。', difficulty: 'kyu3' },
      { id: 19, kanji: '苦口婆心', yomi: 'くこうばしん', imi: '相手のことを思い、口を苦くして何度も教えさとすこと。', difficulty: 'kyu3' },
      { id: 20, kanji: '愚公移山', yomi: 'ぐこういざん', imi: '大きなことでも、根気よく努力し続ければ必ず成功することのたとえ。', difficulty: 'kyu3' },
      { id: 21, kanji: '愚者一得', yomi: 'ぐしゃのいっとく', imi: '愚かな人でもたまには優れた名案を出すこと。', difficulty: 'kyu3' },
      { id: 22, kanji: '鶏口牛後', yomi: 'けいこうぎゅうご', imi: '大きな組織に入って上の人に付き従い言いなりになるより、小さな組織だとしても上に立つほうがよい。', difficulty: 'kyu3' },
      { id: 23, kanji: '喜怒哀楽', yomi: 'きどあいらく', imi: '喜び、怒り、悲しみ、楽しみといった、人間がもっているいろいろな感情のこと。', difficulty: 'kyu3' },
      { id: 24, kanji: '器用貧乏', yomi: 'きようびんぼう', imi: '何でも人並み以上にうまいために、色々なことに手を出してしまい、どれも中途半端となること。', difficulty: 'kyu3' },
      { id: 25, kanji: '国士無双', yomi: 'こくしむそう', imi: '国の中で最もすぐれている人のこと。', difficulty: 'kyu3' },
      { id: 26, kanji: '孤軍奮闘', yomi: 'こぐんふんとう', imi: '援軍が来ることを期待できない状態で必死に戦うこと。', difficulty: 'kyu3' },
      { id: 27, kanji: '克己復礼', yomi: 'こっきふくれい', imi: '欲望や感情に打ち勝ち、礼儀にかなった言動をすること。', difficulty: 'kyu3' },
      { id: 28, kanji: '刻苦勉励', yomi: 'こっくべんれい', imi: '苦労しながらも、全力で仕事や勉強に励むこと。', difficulty: 'kyu3' },
      { id: 29, kanji: '孤立無援', yomi: 'こりつむえん', imi: 'たった一人で、誰かの助けも期待できないこと。', difficulty: 'kyu3' },
      { id: 30, kanji: '才子佳人', yomi: 'さいしかじん', imi: '理想的な男女のこと。', difficulty: 'kyu3' },
      { id: 31, kanji: '試行錯誤', yomi: 'しこうさくご', imi: '試みと失敗を何度も繰り返して、問題の解決に近づけていくこと。', difficulty: 'kyu3' },
      { id: 32, kanji: '四分五裂', yomi: 'しぶんごれつ', imi: '国や秩序などが乱れてまとまりがなくなり、ばらばらに分裂すること。', difficulty: 'kyu3' },
      { id: 33, kanji: '終始一貫', yomi: 'しゅうしいっかん', imi: '初めから終わりまで言動や態度を貫き通すこと。', difficulty: 'kyu3' },
      { id: 34, kanji: '取捨選択', yomi: 'しゅしゃせんたく', imi: '必要なものだけを取って、不必要なものを捨てること。', difficulty: 'kyu3' },
      { id: 35, kanji: '首尾一貫', yomi: 'しゅびいっかん', imi: '最初から最後まで、態度や方針を変えずに貫き通すこと。', difficulty: 'kyu3' },
      { id: 36, kanji: '自暴自棄', yomi: 'じぼうじき', imi: 'やけになって、もうどうなってもいいと将来の希望を捨てたり、投げやりな行動をすること。', difficulty: 'kyu3' },
      { id: 37, kanji: '失望落胆', yomi: 'しつぼうらくたん', imi: '夢や希望が無くなって落ち込むこと。', difficulty: 'kyu3' },
      { id: 38, kanji: '支離滅裂', yomi: 'しりめつれつ', imi: 'まとまりがなく、ばらばらであること。', difficulty: 'kyu3' },
      { id: 39, kanji: '新陳代謝', yomi: 'しんちんたいしゃ', imi: '古いものが新しいものへと入れ替わること。', difficulty: 'kyu3' },
      { id: 40, kanji: '心頭滅却', yomi: 'しんとうめっきゃく', imi: '気を散らすような考えを消し去ること。', difficulty: 'kyu3' },
      { id: 41, kanji: '深謀遠慮', yomi: 'しんぼうえんりょ', imi: '深く考えをめぐらせて、遠い先の未来のことを見通す。', difficulty: 'kyu3' },
      { id: 42, kanji: '順風満帆', yomi: 'じゅんぷうまんぱん', imi: '特に問題が起きることなく、思い通りに物事が進んでいくこと。', difficulty: 'kyu3' },
      { id: 43, kanji: '天衣無縫', yomi: 'てんいむほう', imi: '詩や文章などにわざとらしさがなく、自然で美しいこと。', difficulty: 'kyu3' },
      { id: 44, kanji: '天下無双', yomi: 'てんかむそう', imi: '世の中につりあうものが存在しないほどすぐれていること。', difficulty: 'kyu3' },
      { id: 45, kanji: '大安吉日', yomi: 'たいあんきちじつ', imi: '物事を行うのに最も縁起がよいとされる日。', difficulty: 'kyu3' },
      { id: 46, kanji: '大胆不敵', yomi: 'だいたんふてき', imi: '精神力が強く、決して恐れることがないこと。', difficulty: 'kyu3' },
      { id: 47, kanji: '大慈大悲', yomi: 'だいじだいひ', imi: '心を持つ全てのものを救おうとする、仏の限りない慈悲のこと。', difficulty: 'kyu3' },
      { id: 48, kanji: '清廉潔白', yomi: 'せいれんけっぱく', imi: '心が清らかで、良心に恥じるようなことがまったくないこと。', difficulty: 'kyu3' },
      { id: 49, kanji: '権謀術数', yomi: 'けんぼうじゅっすう', imi: '他人を騙しておとしめる策略のこと。', difficulty: 'kyu3' },
      { id: 50, kanji: '温厚篤実', yomi: 'おんこうとくじつ', imi: '心が温かく穏やかで、誠実な性格のこと。', difficulty: 'kyu3' },
      { id: 51, kanji: '鶏口牛後', yomi: 'けいこうぎゅうご', imi: '大きな組織より小さな組織の上に立つほうがよい。', difficulty: 'kyu3' },
    ];

    setData(kokugoData);

    // ローカルストレージから学習記録を復元
    const saved = localStorage.getItem('kanjiLearningRecord');
    if (saved) {
      setLearningRecord(JSON.parse(saved));
    }
  }, []);

  // 学習記録を保存
  useEffect(() => {
    localStorage.setItem('kanjiLearningRecord', JSON.stringify(learningRecord));
  }, [learningRecord]);

  // 現在のセット（20問ごと）
  const currentSetData = data.slice(currentSet * 20, (currentSet + 1) * 20);
  const currentItem = currentSetData[currentIndex];
  const recordKey = `item_${currentItem?.id}`;
  const recordStatus = learningRecord[recordKey];

  // フリック処理
  const handleTouchStart = (e) => {
    setTouchStart({ x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY });
  };

  const handleTouchEnd = (e) => {
    setTouchEnd({ x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY });
    handleSwipe();
  };

  const handleSwipe = () => {
    const distance = {
      x: touchStart.x - touchEnd.x,
      y: touchStart.y - touchEnd.y,
    };

    const isLeftSwipe = distance.x > minSwipeDistance;
    const isRightSwipe = distance.x < -minSwipeDistance;
    const isUpSwipe = distance.y > minSwipeDistance;
    const isDownSwipe = distance.y < -minSwipeDistance;

    if (showMeaning) {
      // 回答画面での操作
      if (isUpSwipe || isLeftSwipe) {
        // 正解：次へ
        markAsLearned();
      } else if (isDownSwipe || isRightSwipe) {
        // 不正解：同じ問題をもう一度
        setShowMeaning(false);
      }
    }
  };

  // 「覚えた」ボタン長押し処理
  const handleLearned = () => {
    setIsPressed(true);
    setShowMeaning(true);
  };

  const handleLearnedup = () => {
    setIsPressed(false);
    setShowMeaning(false);
  };

  // 「覚えていない」ボタン処理
  const handleUnlearn = () => {
    if (showAnswerAfterUnlearn) {
      // 2回目のタップ：次へ
      nextQuestion();
      setShowAnswerAfterUnlearn(false);
      setShowMeaning(false);
    } else {
      // 1回目のタップ：答えを表示
      setShowAnswerAfterUnlearn(true);
      setShowMeaning(true);
    }
  };

  // 正解：次へ
  const markAsLearned = () => {
    setLearningRecord(prev => ({
      ...prev,
      [recordKey]: 'learned'
    }));
    nextQuestion();
  };

  // 次の問題へ
  const nextQuestion = () => {
    if (currentIndex < currentSetData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowMeaning(false);
      setShowAnswerAfterUnlearn(false);
    } else {
      // このセット完了
      alert(`セット ${currentSet + 1} が完了しました！`);
      if (currentSet < Math.ceil(data.length / 20) - 1) {
        setCurrentSet(currentSet + 1);
        setCurrentIndex(0);
        setShowMeaning(false);
        setShowAnswerAfterUnlearn(false);
      }
    }
  };

  if (!currentItem) {
    return <div className="flex items-center justify-center h-screen bg-gray-100">読み込み中...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4 flex flex-col">
      {/* ヘッダー */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">漢字検定 3級</h1>
        <p className="text-sm text-gray-600">セット {currentSet + 1} / 問題 {currentIndex + 1}/{currentSetData.length}</p>
      </div>

      {/* メイン学習エリア */}
      <div
        className="flex-1 flex flex-col items-center justify-center gap-8 mb-8"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* 熟語表示 */}
        <div className="w-full max-w-sm">
          {!showMeaning ? (
            // 問題画面
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <p className="text-gray-600 text-sm mb-4">問題</p>
              <p className="text-6xl font-bold text-blue-600 mb-4">{currentItem.kanji}</p>
              <p className="text-gray-500 text-sm">読みと意味を確認するには「覚えた」を押し続けてください</p>
            </div>
          ) : (
            // 回答画面
            <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-lg shadow-lg p-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-green-600 mb-4">{currentItem.kanji}</p>
                <div className="border-t-2 border-green-300 pt-6 mt-6">
                  <p className="text-gray-700 text-sm mb-2">【読み方】</p>
                  <p className="text-2xl font-semibold text-green-700 mb-6">{currentItem.yomi}</p>
                  <p className="text-gray-700 text-sm mb-2">【意味】</p>
                  <p className="text-base text-gray-800 leading-relaxed">{currentItem.imi}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 text-center mt-6">
                上/左にフリック → 次へ | 下/右にフリック → もう一度
              </p>
            </div>
          )}
        </div>

        {/* 進捗インジケーター */}
        <div className="w-full max-w-sm">
          <div className="bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${((currentIndex + 1) / currentSetData.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* ボタンエリア */}
      <div className="flex gap-4 justify-center w-full max-w-sm mx-auto mb-4">
        {/* 「覚えた」ボタン（左） */}
        <button
          onMouseDown={handleLearned}
          onMouseUp={handleLearnedup}
          onMouseLeave={handleLearnedup}
          onTouchStart={handleLearned}
          onTouchEnd={handleLearnedup}
          className={`flex-1 py-4 rounded-lg font-bold text-white text-lg transition-all ${
            isPressed
              ? 'bg-blue-600 scale-95 shadow-inner'
              : 'bg-blue-500 shadow-md hover:bg-blue-600 active:scale-95'
          }`}
        >
          覚えた
        </button>

        {/* 「覚えていない」ボタン（右） */}
        <button
          onClick={handleUnlearn}
          className={`flex-1 py-4 rounded-lg font-bold text-white text-lg transition-all ${
            showAnswerAfterUnlearn
              ? 'bg-orange-600 shadow-md'
              : 'bg-orange-500 shadow-md hover:bg-orange-600 active:scale-95'
          }`}
        >
          {showAnswerAfterUnlearn ? '次へ' : '覚えていない'}
        </button>
      </div>

      {/* 学習状況 */}
      {recordStatus && (
        <div className="text-center text-sm text-green-600">
          ✓ この問題は覚えました
        </div>
      )}
    </div>
  );
}
