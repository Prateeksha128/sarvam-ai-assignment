# Sarvam Widget

An embeddable chat + voice agent widget built with React and TypeScript, powered by **Google Gemini AI**. Designed to be easily integrated into any website with a single script tag.

## 🚀 Quick Start

### 1. Environment Setup

Create `.env.local` and add your Gemini API key:

```bash
# Get API key from: https://makersuite.google.com/app/apikey
echo "GEMINI_API_KEY=your_actual_gemini_api_key_here" > .env.local
```

### 2. Development

```bash
npm install
npm run build
npm run preview  # For UI testing only
# Note: Real AI responses only work when deployed to Vercel
```

### 3. Deployment

```bash
# Set environment variable in Vercel dashboard:
# GEMINI_API_KEY = your_actual_api_key

vercel --prod
```

## Features

- 🤖 **Google Gemini AI** - Advanced conversational AI
- 🔒 **Secure Architecture** - Server-side API key handling
- 🧠 **Context Memory** - Persistent chat history
- 🌐 **Multi-Language Support** - English, Hindi, Spanish + extensible
- 🚀 **Easy Integration** - Single script tag
- 🎨 **Customizable** - Themes, positioning, branding
- 🛡️ **CSS Isolation** - Shadow DOM prevents conflicts
- 📱 **Responsive Design** - Mobile-friendly UI
- 🎤 **Voice Support** - Multi-language speech recognition
- 💾 **Persistent Storage** - Chat history saved locally

## Integration

### Basic Usage

```html
<script src="https://your-domain.vercel.app/dist/widget.js"></script>
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
      name: "AI Assistant",
      avatar: "https://example.com/avatar.png",
    },
    enableVoice: true,
    context: "You are a helpful AI assistant.",
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
<script src="https://your-domain.vercel.app/dist/widget.js"></script>
```

## Configuration Options

| Option                  | Type    | Default               | Description                                           |
| ----------------------- | ------- | --------------------- | ----------------------------------------------------- |
| `position`              | string  | `'bottom-right'`      | Widget position (`bottom-right`, `bottom-left`, etc.) |
| `theme.primaryColor`    | string  | `'#4F46E5'`           | Primary color for buttons and accents                 |
| `theme.backgroundColor` | string  | `'#ffffff'`           | Background color of chat window                       |
| `theme.textColor`       | string  | `'#1f2937'`           | Text color                                            |
| `agent.name`            | string  | `'HelperBot'`         | Display name of the agent                             |
| `agent.avatar`          | string  | Generated placeholder | URL to agent's avatar image                           |
| `enableVoice`           | boolean | `true`                | Show voice recording button                           |
| `context`               | string  | `'You are helpful'`   | Context/instructions for the agent                    |
| `supportedLanguages`    | array   | `[en, hi, es]`        | Language configuration array                          |
| `defaultLanguage`       | string  | `'en'`                | Default language code                                 |

## API

```javascript
// Widget controls
SarvamWidget.init(); // Initialize (auto-called)
SarvamWidget.show(); // Show widget
SarvamWidget.hide(); // Hide widget
SarvamWidget.destroy(); // Remove widget
```

## Architecture

- **Secure API**: Server-side Gemini integration via Vercel functions
- **Shadow DOM**: Complete CSS isolation from host page
- **React 18**: Modern React with TypeScript
- **Vite**: Optimized build system
- **Vercel**: Serverless deployment platform

## Browser Support

- Chrome/Chromium 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## License

MIT
