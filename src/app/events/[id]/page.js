"use client";

import { events } from "@/lib/data";
import { Calendar, Clock, MapPin, Users, Share2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import ArrowBack from "@/lib/utils/arrow";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import {
  BsFacebook,
  BsMailbox,
  BsLinkedin,
  BsTwitterX,
  BsClipboard,
} from "react-icons/bs";

export default function EventPage() {
  const params = useParams(); // returns an object like { id: "event-123" }
  const event = events.find((event) => event.id === params.id);

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Event not found</h1>
        <Link href="/">
          <Button>Back to events</Button>
        </Link>
      </div>
    );
  }

  // Additional event details for enhanced UI
  const eventDetails = {
    organizer: "TechEvents Community",
    attendees: 120,
    maxAttendees: 200,
    price:
      event.type === "conference"
        ? "$299"
        : event.type === "workshop"
        ? "$99"
        : "Free",
    website: "https://example.com/events",
    socialShare: ["Twitter", "Facebook", "LinkedIn"],
  };

  return (
    <div className="bg-gray-50">
      <div className="bg-gradient-to-b from-primary/10 to-background pt-8 pb-12">
        <div className="container">
          <div className="p-5">
            <ArrowBack />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-10">
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg overflow-hidden border shadow-sm">
                <div className="relative h-64 md:h-96">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge
                        variant="outline"
                        className="bg-primary/10 text-white border-white/20"
                      >
                        {event.type}
                      </Badge>
                      {event.isFeatured && (
                        <Badge className="bg-amber-500">Featured</Badge>
                      )}
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white">
                      {event.title}
                    </h1>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap gap-6 mb-6 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-primary" />
                      <span>{formatDate(event.date)}</span>
                    </div>

                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-primary" />
                      <span>{event.time}</span>
                    </div>

                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-primary" />
                      <span>{event.location}</span>
                    </div>

                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-primary" />
                      <span>
                        {eventDetails.attendees}/{eventDetails.maxAttendees}{" "}
                        attendees
                      </span>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">
                      About this event
                    </h2>
                    <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">
                      {"What you'll learn"}
                    </h2>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="bg-primary/10 text-primary rounded-full p-1 mr-3 mt-0.5">
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </span>
                        <span>Latest industry trends and best practices</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-primary/10 text-primary rounded-full p-1 mr-3 mt-0.5">
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </span>
                        <span>
                          Hands-on experience with cutting-edge technologies
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-primary/10 text-primary rounded-full p-1 mr-3 mt-0.5">
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </span>
                        <span>
                          Networking opportunities with industry professionals
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-4">Tags</h2>
                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-sm"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <h3 className="font-semibold mb-1">Price</h3>
                    <p className="text-2xl font-bold">{eventDetails.price}</p>
                  </div>

                  <Button size="lg" className="w-full mb-4">
                    Register Now
                  </Button>

                  <DropdownMenu className="relative">
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full mb-6"
                      >
                        <Share2 className="mr-2 h-4 w-4" />
                        Share Event
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 absolute left-0">
                      <DropdownMenuItem
                        onClick={() => {
                          const url =
                            typeof window !== "undefined"
                              ? window.location.href
                              : "";
                          navigator.clipboard.writeText(url);
                          toast.success("Link copied to clipboard!");
                        }}
                      >
                        <BsClipboard /> Copy Link
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          const url = encodeURIComponent(window.location.href);
                          window.open(
                            `https://twitter.com/intent/tweet?url=${url}`,
                            "_blank"
                          );
                        }}
                      >
                        <BsTwitterX className="text-blue-500" /> Share on
                        Twitter
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          const url = encodeURIComponent(window.location.href);
                          window.open(
                            `https://www.facebook.com/sharer/sharer.php?u=${url}`,
                            "_blank"
                          );
                        }}
                      >
                        <BsFacebook className="text-blue-500" /> Share on
                        Facebook
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          const url = encodeURIComponent(window.location.href);
                          window.open(
                            `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
                            "_blank"
                          );
                        }}
                      >
                        <BsLinkedin className="text-blue-500" /> Share on
                        LinkedIn
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => {
                          const subject = encodeURIComponent(
                            "Check out this event"
                          );
                          const body = encodeURIComponent(
                            `Hi,\n\nTake a look at this event: ${window.location.href}`
                          );
                          window.location.href = `mailto:?subject=${subject}&body=${body}`;
                        }}
                      >
                        <BsMailbox className="mr-2 w-4 h-4 text-gray-600" />
                        Share via Mail
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  {/* <Button variant="outline" size="lg" className="w-full mb-6">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Event
                  </Button> */}

                  <Separator className="my-6" />

                  <div className="mb-6">
                    <h3 className="font-semibold mb-3">Organizer</h3>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                        <span className="font-semibold text-primary">TC</span>
                      </div>
                      <div>
                        <p className="font-medium">{eventDetails.organizer}</p>
                        <p className="text-sm text-muted-foreground">
                          Event Organizer
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <h3 className="font-semibold mb-3">Event Website</h3>
                    <a
                      href={eventDetails.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Visit website
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
