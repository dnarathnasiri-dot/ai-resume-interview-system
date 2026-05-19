# AI Resume & Interview System 🚀

A professional, AI-powered web application designed to help job seekers improve their resumes and practice interviews with intelligent feedback and scoring.

## ✨ Features

### 📄 Resume Analysis
- **AI-Powered Scoring**: Upload your resume and get instant AI-powered analysis with scores out of 100
- **Section Breakdown**: Detailed scoring for each resume section (Contact Info, Summary, Experience, Skills, Education, ATS Compatibility)
- **Strengths & Improvements**: Receive specific feedback on what you're doing well and areas for improvement
- **ATS Keywords Analysis**: Check if your resume contains important keywords for Applicant Tracking Systems
- **Export Results**: Download your analysis results for future reference

### 💬 Mock Interviews
- **12 Diverse Questions**: Practice with carefully crafted interview questions across multiple categories:
  - Introduction
  - Behavioral
  - Technical
  - Problem Solving
  - Career Goals
  - Company Fit
  - Growth Mindset
  - Closing
- **Timed Questions**: 2-minute timer per question to simulate real interview pressure
- **AI Scoring Algorithm**: Dynamic scoring based on:
  - Answer length and completeness
  - Keyword usage (professional terms)
  - Question completion rate
- **Detailed Feedback**: Get performance breakdown across Communication, Technical Knowledge, Problem Solving, and Cultural Fit
- **Progress Tracking**: Save your interview history and track improvement over time

### 📊 Dashboard
- **Performance Metrics**: Track your resume score, interviews completed, and average interview score
- **Progress Charts**: Visual representation of improvement over time (powered by Recharts)
- **Recent Activity**: Quick view of your latest resume uploads and interview sessions
- **Quick Actions**: One-click access to upload resume or start interview

### 👤 User Profile
- **Personal Information Management**: Update your name, email, phone, and location
- **Interview History**: Complete history of all interviews with scores and dates
- **Resume History**: Track all resume versions and score improvements
- **Performance Overview**: Stats dashboard showing averages and improvement rates

## 🎨 Design Highlights

### Modern UI/UX
- **Gradient Color Scheme**: Professional blue-indigo gradient theme throughout
- **Glass Morphism**: Frosted glass effects with backdrop blur
- **Smooth Animations**: Motion animations powered by Framer Motion
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Micro-interactions**: Hover effects, transitions, and loading states

### Professional Components
- **shadcn/ui Components**: Built with high-quality, accessible components
- **Tailwind CSS v4**: Modern utility-first CSS framework
- **Lucide Icons**: Beautiful, consistent icon set
- **Typography**: Large, bold headings with gradient text effects
- **Cards & Shadows**: Elevated cards with shadow-xl and hover animations

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1**: Modern React with hooks
- **TypeScript**: Type-safe development
- **React Router 7**: Client-side routing
- **Tailwind CSS 4**: Utility-first CSS framework
- **Framer Motion 12**: Animation library
- **Recharts 2**: Chart visualization library
- **shadcn/ui**: Component library
- **Lucide React**: Icon library

### Build Tools
- **Vite 6**: Lightning-fast build tool
- **pnpm**: Efficient package manager

## 📁 Project Structure

```
ai-resume-interview-system/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── ui/            # shadcn/ui components
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── figma/
│   │   ├── pages/
│   │   │   ├── landing.tsx    # Landing page
│   │   │   ├── auth.tsx       # Login/Register
│   │   │   ├── dashboard.tsx  # Main dashboard
│   │   │   ├── resume-upload.tsx
│   │   │   ├── interview.tsx
│   │   │   └── profile.tsx
│   │   ├── routes.tsx         # Route configuration
│   │   └── App.tsx           # Root component
│   ├── styles/
│   │   ├── theme.css
│   │   └── fonts.css
│   └── index.tsx
├── package.json
└── vite.config.ts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (or compatible version)
- pnpm (recommended) or npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/dnarathnasiri-dot/ai-resume-interview-system.git
cd ai-resume-interview-system
```

2. Install dependencies
```bash
pnpm install
# or
npm install
```

3. Start the development server
```bash
pnpm dev
# or
npm run dev
```

4. Open your browser
The app will be running at the local development URL (check console output)

## 🎯 Future Enhancements

### Backend Integration (Planned)
- Connect to Spring Boot backend API
- Real user authentication with JWT
- Resume parsing and AI analysis integration
- Interview answer evaluation with NLP
- Data persistence with MySQL database
- User session management

### Additional Features (Roadmap)
- PDF export of analysis results
- Email notifications for interview reminders
- Company-specific interview preparation
- Video interview practice with recording
- Resume templates and builders
- Job matching recommendations
- Collaborative interview prep with peers

## 🔧 Configuration

The application uses mock data by default. To connect to a real backend:

1. Update API endpoints in respective page files
2. Configure authentication service
3. Set up environment variables for API URLs
4. Implement data fetching hooks

## 📝 Mock Data vs. Real Data

Currently, the application uses mock data for:
- User authentication (bypasses to dashboard)
- Resume analysis results
- Interview questions and scoring
- User profile information
- Activity history

This allows you to experience the full UI/UX without a backend.

## 🎨 Customization

### Colors
The color scheme uses Tailwind CSS utilities with gradients:
- Primary: Blue (600) to Indigo (600)
- Accent colors for different categories
- Neutral grays for text and backgrounds

### Animations
Powered by Framer Motion:
- Page transitions
- Card hover effects
- Loading states
- Micro-interactions

## 📄 License

This project is part of a personal portfolio. Feel free to use it for learning purposes.

## 👨‍💻 Author

Created by dnarathnasiri-dot

## 🙏 Acknowledgments

- shadcn/ui for the beautiful component library
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth animations
- Lucide for the icon set
- Recharts for data visualization

---

**Note**: This is a frontend-only implementation with mock data. For production use, integrate with the Spring Boot backend API mentioned in the original repository.
