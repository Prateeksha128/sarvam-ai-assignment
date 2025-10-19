# Sarvam Widget

An embeddable chat + voice agent widget built with React and TypeScript, powered by **Google Gemini AI**. Designed to be easily integrated into any website with a single script tag.

## Features

- 🤖 **Google Gemini AI**: Powered by advanced AI capabilities with natural conversations
- 🧠 **Context Memory**: Remembers conversation history across browser sessions
- 🌐 **Multi-Language Support**: Built-in support for English, Hindi, Spanish, and easily extensible
- 🚀 **Easy Integration**: Single script tag integration
- 🎨 **Customizable**: Configurable themes, positioning, and branding
- 🛡️ **CSS Isolation**: Uses Shadow DOM to prevent style conflicts
- 📱 **Responsive**: Mobile-friendly design with modern UI
- 🎤 **Voice Support**: Speech-to-text with multi-language voice recognition
- ⚡ **Smart UI**: Context indicators, clear memory, smooth animations
- 🔧 **TypeScript**: Full type safety and IntelliSense support
- 💾 **Persistent Storage**: Chat history saved locally with localStorage

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Development

```bash
npm run dev
```

### 3. Build

```bash
npm run build
```

This creates a `dist/widget.js` file that can be embedded in any website.

## Integration

### Basic Usage

```html
<script src="path/to/widget.js"></script>
```

### With Configuration

```html
<script>
  window.AgentWidgetConfig = {
    position: "bottom-right",
    theme: {
      primaryColor: "#4F46E5",
      backgroundColor: "#ffffff",
      textColor: "#1f2937",
    },
    agent: {
      name: "Gemini Assistant",
      avatar: "https://example.com/avatar.png",
    },
    enableVoice: true,
    context:
      "You are a helpful AI assistant powered by Google Gemini. You have access to a wide range of knowledge and can help with various tasks including coding, writing, analysis, and general questions.",
    supportedLanguages: [
      {
        code: "en",
        name: "English",
        nativeName: "English",
        voiceCode: "en-US",
      },
      { code: "hi", name: "Hindi", nativeName: "हिन्दी", voiceCode: "hi-IN" },
      {
        code: "es",
        name: "Spanish",
        nativeName: "Español",
        voiceCode: "es-ES",
      },
    ],
    defaultLanguage: "en",
  };
</script>
<script src="path/to/widget.js"></script>
```

## Configuration Options

| Option                  | Type    | Default                         | Description                                                                     |
| ----------------------- | ------- | ------------------------------- | ------------------------------------------------------------------------------- |
| `position`              | string  | `'bottom-right'`                | Widget position: `'bottom-right'`, `'bottom-left'`, `'top-right'`, `'top-left'` |
| `theme.primaryColor`    | string  | `'#4F46E5'`                     | Primary color for buttons and accents                                           |
| `theme.backgroundColor` | string  | `'#ffffff'`                     | Background color of chat window                                                 |
| `theme.textColor`       | string  | `'#1f2937'`                     | Text color                                                                      |
| `agent.name`            | string  | `'HelperBot'`                   | Display name of the agent                                                       |
| `agent.avatar`          | string  | Generated placeholder           | URL to agent's avatar image                                                     |
| `enableVoice`           | boolean | `true`                          | Show voice recording button                                                     |
| `context`               | string  | `'You are a helpful assistant'` | Context/instructions for the agent                                              |
| `supportedLanguages`    | array   | `[en, hi, es]`                  | Array of language objects with `code`, `name`, `nativeName`, and `voiceCode`    |
| `defaultLanguage`       | string  | `'en'`                          | Default language code (must match one of the supported languages)               |

## API

The widget exposes a global `SarvamWidget` object with the following methods:

```javascript
// Initialize widget (auto-called)
SarvamWidget.init();

// Hide widget
SarvamWidget.hide();

// Show widget
SarvamWidget.show();

// Destroy widget
SarvamWidget.destroy();

// Get widget instance
const instance = SarvamWidget.getInstance();
```

## Architecture

- **Google Gemini AI**: Advanced conversational AI with context understanding
- **Context Memory**: Persistent chat history using localStorage and Gemini's chat sessions
- **Shadow DOM**: Ensures complete CSS isolation from the host page
- **React 18**: Modern React with concurrent features
- **TypeScript**: Full type safety
- **Vite**: Fast build system optimized for libraries
- **CSS-in-JS**: Scoped styles using CSS custom properties

## Development

### Project Structure

```
src/
├── api/
│   └── gemini.ts           # Google Gemini AI integration
├── components/
│   ├── ChatButton.tsx      # Floating chat button
│   ├── ChatWindow.tsx      # Main chat interface
│   └── Widget.tsx          # Root component
├── utils/
│   ├── languages.ts        # Multi-language support utilities
│   ├── storage.ts          # localStorage chat history management
│   └── voiceRecording.ts   # Web Speech API integration
├── config.ts               # Configuration handling
├── types.ts                # TypeScript definitions
├── styles.css              # Widget styles
└── main.ts                 # Entry point & Shadow DOM setup
```

### Building for Production

```bash
npm run build
```

Creates:

- `dist/widget.js` - Main embeddable bundle (IIFE format)
- `dist/widget.css` - Extracted CSS (if any)

### Testing Integration

Open `index.html` in a browser after building to see the widget in action.

## Browser Support

- Chrome/Chromium 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## License

MIT
