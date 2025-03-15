"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Home, Train, ImageIcon, Grid, Settings, Zap, Check, ChevronDown, Download, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export default function GenerateImagesPage() {
  // User data mock
  const userData = {
    name: "John Doe",
    email: "john@example.com",
    plan: "Free",
    dailyGenerations: 8,
    dailyGenerationsLimit: 20,
  }

  // User models mock
  const userModels = [
    { id: 1, name: "Professional Headshot", triggerWord: "johndoe_pro" },
    { id: 2, name: "Casual Style", triggerWord: "johndoe_casual" },
  ]

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<any[]>([])
  const [isEnhancing, setIsEnhancing] = useState(false)
  const [imageCount, setImageCount] = useState(4)

  // Form state
  const [selectedModel, setSelectedModel] = useState<number | string>(userModels[0]?.id || "")
  const [prompt, setPrompt] = useState("")
  const [style, setStyle] = useState("")
  const [outfit, setOutfit] = useState("")
  const [setting, setSetting] = useState("")
  const [lighting, setLighting] = useState("")
  const [selectedRatio, setSelectedRatio] = useState("1:1")
  const [guidanceScale, setGuidanceScale] = useState(7.5)
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Get the selected model data
  const getSelectedModelData = () => {
    return userModels.find((model) => model.id === selectedModel) || userModels[0]
  }

  // Calculate the full prompt
  const getFullPrompt = () => {
    const model = getSelectedModelData()

    let fullPrompt = `A photo of ${model?.triggerWord || "[trigger_word]"}`

    if (prompt) fullPrompt += `, ${prompt}`
    if (style) fullPrompt += `, ${style} style`
    if (outfit) fullPrompt += `, wearing ${outfit}`
    if (setting) fullPrompt += `, in ${setting}`
    if (lighting) fullPrompt += `, ${lighting} lighting`

    return fullPrompt
  }

  // Enhance prompt with AI
  const enhancePrompt = () => {
    setIsEnhancing(true)

    // Simulate AI enhancement (replace with actual API call)
    setTimeout(() => {
      const currentPrompt = prompt
      const enhancedPrompt =
        currentPrompt +
        (currentPrompt.length > 0
          ? ", with professional DSLR quality, detailed facial features, realistic skin texture, cinematic composition, depth of field"
          : "with professional DSLR quality, detailed facial features, realistic skin texture, cinematic composition, depth of field")

      setPrompt(enhancedPrompt)
      setIsEnhancing(false)
    }, 1500)
  }

  // Generate images
  const generateImages = () => {
    if (!selectedModel) {
      alert("Please select a model first.")
      return
    }

    setIsGenerating(true)

    // Simulate image generation (replace with actual API call)
    setTimeout(() => {
      const mockGeneratedImages = Array.from({ length: imageCount }, (_, i) => ({
        id: Date.now() + i,
        url: "/placeholder.svg?height=512&width=512",
        prompt: getFullPrompt(),
        timestamp: new Date().toISOString(),
      }))

      setGeneratedImages(mockGeneratedImages)
      setIsGenerating(false)
    }, 3000)
  }

  // Get dimensions based on ratio
  const getDimensions = () => {
    switch (selectedRatio) {
      case "1:1":
        return "512 × 512"
      case "4:3":
        return "512 × 384"
      case "3:4":
        return "384 × 512"
      case "16:9":
        return "512 × 288"
      case "9:16":
        return "288 × 512"
      default:
        return "512 × 512"
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-black border-r border-zinc-800/50 p-4 flex flex-col">
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-center">
            <span className="text-white">Visiona</span>
          </h1>
        </div>

        <nav className="space-y-1 flex-1">
          <Link
            href="/dashboard"
            className="flex items-center px-3 py-2 rounded-md text-gray-400 hover:bg-zinc-900 hover:text-white group"
          >
            <Home className="w-5 h-5" />
            <span className="ml-3">Dashboard</span>
          </Link>
          <Link
            href="/train"
            className="flex items-center px-3 py-2 rounded-md text-gray-400 hover:bg-zinc-900 hover:text-white group"
          >
            <Train className="w-5 h-5" />
            <span className="ml-3">Train Model</span>
          </Link>
          <Link href="/generate" className="flex items-center px-3 py-2 rounded-md bg-zinc-900 text-white group">
            <ImageIcon className="w-5 h-5" />
            <span className="ml-3">Generate Images</span>
          </Link>
          <Link
            href="/gallery"
            className="flex items-center px-3 py-2 rounded-md text-gray-400 hover:bg-zinc-900 hover:text-white group"
          >
            <Grid className="w-5 h-5" />
            <span className="ml-3">Gallery</span>
          </Link>
        </nav>

        <div className="pt-4 border-t border-zinc-800/50">
          <Link
            href="/settings"
            className="flex items-center px-3 py-2 rounded-md text-gray-400 hover:bg-zinc-900 hover:text-white group"
          >
            <Settings className="w-5 h-5" />
            <span className="ml-3">Settings</span>
          </Link>
          <div className="flex items-center mt-4 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-teal-400 flex items-center justify-center text-sm font-semibold">
              {userData.name.charAt(0)}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{userData.name}</p>
              <p className="text-xs text-gray-400">{userData.plan} Plan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-black border-b border-zinc-800/50 flex items-center justify-between px-6">
          <h2 className="text-lg font-semibold text-white">Generate Images</h2>
          <div className="flex items-center space-x-4">
            <div className="text-sm">
              <span className="text-gray-400">Today:</span>{" "}
              <span className="font-semibold">
                {userData.dailyGenerations}/{userData.dailyGenerationsLimit} generations
              </span>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Generation form */}
            <div className="space-y-6">
              <Card className="bg-black border-zinc-800/50">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-4 text-white">Create Your Image</h3>
                    <p className="text-gray-400 text-sm">
                      Select one of your trained models and customize your prompt to generate unique images.
                    </p>
                  </div>

                  <div className="space-y-5">
                    {/* Model selection */}
                    <div className="space-y-2">
                      <Label htmlFor="model" className="text-white">
                        Select Model
                      </Label>
                      <Select
                        value={selectedModel.toString()}
                        onValueChange={(value) => setSelectedModel(Number(value))}
                      >
                        <SelectTrigger id="model" className="w-full bg-zinc-900 border-zinc-700">
                          <SelectValue placeholder="Select a model" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-zinc-700">
                          {userModels.length === 0 && (
                            <SelectItem value="" disabled>
                              No models available
                            </SelectItem>
                          )}
                          {userModels.map((model) => (
                            <SelectItem key={model.id} value={model.id.toString()}>
                              {model.name} (trigger: {model.triggerWord})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {userModels.length === 0 && (
                        <p className="text-xs text-cyan-500">
                          You need to train a model first.{" "}
                          <Link href="/train" className="underline">
                            Train now
                          </Link>
                        </p>
                      )}
                    </div>

                    {/* Prompt field */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="prompt" className="text-white">
                          Prompt
                        </Label>
                        <button
                          className="text-xs text-cyan-500 hover:text-cyan-400 flex items-center space-x-1"
                          onClick={enhancePrompt}
                          disabled={isEnhancing}
                        >
                          <Zap className="w-4 h-4 mr-1" />
                          <span>{isEnhancing ? "Enhancing..." : "Enhance with AI"}</span>
                        </button>
                      </div>
                      <Textarea
                        id="prompt"
                        rows={3}
                        placeholder="Describe what you want to see in the image"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="bg-zinc-900 border-zinc-700 resize-none"
                      />
                      <p className="text-xs text-gray-500">Your model's trigger word will be automatically included</p>
                    </div>

                    {/* Preview of full prompt */}
                    <div className="bg-zinc-900 p-3 rounded text-sm">
                      <div className="font-medium mb-1 text-gray-400">Full Prompt:</div>
                      <div className="text-cyan-500">{getFullPrompt()}</div>
                    </div>

                    {/* Advanced options */}
                    <div className="pt-4 border-t border-zinc-800">
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => setShowAdvanced(!showAdvanced)}
                      >
                        <span className="font-medium text-white">Advanced Options</span>
                        <ChevronDown className={`w-5 h-5 transition-transform ${showAdvanced ? "rotate-180" : ""}`} />
                      </div>

                      {showAdvanced && (
                        <div className="pt-4 space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="style" className="text-white">
                                Style
                              </Label>
                              <Input
                                id="style"
                                placeholder="e.g., cinematic, anime"
                                value={style}
                                onChange={(e) => setStyle(e.target.value)}
                                className="bg-zinc-900 border-zinc-700"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="outfit" className="text-white">
                                Outfit
                              </Label>
                              <Input
                                id="outfit"
                                placeholder="e.g., suit, casual clothes"
                                value={outfit}
                                onChange={(e) => setOutfit(e.target.value)}
                                className="bg-zinc-900 border-zinc-700"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="setting" className="text-white">
                                Setting
                              </Label>
                              <Input
                                id="setting"
                                placeholder="e.g., beach, Paris"
                                value={setting}
                                onChange={(e) => setSetting(e.target.value)}
                                className="bg-zinc-900 border-zinc-700"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="lighting" className="text-white">
                                Lighting
                              </Label>
                              <Input
                                id="lighting"
                                placeholder="e.g., sunset, studio"
                                value={lighting}
                                onChange={(e) => setLighting(e.target.value)}
                                className="bg-zinc-900 border-zinc-700"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-white">Dimensions</Label>
                            <div className="flex space-x-2">
                              {["1:1", "4:3", "3:4", "16:9", "9:16"].map((ratio) => (
                                <button
                                  key={ratio}
                                  className={`px-3 py-1 rounded text-sm ${
                                    selectedRatio === ratio
                                      ? "bg-cyan-500 text-white"
                                      : "bg-zinc-900 hover:bg-zinc-800 text-gray-300"
                                  }`}
                                  onClick={() => setSelectedRatio(ratio)}
                                >
                                  {ratio}
                                </button>
                              ))}
                            </div>
                            <p className="text-xs text-gray-500">{getDimensions()} pixels</p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <Label htmlFor="guidance" className="text-white">
                                Guidance Scale: {guidanceScale}
                              </Label>
                            </div>
                            <Slider
                              id="guidance"
                              min={1}
                              max={20}
                              step={0.5}
                              value={[guidanceScale]}
                              onValueChange={(value) => setGuidanceScale(value[0])}
                              className="py-4"
                            />
                            <div className="flex justify-between text-xs text-gray-500">
                              <span>Less creative</span>
                              <span>More precise</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="imageCount" className="text-white">
                        Number of Images
                      </Label>
                      <div className="flex space-x-2">
                        {[1, 2, 3, 4].map((count) => (
                          <button
                            key={count}
                            className={`px-3 py-1 rounded text-sm ${
                              imageCount === count
                                ? "bg-[#1eb8cd] text-white"
                                : "bg-zinc-900 hover:bg-zinc-800 text-gray-300"
                            }`}
                            onClick={() => setImageCount(count)}
                          >
                            {count}
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500">
                        Generate {imageCount} {imageCount === 1 ? "image" : "images"} at once
                      </p>
                    </div>

                    {/* Generate button */}
                    <Button
                      className="w-full py-6 bg-[#1eb8cd] hover:bg-[#19a3b6] text-white"
                      disabled={isGenerating || userModels.length === 0}
                      onClick={generateImages}
                    >
                      {isGenerating ? "Generating..." : "Generate Images"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Generation tips */}
              <Card className="bg-black border-zinc-800/50">
                <CardContent className="p-6">
                  <h4 className="font-medium mb-4 text-white">Tips for Better Results</h4>
                  <ul className="space-y-3 text-sm text-gray-400">
                    <li className="flex">
                      <Check className="w-5 h-5 mr-2 flex-shrink-0 text-white" />
                      <span className="text-gray-300">
                        Be specific about lighting, style, and setting for better quality
                      </span>
                    </li>
                    <li className="flex">
                      <Check className="w-5 h-5 mr-2 flex-shrink-0 text-white" />
                      <span className="text-gray-300">Use the AI enhancement feature to add professional details</span>
                    </li>
                    <li className="flex">
                      <Check className="w-5 h-5 mr-2 flex-shrink-0 text-white" />
                      <span className="text-gray-300">
                        Adjust guidance scale according to your needs (7-12 usually works best)
                      </span>
                    </li>
                    <li className="flex">
                      <Check className="w-5 h-5 mr-2 flex-shrink-0 text-white" />
                      <span className="text-gray-300">Choose the aspect ratio that best fits your intended use</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Generated images */}
            <div className="space-y-6">
              {isGenerating ? (
                <Card className="h-full bg-black border-zinc-800/50">
                  <CardContent className="h-full flex flex-col items-center justify-center py-16">
                    <div className="w-16 h-16 border-4 border-zinc-800 border-t-cyan-500 rounded-full animate-spin mb-6"></div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Generating Images</h3>
                    <p className="text-gray-400 text-center max-w-md">
                      We're bringing your vision to life. This usually takes 10-15 seconds depending on complexity.
                    </p>
                  </CardContent>
                </Card>
              ) : generatedImages.length > 0 ? (
                <>
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-white">Your Generations</h3>
                    <Button variant="outline" className="text-sm" onClick={() => setGeneratedImages([])}>
                      Clear All
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {generatedImages.map((image) => (
                      <Card
                        key={image.id}
                        className="overflow-hidden hover:border-cyan-500/50 transition-colors cursor-pointer bg-black border-zinc-800/50"
                      >
                        <CardContent className="p-3">
                          <div className="aspect-square bg-zinc-900 rounded-lg mb-3 overflow-hidden">
                            <Image
                              src={image.url || "/placeholder.svg"}
                              alt={image.prompt}
                              width={512}
                              height={512}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="px-1">
                            <div className="flex justify-end space-x-2 mb-2">
                              <Button variant="outline" size="icon" className="h-8 w-8 bg-zinc-900">
                                <Download className="w-4 h-4" />
                                <span className="sr-only">Download</span>
                              </Button>
                              <Button variant="outline" size="icon" className="h-8 w-8 bg-zinc-900">
                                <Copy className="w-4 h-4" />
                                <span className="sr-only">Copy</span>
                              </Button>
                            </div>
                            <p className="text-xs text-gray-400 truncate">
                              {new Date(image.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="flex justify-center mt-4">
                    <Button
                      onClick={generateImages}
                      disabled={isGenerating || userModels.length === 0}
                      className="bg-[#1eb8cd] hover:bg-[#19a3b6] text-white"
                    >
                      Generate More
                    </Button>
                  </div>
                </>
              ) : (
                <Card className="h-full bg-black border-zinc-800/50">
                  <CardContent className="h-full flex flex-col items-center justify-center py-16">
                    <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mb-6">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">No Images Generated Yet</h3>
                    <p className="text-gray-400 text-center max-w-md">
                      Fill out the form on the left to create your first AI-generated image with your trained model.
                    </p>
                  </CardContent>
                </Card>
              )}

              {userModels.length === 0 && !isGenerating && generatedImages.length === 0 && (
                <Card className="mt-6 bg-zinc-900 border-cyan-500/20">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="bg-cyan-500/10 p-2 rounded-full mr-4">
                        <Train className="w-5 h-5 text-cyan-500" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-2 text-white">Train a Model First</h4>
                        <p className="text-sm text-gray-400 mb-4">
                          You need to train at least one model before you can generate images. Train a model with your
                          photos to create a unique AI representation of yourself.
                        </p>
                        <Button asChild className="text-sm">
                          <Link href="/train">Train Your First Model</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

