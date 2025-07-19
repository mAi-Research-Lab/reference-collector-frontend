# RefCite - Modern Reference Management

RefCite is a powerful, intuitive reference management application designed for researchers, students, and academics who value simplicity and efficiency. Built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Smart Organization** - Automatically organize your references with intelligent tagging and categorization
- **Powerful Search** - Find any reference instantly with advanced search and filtering capabilities
- **Team Collaboration** - Share libraries and collaborate with colleagues seamlessly
- **Quick Citation** - Generate citations in any format with just a few clicks
- **Multi-Platform** - Works on Windows, macOS, and Linux
- **Cloud Sync** - Access your references from anywhere
- **Offline Support** - Continue working even without internet connection

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 📦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/refcite-frontend.git
cd refcite-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
refcite-frontend/
├── app/                    # Next.js 14 App Router pages
│   ├── auth/              # Authentication pages
│   ├── pricing/           # Pricing page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── layout/           # Layout components (Header, Footer)
│   └── ui/               # UI components (Button, Input)
├── lib/                  # Utility functions
├── types/                # TypeScript type definitions
├── public/               # Static assets
└── styles/               # Additional styles
```

## 🎨 Design System

RefCite uses a Zotero-inspired color palette with customizable design tokens:

- **Primary**: Red tones (`#ef4444` - `#7f1d1d`)
- **Neutral**: Gray scale (`#fafafa` - `#171717`)
- **Accent**: Blue tones (`#f0f9ff` - `#0c4a6e`)

## 📱 Pages

- **Home** (`/`) - Landing page with product overview
- **Pricing** (`/pricing`) - Pricing plans (Free, Individual Pro, Enterprise)
- **Sign Up** (`/auth/signup`) - User registration with plan selection
- **Sign In** (`/auth/signin`) - User authentication
- **Features** (`/features`) - Feature showcase (coming soon)
- **Download** (`/download`) - Application downloads (coming soon)

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 📋 Pricing Plans

### Free Plan
- Up to 1,000 references
- Basic citation styles
- Local storage
- Desktop application

### Individual Pro ($9.99/month)
- Unlimited references
- 500+ citation styles
- Cloud sync
- Advanced features
- Priority support

### Enterprise (Contact Sales)
- Everything in Individual Pro
- Unlimited team members
- Advanced admin controls
- Single Sign-On (SSO)
- Custom integrations
- 24/7 support

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Zotero's design philosophy
- Built with modern web technologies
- Designed for the academic community

## 📞 Support

For support, email hello@refcite.com or join our [Discord community](https://discord.gg/refcite).

---

**RefCite** - Making reference management simple and powerful for everyone. 