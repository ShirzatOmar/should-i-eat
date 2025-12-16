# shouldieat.app — Project Rules & Scope (V1)

## 0) Goal
Build a **public, shareable** “daily eat & move decision helper” that feels **clean, modern, and not like a toy**.
- V1 uses **rule-based decisions (NO AI)**.
- V1 has **no account system**.
- V1 supports **local persistence** so users don’t lose their last inputs/results.
- V1 must feel **calm, modern, and professional**, with a visual quality comparable to a polished consumer app rather than a demo or internal tool.

---

## 1) Product Scope

### 1.1 What V1 DOES
- Collect 4 key signals (simple, high-signal inputs).
- Generate a **clear, structured** result:
  - **Today’s headline decision** (firm stance)
  - **Eat guidance**
  - **Move guidance** (based on time available)
  - **Why this suggestion** (explainability)
  - **A “one-liner” reassurance** (tone / emotion)
- Save the **latest** input + output to local storage.
- Allow users to:
  - **Copy** the result
  - **Export** result as image (optional) or plain text
- Work well on mobile (primary) and desktop (secondary).
- Provide a **modular, guided input flow** (app-like cards + stepper), explicitly avoiding a plain “questionnaire form” feel.
- Deliver a **high-quality, design-forward UI**, where visual clarity, spacing, and tone are treated as first-class product features.

### 1.2 What V1 DOES NOT DO
- No AI / LLM calls, no API keys, no backend.
- No login, no user accounts, no cloud database.
- No calories calculation, no macros, no medical advice.
- No historical charts/analytics dashboards (beyond “last result”).
- No payments/subscription.

---

## 2) Technical Architecture

### 2.1 Stack (V1)
- **Frontend only** static web app:
  - `index.html`
  - `styles.css`
  - `app.js`
- Vanilla JS (no framework) OR lightweight framework-free components.
- No build step required for V1 (keep it simple).
- Optional: use a minimal icon set via inline SVG.

### 2.2 Hosting & Delivery
- **GitHub Pages** for public hosting.
- Custom domain: `shouldieat.app` via Cloudflare DNS.
- HTTPS enforced (required by `.app` TLD).

### 2.3 Folder Structure
- `/index.html` — Single page app shell
- `/assets/` — icons, logo, optional illustrations
- `/styles.css` — global styles + component styles
- `/app.js` — state, decision engine, rendering, persistence
- `/README.md` — setup, deploy, rules, scope

---

## 3) Data Model & Storage (No Accounts)

### 3.1 Storage Strategy
- Use browser **localStorage** for persistence.
- Store only:
  - latest user inputs
  - latest generated output
  - UI preferences (optional: language, theme mode)
- Do **not** store sensitive personal data or detailed logs.

### 3.2 Key Names (localStorage)
- `sie_v1_state` — main persisted state JSON
- `sie_v1_version` — schema/version string (e.g. `"1.0.0"`)

### 3.3 State Schema (Example)
```json 
{
  "version": "1.0.0",
  "updatedAt": "2025-12-16T08:00:00.000Z",
  "inputs": {
    "ateTooMuch": "yes|no",
    "recentMovement": "none|some|regular",
    "timeAvailable": "0|15|30|60",
    "energyLevel": "tired|ok|good"
  },
  "result": {
    "headline": "string",
    "eatAdvice": ["string", "string"],
    "moveAdvice": ["string", "string"],
    "why": ["string", "string", "string"],
    "oneLiner": "string",
    "tags": ["steady|rescue|light|rest"]
  }
```
}

### 3.4 Persistence Rules
- Save state automatically on:
- input change (debounced)
- generating a new result
- Provide a “Reset” option to clear saved state (with confirmation).
- Show a small note: “Saved on this device. Clearing browser data will remove it.”

⸻

## 4 Decision Engine (Rule-Based)

### 4.1 Design Principles
	•	Prefer few high-impact rules over many tiny branches.
	•	Output must be:
	•	firm (clear stance)
	•	kind (no guilt)
	•	actionable (specific next step)
	•	Always include “Why this suggestion?” for trust.

### 4.2 Rule Inputs (V1)
	1.	ateTooMuch: yes/no
	2.	recentMovement: none/some/regular
	3.	timeAvailable: 0/15/30/60
	4.	energyLevel: tired/ok/good

### 4.3 Output Templates
	•	Maintain a small library of templates:
	•	headline templates (6–10)
	•	eatAdvice templates (by scenario)
	•	moveAdvice templates (by timeAvailable + energyLevel)
	•	why templates (bullet reasons)
	•	oneLiner pool (10–20, randomized)

### 4.4 Safety & Tone Constraints
	•	No medical claims.
	•	No promises like “lose X kg”.
	•	Avoid extreme restriction language.
	•	Use “suggest” / “recommend” / “try” phrasing.

⸻

## 5 UI / UX Style Guide (V1 HARD REQUIREMENTS)

### 5.0 Design Reference & Visual Direction
The visual direction of shouldieat.app should be inspired by **calm, trust-first consumer products**, such as:
- Apple Health
- Calm
- Headspace

The product should feel:
- Low-stimulation
- Emotionally safe
- Thoughtful and unhurried

Avoid visual styles commonly seen in:
- Fitness tracking apps
- Habit streak apps
- Growth-hacking or gamified tools

**Design Intent:**  
The product must feel like a calm, premium consumer app — restrained, confident, and thoughtfully designed.  
Avoid anything that feels rushed, experimental, or “hacky”.

UI quality is considered part of the core product value, not a cosmetic layer.

### 5.1 Visual Style
	•	Minimal, modern, premium feel:
	•	lots of whitespace
	•	card-based layout
	•	soft shadows, subtle borders
	•	rounded corners (12–16px)
	•	Use system font stack:
	•	-apple-system, BlinkMacSystemFont, "SF Pro Text", "Inter", "Segoe UI", Roboto, Arial, sans-serif

### 5.2 Color System (suggested)
	•	Background: near-white
	•	Text: near-black
	•	Neutral borders: light gray
	•	One accent color (single primary)
	•	Status colors used sparingly:
	•	“OK” / “Caution” / “No”
	•	Avoid neon or heavy gradients.

### 5.3 Layout
	•	Mobile-first (375px baseline).
	•	Max content width on desktop: ~720px centered.
	•	Sticky CTA optional on mobile (only if it improves usability).

### 5.4 Components
	•	Header: product name + tagline + tiny “privacy note” link
	•	Input cards:
	•	question title
	•	2–4 choices as pill buttons
	•	CTA button:
	•	“Help me decide”
	•	Result card:
	•	Headline (largest)
	•	Eat section
	•	Move section
	•	Why section (bullets)
	•	One-liner (italic / subtle)
	•	Secondary actions:
	•	Copy result
	•	Reset

### 5.5 Microcopy (Tone Rules)
	•	Life-like, playful, not cringe.
	•	No shaming.
	•	Examples:
	•	“I already ate a lot 😅”
	•	“I can squeeze 15 minutes”
	•	“Let’s keep it simple tonight.”

### 5.6 Input Flow & Interaction Model (V1 MUST)

**Goal:** Make the input experience feel modern, modular, and “app-like” — NOT a plain questionnaire.

#### 5.6.1 Interaction Pattern (choose one as default)
**Default:** “Guided cards + stepper”
- Show inputs as **4 modules** (cards), but reveal them in a guided way:
  - Step indicator: `1/4 → 4/4`
  - Each step is a card with choices (chips / pills)
  - After selecting, auto-advance with subtle motion

Alternative (optional in V1):
- “All cards visible” with a sticky CTA (only if it still looks premium and not survey-like)

#### 5.6.2 UI Components (required)
- **Stepper / Progress bar** at top (minimal)
- **Input module cards**:
  - Title in life-like language
  - Options as **chips** (not radio buttons)
  - Selected state is obvious and satisfying
- **Sticky bottom action** (mobile):
  - Primary CTA: `帮我判断一下`
  - Secondary: `重置`
- **Result preview area** (optional):
  - After step 2, show a tiny “preview pill” like `当前：偏补救 / 偏稳住` to build confidence

#### 5.6.3 Motion & Micro-interactions (subtle, premium)
- Card enter: fade + slight slide (very subtle)
- Choice select: quick scale/press feedback
- Auto-scroll to next module on selection (mobile-friendly)
- Never flashy; keep it calm and clean.

#### 5.6.4 Copy Style for Inputs (life-like)
- Avoid form-ish wording like “Please select”
- Use conversational prompts:
  - “今天是不是已经没忍住吃多了？”
  - “这几天基本动了吗？”
  - “今晚还能挤出多少时间？”
  - “你现在状态怎么样？”
- Option labels should feel like real talk, not data labels.

#### 5.6.5 Anti-Patterns (explicitly forbidden)
- Plain vertical questionnaire layout with radio buttons
- Dense form controls (dropdowns, textfields) in V1
- Long instructions above inputs
- Any “calorie/macros/medical” fields

#### 5.6.6 Acceptance Criteria for Input UX
- On mobile, user can finish inputs with one thumb and minimal scrolling
- The experience feels like a lightweight app flow, not a survey page
- A screenshot of the input flow looks “post-worthy”

### 5.7 Visual Quality & Professional Feel (V1 MUST)

#### 5.7.1 Overall Feel
- Calm, confident, and restrained
- No flashy animations, gimmicks, or “growth hack” visuals
- The UI should feel appropriate for someone making a real decision at night

#### 5.7.2 Layout & Spacing
- Generous whitespace is mandatory
- Clear vertical rhythm; avoid dense stacking
- Each module (input card, result block) must feel self-contained and breathable

#### 5.7.3 Typography
- Prefer fewer font sizes, used consistently
- Headline: confident, not loud
- Body text: readable, slightly relaxed line-height
- Avoid decorative fonts or playful typefaces

#### 5.7.4 Color & Contrast
- Neutral-first palette
- Accent color used sparingly and intentionally
- No bright reds/greens for judgment; prefer neutral language and tone
- Visual hierarchy must be obvious without relying on color alone

#### 5.7.5 Interaction Restraint
- Animations must be subtle and purposeful
- No unnecessary transitions
- Every motion should reduce cognitive load, not add excitement

#### 5.7.6 “Not a Toy” Checks
Before considering V1 complete, the UI must pass these checks:
- A screenshot could plausibly appear on a product website
- A non-technical user would not describe it as “a demo”
- It feels trustworthy enough to follow its advice

### 5.8 Product-Grade UI Standard (Not a Demo)

The UI must not feel like:
- A hackathon demo
- A survey page
- A personal side project with default styles

Before V1 is considered complete, it should pass the following checks:
- A screenshot could reasonably appear in a product case study
- A first-time user would trust the advice without questioning its seriousness
- The interface feels intentional, not accidental

⸻

## 6 Content & Language

### 6.1 Language Strategy
	•	V1 can be Chinese-first (Shanghai/Singapore user base) with optional English toggle.
	•	Keep all text in a centralized copy object in app.js.

### 6.2 Required Copy Blocks
	•	Title: “今晚该不该吃？”
	•	Subtitle: “帮你少做一次错误决定。”
	•	Privacy note: “不记录、不上传，只保存在本设备浏览器。”
	•	Disclaimer: “仅作生活建议，不构成医疗建议。”

⸻

## 7 Non-Functional Requirements

### 7.1 Performance
	•	First load < 1s on decent network.
	•	No heavy libraries.

### 7.2 Accessibility
	•	Buttons have clear focus states.
	•	Adequate contrast.
	•	Tap targets >= 44px on mobile.

### 7.3 Privacy
	•	No tracking by default (no analytics in V1).
	•	No external requests except fonts/icons if used (prefer local assets).

⸻

## 8 Deployment Plan (GitHub Pages)

### 8.1 Repo Setup
	•	Create repo: shouldieat
	•	Place static files in repo root.

### 8.2 Enable Pages
	•	GitHub repo → Settings → Pages
	•	Source: main branch, /root
	•	Verify public URL works.

### 8.3 Custom Domain
	•	In Pages: set custom domain to shouldieat.app
	•	In Cloudflare DNS:
	•	A records for apex @ to GitHub Pages IPs (4 records)
	•	Optional: www CNAME to username.github.io
	•	Enable “Enforce HTTPS” in GitHub Pages.
	•	Ensure Cloudflare SSL mode: “Full” (or “Full (strict)” once issued).

⸻

## 9 Success Criteria (V1)
- A user can open link and complete flow within 30 seconds.
- The result feels credible + actionable + kind.
- Page looks premium on mobile.
- Inputs/results persist on refresh.
- User can share screenshot and it looks “post-worthy”.
- Input flow must look modern and modular; it should not resemble a generic survey form.
- Visual and interaction quality must meet a “product-grade” standard; if the UI feels like a demo or survey, V1 is not considered complete.
- UI quality must align with the defined design references; if the product visually resembles a generic form or demo, V1 is not complete.

⸻

## 10 Future Extensions (NOT V1)
	•	AI decision engine via serverless proxy (Cloudflare Workers).
	•	Shareable link encoding (URL payload or short code).
	•	Weekly summary / gentle streaks (still no guilt).
	•	Strava / Apple Health ingestion (only after validation).



# shouldieat.app — Project Rules & Scope (V1.1)

> V1.1 Focus: Mobile-first experience & product-grade visual quality

---

## 0) Version Update Note

V1.1 explicitly upgrades the product from:
- “desktop-first static page”
to
- **“mobile-first decision product”**

Mobile experience is considered the **primary success criteria**.
Desktop experience is secondary and may adapt from mobile layout.

---

## 1) Core Principle (Updated)

### 1.1 Product Intent (Addition)

- shouldieat.app is designed primarily for **mobile, single-hand usage**, typically in the evening.
- UI, layout, and interaction decisions must prioritize:
  - thumb reach
  - fast scanning
  - emotional reassurance

If a design choice improves desktop aesthetics but harms mobile usability, **mobile wins**.

---

## 5) UI / UX Style Guide (V1.1 HARD REQUIREMENTS)

### 5.0 Design Reference & Visual Direction (Unchanged)
- Calm
- Apple Health–like
- Low stimulation
- Trust-first

---

## 5.6 Mobile-first Layout Rules (NEW)

### 5.6.1 Primary Device Assumption
- Mobile viewport (375–430px width) is the **design baseline**
- Desktop layout should be a scaled or centered version of mobile
- No desktop-only interaction patterns are allowed in V1

---

### 5.6.2 Vertical Layout Strategy

- Content must **not be vertically centered**
- Layout should follow a **top-down reading flow**
- Interactive elements should sit naturally within the **lower half of the screen**

The UI should feel comfortable when used with **one thumb**, without stretching or grip adjustment.

---

### 5.6.3 Touch Target Requirements

- All tappable elements must:
  - Have a minimum height of **56px**
  - Clearly look tappable (visual affordance > subtlety)
- Buttons and option cards should prefer:
  - large hit areas
  - clear pressed states
  - minimal ambiguity

On mobile, “slightly too big” is preferable to “slightly too small”.

---

## 6) Input Flow — Mobile Interaction Model (Updated)

### 6.1 Guided, Step-based Input (Reaffirmed)

- Input flow must be:
  - step-based
  - guided
  - auto-advancing
- No “Next” buttons in V1 input flow
- Selection = progression

---

### 6.2 Progress Feedback (Mobile Mandatory)

- A progress indicator must always be visible
- Progress indicator should:
  - be visually noticeable
  - clearly communicate remaining steps
- Ultra-thin or purely decorative progress bars are not acceptable

---

### 6.3 Input Cards (Mobile Rules)

- Input options must be rendered as:
  - large cards or chips
  - full-width where possible
- Each option should feel like:
  - a confident tap
  - not a form selection

Dropdowns, radio buttons, or form-style controls are **explicitly forbidden** in V1.

---

## 7) Result Page — Mobile-first Structure (NEW, CRITICAL)

### 7.1 Result Page Design Priority

The result page is the **core product surface**.

If any page receives extra design attention, it must be:
> **Result Page (Mobile)**

---

### 7.2 Mandatory Result Page Structure

The result page must follow this order **top to bottom**:

1. **Decision Header (Primary)**
2. **Action Cards**
   - Eat
   - Move
3. **Why Section (De-emphasized)**
4. **Bottom CTA (Fixed)**

Reordering or collapsing these sections is not allowed in V1.1.

---

### 7.3 Decision Header (Mobile First-Screen)

#### Requirements:
- Must dominate the first screen on mobile
- Must clearly answer:
  - “What is tonight’s decision?”
- Must include:
  - decision label (largest text)
  - one-line emotional reassurance

#### Explicitly Forbidden:
- bullet lists
- explanations
- “why” reasoning
- long paragraphs

If the user scrolls before understanding the decision, the design fails.

---

### 7.4 Action Cards (Eat / Move)

- Rendered as **independent cards**
- Each card should:
  - focus on execution
  - be scannable within 3 seconds
- No card should contain more than **3 bullet items**

---

### 7.5 Why Section (Intentional Low Priority)

- Purpose: trust reinforcement, not persuasion
- Visual weight must be lower than action cards
- Users should be able to skip this section without losing clarity

---

### 7.6 Bottom CTA (Thumb Zone Mandatory)

- Primary CTA must:
  - be fixed to bottom on mobile
  - be reachable by thumb
  - close the decision loop emotionally
- CTA language must:
  - indicate acceptance or closure
  - not feel like a technical action

Examples:
- “我知道该怎么做了”
- “今晚就这样”

---

## 8) Anti-Patterns (Expanded)

The following patterns are **not allowed** in V1.1:

- Desktop-first centering layouts
- Long-form article-style result pages
- Dense informational blocks on mobile
- Multiple CTAs competing for attention
- UI that requires reading before understanding the decision

---

## 9) Success Criteria (Updated)

V1.1 is considered complete only if:

- The product feels **designed for mobile**, not adapted to it
- A first-time mobile user can:
  - complete input flow with one thumb
  - understand the decision within 3 seconds
- Result page screenshot looks:
  - credible
  - calm
  - product-grade
- UI does **not** resemble:
  - a survey
  - a blog post
  - a demo page

If these conditions are not met, V1.1 is not complete.



# Result Page Language System (V1.2)

> Purpose:  
> Introduce controlled variation and time awareness into result-page language,  
> so the product feels **human, situational, and share-worthy**,  
> without losing decision clarity or credibility.

---

## 1. Title Design Rules

### 1.1 Title Randomness Policy

Titles should use **semi-random variation**:

- The **strategy meaning must remain stable**
- Expression may vary within the same strategy
- Titles must never contradict the underlying decision

Each strategy should have:
- 5 predefined title variants
- One title selected per result
- Avoid repeating the same title consecutively

---

### 1.2 Time Awareness Rule

The wording inside titles should adapt to the user’s **local time**.

#### Recommended Time Mapping

| Local Time | Preferred Wording |
|----------|------------------|
| 05:00–10:59 | 今天 / 现在 |
| 11:00–16:59 | 现在 / 今天 |
| 17:00–22:59 | 今晚 |
| 23:00–04:59 | 现在 / 今天 |

Rules:
- Avoid using “今晚” during daytime
- Avoid forward-looking pressure (e.g. “为明天准备”)
- Titles should reflect *current state*, not future planning

---

## 2. Title Copy Pool (By Strategy)

### 2.1 稳步提升（Steady Improvement）

1. 今晚适合「稳步提升」
2. 现在这个状态，适合稳稳来
3. 不用拼命，但可以往前走一步
4. 今天的节奏，其实刚刚好
5. 稳住，比冲一把更重要

---

### 2.2 紧急救援（Emergency Recovery）

1. 今晚先别加码，重点是缓一缓
2. 现在最重要的是让身体轻松下来
3. 今天不需要再为难自己
4. 先停一下，比继续硬撑更聪明
5. 现在适合「紧急救援」

---

### 2.3 回血休息（Rest & Recovery）

1. 现在最适合的是好好回血
2. 今天不用再消耗自己了
3. 这个状态，休息反而是最优解
4. 今晚不追求进步，先照顾好自己
5. 回到稳定状态，比坚持更重要

---

### 2.4 极简模式（Minimal Mode）

1. 今天就走极简路线吧
2. 现在最重要的是别给自己添负担
3. 没时间的时候，简单一点反而更好
4. 今天不需要做很多，也没关系
5. 现在适合「极简模式」

---

## 3. CTA Copy Pool

> CTA is not a functional action.  
> It is a **psychological confirmation**.

Only one CTA should be shown per result.

---

### 3.1 通用型 CTA（可用于任何策略）

1. 就按这个来
2. 好，那我不纠结了
3. 行，就这样吧
4. 我知道该怎么做了
5. 嗯，这样也挺好

---

### 3.2 偏疲惫 / 恢复向 CTA

6. 今天到这就好
7. 我可以先休息一下
8. 不勉强自己了

---

### 3.3 偏稳定 / 行动向 CTA

9. 那就动一下吧
10. 去做点对自己好的事

---

### 3.4 CTA Usage Rules

- Each result page displays **only one CTA**
- CTA text may be randomly selected
- Avoid repeating the same CTA in a single session
- CTA wording must:
  - signal acceptance
  - reduce pressure
  - never sound like an instruction or command

---

## 4. Language System Summary

| Element | Variation Level | Primary Role |
|------|----------------|-------------|
| Strategy Name | None | Decision stability |
| Title | Medium | Situational judgment |
| One-liner | High | Emotional resonance |
| Eat / Move Advice | Low–Medium | Action clarity |
| CTA | High | Psychological closure |

---

## 5. Success Criteria

This language system succeeds if:

- Users feel the result “fits the moment”
- Titles do not feel generic across screenshots
- CTA feels like self-acceptance, not obligation
- Shared screenshots feel intentional, not instructional

The product should feel less like a tool,  
and more like **a calm voice helping you decide once**.



# Result Page Optimization for Sharing (V1.1)

> Goal:  
> Optimize the result page not only for usability,  
> but also for **social sharing, screenshots, and instant comprehension**  
> on platforms like Xiaohongshu.

This document defines:
- What must be visually and semantically emphasized
- How information hierarchy should be adjusted
- How typography, color, spacing, and structure support sharing

---

## 1. Core Principle

### The Result Page Is a Shareable Artifact

The result page is not just the end of a flow.
It is effectively:
- the product’s **poster**
- the product’s **explanation**
- the product’s **emotional hook**

Design decisions should favor:
- instant understanding
- emotional resonance
- screenshot friendliness

over completeness or instructional depth.

---

## 2. Information Hierarchy (What to Emphasize)

### Primary Layer (Must Be Immediately Visible)

These elements must appear **within the first screen** and dominate visual attention:

1. **Decision Conclusion**
   - Example: “今晚适合「稳步提升」”
   - This is the *judgment*, not the explanation

2. **One-liner (Emotional Summary)**
   - Example: “今天稳住，明天更轻松。”
   - This is the *emotional anchor*
   - This line is the most likely content to be screenshot or quoted

3. **Actionable Core Advice**
   - One eating action
   - One movement action
   - Each expressed as a **single sentence**, not a list

---

### Secondary Layer (Supportive, Not Dominant)

These elements support trust but should not compete visually:

- “为什么这么建议”
- Light reasoning or reassurance
- Disclaimers

They should be readable but visually de-emphasized.

---

## 3. Structural Layout Guidelines

### Recommended Vertical Order

1. Decision conclusion (title)
2. One-liner (emotional summary)
3. Core actions (eat / move)
4. Explanation (“为什么这么建议”)
5. Confirmation CTA

This order should never be reversed.

---

### Card Grouping

- Decision + One-liner may be grouped into one visual block
- Eating and movement suggestions may be grouped together
- Explanation should be visually separated (spacing or divider)

Avoid presenting all sections with equal visual weight.

---

## 4. Typography Guidelines

### Title (Decision Conclusion)

- Largest font size on the page
- High contrast color (e.g. near-black or brand primary)
- Short, confident phrasing
- Avoid explanatory wording here

Purpose:  
**This line must be readable and meaningful even when cropped.**

---

### One-liner (Emotional Summary)

- Second largest font size
- Slightly lighter color than title, but still high contrast
- Can be italicized or styled subtly
- Must feel like a “quote” or “statement”

Purpose:  
This is the **share trigger**.

---

### Core Actions (Eat / Move)

- Medium font size
- Clear icons (🍽 / 🏃) allowed but not required
- Each section limited to **one sentence**
- Avoid bullet lists longer than one line

Purpose:  
Enable “I know what to do now” feeling.

---

### Explanation (“为什么这么建议”)

- Smaller font size
- Lower contrast color (e.g. gray)
- Can be collapsible or visually lighter

Purpose:  
Reassurance, not persuasion.

---

## 5. Color & Visual Emphasis

### Background

- Prefer clean, neutral backgrounds (white or very light gray)
- Avoid strong gradients behind text-heavy sections
- Generous white space is preferred over decoration

---

### Accent Color Usage

Accent color should be used only for:
- Progress indication
- Key separators
- CTA button

Do NOT use accent color for:
- Explanatory text
- Disclaimers
- Long paragraphs

---

### Visual Focus Rule

If a user takes a screenshot:
- The title and one-liner should visually dominate
- Secondary text should not compete for attention

---

## 6. CTA Design (Confirmation, Not Action)

### CTA Role

The CTA on the result page is not a “next step”.
It is a **psychological confirmation**.

---

### CTA Copy Guidelines

Avoid product or instructional language.

Recommended tone:
- Acceptance
- Relief
- Closure

Examples:
- “就按这个来”
- “今晚就这样吧”
- “好，那我不纠结了”

---

### CTA Visual Style

- Prominent but not aggressive
- Rounded shape preferred
- One primary CTA only
- No secondary CTAs on the result page

---

## 7. Screenshot & Sharing Check

Before shipping, the result page must pass this test:

> If the user screenshots only the top half of the page:
> - Is the decision clear?
> - Is the emotional message intact?
> - Does it feel worth sharing?

If not, reduce or demote lower-priority content.

---

## 8. Explicit Non-Goals (Must Be Avoided)

- Over-detailed nutrition advice
- Lists longer than two items
- Technical or fitness jargon
- Instructional or judgmental tone
- Making all sections visually equal

---

## 9. Success Criteria

The optimized result page succeeds if:

- Users understand the conclusion in under 2 seconds
- The one-liner feels “quote-worthy”
- Users feel less pressure, not more
- Screenshots look intentional, not like app documentation

This page should feel closer to a **thoughtful note** than a **report**.