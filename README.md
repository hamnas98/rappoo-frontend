Rappoo Frontend - Next.js 16 frontend for the Rappoo AI Health Coach application.

Features
````````````
Next.js 16 with App Router
Tailwind CSS v4
Responsive design
Admin panel with authentication
Landing page components
Image optimization with Next/Image

reqiuirment
````````````
Node.js (v18 or higher)
npm 

Installation
```````````````
Clone the repository

git clone <your-repo-url>
cd rappoo-frontend

Install dependencies

npm install

Create .env file


Update .env.local with your values

NEXT_PUBLIC_API_URL=http://localhost:5000/api

Start development server
````````````````````````
npm run dev
will run on http://localhost:3000



📁 Add Required Images
```````````````````````````
Place these images in public/images/:

logo-64.svg - Main logo
Group_171275468.png - Hero mockup
Group_1171275470.png - Background shape
avatar1.png, avatar2.png, avatar3.png - User avatars
appleLogo.png, playlogo.png - Download buttons
brand_logo1.png to brand_logo5.png - Brand logos
timer_tracker.png - About section image
icon_one.png to icon_four.png - CTA floating icons
fb_icon.png, x_icon.png, insta_icon.png, linkdn_icon.png - Social icons
user.png - Admin avatar

Pages
``````````````
/ - Landing page
/admin/login - Admin login
/admin - Admin dashboard
/admin/hero - Hero management
/admin/about - About management
/admin/testimonials - Testimonials management
/admin/faq - FAQ management

Scripts
`````````````````
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server

```

 Project Structure
`````````````````````````
rappoo-frontend/
├── src/
│   ├── app/
│   │   ├── admin/          # Admin panel pages
│   │   ├── layout.js       # Root layout
│   │   └── page.js         # Home page
│   ├── components/
│   │   └── landing/        # Landing page components
│   ├── lib/
│   │   ├── api.js          # API functions
│   │   └── auth.js         # Auth utilities
│   └── styles/
├── public/
│   └── images/             # Static images
├── .env
├── next.config.js
├── tailwind.config.js
├── package.json
└── README.md


Components
`````````````````````

Landing Page Components :-
```````````````````````````
Header - Navigation with auth
Hero - Main hero section
BrandSection - Brand logos
About - About section
Testimonials - Testimonial carousel
FAQ - FAQ accordion
CTA - Call to action
Footer - Footer with links

.env examples
````````````````````
# backend api

NEXT_PUBLIC_API_URL=http://localhost:5000/api





`````````````````````````````````````````````````````````````````````````
``````````````````````````````````````````````````````````````````````````````````````````````