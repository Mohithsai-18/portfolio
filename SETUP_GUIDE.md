# 🚀 Portfolio Setup Guide

Welcome! This guide will help you set up and customize your portfolio.

## 📋 Prerequisites

Before you begin, make sure you have:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- A code editor like **VS Code** (recommended)

## ⚡ Quick Start (3 Steps)

### Step 1: Install Dependencies
Open terminal in the portfolio-app folder and run:
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Open the URL shown in terminal (usually `http://localhost:5173`)

## 🎨 Customization Guide

### 1. Update Your Personal Information

#### Hero Section (Landing Page)
**File:** `src/components/Hero/Hero.jsx`

Change:
- Your name in the signature
- The subtitle tagline
- Button text

```jsx
<div className="signature">Your Name</div>
<p className="hero-subtitle">
  Your professional tagline here
</p>
```

#### About Section
**File:** `src/components/About/About.jsx`

Update the about text with your own background and interests.

#### Education
**File:** `src/components/Education/Education.jsx`

Update:
- University name
- Degree details
- Years
- Focus areas

### 2. Update Your Skills

**File:** `src/data/skillsData.js`

Add or remove skills in each category:

```javascript
export const skillsData = {
  programming: {
    title: "💻 Programming Languages",
    skills: ["Python", "JavaScript", "Your Skills Here"]
  },
  // Add more categories...
};
```

### 3. Update Your Projects

**File:** `src/data/projectsData.js`

Add your own projects:

```javascript
{
  id: 1,
  title: "Your Project Name",
  subtitle: "Technologies Used",
  description: "Project description...",
  tags: ["🔧 Tech 1", "📱 Tech 2", "☁️ Tech 3"]
}
```

### 4. Update Experience

**File:** `src/data/experienceData.js`

Add your work experience:

```javascript
{
  id: 1,
  date: "2024 - Present",
  title: "Your Job Title",
  organization: "Company Name",
  description: "What you did..."
}
```

### 5. Update Contact Information

**File:** `src/components/Footer/Footer.jsx`

Replace with your actual contact details:

```jsx
<p className="footer-contact">
  📧 your.email@example.com | 💼 LinkedIn | 🐙 GitHub
</p>
```

## 🎨 Changing Colors

**File:** `src/index.css`

Change the accent color (currently neon green):

```css
:root {
  --accent: #a8ff35;  /* Change this to your preferred color */
}
```

Popular alternatives:
- Blue: `#4da6ff`
- Purple: `#b794f6`
- Pink: `#ff6b9d`
- Orange: `#ff8c42`

## 📦 Building for Production

When you're ready to deploy:

```bash
npm run build
```

This creates a `dist` folder with optimized files ready for deployment.

## 🚀 Deployment Options

### Option 1: Netlify (Easiest)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your `dist` folder
3. Done! You get a live URL

### Option 2: Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Option 3: GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts:
   ```json
   "deploy": "npm run build && gh-pages -d dist"
   ```
3. Run: `npm run deploy`

## 🔧 Troubleshooting

### Port Already in Use
If port 5173 is busy, Vite will automatically use the next available port.

### Module Not Found Errors
Run `npm install` again to ensure all dependencies are installed.

### Styles Not Loading
Make sure all CSS files are properly imported in their respective JSX files.

## 📱 Testing Responsiveness

1. Open browser dev tools (F12)
2. Click the device toggle icon
3. Test on different screen sizes:
   - Mobile: 375px
   - Tablet: 768px
   - Desktop: 1440px

## 🎯 Next Steps

1. ✅ Update all personal information
2. ✅ Add your real projects
3. ✅ Customize colors to match your brand
4. ✅ Test on mobile devices
5. ✅ Deploy to the web
6. ✅ Share with recruiters!

## 💡 Tips

- **Keep it updated**: Add new projects as you complete them
- **Use real data**: Replace placeholder text with your actual achievements
- **Optimize images**: If you add images, compress them first
- **Test thoroughly**: Check on different browsers and devices
- **Get feedback**: Share with friends before sending to recruiters

## 📚 Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)

## 🆘 Need Help?

Common issues and solutions:

**Q: The site won't start**
A: Make sure Node.js is installed and run `npm install`

**Q: Changes aren't showing**
A: The dev server auto-reloads, but try refreshing the browser

**Q: Build fails**
A: Check for syntax errors in your code

---

Good luck with your portfolio! 🚀
