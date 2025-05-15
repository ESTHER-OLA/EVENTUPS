"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Ticket, Mail, Phone } from "lucide-react"

export default function RetrieveTicketsPage() {
  const [email, setEmail] = useState("")
  const [orderId, setOrderId] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState(null)

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setMessage({
        type: "success",
        text: "If you have any tickets associated with this email, we've sent you a link to access them.",
      })
      setEmail("")
    }, 1500)
  }

  const handleOrderSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setMessage({
        type: "success",
        text: "We've found your order. Check your email for your tickets.",
      })
      setOrderId("")
    }, 1500)
  }

  const handlePhoneSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setMessage({
        type: "success",
        text: "If you have any tickets associated with this phone number, we've sent you an SMS with a link to access them.",
      })
      setPhone("")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-b from-primary/10 to-background py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Retrieve Your Tickets</h1>
            <p className="text-xl text-muted-foreground">Access your event tickets quickly and easily</p>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="max-w-md mx-auto">
          {message && (
            <div
              className={`mb-6 p-4 rounded-lg ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}
            >
              {message.text}
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Find Your Tickets</CardTitle>
              <CardDescription>Choose a method to retrieve your event tickets</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="email">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="order">Order ID</TabsTrigger>
                  <TabsTrigger value="phone">Phone</TabsTrigger>
                </TabsList>

                <TabsContent value="email">
                  <form onSubmit={handleEmailSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email address"
                          className="pl-10"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Searching..." : "Find Tickets"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="order">
                  <form onSubmit={handleOrderSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="orderId">Order ID</Label>
                      <div className="relative">
                        <Ticket className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="orderId"
                          type="text"
                          placeholder="Enter your order ID"
                          className="pl-10"
                          value={orderId}
                          onChange={(e) => setOrderId(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Searching..." : "Find Tickets"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="phone">
                  <form onSubmit={handlePhoneSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Enter your phone number"
                          className="pl-10"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Searching..." : "Find Tickets"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-6">
              <p className="text-sm text-muted-foreground text-center">
                Need help?{" "}
                <a href="/contact" className="text-primary hover:underline">
                  Contact our support team
                </a>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
