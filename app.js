(() => {
  const lessons = window.LESSONS;
  const topics = window.TOPICS;
  const wordNotes = window.WORD_NOTES;
  const COURSE_START = new Date("2026-07-15T00:00:00");
  const dayStart = date => new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const unlockedCount = Math.max(1, Math.min(100, Math.floor((dayStart(new Date()) - COURSE_START) / 86400000) + 1));
  const state = {
    current: Math.min(Number(localStorage.getItem("jv.current") || 1) - 1, unlockedCount - 1),
    topic: "all",
    mastered: JSON.parse(localStorage.getItem("jv.mastered") || "{}"),
    reviews: JSON.parse(localStorage.getItem("jv.reviews") || "{}"),
    translationVisible: true,
    view: "study"
  };

  const $ = (id) => document.getElementById(id);
  const els = {
    lessonList: $("lessonList"), topicFilter: $("topicFilter"), search: $("lessonSearch"),
    progressText: $("progressText"), progressBar: $("progressBar"), lessonMeta: $("lessonMeta"),
    stageIndex: $("stageIndex"), sentence: $("sentenceText"), translation: $("translationText"),
    chunkGrid: $("chunkGrid"), spokenLine: $("spokenLine"), linkingNotes: $("linkingNotes"),
    skeleton: $("sentenceSkeleton"), memory: $("memoryHook"), wordBank: $("wordBank"),
    pagination: $("paginationText"), recall: $("recallCover"), confidence: $("confidenceRow"),
    play: $("playSentence"), speed: $("speedRange"), speedValue: $("speedValue"),
    toast: $("toast"), sidebar: $("lessonSidebar"), libraryGrid: $("libraryGrid")
  };

  const pad = n => String(n).padStart(2, "0");
  const formatDate = date => `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  const unlockDate = id => { const date = new Date(COURSE_START); date.setDate(date.getDate() + id - 1); return date; };
  const cleanWord = word => word.toLowerCase().replace(/[^a-z'-]/g, "");
  const save = () => {
    localStorage.setItem("jv.current", String(state.current + 1));
    localStorage.setItem("jv.mastered", JSON.stringify(state.mastered));
    localStorage.setItem("jv.reviews", JSON.stringify(state.reviews));
  };

  function showToast(message) {
    els.toast.textContent = message;
    els.toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => els.toast.classList.remove("show"), 1800);
  }

  function buildFilters() {
    els.topicFilter.innerHTML = [{ id: "all", short: "全部" }, ...topics]
      .map(t => `<button data-topic="${t.id}" class="${state.topic === t.id ? "active" : ""}">${t.short}</button>`).join("");
    els.topicFilter.querySelectorAll("button").forEach(button => button.addEventListener("click", () => {
      state.topic = button.dataset.topic;
      buildFilters();
      renderList();
    }));
  }

  function renderList() {
    const query = els.search.value.trim().toLowerCase();
    const visible = lessons.filter(lesson => {
      const topicMatch = state.topic === "all" || lesson.topic.id === state.topic;
      const searchMatch = !query || lesson.sentence.toLowerCase().includes(query) || lesson.translation.includes(query) || lesson.topic.name.includes(query);
      return topicMatch && searchMatch;
    });
    els.lessonList.innerHTML = visible.map(lesson => {
      const locked = lesson.id > unlockedCount;
      return `
      <button class="lesson-item ${lesson.id === state.current + 1 ? "active" : ""} ${locked ? "locked" : ""}" data-id="${lesson.id}" data-locked="${locked}" aria-disabled="${locked}">
        <span class="num">${pad(lesson.id)}</span>
        <span class="preview">${lesson.bookGroups ? lesson.sentence : `Sentence ${pad(lesson.id)} · 待按原书顺序导入`}</span>
        <span class="done">${locked ? "锁" : state.mastered[lesson.id] ? "✓" : ""}</span>
      </button>`;
    }).join("") || `<p class="status-note">没有找到匹配的句子。</p>`;
    els.lessonList.querySelectorAll("button").forEach(button => button.addEventListener("click", () => {
      if (button.dataset.locked === "true") {
        showToast(`第 ${button.dataset.id} 句将在 ${formatDate(unlockDate(Number(button.dataset.id)))} 解锁`);
        return;
      }
      state.current = Number(button.dataset.id) - 1;
      switchView("study");
      renderLesson();
      els.sidebar.classList.remove("open");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }));
  }

  function getLinkingData(lesson) {
    const sentence = lesson.sentence;
    const matches = [];
    const words = sentence.split(/\s+/);
    for (let i = 0; i < words.length - 1 && matches.length < 3; i++) {
      const a = cleanWord(words[i]);
      const b = cleanWord(words[i + 1]);
      if (!a || !b) continue;
      if (/[bcdfghjklmnpqrstvwxyz]$/.test(a) && /^[aeiou]/.test(b)) {
        matches.push({ phrase: `${a}‿${b}`, type: "辅音接元音", note: `${a} 末尾辅音直接滑向 ${b}，中间不要停。` });
      }
    }
    const weakForms = [
      [" to ", "tə", "to 在非重读位置常弱读成 /tə/。"], [" and ", "ən", "and 常弱读，保留轻轻的 /n/。"],
      [" of ", "əv", "of 通常不重读，元音变成 /ə/。"], [" can ", "kən", "can 在肯定句中常弱读成 /kən/。"],
      [" than ", "ðən", "than 在比较结构里通常弱读。"], [" as ", "əz", "as 常用短而轻的弱读形式。"]
    ];
    for (const [target, sound, note] of weakForms) {
      if (matches.length >= 3) break;
      if (` ${sentence.toLowerCase()} `.includes(target)) matches.push({ phrase: target.trim(), type: `弱读 /${sound}/`, note });
    }
    while (matches.length < 3) {
      const fallback = lesson.focus[matches.length];
      matches.push({ phrase: fallback.split(" ")[0], type: "节奏提示", note: fallback });
    }
    return matches;
  }

  function renderSpokenLine(lesson, linking) {
    let line = lesson.sentence;
    linking.forEach(item => {
      if (item.phrase.includes("‿")) {
        const [a, b] = item.phrase.split("‿");
        const pattern = new RegExp(`\\b${a}\\s+${b}\\b`, "i");
        line = line.replace(pattern, `<mark>${a}‿${b}</mark>`);
      } else {
        const pattern = new RegExp(`\\b${item.phrase}\\b`, "i");
        line = line.replace(pattern, `<mark>${item.phrase}</mark>`);
      }
    });
    return line;
  }

  function getWords(lesson) {
    const tokens = [...new Set(lesson.sentence.split(/\s+/).map(cleanWord).filter(Boolean))];
    const known = tokens.filter(word => wordNotes[word]);
    const extras = tokens.filter(word => word.length > 7 && !known.includes(word)).slice(0, 6 - known.length);
    return [...known, ...extras].slice(0, 6).map(word => ({
      word,
      meaning: wordNotes[word]?.[0] || "结合本句语境理解",
      phrase: wordNotes[word]?.[1] || lesson.chunks.find(chunk => chunk.toLowerCase().includes(word)) || lesson.sentence,
      hook: wordNotes[word]?.[2] || `先记词块，不孤立背词：${word}`
    }));
  }

  function renderLesson() {
    speechSynthesis.cancel();
    const lesson = lessons[state.current];
    const linking = getLinkingData(lesson);
    els.lessonMeta.textContent = `第 ${pad(lesson.id)} 句 · ${lesson.topic.name}`;
    $("statusNote").textContent = `${formatDate(new Date())} · 今日学习第 ${pad(unlockedCount)} 句，按顺序一天一句。`;
    els.stageIndex.textContent = pad(lesson.id);
    els.sentence.textContent = lesson.sentence;
    els.sentence.style.visibility = "visible";
    els.translation.textContent = lesson.translation;
    els.translation.classList.toggle("hidden", !state.translationVisible);
    $("toggleTranslation").textContent = state.translationVisible ? "隐藏中文" : "显示中文";
    els.chunkGrid.innerHTML = lesson.chunks.map((chunk, index) => `
      <button class="chunk-button" data-chunk="${index}">
        <strong>▶ ${chunk}</strong><small>语块 ${index + 1} · 点击慢听</small>
      </button>`).join("");
    els.chunkGrid.querySelectorAll("button").forEach(button => button.addEventListener("click", () => {
      document.querySelectorAll(".chunk-button").forEach(b => b.classList.remove("playing"));
      button.classList.add("playing");
      speak(lesson.chunks[Number(button.dataset.chunk)], Math.min(Number(els.speed.value), .78), () => button.classList.remove("playing"));
    }));
    els.spokenLine.innerHTML = renderSpokenLine(lesson, linking);
    els.linkingNotes.innerHTML = linking.map(item => `<div class="link-note"><strong>${item.type} · ${item.phrase}</strong><span>${item.note}</span></div>`).join("");
    els.skeleton.textContent = lesson.skeleton;
    els.memory.textContent = `${lesson.memory} 本句按“${lesson.chunks.map((_, i) => ["背景", "核心", "结果"][i] || `补充${i}`).join(" → ")}”来回想。`;
    els.wordBank.classList.toggle("book-mode", Boolean(lesson.bookGroups));
    if (lesson.bookGroups) {
      els.wordBank.innerHTML = lesson.bookGroups.map((group, index) => `
        <details class="book-word-group" ${index === 0 ? "open" : ""}>
          <summary>${group.title}<span>${group.words.length} 项</span></summary>
          <div class="book-word-list">${group.words.map(word => `
            <div class="book-word-item"><strong>${word[0]}</strong><span>${word[1]}</span><p>${word[2]}</p></div>
          `).join("")}</div>
        </details>`).join("");
    } else {
      els.wordBank.innerHTML = getWords(lesson).map(item => `
        <div class="word-item" role="button" aria-label="查看 ${item.word} 的记忆提示">
          <strong>${item.word}</strong><span>${item.meaning} ＋</span>
          <div class="word-detail">词块：${item.phrase}<br>记忆：${item.hook}</div>
        </div>`).join("");
      els.wordBank.querySelectorAll(".word-item").forEach(item => item.addEventListener("click", () => item.classList.toggle("open")));
    }
    const grammar = lesson.bookGrammar || lesson.focus.map((text, index) => ({ title: ["句法结构", "发音重点", "学习迁移"][index], text }));
    $("knowledgeGrid").innerHTML = grammar.map(point => `
      <div class="knowledge-item"><span>${point.title}</span><strong>${point.text}</strong></div>`).join("");
    els.pagination.textContent = `${pad(lesson.id)} / 100`;
    els.recall.classList.remove("covered");
    els.recall.textContent = "点击遮住英文，开始复述";
    els.confidence.hidden = true;
    updateProgress();
    renderList();
    save();
  }

  function updateProgress() {
    const count = Object.keys(state.mastered).filter(id => state.mastered[id]).length;
    els.progressText.textContent = `${count} / 100`;
    els.progressBar.style.width = `${count}%`;
  }

  function speak(text, rate, onend) {
    if (!("speechSynthesis" in window)) {
      showToast("当前浏览器不支持语音播放");
      return;
    }
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-GB";
    utterance.rate = rate;
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices.find(v => v.lang === "en-GB" && /Daniel|Sonia|Serena|Kate/i.test(v.name)) || voices.find(v => v.lang === "en-GB") || null;
    utterance.onend = () => { els.play.classList.remove("speaking"); if (onend) onend(); };
    utterance.onerror = () => els.play.classList.remove("speaking");
    speechSynthesis.speak(utterance);
  }

  function renderLibrary() {
    els.libraryGrid.innerHTML = Array.from({length: 10}, (_, batch) => {
      const start = batch * 10 + 1;
      const end = start + 9;
      const batchLessons = lessons.slice(start - 1, end);
      const done = batchLessons.filter(l => state.mastered[l.id]).length;
      const imported = batchLessons.filter(l => l.bookGroups).length;
      return `<button class="topic-card" data-id="${start}">
        <div class="topic-card-head"><h3>Sentence ${pad(start)}—${pad(end)}</h3><strong>${imported} / 10 已导入</strong></div>
        <p>${imported ? batchLessons.find(l => l.bookGroups).sentence : "等待按微信读书原书顺序导入"}</p>
        <div class="mini-progress"><span style="width:${done * 10}%"></span></div>
      </button>`;
    }).join("");
    els.libraryGrid.querySelectorAll("button").forEach(button => button.addEventListener("click", () => {
      const target = Number(button.dataset.id);
      if (target > unlockedCount) { showToast(`${formatDate(unlockDate(target))} 解锁`); return; }
      state.current = target - 1;
      switchView("study");
      renderLesson();
    }));
  }

  function switchView(view) {
    state.view = view;
    ["study", "library", "method"].forEach(name => $(`${name}View`).classList.toggle("hidden", name !== view));
    document.querySelectorAll(".nav-link").forEach(button => button.classList.toggle("active", button.dataset.view === view));
    if (view === "library") renderLibrary();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  document.querySelectorAll(".nav-link").forEach(button => button.addEventListener("click", () => switchView(button.dataset.view)));
  els.search.addEventListener("input", renderList);
  els.speed.addEventListener("input", () => els.speedValue.textContent = `${Number(els.speed.value).toFixed(2)}×`);
  els.play.addEventListener("click", () => {
    els.play.classList.add("speaking");
    speak(lessons[state.current].sentence, Number(els.speed.value));
  });
  $("playLinking").addEventListener("click", () => speak(lessons[state.current].sentence, Math.min(Number(els.speed.value) + .08, .82)));
  $("toggleTranslation").addEventListener("click", () => { state.translationVisible = !state.translationVisible; renderLesson(); });
  $("mobileMenu").addEventListener("click", () => els.sidebar.classList.toggle("open"));
  $("prevLesson").addEventListener("click", () => {
    if (state.current === 0) { showToast("现在是第1句"); return; }
    state.current -= 1; renderLesson(); window.scrollTo({top:0, behavior:"smooth"});
  });
  $("nextLesson").addEventListener("click", () => {
    if (state.current + 1 >= unlockedCount) { showToast(`下一句将在 ${formatDate(unlockDate(state.current + 2))} 解锁`); return; }
    state.current += 1; renderLesson(); window.scrollTo({top:0, behavior:"smooth"});
  });
  els.recall.addEventListener("click", () => {
    const covered = els.recall.classList.toggle("covered");
    els.sentence.style.visibility = covered ? "hidden" : "visible";
    els.recall.textContent = covered ? "英文已遮住 · 说完后点此核对" : "再看一遍原句，选择熟练度";
    els.confidence.hidden = covered;
  });
  els.confidence.querySelectorAll("button").forEach(button => button.addEventListener("click", () => {
    const score = Number(button.dataset.score);
    const id = lessons[state.current].id;
    if (score === 3) state.mastered[id] = true;
    else delete state.mastered[id];
    const intervals = { 1: 1, 2: 3, 3: 7 };
    const due = new Date();
    due.setDate(due.getDate() + intervals[score]);
    state.reviews[id] = due.toISOString().slice(0, 10);
    save(); updateProgress(); renderList();
    showToast(score === 3 ? "已掌握 · 7天后复习" : `已安排 ${intervals[score]} 天后复习`);
  }));

  buildFilters();
  renderLesson();
  renderLibrary();
})();
