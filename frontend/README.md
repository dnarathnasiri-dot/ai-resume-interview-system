# 🚀 AI Resume & Interview System

<div align="center">

![AI Resume Interview Pro](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A professional, AI-powered web application to help job seekers improve their resumes and ace interviews**

[Live Demo](#) • [Documentation](#features) • [Report Bug](https://github.com/dnarathnasiri-dot/ai-resume-interview-system/issues)

</div>

---

## ✨ Features

### 📄 **AI Resume Analysis**
- Upload resumes in PDF, DOC, or DOCX format
- Instant AI-powered scoring (0-100)
- Detailed section breakdown (Contact, Summary, Experience, Skills, Education, ATS)
- Personalized strengths and improvement suggestions
- ATS keyword optimization analysis
- Export results to PDF

### 💬 **Mock Interview Practice**
- **12 diverse interview questions** across multiple categories:
  - Introduction & Background
  - Behavioral Questions (STAR method)
  - Technical Knowledge
  - Problem Solving & Critical Thinking
  - Career Goals & Aspirations
  - Company Culture Fit
  - Growth Mindset
  - Closing Questions
- **2-minute timer** per question
- **Dynamic AI scoring** based on:
  - Answer completeness and depth
  - Professional keyword usage
  - Response quality metrics
- Detailed performance feedback with breakdown
- Interview history tracking

### 📊 **Dashboard & Analytics**
- Performance metrics overview
- Interactive progress charts (powered by Recharts)
- Recent activity feed
- Quick actions for resume upload and interviews
- Visual data representation

### 👤 **User Profile**
- Personal information management
- Complete interview history with scores
- Resume version tracking
- Performance statistics and trends
- Account settings

---

## 🎨 Screenshots

<div align="center">

### Landing Page
![Landing Page](docs/screenshots/landing.png)

### Dashboard
![Dashboard](docs/screenshots/dashboard.png)

### Interview Practice
![Interview](docs/screenshots/interview.png)

</div>

---

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - Modern UI library with hooks
- **TypeScript 5.7** - Type-safe development
- **React Router 7** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion 12** - Smooth animations
- **Recharts 2** - Beautiful chart visualizations
- **shadcn/ui** - High-quality UI components
- **Lucide React** - Beautiful icon library

### Build Tools
- **Vite 6** - Lightning-fast build tool
- **pnpm** - Efficient package manager

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/dnarathnasiri-dot/ai-resume-interview-system.git
cd ai-resume-interview-system

# Install dependencies
pnpm install
# or
npm install

# Start development server
pnpm dev
# or
npm run dev

# Build for production
pnpm build
# or
npm run build
```

The application will be available at `http://localhost:5173`

---

## 📁 Project Structure

```
ai-resume-interview-system/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── ui/              # shadcn/ui components
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── figma/
│   │   ├── pages/
│   │   │   ├── landing.tsx      # Landing page
│   │   │   ├── auth.tsx         # Login/Register
│   │   │   ├── dashboard.tsx    # Main dashboard
│   │   │   ├── resume-upload.tsx
│   │   │   ├── interview.tsx
│   │   │   └── profile.tsx
│   │   ├── routes.tsx           # Route configuration
│   │   └── App.tsx             # Root component
│   ├── styles/
│   │   ├── theme.css
│   │   └── fonts.css
│   └── index.tsx
├── package.json
├── vite.config.ts
└── README.md
```

---

## 🎯 Usage

### 1. **Landing Page**
Visit the home page to learn about features and get started

### 2. **Sign Up / Login**
Create an account or sign in (currently uses mock authentication)

### 3. **Upload Resume**
- Navigate to Resume Upload
- Drag & drop your resume or click to browse
- Get instant AI-powered analysis with detailed feedback

### 4. **Practice Interviews**
- Go to Interview section
- Answer 12 diverse interview questions
- Receive AI-generated scores and feedback

### 5. **Track Progress**
- View your dashboard for performance metrics
- Check interview and resume history
- Monitor improvement over time

---

## 🎨 Design Highlights

### Modern UI/UX
- **Gradient Color Scheme**: Professional blue-indigo-purple gradient theme
- **Glass Morphism**: Frosted glass effects with backdrop blur
- **Smooth Animations**: Motion-powered transitions and micro-interactions
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Accessibility**: WCAG 2.1 compliant components

### Key Design Elements
- Large, bold typography with gradient effects
- Elevated cards with shadow-xl
- Hover animations and transitions
- Professional icon integration
- Cohesive color palette

---

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8080/api
VITE_APP_NAME=AI Interview Pro
```

### Customization

#### Colors
Edit Tailwind classes in components:
```tsx
// Primary gradient
className="bg-gradient-to-r from-blue-600 to-indigo-600"

// Accent gradients
from-purple-500 to-pink-500
from-green-500 to-emerald-500
```

#### API Integration
Replace mock data with real API calls:
```tsx
// Example: Resume analysis
const response = await fetch(`${import.meta.env.VITE_API_URL}/analyze`, {
  method: 'POST',
  body: formData
});
const data = await response.json();
```

---

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

---

## 🗺️ Roadmap

### Phase 1: Backend Integration (In Progress)
- [ ] Connect to Spring Boot API
- [ ] Implement JWT authentication
- [ ] Real resume parsing with NLP
- [ ] Database persistence (MySQL)
- [ ] User session management

### Phase 2: Enhanced Features
- [ ] PDF export of analysis results
- [ ] Email notifications
- [ ] Video interview practice with recording
- [ ] Company-specific interview prep
- [ ] Resume templates and builder
- [ ] Job matching recommendations

### Phase 3: Advanced AI
- [ ] Custom AI models for scoring
- [ ] Natural language processing for answers
- [ ] Sentiment analysis
- [ ] Industry-specific feedback
- [ ] Multi-language support

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**dnarathnasiri-dot**

- GitHub: [@dnarathnasiri-dot](https://github.com/dnarathnasiri-dot)
- Repository: [ai-resume-interview-system](https://github.com/dnarathnasiri-dot/ai-resume-interview-system)

---

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Recharts](https://recharts.org/) - Chart library
- [Lucide Icons](https://lucide.dev/) - Icon set

---

## 📞 Support

If you have any questions or need help:
- Open an [Issue](https://github.com/dnarathnasiri-dot/ai-resume-interview-system/issues)
- Contact: [Your Email]

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by [dnarathnasiri-dot](https://github.com/dnarathnasiri-dot)

</div>
