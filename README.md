# 👨‍💻 Mohammad Saad - Full Stack Developer Portfolio

A modern, responsive portfolio website built with **React**, **TypeScript**, **TanStack Router**, **Tailwind CSS**, and **shadcn/ui components**. Features a dark/light theme toggle, smooth animations, and project showcases with links to deployed applications.

## 🚀 Live Demo

Visit the portfolio: [Your Portfolio URL] (Deploy to Vercel/Netlify and add the link here)

## ✨ Features

- ✅ **Responsive Design** - Mobile-first approach with Tailwind CSS
- ✅ **Dark/Light Theme** - Toggle between dark and light modes with localStorage persistence
- ✅ **Smooth Animations** - Reveal animations on scroll using Intersection Observer
- ✅ **Project Showcase** - Cards with links to deployed applications
- ✅ **Skills Display** - Organized skills with animated progress bars
- ✅ **Contact Form** - Email validation and mailto integration with Sonner notifications
- ✅ **Resume Download** - Direct download link to your resume PDF
- ✅ **Social Links** - Quick links to GitHub, LinkedIn, and email
- ✅ **Performance Optimized** - Built with Vite for fast development and production builds

## 🛠️ Tech Stack

- **Framework:** React 19
- **Routing:** TanStack React Router
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn/ui
- **Language:** TypeScript
- **Build Tool:** Vite
- **Notifications:** Sonner
- **Icons:** Lucide React
- **Forms:** React Hook Form
- **Validation:** Zod

## 📦 Project Structure

```
src/
├── routes/
│   ├── index.tsx          # Main portfolio page
│   └── __root.tsx         # Root layout
├── lib/
│   ├── utils.ts           # Utility functions
│   ├── error-capture.ts   # Error handling
│   ├── error-page.ts      # Error page
│   └── lovable-error-reporting.ts
├── hooks/
│   └── use-mobile.tsx     # Mobile detection hook
├── components/
│   └── ui/                # shadcn/ui components
├── assets/
│   └── resume.pdf         # Resume file
├── router.tsx             # Route configuration
├── server.ts              # Server entry
├── start.ts               # Client entry
├── styles.css             # Global styles
└── vite.config.ts         # Vite configuration
```

## 🎯 Projects Featured

1. **B2B Trading Platform** - Full-stack B2B marketplace with product discovery, order management, and Razorpay payments
2. **Quick Note** - MERN note management app with JWT authentication
3. **DIET Forbesganj Portal** - 10+ production-ready pages for institutional website

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
Visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run build:dev    # Build in development mode
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

## 🎨 Customization

### Update Personal Information
Edit `src/routes/index.tsx` to update:
- Your name and title
- About section
- Contact email and phone
- Social media links

### Add/Edit Projects
In `src/routes/index.tsx`, modify the `PROJECTS` array:
```typescript
const PROJECTS = [
  {
    title: "Your Project",
    status: "Live", // or "Ongoing", "Internship"
    summary: "Project description...",
    stack: ["React", "Node", ...],
    href: "https://deployed-url.com",
    accent: "primary",
  },
  // ... more projects
];
```

### Update Skills
Modify the `SKILL_GROUPS` array in `src/routes/index.tsx`:
```typescript
const SKILL_GROUPS = [
  {
    title: "Frontend",
    items: [
      { name: "React.js", level: 92 },
      { name: "Your Skill", level: 85 },
      // ... more skills
    ],
  },
  // ... more groups
];
```

### Customize Theme
Edit Tailwind CSS classes in components or modify `tailwindcss.config.ts` for global theme changes.

## 📱 Responsive Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

## 🔗 Connect With Me

- **GitHub:** [github.com/mohammadsaad79](https://github.com/mohammadsaad79)
- **LinkedIn:** [linkedin.com/in/mohammadsaad79](https://www.linkedin.com/in/mohammadsaad79)
- **Email:** mohammadsaad79.ms@gmail.com
- **Phone:** +91 85429 29798

## 📊 Performance

- ⚡ Built with Vite for instant page loads
- 🎯 Optimized images and assets
- 📦 Code splitting for better performance
- 🔍 SEO optimized with meta tags

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **shadcn/ui** - Beautiful UI components
- **TanStack** - Powerful routing and utilities
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Next generation build tool

## 📞 Support

If you have any questions or suggestions, feel free to reach out via email or open an issue on GitHub.

---

**Made with ❤️ by Mohammad Saad**
