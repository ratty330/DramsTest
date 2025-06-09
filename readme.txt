# SauceDemo Playwright Tests

End-to-end testing suite for [SauceDemo](https://www.saucedemo.com) using Playwright and TypeScript.

## 🚀 Features

- End-to-End (E2E) testing
- Visual regression testing
- UI component testing
- Cross-browser testing
- Automated test reporting
- GitHub Actions integration

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/saucedemo-playwright.git
cd saucedemo-playwright
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## 🧪 Running Tests

### Run all tests
```bash
npx playwright test
```

### Run specific test file
```bash
npx playwright test tests/e2e/login.spec.ts
```

### Run tests in specific browser
```bash
npx playwright test --project=chromium
```

### Run tests in headed mode
```bash
npx playwright test --headed
```

## 📊 Test Reports

### HTML Report
```bash
npx playwright test --reporter=html
```

### View Trace
```bash
npx playwright show-trace path/to/trace.zip
```

## 📁 Project Structure

```
saucedemo/
├── tests/
│   ├── components/     # Reusable UI components
│   ├── fixtures/       # Test data and models
│   ├── pages/         # Page Object Models
│   ├── e2e/           # End-to-end tests
│   ├── ui/            # UI component tests
│   └── visual/        # Visual regression tests
├── playwright.config.js
└── package.json
```

## 🔧 Configuration

The test environment is configured in `playwright.config.js`. Key configurations include:
- Browser selection
- Viewport settings
- Test timeouts
- Reporter settings
- Screenshot options

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📫 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/yourusername/saucedemo-playwright](https://github.com/yourusername/saucedemo-playwright) 