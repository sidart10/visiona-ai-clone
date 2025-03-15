"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Home, Settings, ImageIcon, Grid, FlaskRoundIcon as Flask, Bell, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

// Mock user data
const userData = {
  name: "John Doe",
  email: "john@example.com",
  plan: "Free",
  modelsCreated: 2,
  modelsLimit: 5,
  dailyGenerations: 8,
  dailyGenerationsLimit: 20,
  models: [
    { id: 1, name: "Professional Headshot", status: "Ready", createdAt: "Mar 10, 2025" },
    { id: 2, name: "Casual Style", status: "Training", progress: 70, createdAt: "Mar 14, 2025" },
  ],
  recentImages: [
    {
      id: 1,
      thumbnail: "/placeholder.svg?height=150&width=150",
      prompt: "Professional in office setting",
      createdAt: "Mar 14, 2025",
    },
    {
      id: 2,
      thumbnail: "/placeholder.svg?height=150&width=150",
      prompt: "Casual beach scene",
      createdAt: "Mar 13, 2025",
    },
    {
      id: 3,
      thumbnail: "/placeholder.svg?height=150&width=150",
      prompt: "Urban street photography",
      createdAt: "Mar 12, 2025",
    },
    {
      id: 4,
      thumbnail: "/placeholder.svg?height=150&width=150",
      prompt: "Mountain landscape",
      createdAt: "Mar 11, 2025",
    },
  ],
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#111]/80 backdrop-blur-md border-r border-[#333]/50 p-4 flex flex-col">
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-center">
            <span className="text-white">Visiona</span>
          </h1>
        </div>

        <nav className="space-y-1 flex-1">
          <Link
            href="/dashboard"
            className="flex items-center px-3 py-2 rounded-md bg-secondary text-secondary-foreground group"
          >
            <Home className="h-5 w-5" />
            <span className="ml-3">Dashboard</span>
          </Link>
          <Link
            href="/train"
            className="flex items-center px-3 py-2 rounded-md text-muted-foreground hover:bg-secondary hover:text-secondary-foreground group"
          >
            <Flask className="h-5 w-5" />
            <span className="ml-3">Train Model</span>
          </Link>
          <Link
            href="/generate"
            className="flex items-center px-3 py-2 rounded-md text-muted-foreground hover:bg-secondary hover:text-secondary-foreground group"
          >
            <ImageIcon className="h-5 w-5" />
            <span className="ml-3">Generate Images</span>
          </Link>
          <Link
            href="/gallery"
            className="flex items-center px-3 py-2 rounded-md text-muted-foreground hover:bg-secondary hover:text-secondary-foreground group"
          >
            <Grid className="h-5 w-5" />
            <span className="ml-3">Gallery</span>
          </Link>
        </nav>

        <div className="pt-4 border-t border-border/50">
          <Link
            href="/settings"
            className="flex items-center px-3 py-2 rounded-md text-muted-foreground hover:bg-secondary hover:text-secondary-foreground group"
          >
            <Settings className="h-5 w-5" />
            <span className="ml-3">Settings</span>
          </Link>
          <div className="flex items-center mt-4 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center text-sm font-semibold">
              {userData.name.charAt(0)}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{userData.name}</p>
              <p className="text-xs text-muted-foreground">{userData.plan} Plan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-[#111]/80 backdrop-blur-md border-b border-[#333]/50 flex items-center justify-between px-6">
          <h2 className="text-lg font-semibold">Dashboard</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Button size="icon" variant="secondary" className="h-9 w-9 rounded-full">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-destructive"></span>
              </Button>
            </div>
            <Separator orientation="vertical" className="h-6" />
            <div className="text-sm">
              <span className="text-muted-foreground">Quota Reset in</span>{" "}
              <span className="font-semibold">10:45:33</span>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Upgrade banner */}
          {userData.plan === "Free" && (
            <Card className="bg-[#111]/80 backdrop-blur-md border-[#333]/50 border-l-4 border-l-cyan-500">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-lg mb-1">Upgrade to Premium</h3>
                  <p className="text-muted-foreground text-sm">
                    Unlock unlimited models, faster generation, and priority support!
                  </p>
                </div>
                <Button className="bg-[#1eb8cd] hover:bg-[#1eb8cd]/90 text-white">Upgrade Now</Button>
              </CardContent>
            </Card>
          )}

          {/* Usage stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card className="bg-[#111]/80 backdrop-blur-md border-[#333]/50">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">Models Usage</h3>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Models Created</span>
                  <span>
                    {userData.modelsCreated} / {userData.modelsLimit}
                  </span>
                </div>
                <Progress value={(userData.modelsCreated / userData.modelsLimit) * 100} className="mb-4" />
                <div className="text-xs text-muted-foreground">
                  {userData.plan === "Free" ? "Upgrade to create unlimited models" : "Unlimited models available"}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#111]/80 backdrop-blur-md border-[#333]/50">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">Daily Generations</h3>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Images Today</span>
                  <span>
                    {userData.dailyGenerations} / {userData.dailyGenerationsLimit}
                  </span>
                </div>
                <Progress value={(userData.dailyGenerations / userData.dailyGenerationsLimit) * 100} className="mb-4" />
                <div className="text-xs text-muted-foreground">
                  {userData.plan === "Free" ? "Upgrade for more daily generations" : "High-priority processing"}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <Button
              className="bg-[#1eb8cd] hover:bg-[#1eb8cd]/90 text-white flex items-center justify-center py-6"
              size="lg"
            >
              <Flask className="mr-2 h-5 w-5" />
              <span>Train New Model</span>
            </Button>
            <Button className="flex items-center justify-center py-6" variant="secondary" size="lg">
              <ImageIcon className="mr-2 h-5 w-5" />
              <span>Generate New Image</span>
            </Button>
          </div>

          {/* Your models */}
          <h3 className="font-semibold text-lg mb-4">Your Models</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {userData.models.map((model) => (
              <Card
                key={model.id}
                className="bg-[#111]/80 backdrop-blur-md border-[#333]/50 hover:border-cyan-500/50 transition-colors cursor-pointer"
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{model.name}</h4>
                    <Badge variant={model.status === "Ready" ? "success" : "warning"}>{model.status}</Badge>
                  </div>
                  {model.status === "Training" && (
                    <div className="mb-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Training progress</span>
                        <span>{model.progress}%</span>
                      </div>
                      <Progress value={model.progress} className="bg-secondary" />
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground mt-2">Created on {model.createdAt}</div>
                </CardContent>
              </Card>
            ))}
            {/* Add new model card */}
            <Card className="bg-[#111]/80 backdrop-blur-md border-[#333]/50 border-dashed border-2 hover:border-cyan-500/50 transition-colors cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center py-8">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-3">
                  <Plus className="h-6 w-6" />
                </div>
                <p className="font-medium">Create New Model</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {userData.modelsCreated} of {userData.modelsLimit} models used
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent generations */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Recent Generations</h3>
              <Link href="/gallery" className="text-sm text-cyan-500 hover:text-cyan-400">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {userData.recentImages.map((image) => (
                <Card
                  key={image.id}
                  className="bg-[#111]/80 backdrop-blur-md border-[#333]/50 overflow-hidden hover:border-cyan-500/50 transition-colors cursor-pointer"
                >
                  <div className="h-32 bg-secondary rounded overflow-hidden">
                    <Image
                      src={image.thumbnail || "/placeholder.svg"}
                      alt={image.prompt}
                      width={150}
                      height={150}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-3">
                    <p className="text-sm font-medium truncate">{image.prompt}</p>
                    <p className="text-xs text-muted-foreground">{image.createdAt}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

