"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function EventCard({ event }) {
  return (
    <>
      <Card className="overflow-hidden h-full transition-all hover:shadow-md">
        <div className="relative h-48">
          <Image
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            fill
            className=""
          />
          {event.isFeatured && (
            <Badge className="absolute top-2 right-2 bg-amber-500">
              Featured
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="bg-primary/10">
              {event.type}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {formatDate(event.date)}
            </span>
          </div>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
            {event.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
            {event.description}
          </p>
          <div className="flex flex-row items-center justify-between">
            <div className="text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="truncate">{event.location}</span>
            </div>
            <Link href={`/events/${event.id}`}>
              <Button size="lg" className="w-full md:w-auto bg-gradient-to-r from-chart-5 to-orange-600 hover:from-amber-600 hover:to-orange-700">
                Get Ticket
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
