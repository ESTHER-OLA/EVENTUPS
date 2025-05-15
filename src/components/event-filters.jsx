"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { events } from "@/lib/data"

export default function EventFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [type, setType] = useState(searchParams.get("type") || "all")
  const [location, setLocation] = useState(searchParams.get("location") || "all")
  const [date, setDate] = useState(searchParams.get("date") || "all")

  // Get unique locations from events
  const locations = ["all", ...new Set(events.map((event) => event.location))]

  // Apply filters
  const applyFilters = () => {
    const params = new URLSearchParams(searchParams)

    if (type === "all") {
      params.delete("type")
    } else {
      params.set("type", type)
    }

    if (location === "all") {
      params.delete("location")
    } else {
      params.set("location", location)
    }

    if (date === "all") {
      params.delete("date")
    } else {
      params.set("date", date)
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  // Reset filters
  const resetFilters = () => {
    setType("all")
    setLocation("all")
    setDate("all")
    router.push(pathname)
  }

  // Apply filters when they change
  useEffect(() => {
    applyFilters()
  }, [type, location, date])

  return (
    <div className="bg-card rounded-lg border p-4 space-y-6">
      <h2 className="font-semibold text-lg">Filters</h2>

      <div className="space-y-4">
        <div>
          <Label className="mb-2 block">Event Type</Label>
          <RadioGroup value={type} onValueChange={setType}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all-types" />
              <Label htmlFor="all-types">All Types</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="webinar" id="webinar" />
              <Label htmlFor="webinar">Webinar</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="hackathon" id="hackathon" />
              <Label htmlFor="hackathon">Hackathon</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="workshop" id="workshop" />
              <Label htmlFor="workshop">Workshop</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="conference" id="conference" />
              <Label htmlFor="conference">Conference</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="location" className="mb-2 block">
            Location
          </Label>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger id="location">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc === "all" ? "All Locations" : loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="mb-2 block">Date</Label>
          <RadioGroup value={date} onValueChange={setDate}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all-dates" />
              <Label htmlFor="all-dates">All Dates</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="today" id="today" />
              <Label htmlFor="today">Today</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="week" id="week" />
              <Label htmlFor="week">This Week</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="month" id="month" />
              <Label htmlFor="month">This Month</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={resetFilters}>
        Reset Filters
      </Button>
    </div>
  )
}
