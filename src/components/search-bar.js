"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
// import { useRouter } from "next/navigation"

export default function SearchBar({ searchQuery, setSearchQuery }) {
  // const [searchQuery, setSearchQuery] = useState("")
  // const router = useRouter()

  // const handleSearch = (e) => {
  //   e.preventDefault()
  //   if (searchQuery.trim()) {
  //     router.push(`/find-events?q=${encodeURIComponent(searchQuery)}`)
  //   }
  // }
    const handleSearch = (e) => {
    e.preventDefault();
    // Optionally: trigger logic here, but filtering is now reactive
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-xl mx-auto">
      <div className="flex w-full items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
        <Button type="submit" className="h-12 px-6 bg-gradient-to-r from-chart-5 to-orange-600 hover:from-amber-600 hover:to-orange-700">
          Search
        </Button>
      </div>
    </form>
  )
}
