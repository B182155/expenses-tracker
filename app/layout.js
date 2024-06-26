import "@radix-ui/themes/styles.css";

import TanStackProvider from "./components/TanStackProvider";

import { Card, Container, Theme } from "@radix-ui/themes";
import { Inter as FontSans } from "next/font/google";
import { cn } from "../lib/utils";
import AsideBar from "./AsideBar";
import Navbar from "./Navbar";
import AuthProvider from "./auth/Provider";
import { ThemeProvider } from "./components/ThemeProvider";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });
export const fontSans = FontSans({
  subsets: ["latin"],
  // variable: "--font-sans",
  variable: "--font-inter",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        // className={inter.className}
        className={cn(
          "min-h-screen bg-background font-sans antialiased bg-gradient-to-r from-purple-50 via-purple-100 to-purple-50",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TanStackProvider>
          <AuthProvider>
            <Theme
              appearance="light"
              panelBackground="translucent"
              accentColor="purple"
            >
              <Container className="mx-auto w-9/12">
                <Card
                  mb="3"
                  mt="3"
                  className="p-2"
                  variant="classic"
                  style={{ backgroundColor: "var(--background-color)" }}
                >
                  {/* <nav className=""> */}
                  <Navbar />
                  {/* </nav> */}
                </Card>
                <div className="grid grid-flow-row grid-cols-12 gap-2 ">
                  <aside className="hidden lg:block text-sm lg:col-span-3  ">
                    <AsideBar />
                  </aside>
                  <main className="col-span-12 text-sm lg:col-span-9 min-h-screen ">
                    <Card
                      className="min-h-full"
                      style={{ backgroundColor: "var(--background-color)" }}
                    >
                      {children}
                    </Card>
                  </main>
                </div>
              </Container>

              {/* <ThemePanel /> */}
            </Theme>
          </AuthProvider>
          </TanStackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
