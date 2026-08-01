### UX & Core Web Vitals Critique

**1. DOM Bloat & Performance Degradation**
Interactive quizzes and auto-loading articles inject massive amounts of HTML into the DOM. This continuous expansion will overload memory on low-end mobile devices, degrade the Interaction to Next Paint (INP), and spike Total Blocking Time (TBT).

**2. Mobile Experience Destruction**
Sticky sidebars consume precious screen real estate, often overlapping content or making the viewport claustrophobic on mobile. Furthermore, auto-loading (infinite scroll) completely hijacks the scroll bar and blocks users from ever reaching the footer. 

**3. Cumulative Layout Shifts (CLS) Disasters**
Dynamically injecting quiz questions or fetching the next article causes content to reflow and layout elements to jump unpredictably. If ads are injected into these new sections without pre-allocated heights, it guarantees a disastrous CLS score and risks accidental ad clicks, leading to an AdSense ban.

These features will tank mobile Core Web Vitals and lead to an unreadable, jittery, and bloated site.
