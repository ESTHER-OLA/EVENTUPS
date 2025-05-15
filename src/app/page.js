"use client";

import { useState } from "react";
import EventList from "@/components/event-list";
import EventFilters from "@/components/event-filters";
import { events } from "@/lib/data";
import HeroSection from "@/components/hero-section";
import SearchBar from "@/components/search-bar";
import Pagination from "@/components/pagination";
import QuoteSection from "@/components/quote-section";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <main className="">
      <section>
        <HeroSection />
      </section>

      <section className="px-10 py-16 md:py-24 w-full shadow-lg" id="events">
        <div className="flex flex-row justify-between items-center mb-5">
          <h2 className="text-3xl font-bold text-center">Discover Events</h2>
          <div>
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          <aside className="lg:sticky lg:top-4 h-fit">
            <EventFilters />
          </aside>

          <section>
            <EventList events={events.slice(0, 6)} searchQuery={searchQuery} />
          </section>
        </div>
        <Pagination totalPages={3} />
      </section>
      <section>
        {" "}
        <QuoteSection />
      </section>
    </main>
  );
}
