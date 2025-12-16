/**
 * shouldieat.app V1.2
 * Core Logic & UI Controller - Mobile First Edition
 */

// --- Constants & Config ---
const CONFIG = {
    storageKey: 'sie_v1_state',
    version: '1.0.0',
    steps: [
        {
            id: 'ateTooMuch',
            title: '今天是不是已经没忍住吃多了？',
            options: [
                { label: '是，撑到了 😅', value: 'yes' },
                { label: '还好，正常量', value: 'no' }
            ]
        },
        {
            id: 'recentMovement',
            title: '这几天身体动得怎么样？',
            options: [
                { label: '完全没动 (躺平)', value: 'none' },
                { label: '稍微动了点', value: 'some' },
                { label: '规律运动中 💪', value: 'regular' }
            ]
        },
        {
            id: 'timeAvailable',
            title: '今晚还能挤出多少自由时间？',
            options: [
                { label: '没空 (0分钟)', value: '0' },
                { label: '一点点 (15分钟)', value: '15' },
                { label: '半小时左右', value: '30' },
                { label: '很充裕 (60+)', value: '60' }
            ]
        },
        {
            id: 'energyLevel',
            title: '现在的精神状态如何？',
            options: [
                { label: '累瘫了 😫', value: 'tired' },
                { label: '还行 (OK)', value: 'ok' },
                { label: '精力充沛 ✨', value: 'good' }
            ]
        }
    ]
};

// --- State Management ---
let state = {
    version: CONFIG.version,
    currentStep: 0,
    isComplete: false,
    inputs: {
        ateTooMuch: null,
        recentMovement: null,
        timeAvailable: null,
        energyLevel: null
    },
    result: null
};

// --- DOM Elements ---
const dom = {
    progressContainer: document.getElementById('progress-container'),
    progressBar: document.getElementById('progress-bar'),
    mainContent: document.getElementById('main-content'),
    resultView: document.getElementById('result-view'),
    resetBtn: document.getElementById('reset-btn')
};

// --- Initialization ---
function init() {
    loadState();
    
    // Bind global events
    if (dom.resetBtn) {
        dom.resetBtn.addEventListener('click', confirmReset);
    }

    if (state.isComplete && state.result) {
        showResult(false); // No animation on reload
    } else {
        renderStep(state.currentStep);
    }
}

// --- Persistence ---
function saveState() {
    state.updatedAt = new Date().toISOString();
    localStorage.setItem(CONFIG.storageKey, JSON.stringify(state));
}

function loadState() {
    const saved = localStorage.getItem(CONFIG.storageKey);
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            if (parsed.version === CONFIG.version) {
                state = parsed;
            }
        } catch (e) {
            console.error('Failed to load state', e);
        }
    }
}

function confirmReset() {
    if (confirm('确定要重置所有记录吗？')) {
        localStorage.removeItem(CONFIG.storageKey);
        location.reload();
    }
}

// --- Strategy Pools (V1.2) ---
const STRATEGY_POOLS = {
    // Title pools by strategy (Time-aware placeholders will be replaced at runtime)
    titles: {
        emergency: [
            "{{time}}先别加码，重点是缓一缓",
            "现在最重要的是让身体轻松下来",
            "{{time}}不需要再为难自己",
            "先停一下，比继续硬撑更聪明",
            "现在适合「紧急救援」"
        ],
        recovery: [
            "现在最适合的是好好回血",
            "{{time}}不用再消耗自己了",
            "这个状态，休息反而是最优解",
            "{{time}}不追求进步，先照顾好自己",
            "回到稳定状态，比坚持更重要"
        ],
        minimal: [
            "{{time}}就走极简路线吧",
            "现在最重要的是别给自己添负担",
            "没时间的时候，简单一点反而更好",
            "{{time}}不需要做很多，也没关系",
            "现在适合「极简模式」"
        ],
        steady: [
            "{{time}}适合「稳步提升」",
            "现在这个状态，适合稳稳来",
            "不用拼命，但可以往前走一步",
            "{{time}}的节奏，其实刚刚好",
            "稳住，比冲一把更重要"
        ]
    },

    // CTA pools by strategy
    ctas: {
        // Universal (can mix into others)
        universal: [
            "就按这个来",
            "好，那我不纠结了",
            "行，就这样吧",
            "我知道该怎么做了",
            "嗯，这样也挺好"
        ],
        // Recovery / Tired
        recovery: [
            "今天到这就好",
            "我可以先休息一下",
            "不勉强自己了"
        ],
        // Action / Steady
        steady: [
            "那就动一下吧",
            "去做点对自己好的事"
        ]
    },

    // One-liner pools by strategy
    oneLiners: {
        emergency: [
            "吃多已经发生了，今晚不必再惩罚自己。",
            "能停下来，本身就是一种控制力。",
            "别急着补救，身体更需要安静。",
            "今晚的任务只有一个：别再加重负担。",
            "吃多不可怕，继续折腾才可怕。",
            "给身体一点时间，它会自己处理。",
            "不需要后悔，下一步走稳就好。",
            "今晚什么都不加，已经是最优解。",
            "别想着「拉回来」，今晚只要不更糟。",
            "身体不需要解释，只需要你别再折腾。",
            "吃多了不是失败，补刀才是。",
            "今晚不折腾，就是最好的选择。",
            "身体需要时间，不需要惩罚。"
        ],
        recovery: [
            "今天的状态，不适合硬撑。",
            "好好休息，本来就是计划的一部分。",
            "累了就停，不是退步。",
            "睡好这一觉，比多练一次重要。",
            "身体在提醒你：现在该收一收了。",
            "不是每一天都要向前冲。",
            "恢复不是偷懒，是为了走得更远。",
            "今晚不做决定，只做恢复。",
            "有些进步，是在休息里完成的。",
            "让今天平稳收尾，就已经很不错。",
            "好好休息，也是自律。",
            "今天停一下，不会耽误长期进度。",
            "睡好，比多练重要。"
        ],
        minimal: [
            "今天这样，已经很好了。",
            "能顾住情绪，就不算失败。",
            "没时间的日子，也不需要自责。",
            "小小的一点点，也在向前。",
            "不完美的一天，也可以体面结束。",
            "不用补偿今天，明天自然会来。",
            "有些日子，稳住就赢了。",
            "今天轻轻放过，反而更长久。",
            "不必什么都做到位。",
            "能照顾好自己，就够了。",
            "小动作，也算在努力里。",
            "不完美的一天，也可以体面收尾。",
            "能做一点，就已经很好了。"
        ],
        steady: [
            "今天这样，很适合积累。",
            "不需要狠，只要稳。",
            "节奏对了，比强度重要。",
            "一点点重复，才是长期答案。",
            "今天的选择，在帮未来的你。",
            "状态不错，别浪费，也别透支。",
            "做对的事，不用做多。",
            "稳住这个感觉，很值。",
            "你在建立的是习惯，不是一次性成果。",
            "不着急，路走对了就行。",
            "节奏对了，比狠重要。",
            "今天稳住，明天更轻松。",
            "好习惯就是这样慢慢积累的。"
        ],
        neutral: [
            "身体比规则更重要。",
            "今天的你，已经尽力了。",
            "顺着状态走，反而更轻松。",
            "不需要证明什么。",
            "有意识地选择，本身就是进步。",
            "不完美没关系，失控才需要担心。",
            "慢一点，反而更稳。",
            "做完这一小步，就停。",
            "你不需要对自己太苛刻。",
            "今天就到这里，也很好。"
        ]
    },
    
    // Eating advice pools by strategy
    eatAdvice: {
        emergency: [
            ["停止进食主食和高油食物。", "可以喝点温水或柠檬水，帮助代谢。"],
            ["今晚不要再吃任何东西了。", "多喝温水，让肠胃休息。"],
            ["停止进食，给身体一个缓冲。", "如果口渴，只喝温水或清茶。"]
        ],
        recovery: [
            ["吃点温热、易消化的食物（如汤面、粥）。", "七分饱即可，不要吃太撑，以免影响睡眠。"],
            ["选择温热的、容易消化的食物。", "吃到舒服就好，不需要追求完美。"],
            ["简单吃点热食，比如汤面或粥。", "不要吃太饱，保证睡眠质量更重要。"]
        ],
        minimal: [
            ["简单解决，便利店沙拉或三明治即可。"],
            ["随便吃点方便的就行，不用纠结。"],
            ["能填饱肚子就好，不需要太复杂。"]
        ],
        steady: [
            ["推荐优质蛋白（鸡胸、鱼）+ 大量蔬菜。", "控制碳水摄入，保持轻盈感。"],
            ["选择蛋白质丰富的食物，搭配蔬菜。", "适量碳水，保持平衡。"],
            ["优先选择瘦肉和蔬菜。", "控制主食分量，保持轻盈。"]
        ]
    },
    
    // Movement advice pools by strategy and sub-scenario
    moveAdvice: {
        emergency: {
            short: [
                ["做一些简单的站立拉伸。", "或者原地走动几分钟，帮助消化。"]
            ],
            long: [
                ["饭后散步 20-30 分钟，不要剧烈运动。", "做一些简单的站立拉伸。"],
                ["慢慢走一走，20-30分钟即可。", "可以做一些轻柔的拉伸动作。"]
            ]
        },
        recovery: {
            short: [
                ["推荐冥想或平躺放松，不需要额外运动。"]
            ],
            long: [
                ["推荐冥想或平躺放松，不需要额外运动。", "如果实在想动，做个简单的睡前瑜伽。"],
                ["今晚以休息为主，不需要运动。", "如果感觉需要，可以做几个轻柔的拉伸动作。"]
            ]
        },
        minimal: [
            ["利用碎片时间做几个深呼吸或拉伸即可。"],
            ["做几个简单的拉伸动作就够了。"],
            ["深呼吸几次，或者站起来活动一下。"]
        ],
        steady: {
            short: [
                ["10分钟 HIIT 或 快速跳绳。", "或者做几组俯卧撑/深蹲，维持肌肉张力。"],
                ["可以做10分钟的高强度间歇训练。", "或者几组简单的力量动作。"]
            ],
            long_inactive: [
                ["快走或慢跑 30 分钟，唤醒身体。"],
                ["去外面走一走或慢跑，30分钟左右。"]
            ],
            long_active: [
                ["去健身房或进行一次完整的有氧/力量训练。"],
                ["可以进行一次完整的训练，有氧或力量都可以。"]
            ]
        }
    },
    
    // Why explanations by strategy
    why: {
        emergency: [
            "既然已经超标，今晚的任务是让肠胃休息，而不是继续堆积负担。",
            "吃多了之后，身体需要时间来处理，而不是继续增加负担。",
            "今晚的重点是停止伤害，而不是急于补救。"
        ],
        recovery: [
            "身体已经发出了疲劳信号，高质量的睡眠比运动更重要。",
            "疲劳时，恢复比训练更重要，好好休息才能走得更远。",
            "身体在提醒你需要休息，听从它的信号。"
        ],
        minimal: [
            "时间紧迫时，情绪稳定最重要，别因为没时间吃好而焦虑。",
            "时间有限时，简单处理就好，不需要给自己增加压力。",
            "能照顾好基本需求就够了，不需要追求完美。"
        ],
        steady: [
            "状态不错，时间也允许，是积累好习惯的绝佳机会。",
            "现在状态好，是建立好习惯的好时机，但不要过度。",
            "保持节奏比追求强度更重要，稳步前进。"
        ]
    }
};

// Helper: Random selection from array
function randomSelect(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Helper: Get Time Word (Morning/Afternoon/Night)
function getTimeWord() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) return "今天";
    if (hour >= 11 && hour < 17) return "现在"; // Or "今天"
    if (hour >= 17 && hour < 23) return "今晚";
    return "现在"; // Late night
}

// Helper: Process Title with Time
function processTitle(titleTemplate) {
    const timeWord = getTimeWord();
    return titleTemplate.replace("{{time}}", timeWord);
}

// --- Logic / Decision Engine (V1.2 Strategy Pool) ---
function generateResult() {
    const { ateTooMuch, recentMovement, timeAvailable, energyLevel } = state.inputs;
    
    let strategy = "";
    let headline = "";
    let cta = "";
    let eatAdvice = [];
    let moveAdvice = [];
    let why = [];
    let oneLiner = "";
    let tags = [];
    let tonightFocus = "";
    let subScenario = "";

    // --- Strategy Determination (Priority-based, deterministic) ---
    if (ateTooMuch === 'yes') {
        strategy = 'emergency';
        tags.push('rescue');
        tonightFocus = "停止进食，让肠胃休息";
    } else if (energyLevel === 'tired') {
        strategy = 'recovery';
        tags.push('rest');
        tonightFocus = "恢复优先，保证睡眠";
    } else if (timeAvailable === '0') {
        strategy = 'minimal';
        tags.push('steady');
        tonightFocus = "简单处理，不焦虑";
    } else {
        strategy = 'steady';
        tags.push('active');
        tonightFocus = "保持节奏，积累习惯";
    }

    // --- Headline Selection (Time-aware) ---
    const titlePool = STRATEGY_POOLS.titles[strategy];
    if (titlePool) {
        headline = processTitle(randomSelect(titlePool));
    }

    // --- CTA Selection ---
    // Combine universal + strategy specific
    let ctaPool = [...STRATEGY_POOLS.ctas.universal];
    if (strategy === 'emergency' || strategy === 'recovery') {
        ctaPool = [...ctaPool, ...STRATEGY_POOLS.ctas.recovery];
    } else {
        ctaPool = [...ctaPool, ...STRATEGY_POOLS.ctas.steady];
    }
    cta = randomSelect(ctaPool);

    // --- Eating Advice (from pool) ---
    const eatPool = STRATEGY_POOLS.eatAdvice[strategy];
    if (eatPool) {
        eatAdvice = randomSelect(eatPool);
    }

    // --- Movement Advice (from pool, with sub-scenarios) ---
    const time = parseInt(timeAvailable);
    
    if (strategy === 'emergency') {
        const movePool = time <= 15 
            ? STRATEGY_POOLS.moveAdvice.emergency.short
            : STRATEGY_POOLS.moveAdvice.emergency.long;
        moveAdvice = randomSelect(movePool);
        subScenario = time <= 15 ? 'E1' : 'E2';
    } else if (strategy === 'recovery') {
        const movePool = time <= 15
            ? STRATEGY_POOLS.moveAdvice.recovery.short
            : STRATEGY_POOLS.moveAdvice.recovery.long;
        moveAdvice = randomSelect(movePool);
        subScenario = time <= 15 ? 'R1' : 'R2';
    } else if (strategy === 'minimal') {
        moveAdvice = randomSelect(STRATEGY_POOLS.moveAdvice.minimal);
        subScenario = 'M1';
    } else {
        // steady
        if (time <= 15) {
            moveAdvice = randomSelect(STRATEGY_POOLS.moveAdvice.steady.short);
            subScenario = 'S1';
        } else {
            if (recentMovement === 'none') {
                moveAdvice = randomSelect(STRATEGY_POOLS.moveAdvice.steady.long_inactive);
                subScenario = 'S2';
            } else {
                moveAdvice = randomSelect(STRATEGY_POOLS.moveAdvice.steady.long_active);
                subScenario = 'S3';
            }
        }
    }

    // --- Why (from pool) ---
    const whyPool = STRATEGY_POOLS.why[strategy];
    if (whyPool) {
        why = [randomSelect(whyPool)];
    }

    // --- One-liner (from strategy-specific pool) ---
    const oneLinerPool = STRATEGY_POOLS.oneLiners[strategy];
    if (oneLinerPool) {
        oneLiner = randomSelect(oneLinerPool);
    } else {
        // Fallback to neutral
        oneLiner = randomSelect(STRATEGY_POOLS.oneLiners.neutral);
    }

    return {
        strategy,
        subScenario,
        headline,
        cta,
        tonightFocus,
        eatAdvice,
        moveAdvice,
        why,
        oneLiner,
        tags
    };
}

// --- UI Rendering ---

function renderStep(stepIndex) {
    if (stepIndex >= CONFIG.steps.length) {
        completeFlow();
        return;
    }

    const stepData = CONFIG.steps[stepIndex];
    
    // Create Card
    const card = document.createElement('div');
    card.className = 'step-card';
    card.innerHTML = `
        <h2 class="question-title">${stepData.title}</h2>
        <div class="options-grid">
            ${stepData.options.map(opt => `
                <button class="option-btn" data-value="${opt.value}" onclick="handleSelection('${stepData.id}', '${opt.value}')">
                    <span>${opt.label}</span>
                    <span class="arrow">→</span>
                </button>
            `).join('')}
        </div>
    `;

    // Clear main content and append new card
    dom.mainContent.innerHTML = ''; 
    dom.mainContent.appendChild(card);

    // Trigger reflow for animation
    requestAnimationFrame(() => {
        card.classList.add('active');
    });

    updateProgress(stepIndex);
}

function handleSelection(key, value) {
    // Save input
    state.inputs[key] = value;
    
    // Add visual feedback
    const btn = document.querySelector(`button[data-value="${value}"]`);
    if (btn) btn.classList.add('selected');

    // Wait for "selected" state, then leave
    setTimeout(() => {
        const currentCard = document.querySelector('.step-card');
        if (currentCard) {
            currentCard.classList.remove('active');
            currentCard.classList.add('leaving');
        }
        
        state.currentStep++;
        saveState();
        
        // Wait for leave animation to finish before rendering next
        setTimeout(() => {
            renderStep(state.currentStep);
        }, 400); // Matched to CSS transition 0.4s
    }, 300); // Delay to show selection
}

function updateProgress(stepIndex) {
    dom.progressContainer.classList.add('active');
    const percent = ((stepIndex + 1) / CONFIG.steps.length) * 100;
    dom.progressBar.style.width = `${percent}%`;
}

function completeFlow() {
    state.isComplete = true;
    state.result = generateResult();
    saveState();
    
    // Hide progress bar
    dom.progressContainer.classList.remove('active');
    dom.mainContent.innerHTML = ''; // Clear steps
    
    showResult(true);
}

function showResult(animate = true) {
    const r = state.result;
    if (!r) return;

    // V1.1 Mobile Structure:
    // 1. Decision Header
    // 2. Action Cards (Eat / Move)
    // 3. Why Section
    // 4. Fixed Bottom CTA

    // We inject the main content into resultView, and the CTA into a fixed container
    
    dom.resultView.innerHTML = `
        <!-- 1. Decision Header -->
        <div class="decision-header">
            <h2 class="result-headline">${r.headline}</h2>
            <p class="one-liner">${r.oneLiner}</p>
        </div>

        <!-- 2. Action Cards -->
        <div class="action-card">
            <div class="card-header">
                <span class="action-icon">🍽️</span>
                <span class="card-title">建议怎么吃</span>
            </div>
            <div class="card-content">
                <ul>${r.eatAdvice.map(t => `<li>${t}</li>`).join('')}</ul>
            </div>
        </div>

        <div class="action-card">
            <div class="card-header">
                <span class="action-icon">🏃</span>
                <span class="card-title">建议怎么动</span>
            </div>
            <div class="card-content">
                <ul>${r.moveAdvice.map(t => `<li>${t}</li>`).join('')}</ul>
            </div>
        </div>

        <!-- 3. Why Section (De-emphasized) -->
        <div class="why-section">
            <span class="section-label">💡 为什么这么建议</span>
            <ul>${r.why.map(t => `<li>${t}</li>`).join('')}</ul>
        </div>
    `;

    // Inject Fixed Bottom CTA
    // Check if exists first to avoid duplicates
    let ctaContainer = document.getElementById('bottom-cta');
    if (!ctaContainer) {
        ctaContainer = document.createElement('div');
        ctaContainer.id = 'bottom-cta';
        ctaContainer.className = 'bottom-cta-container';
        document.body.appendChild(ctaContainer);
    }
    
    ctaContainer.innerHTML = `
        <button class="btn-primary" onclick="copyResult()">
            <span>✨</span> ${r.cta}
        </button>
        <button id="reset-result-btn" class="reset-link">重置</button>
    `;

    // Re-bind reset since it's now dynamically injected
    document.getElementById('reset-result-btn').addEventListener('click', confirmReset);

    // Show View
    dom.resultView.classList.remove('hidden');
    dom.mainContent.classList.add('hidden'); // Hide main content flow
    
    // Hide original footer reset button as we moved it to bottom CTA area
    dom.resetBtn.classList.add('hidden');

    // Scroll to top
    window.scrollTo(0, 0);

    if (animate) {
        requestAnimationFrame(() => {
            dom.resultView.classList.add('visible');
        });
    } else {
        dom.resultView.classList.add('visible');
    }
}

// Global scope for onclick handlers
window.handleSelection = handleSelection;
window.copyResult = () => {
    const r = state.result;
    const text = `
【Should I Eat? 建议】
${r.headline}
"${r.oneLiner}"

🍽️ 吃：
${r.eatAdvice.join('\n')}

🏃 动：
${r.moveAdvice.join('\n')}

💡 Tips：
${r.why.join('\n')}
    `.trim();
    
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.querySelector('.btn-primary');
        const originalHtml = btn.innerHTML;
        btn.innerHTML = '<span>✅</span> 已复制';
        setTimeout(() => btn.innerHTML = originalHtml, 2000);
    });
};

// Start
init();
