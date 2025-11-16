export const metadata = {
  title: "The Girl Who Held the Sunlight",
  description: "An inspirational story of resilience and hope.",
  metadataBase: new URL("https://agentic-f680eb4f.vercel.app"),
  openGraph: {
    title: "The Girl Who Held the Sunlight",
    description: "An inspirational story of resilience and hope.",
    type: "website",
  },
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
