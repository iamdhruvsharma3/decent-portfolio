"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import emailjs from "@emailjs/browser";
import { Clock } from "lucide-react";

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  preferredTiming: string;
}

export function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    preferredTiming: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // EmailJS configuration from environment variables
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

      if (!publicKey || !serviceId || !templateId) {
        throw new Error(
          "EmailJS credentials are not configured. Please check your .env.local file."
        );
      }

      emailjs.init(publicKey);

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        preferred_timing: formData.preferredTiming,
        to_email: "iamdhruvsharma3@gmail.com",
      };

      await emailjs.send(serviceId, templateId, templateParams);

      setSubmitStatus("success");

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          preferredTiming: "",
        });
        onClose();
        setSubmitStatus("idle");
      }, 2000);
    } catch (error) {
      console.error("Failed to send email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Schedule a Call</DialogTitle>
          <DialogDescription>
            Fill out the form below and I&apos;ll get back to you within 24
            hours to schedule our conversation.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Your full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <PhoneInput
              defaultCountry="in"
              value={formData.phone}
              onChange={(phone) => handleInputChange("phone", phone)}
              inputProps={{
                id: "phone",
                placeholder: "Enter phone number",
                className:
                  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferred-timing">Preferred Contact Time</Label>
            <Select
              value={formData.preferredTiming}
              onValueChange={(value) =>
                handleInputChange("preferredTiming", value)
              }>
              <SelectTrigger className="w-full">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Select your preferred timing" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning-9-12">
                  🌅 Morning (9:00 AM - 12:00 PM IST)
                </SelectItem>
                <SelectItem value="afternoon-12-3">
                  ☀️ Early Afternoon (12:00 PM - 3:00 PM IST)
                </SelectItem>
                <SelectItem value="afternoon-3-6">
                  🌤️ Late Afternoon (3:00 PM - 6:00 PM IST)
                </SelectItem>
                <SelectItem value="evening-6-9">
                  🌆 Evening (6:00 PM - 9:00 PM IST)
                </SelectItem>
                <SelectItem value="flexible">🕐 Flexible / Any time</SelectItem>
                <SelectItem value="weekend-only">📅 Weekends only</SelectItem>
                <SelectItem value="urgent">⚡ ASAP / Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => handleInputChange("subject", e.target.value)}
              placeholder="What would you like to discuss?"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Tell me more about your project or what you'd like to discuss..."
              rows={4}
              required
            />
          </div>

          {submitStatus === "success" && (
            <div className="text-sm text-green-600 bg-green-50 p-3 rounded-md">
              ✅ Message sent successfully! I&apos;ll get back to you soon.
            </div>
          )}

          {submitStatus === "error" && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
              ❌ Failed to send message. Please try again or email me directly.
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
