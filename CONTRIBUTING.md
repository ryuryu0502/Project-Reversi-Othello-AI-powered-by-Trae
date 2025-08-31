# Contributing to Othello Game

Thank you for your interest in contributing to our Othello game project! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (comes with Node.js)
- Git
- A modern web browser

### Development Setup

1. **Fork and Clone the Repository**
   ```bash
   git clone https://github.com/your-username/Project-Reversi-Othello-AI-powered-by-Trae.git
   cd Project-Reversi-Othello-AI-powered-by-Trae
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   The game will be available at `http://localhost:8080`

4. **Run Tests**
   ```bash
   # Run all tests
   npm test
   
   # Run specific test suites
   npm run test:accessibility
   npm run test:performance
   
   # Run tests with UI
   npm run test:ui
   ```

## 📋 Development Workflow

### Branch Naming Convention
- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `hotfix/description` - Critical fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Test additions/updates

### Commit Message Format
We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements
- `ci`: CI/CD changes

**Examples:**
```
feat(ai): add hard difficulty level
fix(ui): resolve mobile touch issues
docs: update installation instructions
test(game): add unit tests for move validation
```

### Pull Request Process

1. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Write clean, readable code
   - Follow existing code style
   - Add tests for new functionality
   - Update documentation as needed

3. **Test Your Changes**
   ```bash
   npm test
   npm run test:accessibility
   npm run test:performance
   ```

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then create a Pull Request on GitHub

## 🎯 Code Style Guidelines

### JavaScript
- Use ES6+ features
- Use `const` and `let` instead of `var`
- Use arrow functions where appropriate
- Use template literals for string interpolation
- Add JSDoc comments for functions and classes

### HTML
- Use semantic HTML elements
- Include proper ARIA labels for accessibility
- Maintain proper indentation (2 spaces)

### CSS
- Use CSS custom properties (variables)
- Follow BEM naming convention where applicable
- Ensure responsive design
- Test in both light and dark themes

### Example Code Style

```javascript
/**
 * Calculates the best move for the AI player
 * @param {Array} board - Current game board state
 * @param {string} player - Current player ('black' or 'white')
 * @param {string} difficulty - AI difficulty level
 * @returns {Object|null} Best move coordinates or null
 */
const calculateBestMove = (board, player, difficulty) => {
  if (!board || !player) {
    return null;
  }
  
  const validMoves = getValidMoves(board, player);
  
  if (validMoves.length === 0) {
    return null;
  }
  
  // Implementation...
};
```

## 🧪 Testing Guidelines

### Test Types
1. **Unit Tests** - Test individual functions and components
2. **E2E Tests** - Test complete user workflows
3. **Accessibility Tests** - Ensure WCAG compliance
4. **Performance Tests** - Verify performance benchmarks

### Writing Tests
- Write descriptive test names
- Test both happy path and edge cases
- Mock external dependencies
- Ensure tests are deterministic

### Test Coverage
- Aim for >80% code coverage
- Focus on critical game logic
- Test accessibility features
- Verify performance requirements

## 🎮 Game Logic Guidelines

### Core Principles
- Follow official Othello/Reversi rules
- Maintain game state consistency
- Ensure move validation accuracy
- Handle edge cases gracefully

### AI Development
- Implement multiple difficulty levels
- Optimize for reasonable response times
- Use appropriate algorithms (minimax, alpha-beta pruning)
- Test against various game scenarios

## ♿ Accessibility Requirements

### WCAG 2.1 AA Compliance
- Keyboard navigation support
- Screen reader compatibility
- Color contrast ratios ≥ 4.5:1
- Focus indicators
- Alternative text for images

### Testing Accessibility
```bash
# Run accessibility tests
npm run test:accessibility

# Manual testing with screen readers
# Test keyboard navigation
# Verify color contrast
```

## 📱 Mobile Considerations

- Touch-friendly interface
- Responsive design (320px - 1920px)
- Performance optimization for mobile devices
- Test on various screen sizes

## 🚀 Performance Standards

### Benchmarks
- Page load time: < 2 seconds
- Time to Interactive: < 3 seconds
- Lighthouse Performance score: ≥ 80
- Frame rate: 60 FPS for animations
- Memory usage: Stable over time

### Optimization Techniques
- Minimize DOM manipulations
- Use requestAnimationFrame for animations
- Implement proper cleanup to prevent memory leaks
- Optimize images and assets

## 🐛 Bug Reports

When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment information (OS, browser, device)
- Screenshots or videos if applicable
- Console errors (if any)

## 💡 Feature Requests

For new features, please provide:
- Clear description of the feature
- Use cases and benefits
- Mockups or wireframes (if applicable)
- Technical considerations
- Acceptance criteria

## 📚 Documentation

### Code Documentation
- Add JSDoc comments for public APIs
- Include inline comments for complex logic
- Update README for significant changes
- Document configuration options

### User Documentation
- Keep user guides up to date
- Include screenshots for UI changes
- Provide clear instructions
- Consider multiple languages

## 🔄 Release Process

### Version Numbering
We follow [Semantic Versioning](https://semver.org/):
- `MAJOR.MINOR.PATCH`
- Major: Breaking changes
- Minor: New features (backward compatible)
- Patch: Bug fixes (backward compatible)

### Release Checklist
- [ ] All tests pass
- [ ] Documentation updated
- [ ] Performance benchmarks met
- [ ] Accessibility requirements satisfied
- [ ] Cross-browser testing completed
- [ ] Mobile testing completed

## 🤝 Code of Conduct

### Our Standards
- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow
- Maintain a professional environment

### Unacceptable Behavior
- Harassment or discrimination
- Trolling or inflammatory comments
- Personal attacks
- Publishing private information
- Other unprofessional conduct

## 📞 Getting Help

### Resources
- [GitHub Issues](https://github.com/your-username/Project-Reversi-Othello-AI-powered-by-Trae/issues) - Bug reports and feature requests
- [GitHub Discussions](https://github.com/your-username/Project-Reversi-Othello-AI-powered-by-Trae/discussions) - General questions and discussions
- [Documentation](./README.md) - Project documentation

### Contact
- Create an issue for bugs or feature requests
- Use discussions for questions
- Tag maintainers for urgent issues

## 🏆 Recognition

We appreciate all contributions! Contributors will be:
- Listed in the project README
- Mentioned in release notes
- Invited to join the maintainers team (for significant contributions)

---

Thank you for contributing to make this Othello game better for everyone! 🎉