# Should I Eat - 决策逻辑文档

## 输入参数说明

### 1. ateTooMuch (今天是不是已经没忍住吃多了？)
- `yes`: 是，撑到了 😅
- `no`: 还好，正常量

### 2. recentMovement (这几天身体动得怎么样？)
- `none`: 完全没动 (躺平)
- `some`: 稍微动了点
- `regular`: 规律运动中 💪

### 3. timeAvailable (今晚还能挤出多少自由时间？)
- `0`: 没空 (0分钟)
- `15`: 一点点 (15分钟)
- `30`: 半小时左右
- `60`: 很充裕 (60+)

### 4. energyLevel (现在的精神状态如何？)
- `tired`: 累瘫了 😫
- `ok`: 还行 (OK)
- `good`: 精力充沛 ✨

---

## 决策逻辑优先级

决策引擎按照以下优先级顺序判断：

1. **第一优先级**: `ateTooMuch === 'yes'` → **「紧急救援」**
2. **第二优先级**: `energyLevel === 'tired'` → **「回血休息」**
3. **第三优先级**: `timeAvailable === '0'` → **「极简模式」**
4. **默认情况**: 其他所有组合 → **「稳步提升」**

---

## 详细输出逻辑

### 场景 1: 紧急救援 (ateTooMuch === 'yes')

**触发条件**: 无论其他输入如何，只要 `ateTooMuch === 'yes'`

**标题**: 今晚主打「紧急救援」

**建议怎么吃**:
- 停止进食主食和高油食物。
- 可以喝点温水或柠檬水，帮助代谢。

**建议怎么动**:
- 饭后散步 20-30 分钟，不要剧烈运动。
- 做一些简单的站立拉伸。

**为什么这么建议**:
- 既然已经超标，今晚的任务是让肠胃休息，而不是继续堆积负担。

---

### 场景 2: 回血休息 (energyLevel === 'tired' 且 ateTooMuch !== 'yes')

**触发条件**: `ateTooMuch === 'no'` 且 `energyLevel === 'tired'`

**标题**: 今晚主打「回血休息」

**建议怎么吃**:
- 吃点温热、易消化的食物（如汤面、粥）。
- 七分饱即可，不要吃太撑，以免影响睡眠。

**建议怎么动**:
- 如果 `timeAvailable <= 15`:
  - 推荐冥想或平躺放松，不需要额外运动。
- 如果 `timeAvailable > 15` (即 30 或 60):
  - 推荐冥想或平躺放松，不需要额外运动。
  - 如果实在想动，做个简单的睡前瑜伽。

**为什么这么建议**:
- 身体已经发出了疲劳信号，高质量的睡眠比运动更重要。

---

### 场景 3: 极简模式 (timeAvailable === '0' 且 ateTooMuch !== 'yes' 且 energyLevel !== 'tired')

**触发条件**: `ateTooMuch === 'no'` 且 `energyLevel !== 'tired'` 且 `timeAvailable === '0'`

**标题**: 今晚主打「极简模式」

**建议怎么吃**:
- 简单解决，便利店沙拉或三明治即可。

**建议怎么动**:
- 利用碎片时间做几个深呼吸或拉伸即可。

**为什么这么建议**:
- 时间紧迫时，情绪稳定最重要，别因为没时间吃好而焦虑。

---

### 场景 4: 稳步提升 (默认情况)

**触发条件**: `ateTooMuch === 'no'` 且 `energyLevel !== 'tired'` 且 `timeAvailable !== '0'`

**标题**: 今晚适合「稳步提升」

**建议怎么吃**:
- 推荐优质蛋白（鸡胸、鱼）+ 大量蔬菜。
- 控制碳水摄入，保持轻盈感。

**建议怎么动** (根据 timeAvailable 和 recentMovement 细分):

#### 4.1 timeAvailable === '15'
- 10分钟 HIIT 或 快速跳绳。
- 或者做几组俯卧撑/深蹲，维持肌肉张力。

#### 4.2 timeAvailable === '30' 或 '60'
- 如果 `recentMovement === 'none'`:
  - 快走或慢跑 30 分钟，唤醒身体。
- 如果 `recentMovement === 'some'` 或 `'regular'`:
  - 去健身房或进行一次完整的有氧/力量训练。

**为什么这么建议**:
- 状态不错，时间也允许，是积累好习惯的绝佳机会。

---

## One-liner (随机选择)

所有场景都会随机选择以下一句作为情感化结尾：

1. "不管怎样，明天又是新的一天。"
2. "吃多少不重要，心态崩了才可怕。"
3. "好好睡觉，也是一种自律。"
4. "你的身体比你想象的更聪明，听它的。"
5. "别纠结了，去做吧。"

---

## 逻辑流程图

```
输入: [ateTooMuch, recentMovement, timeAvailable, energyLevel]
  │
  ├─ ateTooMuch === 'yes'?
  │   └─ 是 → 「紧急救援」
  │
  ├─ energyLevel === 'tired'?
  │   └─ 是 → 「回血休息」
  │
  ├─ timeAvailable === '0'?
  │   └─ 是 → 「极简模式」
  │
  └─ 其他 → 「稳步提升」
      │
      ├─ timeAvailable === '15' → 短时高强度运动
      │
      └─ timeAvailable >= '30'
          ├─ recentMovement === 'none' → 快走/慢跑
          └─ recentMovement !== 'none' → 完整训练
```

---

## 完整场景矩阵

| ateTooMuch | energyLevel | timeAvailable | recentMovement | 标题 | 运动建议类型 |
|------------|-------------|---------------|---------------|------|-------------|
| yes | * | * | * | 紧急救援 | 散步+拉伸 |
| no | tired | * | * | 回血休息 | 冥想/放松 (时间>15可瑜伽) |
| no | ok/good | 0 | * | 极简模式 | 深呼吸/拉伸 |
| no | ok/good | 15 | * | 稳步提升 | HIIT/跳绳/俯卧撑 |
| no | ok/good | 30/60 | none | 稳步提升 | 快走/慢跑 |
| no | ok/good | 30/60 | some/regular | 稳步提升 | 健身房/完整训练 |

*注: `*` 表示该参数在此场景下不影响决策*

---

## 代码位置

决策逻辑实现在 `app.js` 文件的 `generateResult()` 函数中（第 117-197 行）。







# Eating & Movement Strategy Pool — V1.1 Specification

> Purpose:  
> Ensure eating and movement suggestions feel **thoughtful, varied, and human**,  
> while remaining **simple, low-pressure, and easy to execute**.

This specification defines **what kinds of suggestions are allowed**,  
**how much variation is appropriate**,  
and **what must be avoided**.

## 一、输入参数（保持不变）

### 1. ateTooMuch（今天是不是已经没忍住吃多了？）
- `yes`：是，撑到了 😅
- `no`：还好，正常量

### 2. recentMovement（这几天身体动得怎么样？）
- `none`：完全没动
- `some`：稍微动了点
- `regular`：规律运动中

### 3. timeAvailable（今晚还能挤出多少时间？）
- `0`：没空
- `15`：一点点
- `30`：半小时左右
- `60`：很充裕（60+）

### 4. energyLevel（现在的精神状态如何？）
- `tired`：累瘫了
- `ok`：还行
- `good`：精力充沛

---

## 二、策略级决策（不变，作为信任锚点）

系统始终先判断 **策略层级**，策略不随机：

1. `ateTooMuch === 'yes'` → **紧急救援**
2. `energyLevel === 'tired'` → **回血休息**
3. `timeAvailable === '0'` → **极简模式**
4. 其他情况 → **稳步提升**

> 策略层永远稳定，是用户信任的基础。


---

## 1 Core Design Principles

### 1.1 Simplicity over Exhaustiveness
- Suggestions should **cover common situations**, not all edge cases
- The goal is to reduce decision stress, not to optimize performance

### 1.2 Every Suggestion Must Stand Alone
- Each eating or movement suggestion must:
  - Make sense on its own
  - Still be valid if it is the only thing the user does
- No suggestion should depend on another being completed

### 1.3 Variation Without Confusion
- Users should feel:
  - “This is familiar”
  - but not “This is exactly the same as last time”
- Variation should come from:
  - wording
  - emphasis
  - optional alternatives  
  not from changing core meaning

---

## 2 Strategy-Level Constraints

The system operates on four **stable strategies**:
- Emergency Recovery
- Rest & Recovery
- Minimal Mode
- Steady Improvement

> Strategy selection must remain deterministic.  
> Only **expression and suggestion details** may vary.

---

## 3 Eating Strategy Pool (Natural Language Rules)

### 3.1 Emergency Recovery (Overeating)

**Intent:**  
Reduce digestive burden and avoid further stress.

**Allowed suggestion types:**
- Stop eating additional heavy food
- Focus on hydration (water, warm drinks)
- Optional light protein or clear soup if hunger persists

**Variation guidelines:**
- 2–3 alternative phrasings are allowed
- Suggestions must never:
  - encourage restriction as punishment
  - introduce new food complexity

**Tone constraints:**
- Calm
- Non-judgmental
- Emphasize “pause” rather than “fix”

---

### 3.2 Rest & Recovery (Low Energy)

**Intent:**  
Support physical recovery and sleep quality.

**Allowed suggestion types:**
- Warm, easy-to-digest meals
- Eating to comfort, not to optimize
- Explicit permission to keep it simple

**Variation guidelines:**
- Suggestions may acknowledge:
  - lack of motivation
  - desire to avoid effort
- Avoid:
  - nutritional targets
  - performance framing

---

### 3.3 Minimal Mode (No Time)

**Intent:**  
Prevent anxiety and decision paralysis when time is limited.

**Allowed suggestion types:**
- Ready-made or convenience food
- Eating “as usual” without adding extra effort
- Clear reassurance that simplicity is acceptable

**Variation guidelines:**
- Emphasize adequacy over quality
- Avoid framing minimal choices as “less good”

---

### 3.4 Steady Improvement (Normal / Good State)

**Intent:**  
Support consistency and habit building.

**Allowed suggestion types:**
- Protein-forward meals
- Balanced, familiar food choices
- Gentle guidance to avoid overeating

**Variation guidelines:**
- Multiple expressions are encouraged
- Suggestions should:
  - feel practical
  - avoid sounding prescriptive or strict

---

## 4 Movement Strategy Pool (Natural Language Rules)

### 4.1 Emergency Recovery

**Intent:**  
Aid digestion and reduce discomfort without stress.

**Allowed suggestion types (based on time):**
- Short time:
  - standing
  - light walking
  - gentle stretching
- Longer time:
  - relaxed walking
  - mobility-focused movement

**Explicitly forbidden:**
- High-intensity exercise
- Anything that implies “burning off” food

---

### 4.2 Rest & Recovery

**Intent:**  
Encourage recovery, not output.

**Allowed suggestion types:**
- Breathing
- Stretching
- Relaxation-oriented movement
- Light walking (optional, never mandatory)

**Variation guidelines:**
- Suggestions may:
  - reinforce that rest is productive
- Must never:
  - pressure the user to “at least do something”

---

### 4.3 Minimal Mode

**Intent:**  
Lower the activation energy as much as possible.

**Allowed suggestion types:**
- Micro-movements
- Incidental movement
- Very short, clearly bounded actions

**Variation guidelines:**
- Emphasize:
  - “This counts”
  - “Enough for today”
- Avoid suggesting full workouts

---

### 4.4 Steady Improvement

**Intent:**  
Encourage regular movement without extremes.

**Allowed suggestion types (based on time & recent activity):**
- Short time:
  - brief cardio
  - basic strength
- Longer time:
  - walking, jogging, cycling
  - regular training routines
- For regularly active users:
  - allow choice between planned training or preferred activity

**Variation guidelines:**
- Choice-based language is encouraged:
  - “you can choose…”
  - “either is fine”

---

## 5 Quantity & Presentation Rules

### 5.1 Number of Suggestions
- Eating:
  - 1–2 suggestions per result
- Movement:
  - 1–2 suggestions per result
- More than this is considered overload

---

### 5.2 Optional Alternatives (A/B Style)

- Alternatives may be presented as:
  - “You could also…”
  - “If that feels like too much…”
- Alternatives must be:
  - equivalent in intent
  - not hierarchical (“better” vs “worse”)

---

## 6 Variation & Randomness Rules

### Allowed:
- Rotating phrasing
- Emphasis shifts
- Optional alternative ordering

### Not Allowed:
- Strategy-level randomness
- Conflicting advice
- Surprise or novelty for its own sake

Randomness should support **freshness**, not **unpredictability**.

---

## 7 Anti-Patterns (Strictly Forbidden)

- Calorie numbers
- Macro targets
- Punitive language
- Overly technical exercise terms
- Lists longer than 3 items
- Anything that feels like a training plan

---

## 8 Success Criteria for Strategy Pools

The strategy pools are considered successful if:

- Users feel advice is:
  - reasonable
  - humane
  - repeatable
- Repeated use does not cause irritation
- Suggestions feel “tailored” without being complex
- Users do not feel pressured to do everything suggested

If adding a suggestion increases anxiety or choice paralysis, it should be removed.

## 9 One-liner（V1.1 升级）

### 规则
- One-liner 按策略 **分池随机**
- 每池 8–10 句
- 作为单独模块展示：**「今晚一句话」**

---

### 🟥 紧急救援（Emergency / ateTooMuch === yes）

关键词：放过自己 · 别补刀 · 当下止损
	1.	吃多已经发生了，今晚不必再惩罚自己。
	2.	能停下来，本身就是一种控制力。
	3.	别急着补救，身体更需要安静。
	4.	今晚的任务只有一个：别再加重负担。
	5.	吃多不可怕，继续折腾才可怕。
	6.	给身体一点时间，它会自己处理。
	7.	不需要后悔，下一步走稳就好。
	8.	今晚什么都不加，已经是最优解。
	9.	别想着“拉回来”，今晚只要不更糟。
	10.	身体不需要解释，只需要你别再折腾。
    11. 吃多了不是失败，补刀才是。
    12. 今晚不折腾，就是最好的选择。
    13. 身体需要时间，不需要惩罚。


### 🟧 回血休息（Recovery / energyLevel === tired）

关键词：允许休息 · 恢复优先 · 不内疚
	1.	今天的状态，不适合硬撑。
	2.	好好休息，本来就是计划的一部分。
	3.	累了就停，不是退步。
	4.	睡好这一觉，比多练一次重要。
	5.	身体在提醒你：现在该收一收了。
	6.	不是每一天都要向前冲。
	7.	恢复不是偷懒，是为了走得更远。
	8.	今晚不做决定，只做恢复。
	9.	有些进步，是在休息里完成的。
	10.	让今天平稳收尾，就已经很不错。
    11. 好好休息，也是自律。
    12. 今天停一下，不会耽误长期进度。
    13. 睡好，比多练重要。


### 🟨 极简模式（Minimal / timeAvailable === 0）

关键词：不焦虑 · 小步也算 · 接受现实
	1.	今天这样，已经很好了。
	2.	能顾住情绪，就不算失败。
	3.	没时间的日子，也不需要自责。
	4.	小小的一点点，也在向前。
	5.	不完美的一天，也可以体面结束。
	6.	不用补偿今天，明天自然会来。
	7.	有些日子，稳住就赢了。
	8.	今天轻轻放过，反而更长久。
	9.	不必什么都做到位。
	10.	能照顾好自己，就够了。
    11. 小动作，也算在努力里。
    12. 不完美的一天，也可以体面收尾。
    13. 能做一点，就已经很好了。


### 🟩 稳步提升（Steady / default）

关键词：节奏 · 长期 · 不极端
	1.	今天这样，很适合积累。
	2.	不需要狠，只要稳。
	3.	节奏对了，比强度重要。
	4.	一点点重复，才是长期答案。
	5.	今天的选择，在帮未来的你。
	6.	状态不错，别浪费，也别透支。
	7.	做对的事，不用做多。
	8.	稳住这个感觉，很值。
	9.	你在建立的是习惯，不是一次性成果。
	10.	不着急，路走对了就行。
    11. 节奏对了，比狠重要。
    12. 今天稳住，明天更轻松。
    13. 好习惯就是这样慢慢积累的。

### 🟦 通用·中性池（可跨策略使用）

这一组你可以作为 fallback，或者在某些场景下混用。

	1.	身体比规则更重要。
	2.	今天的你，已经尽力了。
	3.	顺着状态走，反而更轻松。
	4.	不需要证明什么。
	5.	有意识地选择，本身就是进步。
	6.	不完美没关系，失控才需要担心。
	7.	慢一点，反而更稳。
	8.	做完这一小步，就停。
	9.	你不需要对自己太苛刻。
	10.	今天就到这里，也很好。


---

## 六、新增输出字段（V1.1）

每次结果需包含：

```json
{
  "strategy": "emergency | recovery | minimal | steady",
  "subScenario": "A1 | B2 | D3 ...",
  "tonightFocus": "string",
  "eatAdvice": [],
  "moveAdvice": [],
  "fallbackPlan": "string",
  "why": [],
  "oneLiner": "string"
```
}

## 七、随机性原则（明确写进规则）

- ❌ 不允许跨策略随机
- ❌ 不允许语义冲突的随机
- ✅ 只允许：
    - 同一子场景下的模板随机
	- One-liner 随机

⸻

## 八、V1.1 成功标准（补充）

- 用户连续使用 3 次，不会感觉“每次都一样”
- 用户能复述系统对自己状态的判断
- One-liner 不显得像装饰，而是情绪收口

