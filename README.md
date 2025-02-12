# 💸 ACH to ARS Calculator

## Overview
ACH to ARS Calculator is a web application that helps users calculate and compare the best ways to transfer USD to ARS (Argentine Pesos) through different fintech platforms. It provides real-time rates and commission calculations to help users make informed decisions about their money transfers.

![ACH to ARS Calculator](public/background.png)

## 🚀 Features
- **Real-time Calculations**: Instantly calculate how much ARS you'll receive for your USD transfers
- **Multiple Platform Comparison**: Compare different US and Argentine fintech platforms
- **Commission Transparency**: Clear breakdown of fees and commissions
- **Live Exchange Rates**: Integration with Criptoya API for real-time USDC/ARS rates
- **Responsive Design**: Works seamlessly on both desktop and mobile devices

## 🛠️ Tech Stack
- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Typography**: Sora font from Google Fonts
- **Analytics**: Vercel Analytics
- **Database**: Supabase (PostgreSQL)
- **APIs**: 
  - Criptoya API for real-time USDC/ARS rates
  - Internal Supabase API for platform data

## 🏗️ Project Structure
```
├── app/
│   ├── hooks/
│   │   ├── use-fintechs-arg.ts
│   │   ├── use-fintechs-usa.ts
│   │   └── use-last-update.ts
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── features/
│   │   ├── calculator/
│   │   └── fintechs.tsx
│   ├── layouts/
│   └── ui/
└── utils/
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository
```bash
git clone https://github.com/yourusername/achtoars.git
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
Create a `.env.local` file in the root directory:
```bash

NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

Note: Supabase credentials are private and not shared. Contributors will need to set up their own Supabase instance or request access from the project maintainer.

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📦 Database Structure
The project uses Supabase (PostgreSQL) to store:
- Fintech platform information
- Commission rates
- Platform metadata

For security reasons, the detailed database structure and credentials are private. Contributors who need database access should contact the project maintainer.

## 🤝 Contributing
Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Areas for Contribution
- Improving calculation accuracy
- Enhancing UI/UX
- Implementing testing
- Documentation improvements

## 📈 Analytics
This project uses Vercel Analytics to track usage patterns and improve user experience.

## 🌐 Live Demo
Visit [ACH to ARS Calculator](https://achtoars.com) to see the project in action.

## 📄 License
This project is open source and available under the MIT License.

## 👩‍💻 Author
Made with 🧡 by [Sofía Rocher](https://www.x.com/srocher_dev)

## 🙏 Acknowledgments
- [Criptoya](https://criptoya.com/) for providing real-time exchange rate data
- [Supabase](https://supabase.com/) for database infrastructure
- All contributors and users of the platform

## 📞 Contact
For questions, suggestions, or database access requests, reach out on [Twitter/X](https://www.x.com/srocher_dev)
