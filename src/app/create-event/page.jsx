"use client"

import { useState, useEffect } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Clock, Info, CheckCircle2 } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { v4 as uuidv4 } from "uuid"

export default function CreateEventPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [date, setDate] = useState(null)

  // Redirect if not logged in or not an organizer
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    } else if (user && user.role !== "organizer") {
      router.push("/profile")
    }
  }, [isAuthenticated, user, router])

  const eventSchema = Yup.object().shape({
    title: Yup.string().required("Event title is required").min(5, "Title must be at least 5 characters"),
    description: Yup.string().required("Description is required").min(20, "Description must be at least 20 characters"),
    type: Yup.string().required("Event type is required"),
    location: Yup.string().required("Location is required"),
    date: Yup.date().required("Date is required"),
    time: Yup.string().required("Time is required"),
    price: Yup.number().min(0, "Price cannot be negative"),
    capacity: Yup.number().min(1, "Capacity must be at least 1").required("Capacity is required"),
    tags: Yup.string(),
  })

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      type: "",
      location: "",
      date: "",
      time: "",
      price: 0,
      capacity: 50,
      tags: "",
      isFeatured: false,
    },
    validationSchema: eventSchema,
    onSubmit: (values) => {
      setIsSubmitting(true)
      setFormError(null)

      // Simulate API call
      setTimeout(() => {
        try {
          // Create event object
          const newEvent = {
            id: uuidv4(),
            ...values,
            tags: values.tags.split(",").map((tag) => tag.trim()),
            image: "/placeholder.svg?height=400&width=600",
            organizer: user.name,
            organizerId: user.email,
            createdAt: new Date().toISOString(),
          }

          // In a real app, this would be an API call to save the event
          // For now, we'll simulate success
          console.log("Created event:", newEvent)

          setIsSubmitting(false)
          setFormSuccess(true)

          // Reset form after 3 seconds and redirect
          setTimeout(() => {
            formik.resetForm()
            router.push("/profile")
          }, 3000)
        } catch (error) {
          setIsSubmitting(false)
          setFormError("An error occurred while creating the event. Please try again.")
        }
      }, 1500)
    },
  })

  // Update formik values when date changes
  useEffect(() => {
    if (date) {
      formik.setFieldValue("date", date)
    }
  }, [date])

  if (!isAuthenticated || (user && user.role !== "organizer")) {
    return null // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-b from-primary/10 to-background py-8">
        <div className="container px-10">
          <h1 className="text-3xl font-bold">Create Event</h1>
          <p className="text-muted-foreground">Share your knowledge and connect with the community</p>
        </div>
      </div>

      <div className="container py-8">
        <div className="max-w-3xl mx-auto">
          {formSuccess ? (
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-green-100 p-3 mb-4">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Event Created Successfully!</h2>
                  <p className="text-muted-foreground mb-6">
                    Your event has been created and is now available for attendees to register.
                  </p>
                  <div className="flex gap-4">
                    <Button onClick={() => router.push("/profile")}>Go to Profile</Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setFormSuccess(false)
                        formik.resetForm()
                      }}
                    >
                      Create Another Event
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
                <CardDescription>
                  Fill out the form below to create your event. All fields marked with * are required.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {formError && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertDescription>{formError}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">
                        Event Title <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="Enter a descriptive title for your event"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={formik.touched.title && formik.errors.title ? "border-red-500" : ""}
                      />
                      {formik.touched.title && formik.errors.title && (
                        <p className="text-sm text-red-500 mt-1">{formik.errors.title}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="description">
                        Description <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Provide a detailed description of your event"
                        rows={5}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={formik.touched.description && formik.errors.description ? "border-red-500" : ""}
                      />
                      {formik.touched.description && formik.errors.description && (
                        <p className="text-sm text-red-500 mt-1">{formik.errors.description}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="type">
                          Event Type <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          name="type"
                          value={formik.values.type}
                          onValueChange={(value) => formik.setFieldValue("type", value)}
                        >
                          <SelectTrigger
                            id="type"
                            className={formik.touched.type && formik.errors.type ? "border-red-500" : ""}
                          >
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="conference">Conference</SelectItem>
                            <SelectItem value="webinar">Webinar</SelectItem>
                            <SelectItem value="workshop">Workshop</SelectItem>
                            <SelectItem value="hackathon">Hackathon</SelectItem>
                            <SelectItem value="meetup">Meetup</SelectItem>
                          </SelectContent>
                        </Select>
                        {formik.touched.type && formik.errors.type && (
                          <p className="text-sm text-red-500 mt-1">{formik.errors.type}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="location">
                          Location <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="location"
                          name="location"
                          placeholder="Enter location (city or 'Online')"
                          value={formik.values.location}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={formik.touched.location && formik.errors.location ? "border-red-500" : ""}
                        />
                        {formik.touched.location && formik.errors.location && (
                          <p className="text-sm text-red-500 mt-1">{formik.errors.location}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date">
                          Date <span className="text-red-500">*</span>
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground",
                                formik.touched.date && formik.errors.date ? "border-red-500" : "",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : <span>Select date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
                              disabled={(date) => date < new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                        {formik.touched.date && formik.errors.date && (
                          <p className="text-sm text-red-500 mt-1">{formik.errors.date}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="time">
                          Time <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="time"
                            name="time"
                            placeholder="e.g., 2:00 PM - 4:00 PM"
                            value={formik.values.time}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={cn("pl-10", formik.touched.time && formik.errors.time ? "border-red-500" : "")}
                          />
                        </div>
                        {formik.touched.time && formik.errors.time && (
                          <p className="text-sm text-red-500 mt-1">{formik.errors.time}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price">Price ($)</Label>
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          min="0"
                          placeholder="0 for free events"
                          value={formik.values.price}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={formik.touched.price && formik.errors.price ? "border-red-500" : ""}
                        />
                        {formik.touched.price && formik.errors.price && (
                          <p className="text-sm text-red-500 mt-1">{formik.errors.price}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="capacity">
                          Capacity <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="capacity"
                          name="capacity"
                          type="number"
                          min="1"
                          placeholder="Maximum number of attendees"
                          value={formik.values.capacity}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={formik.touched.capacity && formik.errors.capacity ? "border-red-500" : ""}
                        />
                        {formik.touched.capacity && formik.errors.capacity && (
                          <p className="text-sm text-red-500 mt-1">{formik.errors.capacity}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="tags">Tags (comma separated)</Label>
                      <Input
                        id="tags"
                        name="tags"
                        placeholder="e.g., JavaScript, Web Development, AI"
                        value={formik.values.tags}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Add relevant tags to help attendees find your event
                      </p>
                    </div>

                    <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
                      <div className="flex items-start">
                        <Info className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-amber-800">Important Note</h3>
                          <p className="text-sm text-amber-700">
                            By creating this event, you agree to our{" "}
                            <a href="/terms" className="underline font-medium">
                              Terms of Service
                            </a>{" "}
                            and{" "}
                            <a href="/privacy" className="underline font-medium">
                              Privacy Policy
                            </a>
                            . You are responsible for ensuring your event complies with all applicable laws and
                            regulations.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push("/profile")}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Creating Event..." : "Create Event"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
