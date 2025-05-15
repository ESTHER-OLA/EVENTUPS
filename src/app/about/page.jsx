import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-primary/10 to-background py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About TechEvents</h1>
            <p className="text-xl text-muted-foreground">Connecting the tech community through exceptional events</p>
          </div>
        </div>
      </div>

      <div className="container py-12 md:py-16 px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-6">
              At TechEvents, we believe in the power of community and knowledge sharing. Our mission is to connect tech
              professionals, enthusiasts, and learners through high-quality events that inspire innovation and foster
              collaboration.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              Whether you're looking to expand your skills, network with industry leaders, or showcase your expertise,
              TechEvents provides the platform you need to succeed in the ever-evolving tech landscape.
            </p>
            <Link href="/find-events">
              <Button size="lg" className="mt-4">
                Explore Events
              </Button>
            </Link>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/images/tech-events.jpg"
              alt="Tech conference audience"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-12 md:py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10">
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Conferences</h3>
              <p className="text-muted-foreground">
                Large-scale events featuring keynote speakers, panel discussions, and networking opportunities with
                industry leaders.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Workshops</h3>
              <p className="text-muted-foreground">
                Hands-on learning experiences led by experts, designed to help you master new skills and technologies.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Hackathons</h3>
              <p className="text-muted-foreground">
                Competitive events where teams collaborate to build innovative solutions to real-world problems in a
                limited timeframe.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Whether you're an attendee, speaker, or organizer, there's a place for you in the TechEvents community. Sign
            up today to stay updated on upcoming events and connect with like-minded professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg">Create Account</Button>
            </Link>
            <Link href="/find-events">
              <Button variant="outline" size="lg">
                Browse Events
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
