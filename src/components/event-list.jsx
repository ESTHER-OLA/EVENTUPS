"use client"

import EventCard from "./event-card"
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

export default function EventList({ events, searchQuery }) {
  const searchParams = useSearchParams()
  const [filteredEvents, setFilteredEvents] = useState(events)

  useEffect(() => {
    let filtered = [...events]

    const type = searchParams.get("type")
    const location = searchParams.get("location")
    const date = searchParams.get("date")

    if (type && type !== "all") {
      filtered = filtered.filter((event) => event.type === type)
    }

    if (location && location !== "all") {
      filtered = filtered.filter((event) => event.location === location)
    }

    if (date) {
      const today = new Date()
      const nextWeek = new Date(today)
      nextWeek.setDate(today.getDate() + 7)
      const nextMonth = new Date(today)
      nextMonth.setMonth(today.getMonth() + 1)

      if (date === "today") {
        filtered = filtered.filter((event) => {
          const eventDate = new Date(event.date)
          return eventDate.toDateString() === today.toDateString()
        })
      } else if (date === "week") {
        filtered = filtered.filter((event) => {
          const eventDate = new Date(event.date)
          return eventDate >= today && eventDate <= nextWeek
        })
      } else if (date === "month") {
        filtered = filtered.filter((event) => {
          const eventDate = new Date(event.date)
          return eventDate >= today && eventDate <= nextMonth
        })
      }
    }

        // Apply search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.location.toLowerCase().includes(query)
      );
    }

    setFilteredEvents(filtered)
  }, [searchParams, events])

  if (filteredEvents.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">No events found</h3>
        <p className="text-muted-foreground">Try adjusting your filters to find events</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Upcoming Events</h2>
        <p className="text-sm text-muted-foreground">{filteredEvents.length} events found</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  )
}
