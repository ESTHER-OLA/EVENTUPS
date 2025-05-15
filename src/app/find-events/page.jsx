"use client";

import { useState } from "react";
import EventList from "@/components/event-list";
import EventFilters from "@/components/event-filters";
import SearchBar from "@/components/search-bar";
import Pagination from "@/components/pagination";
import { events } from "@/lib/data";

export default function FindEventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Find Events</h1>
            <p className="text-muted-foreground">
              Search and filter tech events to find the perfect match for you
            </p>
          </header>
          <section className="mb-10">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
            <aside className="lg:sticky lg:top-24 h-fit">
              <EventFilters />
            </aside>

            <section>
              <EventList
                events={events.slice(0, 6)}
                searchQuery={searchQuery}
              />
              <Pagination totalPages={3} />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
