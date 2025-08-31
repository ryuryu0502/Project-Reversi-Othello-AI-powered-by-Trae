---
name: Performance Issue
about: Report performance problems or optimization opportunities
title: '[PERFORMANCE] '
labels: 'performance'
assignees: ''

---

**Performance Issue Summary**
A clear and concise description of the performance problem.

**Performance Metrics**
Please provide specific measurements:
- **Load Time**: [e.g. 5.2 seconds]
- **Time to Interactive**: [e.g. 3.8 seconds]
- **Frame Rate**: [e.g. 45 FPS during animations]
- **Memory Usage**: [e.g. 150MB after 10 minutes of gameplay]
- **CPU Usage**: [e.g. 80% during AI calculations]

**Steps to Reproduce**
1. Go to '...'
2. Perform action '....'
3. Measure performance using '....'
4. Observe slow performance

**Expected Performance**
Describe the expected performance benchmarks:
- Load time should be < 2 seconds
- Animations should run at 60 FPS
- Memory usage should not exceed X MB
- etc.

**Actual Performance**
Describe the actual performance observed:
- Load time is 5+ seconds
- Animations are choppy (30 FPS)
- Memory usage grows to X MB
- etc.

**Performance Testing Tools Used**
- [ ] Browser DevTools Performance tab
- [ ] Lighthouse
- [ ] WebPageTest
- [ ] Playwright Performance Tests
- [ ] Custom timing measurements
- [ ] Other: [specify]

**Environment Information**
- **OS**: [e.g. Windows 10, macOS 12.0]
- **Browser**: [e.g. Chrome 96, Firefox 94]
- **Device**: [e.g. Desktop, Mobile, Tablet]
- **CPU**: [e.g. Intel i7-9700K, Apple M1]
- **RAM**: [e.g. 16GB]
- **Network**: [e.g. WiFi, 4G, Ethernet]
- **Network Speed**: [e.g. 100 Mbps down, 10 Mbps up]

**Game Context**
- **Game Mode**: [e.g. PvP, PvC]
- **AI Difficulty**: [e.g. Easy, Medium, Hard] (if applicable)
- **Game Duration**: [e.g. 5 minutes, 20 moves]
- **Features Used**: [e.g. hints, statistics, theme switching]

**Performance Profile/Screenshots**
If applicable, attach performance profiles, screenshots, or recordings.

**Potential Root Causes**
If you have ideas about what might be causing the performance issue:
- [ ] Memory leaks
- [ ] Inefficient algorithms
- [ ] Too many DOM manipulations
- [ ] Large bundle size
- [ ] Unoptimized images/assets
- [ ] Blocking JavaScript
- [ ] CSS performance issues
- [ ] Network bottlenecks
- [ ] Other: [specify]

**Suggested Optimizations**
If you have ideas for performance improvements:

**Impact Assessment**
- [ ] Critical (app is unusable)
- [ ] High (significantly degrades user experience)
- [ ] Medium (noticeable but manageable)
- [ ] Low (minor performance impact)

**Affected User Groups**
- [ ] All users
- [ ] Mobile users
- [ ] Desktop users
- [ ] Users with slower devices
- [ ] Users with slow network connections
- [ ] Specific browser users: [specify]

**Performance Budget**
What are the target performance metrics for this issue?
- Load time: < X seconds
- Time to Interactive: < X seconds
- Frame rate: X FPS
- Memory usage: < X MB
- Bundle size: < X KB

**Additional Context**
Add any other context about the performance issue here.

**Related Issues**
Link to any related performance issues:
- Related to #[issue number]
- Duplicate of #[issue number]