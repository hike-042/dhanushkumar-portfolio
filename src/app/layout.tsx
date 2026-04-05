import "./globals.css";
import "./device-optimization.css";
import Script from "next/script";
import CursorGlow from "@/components/ui/cursor-glow";
import SmoothScroll from "@/components/ui/smooth-scroll";
import ScrollProgress from "@/components/ui/scroll-progress";
import SideNav from "@/components/ui/side-nav";
import PageIntro from "@/components/PageIntro";
import SiteBackground from "@/components/ui/site-background";
import MotionProvider from "@/components/ui/motion-provider";
import CommandPalette from "@/components/ui/command-palette";
import BackToTop from "@/components/ui/back-to-top";
import CursorTrail from "@/components/ui/cursor-trail";
import EasterEgg from "@/components/ui/easter-egg";
import type { Metadata, Viewport } from "next";

const GA_ID = "G-61E6D87NT5";

export const metadata: Metadata = {
  title: "Dhanush Kumar R - Talent Acquisition & HR Portfolio",
  description:
    "Portfolio of Dhanush Kumar R (Arco) - MBA HR + BE CSE. Talent Acquisition Specialist bridging tech and people.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="dark"
      suppressHydrationWarning
      style={{ backgroundColor: "#0a0a0a", colorScheme: "dark" }}
    >
      <head>
        {/* Theme init must be in head to run before body renders. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
  var t=localStorage.getItem('arco-theme');
  var dark=t!=='light';
  var bg=dark?'#0a0a0a':'#f8f7f4';
  document.documentElement.classList.toggle('dark',dark);
  document.documentElement.style.backgroundColor=bg;
  document.documentElement.style.colorScheme=dark?'dark':'light';
  var s=document.createElement('style');
  s.textContent='body{background-color:'+bg+'}';
  document.head.appendChild(s);
})();`,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { page_path: window.location.pathname });
          `}
        </Script>

        <SiteBackground />
        <CommandPalette />
        <BackToTop />
        <CursorTrail />
        <EasterEgg />
        <MotionProvider>
          <PageIntro />
          <ScrollProgress />
          <SmoothScroll />
          <CursorGlow />
          <SideNav />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
