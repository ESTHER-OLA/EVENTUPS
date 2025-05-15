import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FAQsPage() {
  const faqs = [
    {
      question: "How do I register for an event?",
      answer:
        "To register for an event, navigate to the event page and click the 'Register Now' button. You'll need to create an account if you don't already have one, and then follow the registration process which may include providing additional information and payment details if it's a paid event.",
    },
    {
      question: "Can I get a refund if I can't attend an event?",
      answer:
        "Refund policies vary by event. Generally, most events offer full refunds up to 7 days before the event date, and partial refunds up to 48 hours before. Check the specific event's refund policy on its registration page for details. For further assistance, contact the event organizer directly.",
    },
    {
      question: "How do I become a speaker at an event?",
      answer:
        "To become a speaker, look for events with open calls for speakers or proposals. You can also directly contact event organizers through our platform. Make sure to prepare a compelling bio, talk description, and any relevant experience or credentials that make you a good fit for the event.",
    },
    {
      question: "Are the events recorded?",
      answer:
        "Many events are recorded, especially webinars and online conferences. Whether recordings are available to attendees afterward depends on the specific event. This information is typically provided on the event page or in follow-up communications after the event.",
    },
    {
      question: "How do I retrieve my tickets?",
      answer:
        "You can retrieve your tickets by visiting the 'Retrieve Tickets' page and entering the email address you used for registration. Alternatively, check your email for the ticket confirmation which was sent after your registration was complete. You can also find your tickets in your account dashboard under 'My Events'.",
    },
    {
      question: "Can I transfer my ticket to someone else?",
      answer:
        "Yes, in most cases tickets can be transferred to another person. To do this, go to your account dashboard, find the event under 'My Events', and select the transfer option. You'll need to provide the name and email of the person you're transferring the ticket to.",
    },
    {
      question: "What happens if an event is canceled?",
      answer:
        "If an event is canceled, you will be notified via email. For paid events, you will typically receive an automatic refund to your original payment method. Some events may offer the option to transfer your registration to a future event instead of a refund.",
    },
    {
      question: "How can I organize my own event on TechEvents?",
      answer:
        "To organize an event, you need to create an organizer account. Once approved, you can create and manage your events through our platform. We provide tools for registration, attendee management, and promotion. Contact our support team for more information on becoming an event organizer.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-b from-primary/10 to-background py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground">Find answers to common questions about TechEvents</p>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 p-6 bg-primary/5 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
            <p className="mb-6 text-muted-foreground">
              If you couldn't find the answer to your question, feel free to contact our support team.
            </p>
            <Link href="/contact">
              <Button>Contact Support</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
