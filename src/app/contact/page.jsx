"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Mail, Phone, MapPin, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(null);

  const contactSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    topic: Yup.string().required("Please select a topic"),
    message: Yup.string()
      .min(10, "Message must be at least 10 characters")
      .required("Message is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      topic: "",
      message: "",
    },
    validationSchema: contactSchema,
    onSubmit: (values) => {
      setIsSubmitting(true);
      setFormError(null);

      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setFormSubmitted(true);
        // Reset form
        formik.resetForm();
      }, 1500);
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-b from-primary/10 to-background py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Contact Support</h1>
            <p className="text-xl text-muted-foreground">
              Have questions or need help? We're here to assist you.
            </p>
          </div>
        </div>
      </div>

      <div className="container py-12 px-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>
                  Fill out the form below and our support team will get back to
                  you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {formSubmitted ? (
                  <Alert className="bg-green-50 text-green-800 border-green-200">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <AlertTitle className="text-green-800">
                      Message sent successfully!
                    </AlertTitle>
                    <AlertDescription className="text-green-700">
                      Thank you for contacting us. We'll get back to you as soon
                      as possible.
                    </AlertDescription>
                    <Button
                      className="mt-4 bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => setFormSubmitted(false)}
                    >
                      Send another message
                    </Button>
                  </Alert>
                ) : (
                  <form onSubmit={formik.handleSubmit} className="space-y-6">
                    {formError && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{formError}</AlertDescription>
                      </Alert>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your full name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={
                            formik.touched.name && formik.errors.name
                              ? "border-red-500"
                              : ""
                          }
                        />
                        {formik.touched.name && formik.errors.name && (
                          <p className="text-sm text-red-500">
                            {formik.errors.name}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Your email address"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={
                            formik.touched.email && formik.errors.email
                              ? "border-red-500"
                              : ""
                          }
                        />
                        {formik.touched.email && formik.errors.email && (
                          <p className="text-sm text-red-500">
                            {formik.errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="topic">Topic</Label>
                      <Select
                        name="topic"
                        value={formik.values.topic}
                        onValueChange={(value) =>
                          formik.setFieldValue("topic", value)
                        }
                      >
                        <SelectTrigger
                          id="topic"
                          className={
                            formik.touched.topic && formik.errors.topic
                              ? "border-red-500"
                              : ""
                          }
                        >
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">
                            General Inquiry
                          </SelectItem>
                          <SelectItem value="tickets">
                            Ticket Support
                          </SelectItem>
                          <SelectItem value="account">
                            Account Issues
                          </SelectItem>
                          <SelectItem value="events">
                            Event Information
                          </SelectItem>
                          <SelectItem value="technical">
                            Technical Support
                          </SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                        </SelectContent>
                      </Select>
                      {formik.touched.topic && formik.errors.topic && (
                        <p className="text-sm text-red-500">
                          {formik.errors.topic}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="How can we help you?"
                        rows={6}
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={
                          formik.touched.message && formik.errors.message
                            ? "border-red-500"
                            : ""
                        }
                      />
                      {formik.touched.message && formik.errors.message && (
                        <p className="text-sm text-red-500">
                          {formik.errors.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full md:w-auto"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  You can also reach us through these channels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 mr-3 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <a
                      href="mailto:support@techevents.com"
                      className="text-primary hover:underline"
                    >
                      support@techevents.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-5 w-5 mr-3 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    <p className="text-sm text-muted-foreground">
                      Mon-Fri, 9am-5pm PT
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Office</h3>
                    <p className="text-muted-foreground">
                      123 Tech Street
                      <br />
                      San Francisco, CA 94107
                      <br />
                      United States
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start">
                <h3 className="font-medium mb-2">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/faqs" className="text-primary hover:underline">
                      Frequently Asked Questions
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/retrieve-tickets"
                      className="text-primary hover:underline"
                    >
                      Retrieve Tickets
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="text-primary hover:underline"
                    >
                      About TechEvents
                    </Link>
                  </li>
                </ul>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
