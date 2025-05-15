"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { events } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, isAuthenticated, login } = useAuth();
  const router = useRouter();

  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated && !user) {
      router.push("/login");
    }
  }, [isAuthenticated, user, router]);

  // Initialize user data from auth context
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    bio: "Tech enthusiast and software developer with a passion for AI and machine learning.",
    location: "San Francisco, CA",
    website: "https://example.com",
    role: "attendee", // 'attendee' or 'organizer'
    avatar: "/placeholder.svg?height=200&width=200",
    phone: "+1 (555) 123-4567",
    company: "TechCorp Inc.",
    jobTitle: "Senior Developer",
    notifications: {
      email: true,
      sms: false,
      browser: true,
    },
  });

  // Update userData when user changes
  useEffect(() => {
    if (user) {
      setUserData((prevData) => ({
        ...prevData,
        name: user.name || prevData.name,
        email: user.email || prevData.email,
        role: user.role || prevData.role,
      }));
    }
  }, [user]);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);
  const [isSaving, setIsSaving] = useState(false);

  // Mock registered events
  const registeredEvents = events.slice(0, 3);

  // Mock created events (for organizers)
  const createdEvents = userData.role === "organizer" ? events.slice(3, 6) : [];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNotificationChange = (type, checked) => {
    setFormData({
      ...formData,
      notifications: {
        ...formData.notifications,
        [type]: checked,
      },
    });
  };

  const handleRoleChange = (value) => {
    setFormData({
      ...formData,
      role: value,
    });
  };

  const handleSave = () => {
    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      setUserData(formData);
      setIsEditing(false);
      setIsSaving(false);

      // Update the user in auth context
      login({
        ...user,
        name: formData.name,
        email: formData.email,
        role: formData.role,
      });
    }, 1000);
  };

  const handleCancel = () => {
    setFormData(userData);
    setIsEditing(false);
  };

  // If not authenticated, don't render the profile
  if (!isAuthenticated || !user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-b from-primary/10 to-background py-8 px-10">
        <div className="container">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>
      </div>

      <div className="container py-8 px-10">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 md:w-auto">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="events">My Events</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader className="relative">
                <div className="absolute right-6 top-6">
                  {isEditing ? (
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={handleCancel}>
                        Cancel
                      </Button>
                      <Button onClick={handleSave} disabled={isSaving}>
                        {isSaving ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </Button>
                  )}
                </div>
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src={userData.avatar || "/placeholder.svg"}
                      alt={userData.name}
                    />
                    <AvatarFallback>
                      {userData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">{userData.name}</CardTitle>
                    <CardDescription className="text-lg">
                      {userData.email}
                    </CardDescription>
                    <div className="flex items-center mt-2">
                      <Badge
                        variant={
                          userData.role === "organizer"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {userData.role === "organizer"
                          ? "Event Organizer"
                          : "Event Attendee"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="jobTitle">Job Title</Label>
                        <Input
                          id="jobTitle"
                          name="jobTitle"
                          value={formData.jobTitle}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="role">Account Type</Label>
                        <Select
                          value={formData.role}
                          onValueChange={handleRoleChange}
                        >
                          <SelectTrigger id="role">
                            <SelectValue placeholder="Select account type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="attendee">
                              Event Attendee
                            </SelectItem>
                            <SelectItem value="organizer">
                              Event Organizer
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows={4}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">About</h3>
                      <p className="text-muted-foreground">{userData.bio}</p>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">
                            Location
                          </h3>
                          <p>{userData.location}</p>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">
                            Email
                          </h3>
                          <p>{userData.email}</p>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">
                            Phone
                          </h3>
                          <p>{userData.phone}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">
                            Company
                          </h3>
                          <p>{userData.company}</p>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">
                            Job Title
                          </h3>
                          <p>{userData.jobTitle}</p>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">
                            Website
                          </h3>
                          <a
                            href={userData.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {userData.website}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Registered Events</CardTitle>
                <CardDescription>
                  Events you've registered to attend
                </CardDescription>
              </CardHeader>
              <CardContent>
                {registeredEvents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {registeredEvents.map((event) => (
                      <Link href={`/events/${event.id}`} key={event.id}>
                        <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                          <div className="relative h-40">
                            <Image
                              src={event.image || "/placeholder.svg"}
                              alt={event.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <Badge variant="outline" className="mb-2">
                              {event.type}
                            </Badge>
                            <h3 className="font-medium mb-1 line-clamp-1">
                              {event.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {formatDate(event.date)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      You haven't registered for any events yet.
                    </p>
                    <Link href="/find-events">
                      <Button className="mt-4">Find Events</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {userData.role === "organizer" && (
              <Card>
                <CardHeader>
                  <CardTitle>My Created Events</CardTitle>
                  <CardDescription>Events you've organized</CardDescription>
                </CardHeader>
                <CardContent>
                  {createdEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {createdEvents.map((event) => (
                        <Link href={`/events/${event.id}`} key={event.id}>
                          <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                            <div className="relative h-40">
                              <Image
                                src={event.image || "/placeholder.svg"}
                                alt={event.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="p-4">
                              <Badge variant="outline" className="mb-2">
                                {event.type}
                              </Badge>
                              <h3 className="font-medium mb-1 line-clamp-1">
                                {event.title}
                              </h3>
                              <p className="text-sm text-muted-foreground mb-2">
                                {formatDate(event.date)}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">
                        You haven't created any events yet.
                      </p>
                    </div>
                  )}
                </CardContent>
                {userData.role === "organizer" && (
                  <div className="flex justify-end mr-3">
                    <Link href="/create-event">
                      <Button>Create Event</Button>
                    </Link>
                  </div>
                )}
              </Card>
            )}
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Manage how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive email updates about your events
                    </p>
                  </div>
                  <Switch
                    checked={formData.notifications.email}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("email", checked)
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">SMS Notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive text messages about your events
                    </p>
                  </div>
                  <Switch
                    checked={formData.notifications.sms}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("sms", checked)
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Browser Notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications in your browser
                    </p>
                  </div>
                  <Switch
                    checked={formData.notifications.browser}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("browser", checked)
                    }
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Settings"}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Change Password</h3>
                  <Button variant="outline">Update Password</Button>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-2">Delete Account</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Once you delete your account, there is no going back. Please
                    be certain.
                  </p>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Helper function to format date
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
}
