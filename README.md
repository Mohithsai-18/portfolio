# Portfolio - Mohith Sai 

**🔗 Live Website:** [https://Mohithsai-18.github.io/portfolio/](https://Mohithsai-18.github.io/portfolio/)

A modern, professional portfolio website built with React and Vite, featuring a sleek graphic design theme with neon green accents.

## 🚀 Features

- ✨ Modern graphic design theme
- 🎨 Neon green (#a8ff35) accent color
- 🌙 Dark, premium aesthetic
- 📱 Fully responsive design
- ⚡ Smooth animations and transitions
- 🎯 Clean, modular component structure
- 📊 Easy to customize with data files

## 🛠️ Tech Stack

- **React 18** - UI Framework
- **Vite** - Build tool and dev server
- **CSS3** - Styling with custom properties
- **JavaScript (ES6+)** - Programming language

## 📦 Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
portfolio-app/
├── src/
│   ├── components/
│   │   ├── Hero/
│   │   ├── About/
│   │   ├── Education/
│   │   ├── Skills/
│   │   ├── Experience/
│   │   ├── Projects/
│   │   ├── Certifications/
│   │   ├── Achievements/
│   │   ├── Languages/
│   │   └── Footer/
│   ├── data/
│   │   ├── skillsData.js
│   │   ├── projectsData.js
│   │   └── experienceData.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## 🎨 Customization

### Update Personal Information

1. **Hero Section**: Edit `src/components/Hero/Hero.jsx`
2. **About Me**: Edit `src/components/About/About.jsx`
3. **Education**: Edit `src/components/Education/Education.jsx`

### Update Data

All portfolio data can be easily updated in the data files:

- **Skills**: `src/data/skillsData.js`
- **Projects**: `src/data/projectsData.js`
- **Experience**: `src/data/experienceData.js`

### Change Colors

Edit CSS custom properties in `src/index.css`:

```css
:root {
  --bg-primary: #0a0a0a;
  --bg-secondary: #141414;
  --bg-card: #1a1a1a;
  --text-primary: #ffffff;
  --text-secondary: #a0a0a0;
  --accent: #a8ff35;        /* Main accent color */
  --accent-dim: rgba(168, 255, 53, 0.1);
  --border: #2a2a2a;
}
```

## 📱 Sections

1. **Hero** - Eye-catching landing section with glowing signature
2. **About** - Personal introduction and background
3. **Education** - Academic qualifications
4. **Skills** - Technical expertise organized by category
5. **Experience** - Professional work history
6. **Projects** - Featured portfolio projects
7. **Certifications** - Professional certifications
8. **Achievements** - Awards and recognition
9. **Languages** - Language proficiency
10. **Footer** - Contact information and social links

## 🌟 Key Features

### Scroll Progress Indicator
A neon green progress bar at the top shows scroll progress.

### Hover Effects
- Cards lift on hover
- Skill tags highlight
- Buttons have dynamic shadows

### Responsive Design
Fully optimized for:
- Desktop (1400px+)
- Tablet (768px - 1400px)
- Mobile (< 768px)

### Smooth Animations
- Glow effect on signature
- Pulse effect on hero background
- Smooth page transitions

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

## 📧 Contact

- Email:mohithsainadipi@gmail.com
- Update contact links in `src/components/Footer/Footer.jsx`

---

Built with ❤️ using React + Vite
