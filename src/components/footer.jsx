"use client";

import Link from "next/link";
import AppLogo from "../components/app-logo";
import { usePathname } from "next/navigation";
import { disableNavWithFooter } from "../lib/utils/disableComponents";

export default function Footer() {
  const path = usePathname();
  return (
    <>
      {!disableNavWithFooter.includes(path) && (
        <footer className="border-t bg-gradient-to-b from-primary/10 to-background py-16 px-10">
          <div className="py-8 md:py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <AppLogo />
                  <span className="font-bold text-xl">TechConnect</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Discover and attend the best tech events around the world.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-sm mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/find-events"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Find Events
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      About
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-sm mb-4">Support</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/faqs"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/retrieve-tickets"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Retrieve Tickets
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-sm mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/terms"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cookies"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Cookie Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
              <p>
                © {new Date().getFullYear()} TechConnect. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
