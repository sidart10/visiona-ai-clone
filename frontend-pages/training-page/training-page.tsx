"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Home, ImageIcon, Beaker, Grid, Settings, Info, Check } from "lucide-react"

// Types
interface Photo {
  file: File
  preview: string
  name: string
  size: number
}

interface UserData {
  name: string
  email: string
  plan: string
  modelsCreated: number
  modelsLimit: number
}

export default function TrainingPage() {
  // User data mock
  const userData: UserData = {
    name: "John Doe",
    email: "john@example.com",
    plan: "Free",
    modelsCreated: 2,
    modelsLimit: 5,
  }

  // Step state (1: Upload Photos, 2: Set Trigger Word, 3: Training)
  const [currentStep, setCurrentStep] = useState(1)

  // Photo upload state
  const [uploadedPhotos, setUploadedPhotos] = useState<Photo[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Trigger word state
  const [triggerWord, setTriggerWord] = useState("")
  const [modelName, setModelName] = useState("")

  // Training state
  const [isTraining, setIsTraining] = useState(false)
  const [trainingProgress, setTrainingProgress] = useState(0)
  const [trainingStatus, setTrainingStatus] = useState<
    "" | "queued" | "processing" | "finalizing" | "completed" | "error"
  >("")

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files)
    }
  }

  // Handle file drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    handleFiles(e.dataTransfer.files)
  }

  // Common file handling logic
  const handleFiles = (files: FileList) => {
    // Convert FileList to Array
    const fileArray = Array.from(files)

    // Validate files (only images)
    const imageFiles = fileArray.filter((file) => file.type.startsWith("image/"))

    // Create preview URLs
    const newPhotos = imageFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
    }))

    setUploadedPhotos((prev) => [...prev, ...newPhotos])
  }

  // Handle drag events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  // Remove a photo
  const removePhoto = (indexToRemove: number) => {
    setUploadedPhotos((prev) => prev.filter((_, index) => index !== indexToRemove))
  }

  // Start training
  const startTraining = () => {
    if (uploadedPhotos.length < 5) {
      alert("Please upload at least 5 photos to start training.")
      return
    }

    if (!triggerWord.trim()) {
      alert("Please set a trigger word for your model.")
      return
    }

    if (!modelName.trim()) {
      alert("Please give your model a name.")
      return
    }

    setIsTraining(true)
    setTrainingStatus("queued")

    // Simulate training process (replace with actual API calls)
    setTimeout(() => {
      setTrainingStatus("processing")

      const interval = setInterval(() => {
        setTrainingProgress((prev) => {
          const newProgress = prev + Math.random() * 5

          if (newProgress >= 100) {
            clearInterval(interval)
            setTrainingStatus("finalizing")

            setTimeout(() => {
              setTrainingStatus("completed")
              setIsTraining(false)
            }, 2000)

            return 100
          }

          return newProgress
        })
      }, 1000)
    }, 2000)
  }

  // Reset form
  const resetForm = () => {
    setUploadedPhotos([])
    setTriggerWord("")
    setModelName("")
    setCurrentStep(1)
    setIsTraining(false)
    setTrainingProgress(0)
    setTrainingStatus("")
  }

  // Get training status text and color
  const getStatusInfo = () => {
    switch (trainingStatus) {
      case "queued":
        return { text: "Queued", color: "text-yellow-400 bg-yellow-400/20" }
      case "processing":
        return { text: "text-primary bg-primary/20" }
      case "finalizing":
        return { text: "Finalizing", color: "text-cyan-400 bg-cyan-400/20" }
      case "completed":
        return { text: "Completed", color: "text-green-400 bg-green-400/20" }
      case "error":
        return { text: "Error", color: "text-destructive bg-destructive/20" }
      default:
        return { text: "", color: "" }
    }
  }

  const statusInfo = getStatusInfo()

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#111]/80 backdrop-blur-md border-r border-[#333]/50 p-4 flex flex-col">
        <div className="mb-8">
          <h1 className="text-xl font-semibold font-sans text-center text-white">Visiona</h1>
        </div>

        <nav className="space-y-1 flex-1">
          <Link
            href="/dashboard"
            className="flex items-center px-3 py-2 rounded-md text-gray-400 hover:bg-[#222] hover:text-white group"
          >
            <Home className="w-5 h-5" />
            <span className="ml-3">Dashboard</span>
          </Link>
          <Link href="/train" className="flex items-center px-3 py-2 rounded-md bg-[#222] text-white group">
            <Beaker className="w-5 h-5" />
            <span className="ml-3">Train Model</span>
          </Link>
          <Link
            href="/generate"
            className="flex items-center px-3 py-2 rounded-md text-gray-400 hover:bg-[#222] hover:text-white group"
          >
            <ImageIcon className="w-5 h-5" />
            <span className="ml-3">Generate Images</span>
          </Link>
          <Link
            href="/gallery"
            className="flex items-center px-3 py-2 rounded-md text-gray-400 hover:bg-[#222] hover:text-white group"
          >
            <Grid className="w-5 h-5" />
            <span className="ml-3">Gallery</span>
          </Link>
        </nav>

        <div className="pt-4 border-t border-border/50">
          <Link
            href="/settings"
            className="flex items-center px-3 py-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground group"
          >
            <Settings className="w-5 h-5" />
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
          <h2 className="text-lg font-semibold">Train New Model</h2>
          <div className="flex items-center space-x-4">
            <div className="text-sm">
              <span className="text-muted-foreground">Models:</span>{" "}
              <span className="font-semibold">
                {userData.modelsCreated}/{userData.modelsLimit}
              </span>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Training progress steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                    currentStep >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  1
                </div>
                <div className={`h-1 w-10 mx-1 ${currentStep >= 2 ? "bg-primary" : "bg-muted"}`}></div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                    currentStep >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  2
                </div>
                <div className={`h-1 w-10 mx-1 ${currentStep >= 3 ? "bg-primary" : "bg-muted"}`}></div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                    currentStep >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  3
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {currentStep === 1 && "Upload Photos"}
                {currentStep === 2 && "Set Trigger Word"}
                {currentStep === 3 && trainingStatus === "completed" ? "Completed!" : "Training Model"}
              </div>
            </div>
          </div>

          {/* Step content */}
          <Card className="mb-6 bg-[#111]/80 backdrop-blur-md border-[#333]/50">
            <CardContent className="p-6">
              {/* Step 1: Upload Photos */}
              {currentStep === 1 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-100">Upload Your Photos</h3>
                  <p className="text-gray-300 mb-6">
                    Upload 10-20 photos of yourself for best results. Make sure they have good lighting, different
                    angles and expressions, and clear backgrounds.
                  </p>

                  {/* Drop zone */}
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-colors ${
                      isDragging ? "border-primary bg-primary/10" : "border-border"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={handleFileSelect}
                    />
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </div>
                    <p className="font-medium mb-2">Drag & drop photos here</p>
                    <p className="text-sm text-muted-foreground mb-2">or click to browse</p>
                    <p className="text-xs text-muted-foreground">
                      Supported formats: JPG, PNG, WEBP (Max size: 5MB per image)
                    </p>
                  </div>

                  {/* Uploaded photos preview */}
                  {uploadedPhotos.length > 0 && (
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium">Uploaded Photos ({uploadedPhotos.length})</h4>
                        <button
                          className="text-sm text-destructive hover:text-destructive/80"
                          onClick={() => setUploadedPhotos([])}
                        >
                          Clear All
                        </button>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {uploadedPhotos.map((photo, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                              <img
                                src={photo.preview || "/placeholder.svg"}
                                alt={`Uploaded ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button
                              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removePhoto(index)}
                            >
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-8 flex justify-end">
                    <Button
                      onClick={() => setCurrentStep(2)}
                      disabled={uploadedPhotos.length < 5}
                      className="bg-[#1eb8cd] hover:bg-[#1eb8cd]/90"
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Set Trigger Word */}
              {currentStep === 2 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-100">Set Your Trigger Word</h3>
                  <p className="text-gray-300 mb-6">
                    Your trigger word is a unique identifier that you'll use in prompts to generate images with your
                    likeness. Choose something unique and memorable.
                  </p>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="modelName">Model Name</Label>
                      <Input
                        id="modelName"
                        placeholder="e.g., Professional Headshots"
                        value={modelName}
                        onChange={(e) => setModelName(e.target.value)}
                        className="bg-background/50 border-border"
                      />
                      <p className="text-xs text-muted-foreground">
                        This is for your reference only and won't affect the model output.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="triggerWord">Trigger Word</Label>
                      <Input
                        id="triggerWord"
                        placeholder="e.g., johndoe1234"
                        value={triggerWord}
                        onChange={(e) => setTriggerWord(e.target.value)}
                        className="bg-background/50 border-border"
                      />
                      <p className="text-xs text-muted-foreground">
                        This word will activate your model. Choose something unique that doesn't conflict with common
                        words.
                      </p>
                    </div>
                  </div>

                  <div className="bg-primary/10 rounded-lg p-4 mt-6 border border-primary/20">
                    <h4 className="font-medium mb-2 flex items-center">
                      <Info className="w-5 h-5 mr-2 text-primary" />
                      How to use your trigger word
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      After training, you'll use your trigger word in prompts like this:
                    </p>
                    <div className="bg-muted p-3 rounded mt-2 text-sm">
                      <code>
                        A photo of <span className="text-primary">{triggerWord || "[your-trigger-word]"}</span> wearing
                        a suit in Paris
                      </code>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <Button variant="outline" onClick={() => setCurrentStep(1)}>
                      Back
                    </Button>
                    <Button
                      onClick={() => {
                        setCurrentStep(3)
                        startTraining()
                      }}
                      disabled={!triggerWord.trim() || !modelName.trim()}
                    >
                      Start Training
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Training Progress */}
              {currentStep === 3 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-100">Training Your Model</h3>

                  {trainingStatus !== "completed" ? (
                    <div>
                      <p className="text-gray-300 mb-6">
                        We're now training your AI model. This process typically takes 5-10 minutes. You can leave this
                        page and we'll notify you when it's complete.
                      </p>

                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="font-medium">{modelName}</span>
                            <span className={`text-xs px-2 py-1 rounded ${statusInfo.color}`}>{statusInfo.text}</span>
                          </div>
                          <Progress value={trainingProgress} className="mb-2" />
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Training...</span>
                            <span>{Math.round(trainingProgress)}%</span>
                          </div>
                        </div>

                        <div className="bg-muted rounded-lg p-4 text-sm">
                          <h4 className="font-medium mb-2">Training Details</h4>
                          <div className="space-y-1 text-muted-foreground">
                            <div className="flex justify-between">
                              <span>Photos:</span>
                              <span>{uploadedPhotos.length}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Trigger Word:</span>
                              <span className="text-primary">{triggerWord}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Base Model:</span>
                              <span>Flux LoRA</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Start Time:</span>
                              <span>{new Date().toLocaleTimeString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-center py-8">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                          <Check className="w-8 h-8 text-green-400" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-100">Training Complete!</h3>
                        <p className="text-gray-300 mb-6">
                          Your model has been successfully trained and is ready to use.
                        </p>

                        <div className="bg-muted rounded-lg p-4 text-sm max-w-md mx-auto mb-8">
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Model Name:</span>
                              <span>{modelName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Trigger Word:</span>
                              <span className="text-primary">{triggerWord}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <Button onClick={resetForm} variant="outline">
                            Create Another Model
                          </Button>
                          <Button>Generate Images Now</Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Training guidelines */}
          {currentStep < 3 && (
            <Card className="bg-[#111]/60 border-[#333]/50">
              <CardContent className="p-6">
                <h4 className="font-medium mb-4 text-white">Training Guidelines</h4>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex">
                    <Check className="w-5 h-5 mr-2 flex-shrink-0 text-white" />
                    <span>Upload 10-20 high-quality photos for best results</span>
                  </li>
                  <li className="flex">
                    <Check className="w-5 h-5 mr-2 flex-shrink-0 text-white" />
                    <span>Include a variety of expressions, angles, and lighting conditions</span>
                  </li>
                  <li className="flex">
                    <Check className="w-5 h-5 mr-2 flex-shrink-0 text-white" />
                    <span>Avoid heavily filtered photos or images with multiple people</span>
                  </li>
                  <li className="flex">
                    <Check className="w-5 h-5 mr-2 flex-shrink-0 text-white" />
                    <span>Choose a unique trigger word that doesn't conflict with common words</span>
                  </li>
                  <li className="flex">
                    <Check className="w-5 h-5 mr-2 flex-shrink-0 text-white" />
                    <span>Training takes approximately 5-10 minutes with optimal settings</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}

