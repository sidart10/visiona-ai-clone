"use client"

import type React from "react"
import { useState } from "react"
import {
  Home,
  Cpu,
  Image,
  Grid,
  Settings,
  User,
  Search,
  BookOpen,
  MessageCircle,
  Mail,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  HelpCircle,
  Video,
  FileText,
  AlertTriangle,
  Info,
} from "lucide-react"

// Reusable Button Component
type ButtonProps = {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger"
  size?: "sm" | "md" | "lg"
  className?: string
  onClick?: () => void
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  icon?: React.ReactNode
  full?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  disabled = false,
  type = "button",
  icon,
  full = false,
}) => {
  const baseStyles =
    "font-medium inline-flex items-center justify-center transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-teal-500"

  const variantStyles = {
    primary: "bg-teal-500 hover:bg-teal-600 text-white",
    secondary: "bg-gray-700 hover:bg-gray-600 text-white",
    outline: "border border-teal-500 text-teal-500 hover:bg-teal-500/10",
    ghost: "text-teal-500 hover:bg-teal-500/10",
    danger: "bg-red-500 hover:bg-red-600 text-white",
  }

  const sizeStyles = {
    sm: "text-xs px-2 py-1 rounded",
    md: "text-sm px-4 py-2 rounded-md",
    lg: "text-base px-6 py-3 rounded-lg",
  }

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
  const fullStyles = full ? "w-full" : ""

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${fullStyles} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  )
}

// Card Component
type CardProps = {
  children: React.ReactNode
  className?: string
  title?: string
  subtitle?: string
}

const Card: React.FC<CardProps> = ({ children, className = "", title, subtitle }) => {
  return (
    <div className={`bg-black border border-gray-800/50 rounded-lg overflow-hidden ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-gray-800/50">
          <h3 className="text-lg font-medium text-white">{title}</h3>
          {subtitle && <p className="mt-1 text-sm text-gray-400">{subtitle}</p>}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  )
}

// Input Component
type InputProps = {
  label?: string
  type?: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  className?: string
  disabled?: boolean
  id?: string
  error?: string
  hint?: string
  icon?: React.ReactNode
}

const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  className = "",
  disabled = false,
  id,
  error,
  hint,
  icon,
}) => {
  const inputId =
    id || `input-${label?.toLowerCase().replace(/\s+/g, "-") || Math.random().toString(36).substring(2, 9)}`
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-300 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500">{icon}</span>
          </div>
        )}
        <input
          id={inputId}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full bg-gray-900 border ${
            error ? "border-red-500" : "border-gray-700"
          } rounded-md py-2 ${icon ? "pl-10" : "px-3"} pr-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition duration-200`}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
    </div>
  )
}

// Avatar Component
type AvatarProps = {
  src?: string
  alt?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

const Avatar: React.FC<AvatarProps> = ({ src, alt = "User avatar", size = "md", className = "" }) => {
  const sizeStyles = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  }

  const fallback = !src ? (
    <div
      className={`${sizeStyles[size]} rounded-full flex items-center justify-center bg-gradient-to-br from-teal-400 to-purple-500 text-white font-bold ${className}`}
    >
      {alt.slice(0, 2).toUpperCase()}
    </div>
  ) : null

  return src ? (
    <img
      src={src || "/placeholder.svg"}
      alt={alt}
      className={`${sizeStyles[size]} rounded-full object-cover ${className}`}
    />
  ) : (
    fallback
  )
}

// Badge Component
type BadgeProps = {
  children: React.ReactNode
  variant?: "default" | "success" | "warning" | "danger" | "info"
  className?: string
}

const Badge: React.FC<BadgeProps> = ({ children, variant = "default", className = "" }) => {
  const variantStyles = {
    default: "bg-gray-700 text-gray-200",
    success: "bg-green-500/20 text-green-500",
    warning: "bg-yellow-500/20 text-yellow-500",
    danger: "bg-red-500/20 text-red-500",
    info: "bg-blue-500/20 text-blue-500",
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  )
}

// Separator Component
const Separator: React.FC<{ className?: string }> = ({ className = "" }) => {
  return <div className={`border-t border-gray-800/50 my-4 ${className}`}></div>
}

// FAQ Accordion Component
type FAQItemProps = {
  question: string
  answer: React.ReactNode
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-800/50 last:border-b-0">
      <button className="flex justify-between items-center w-full py-4 text-left" onClick={() => setIsOpen(!isOpen)}>
        <h3 className="text-white font-medium">{question}</h3>
        <span className="text-teal-500">{isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</span>
      </button>
      {isOpen && <div className="pb-4 text-gray-300 text-sm space-y-2">{answer}</div>}
    </div>
  )
}

// Help Category Card Component
type HelpCategoryProps = {
  title: string
  description: string
  icon: React.ReactNode
  onClick: () => void
}

const HelpCategory: React.FC<HelpCategoryProps> = ({ title, description, icon, onClick }) => {
  return (
    <div
      className="bg-black border border-gray-800/50 rounded-lg p-6 hover:border-teal-500/50 hover:shadow-md hover:shadow-teal-500/10 transition-all duration-200 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start">
        <div className="p-3 bg-teal-500/10 rounded-lg mr-4">
          <span className="text-teal-500">{icon}</span>
        </div>
        <div>
          <h3 className="text-white font-medium mb-2">{title}</h3>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
      </div>
    </div>
  )
}

// Knowledge Base Article Component
type KnowledgeBaseArticleProps = {
  title: string
  excerpt: string
  category: string
  onClick: () => void
}

const KnowledgeBaseArticle: React.FC<KnowledgeBaseArticleProps> = ({ title, excerpt, category, onClick }) => {
  return (
    <div
      className="border-b border-gray-800/50 last:border-b-0 py-4 cursor-pointer hover:bg-gray-900/20 px-4 -mx-4 rounded"
      onClick={onClick}
    >
      <h3 className="text-white font-medium mb-1">{title}</h3>
      <p className="text-gray-400 text-sm mb-2">{excerpt}</p>
      <Badge variant="default">{category}</Badge>
    </div>
  )
}

// Textarea Component
type TextareaProps = {
  label?: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  required?: boolean
  className?: string
  disabled?: boolean
  id?: string
  error?: string
  hint?: string
  rows?: number
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  placeholder,
  value,
  onChange,
  required = false,
  className = "",
  disabled = false,
  id,
  error,
  hint,
  rows = 4,
}) => {
  const textareaId =
    id || `textarea-${label?.toLowerCase().replace(/\s+/g, "-") || Math.random().toString(36).substring(2, 9)}`
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={textareaId} className="block text-sm font-medium text-gray-300 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        rows={rows}
        className={`w-full bg-gray-900 border ${
          error ? "border-red-500" : "border-gray-700"
        } rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition duration-200`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
    </div>
  )
}

// Select Component
type SelectProps = {
  label?: string
  options: { value: string; label: string }[]
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  required?: boolean
  className?: string
  disabled?: boolean
  id?: string
  error?: string
  hint?: string
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  required = false,
  className = "",
  disabled = false,
  id,
  error,
  hint,
}) => {
  const selectId =
    id || `select-${label?.toLowerCase().replace(/\s+/g, "-") || Math.random().toString(36).substring(2, 9)}`
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-gray-300 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        id={selectId}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full bg-gray-900 border ${
          error ? "border-red-500" : "border-gray-700"
        } rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition duration-200`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
    </div>
  )
}

// Main Help/Support Page Component
export default function HelpSupportPage() {
  // Navigation state
  const [activeNav, setActiveNav] = useState("help")

  // User profile state (mock data)
  const [userProfile, setUserProfile] = useState({
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    avatarUrl: "",
    plan: "premium",
  })

  // Search state
  const [searchQuery, setSearchQuery] = useState("")

  // Active section state
  const [activeSection, setActiveSection] = useState<"home" | "faq" | "kb" | "contact">("home")

  // Search results state
  const [searchResults, setSearchResults] = useState<any[]>([])

  // FAQ Data
  const faqData = [
    {
      question: "How do I train my first AI model?",
      answer: (
        <>
          <p>Training your first AI model with Visiona is simple:</p>
          <ol className="list-decimal list-inside pl-4 mt-2 space-y-1">
            <li>Navigate to the "Train Model" section</li>
            <li>Upload 10-20 clear photos of yourself (front-facing with good lighting)</li>
            <li>Choose a unique trigger word that will be used to generate images</li>
            <li>Click "Start Training" and wait for the process to complete (typically 5-10 minutes)</li>
          </ol>
          <p className="mt-2">You'll receive a notification when your model is ready to use!</p>
        </>
      ),
    },
    {
      question: "What types of photos work best for training?",
      answer: (
        <>
          <p>For optimal training results, use photos that:</p>
          <ul className="list-disc list-inside pl-4 mt-2 space-y-1">
            <li>Show your face clearly (front-facing preferred)</li>
            <li>Have good, even lighting</li>
            <li>Include different expressions and angles (but not extreme angles)</li>
            <li>Have neutral or simple backgrounds</li>
            <li>Avoid heavy filters or editing</li>
          </ul>
          <p className="mt-2">Including 10-20 diverse photos will help create a more versatile AI model.</p>
        </>
      ),
    },
    {
      question: "How many images can I generate per day?",
      answer: (
        <>
          <p>Your image generation limits depend on your subscription tier:</p>
          <ul className="list-disc list-inside pl-4 mt-2 space-y-1">
            <li>
              <strong>Free tier:</strong> 20 images per day
            </li>
            <li>
              <strong>Premium tier:</strong> 100 images per day
            </li>
            <li>
              <strong>Professional tier:</strong> Unlimited images
            </li>
          </ul>
          <p className="mt-2">
            Usage counters reset at midnight UTC. Unused generations do not roll over to the next day.
          </p>
        </>
      ),
    },
    {
      question: "Why are my generated images not looking like me?",
      answer: (
        <>
          <p>If your generated images don't resemble you accurately, try these troubleshooting steps:</p>
          <ul className="list-disc list-inside pl-4 mt-2 space-y-1">
            <li>Ensure you've uploaded enough clear, well-lit photos (10-20 recommended)</li>
            <li>Use your exact trigger word in the prompt</li>
            <li>Avoid complex prompts with conflicting descriptions</li>
            <li>Try adjusting the guidance scale (higher values stick closer to your appearance)</li>
            <li>Create a new model with better quality photos if necessary</li>
          </ul>
          <p className="mt-2">Remember that more specific prompts tend to work better than vague ones.</p>
        </>
      ),
    },
    {
      question: "How do I cancel my subscription?",
      answer: (
        <>
          <p>To cancel your subscription:</p>
          <ol className="list-decimal list-inside pl-4 mt-2 space-y-1">
            <li>Go to Account Settings</li>
            <li>Select "Billing & Plan"</li>
            <li>Click on "Cancel Subscription"</li>
            <li>Follow the confirmation steps</li>
          </ol>
          <p className="mt-2">
            Your subscription will remain active until the end of your current billing period. After cancellation, your
            account will revert to the free tier.
          </p>
        </>
      ),
    },
    {
      question: "What payment methods do you accept?",
      answer: (
        <>
          <p>Visiona accepts the following payment methods:</p>
          <ul className="list-disc list-inside pl-4 mt-2 space-y-1">
            <li>All major credit cards (Visa, Mastercard, American Express, Discover)</li>
            <li>PayPal</li>
            <li>Apple Pay (on supported devices)</li>
            <li>Google Pay (on supported devices)</li>
          </ul>
          <p className="mt-2">
            All payments are securely processed through Stripe, and we never store your complete payment information.
          </p>
        </>
      ),
    },
  ]

  // Knowledge Base Articles
  const kbArticles = [
    {
      id: "kb001",
      title: "Getting Started with Visiona",
      excerpt: "Learn the basics of creating your first AI model and generating images.",
      category: "Basics",
      content: "Full article content here...",
    },
    {
      id: "kb002",
      title: "Advanced Prompt Engineering",
      excerpt: "Techniques to craft detailed prompts that produce better results.",
      category: "Advanced",
      content: "Full article content here...",
    },
    {
      id: "kb003",
      title: "Troubleshooting Common Generation Issues",
      excerpt: "Solutions for common problems with image generation quality.",
      category: "Troubleshooting",
      content: "Full article content here...",
    },
    {
      id: "kb004",
      title: "Managing Your AI Models",
      excerpt: "How to create, update, and delete your custom AI models.",
      category: "Models",
      content: "Full article content here...",
    },
    {
      id: "kb005",
      title: "Using the Gallery to Organize Images",
      excerpt: "Tips for organizing and managing your generated images.",
      category: "Gallery",
      content: "Full article content here...",
    },
  ]

  // Contact form state
  const [contactForm, setContactForm] = useState({
    subject: "",
    message: "",
    category: "general",
  })

  // Handlers
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock search functionality - would be replaced with actual search logic
    const results = [
      ...kbArticles.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
      ...faqData
        .filter((faq) => faq.question.toLowerCase().includes(searchQuery.toLowerCase()))
        .map((faq) => ({
          id: `faq-${faqData.indexOf(faq)}`,
          title: faq.question,
          excerpt: "FAQ item",
          category: "FAQ",
          content: faq.answer,
        })),
    ]
    setSearchResults(results)
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Contact form submission logic would go here
    console.log("Contact form submitted", contactForm)
    // Reset form or show success message
    alert("Your message has been sent! Our support team will get back to you soon.")
    setContactForm({
      subject: "",
      message: "",
      category: "general",
    })
    setActiveSection("home")
  }

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <Home size={20} /> },
    { id: "train-model", label: "Train Model", icon: <Cpu size={20} /> },
    { id: "generate-images", label: "Generate Images", icon: <Image size={20} /> },
    { id: "gallery", label: "Gallery", icon: <Grid size={20} /> },
    { id: "help", label: "Help & Support", icon: <HelpCircle size={20} /> },
    { id: "settings", label: "Settings", icon: <Settings size={20} /> },
  ]

  // Quick help links
  const quickLinks = [
    { title: "Getting Started", icon: <BookOpen size={20} />, section: "kb" as const },
    { title: "FAQs", icon: <MessageCircle size={20} />, section: "faq" as const },
    { title: "Contact Support", icon: <Mail size={20} />, section: "contact" as const },
  ]

  // Help categories
  const helpCategories = [
    {
      title: "Using Visiona",
      description: "Learn how to use the platform and create your first AI model",
      icon: <BookOpen size={24} />,
      section: "kb" as const,
    },
    {
      title: "Troubleshooting",
      description: "Solutions for common issues and error messages",
      icon: <AlertTriangle size={24} />,
      section: "kb" as const,
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video guides for all features",
      icon: <Video size={24} />,
      section: "kb" as const,
    },
    {
      title: "Billing & Account",
      description: "Questions about subscriptions, payments, and account settings",
      icon: <FileText size={24} />,
      section: "kb" as const,
    },
  ]

  return (
    <div className="flex h-screen bg-black text-white font-['Inter']">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-gray-800/50">
        <div className="p-6">
          <h1 className="text-xl font-semibold text-white">Visiona</h1>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`flex items-center px-4 py-3 rounded-md text-sm transition duration-200 ${
                activeNav === item.id
                  ? "bg-gray-800/50 text-teal-500"
                  : "text-gray-400 hover:text-white hover:bg-gray-800/20"
              }`}
              onClick={() => setActiveNav(item.id)}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-gray-800/50">
          <div className="flex items-center mb-4">
            <Avatar size="md" alt={userProfile.name} />
            <div className="ml-3">
              <p className="text-sm font-medium text-white">{userProfile.name}</p>
              <Badge variant={userProfile.plan === "premium" ? "success" : "default"}>
                {userProfile.plan === "premium" ? "Premium" : "Free"}
              </Badge>
            </div>
          </div>
          <a
            href="#profile"
            className="flex items-center justify-between text-gray-400 hover:text-white text-sm p-2 rounded-md hover:bg-gray-800/20 transition duration-200"
          >
            <div className="flex items-center">
              <User size={16} className="mr-2" />
              <span>View Profile</span>
            </div>
            <ChevronRight size={14} />
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-black border-b border-gray-800/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Help & Support</h1>
            <div className="flex items-center space-x-4">
              <a
                href="#back"
                className="flex items-center text-gray-400 hover:text-white text-sm"
                onClick={() => setActiveSection("home")}
              >
                {activeSection !== "home" && (
                  <>
                    <ChevronRight size={16} className="mr-1 transform rotate-180" />
                    <span>Back to Help Center</span>
                  </>
                )}
              </a>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 max-w-5xl mx-auto">
          {/* Search Bar */}
          <div className="mb-8">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Input
                  placeholder="Search for help articles, tutorials, FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={<Search size={18} />}
                  className="mb-0"
                />
                <Button type="submit" variant="primary" className="absolute right-1 top-1 bottom-1">
                  Search
                </Button>
              </div>
            </form>
          </div>

          {/* Search Results */}
          {searchQuery && searchResults.length > 0 && (
            <Card className="mb-8" title="Search Results">
              <div className="space-y-4">
                {searchResults.map((result) => (
                  <div key={result.id} className="border-b border-gray-800/50 last:border-b-0 pb-4">
                    <h3 className="text-white font-medium mb-1">{result.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">{result.excerpt}</p>
                    <Badge variant="default">{result.category}</Badge>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {searchQuery && searchResults.length === 0 && (
            <Card className="mb-8 text-center py-10">
              <div className="flex flex-col items-center">
                <Search size={48} className="text-gray-600 mb-4" />
                <h3 className="text-white text-lg font-medium mb-2">No results found</h3>
                <p className="text-gray-400 mb-4">We couldn't find any matches for "{searchQuery}"</p>
                <Button
                  variant="secondary"
                  onClick={() => setActiveSection("contact")}
                  icon={<MessageCircle size={16} />}
                >
                  Contact Support
                </Button>
              </div>
            </Card>
          )}

          {/* Home Section */}
          {!searchQuery && activeSection === "home" && (
            <>
              {/* Welcome Card */}
              <Card className="mb-8">
                <div className="text-center py-6">
                  <h2 className="text-2xl font-semibold text-white mb-2">How can we help you?</h2>
                  <p className="text-gray-400 mb-6">Find answers to common questions or contact our support team</p>
                  <div className="flex flex-wrap justify-center gap-4">
                    {quickLinks.map((link) => (
                      <Button
                        key={link.title}
                        variant="secondary"
                        icon={link.icon}
                        onClick={() => setActiveSection(link.section)}
                      >
                        {link.title}
                      </Button>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Help Categories */}
              <h2 className="text-xl font-semibold text-white mb-4">Browse by Category</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {helpCategories.map((category) => (
                  <HelpCategory
                    key={category.title}
                    title={category.title}
                    description={category.description}
                    icon={category.icon}
                    onClick={() => setActiveSection(category.section)}
                  />
                ))}
              </div>

              {/* Popular Articles */}
              <h2 className="text-xl font-semibold text-white mb-4">Popular Articles</h2>
              <Card className="mb-8">
                <div className="space-y-0">
                  {kbArticles.slice(0, 3).map((article) => (
                    <KnowledgeBaseArticle
                      key={article.id}
                      title={article.title}
                      excerpt={article.excerpt}
                      category={article.category}
                      onClick={() => {
                        setActiveSection("kb")
                        // Logic to display specific article would go here
                      }}
                    />
                  ))}
                </div>
              </Card>

              {/* Still Need Help */}
              <Card>
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-white font-medium mb-2">Still Need Help?</h3>
                    <p className="text-gray-400 text-sm">
                      Contact our support team and we'll get back to you as soon as possible.
                    </p>
                  </div>
                  <Button
                    variant="primary"
                    icon={<MessageCircle size={18} />}
                    onClick={() => setActiveSection("contact")}
                  >
                    Contact Support
                  </Button>
                </div>
              </Card>
            </>
          )}

          {/* FAQ Section */}
          {activeSection === "faq" && (
            <Card title="Frequently Asked Questions" className="mb-8">
              <div className="space-y-0">
                {faqData.map((faq, index) => (
                  <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </Card>
          )}

          {/* Knowledge Base Section */}
          {activeSection === "kb" && (
            <>
              <h2 className="text-xl font-semibold text-white mb-4">Knowledge Base</h2>

              {/* Articles by Category */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                {/* Categories Sidebar */}
                <div className="md:col-span-3">
                  <Card>
                    <h3 className="text-white font-medium mb-2">Categories</h3>
                    <nav className="space-y-1">
                      <a
                        href="#all"
                        className="block px-3 py-2 rounded-md text-gray-400 hover:bg-gray-800/50 hover:text-white"
                      >
                        All Articles
                      </a>
                      <a
                        href="#basics"
                        className="block px-3 py-2 rounded-md text-gray-400 hover:bg-gray-800/50 hover:text-white"
                      >
                        Basics
                      </a>
                      <a
                        href="#advanced"
                        className="block px-3 py-2 rounded-md text-gray-400 hover:bg-gray-800/50 hover:text-white"
                      >
                        Advanced
                      </a>
                      <a
                        href="#troubleshooting"
                        className="block px-3 py-2 rounded-md text-gray-400 hover:bg-gray-800/50 hover:text-white"
                      >
                        Troubleshooting
                      </a>
                      <a
                        href="#models"
                        className="block px-3 py-2 rounded-md text-gray-400 hover:bg-gray-800/50 hover:text-white"
                      >
                        Models
                      </a>
                      <a
                        href="#gallery"
                        className="block px-3 py-2 rounded-md text-gray-400 hover:bg-gray-800/50 hover:text-white"
                      >
                        Gallery
                      </a>
                    </nav>
                  </Card>
                </div>

                {/* Articles List */}
                <div className="md:col-span-9">
                  <Card>
                    <div className="space-y-0">
                      {kbArticles.map((article) => (
                        <KnowledgeBaseArticle
                          key={article.id}
                          title={article.title}
                          excerpt={article.excerpt}
                          category={article.category}
                          onClick={() => {
                            // Logic to display specific article would go here
                          }}
                        />
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            </>
          )}

          {/* Contact Support Section */}
          {activeSection === "contact" && (
            <>
              <h2 className="text-xl font-semibold text-white mb-4">Contact Support</h2>
              <Card className="mb-8">
                <form onSubmit={handleContactSubmit}>
                  <Select
                    label="Category"
                    options={[
                      { value: "general", label: "General Inquiry" },
                      { value: "technical", label: "Technical Issue" },
                      { value: "billing", label: "Billing Question" },
                      { value: "feature", label: "Feature Request" },
                    ]}
                    value={contactForm.category}
                    onChange={(e) => setContactForm({ ...contactForm, category: e.target.value })}
                    required
                  />

                  <Input
                    label="Subject"
                    placeholder="Brief description of your issue"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    required
                  />

                  <Textarea
                    label="Message"
                    placeholder="Please provide as much detail as possible"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    required
                    rows={6}
                  />

                  <div className="flex justify-end mt-6">
                    <Button type="submit" variant="primary" disabled={!contactForm.subject || !contactForm.message}>
                      Send Message
                    </Button>
                  </div>
                </form>
              </Card>

              <Card>
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium mb-2">Other Ways to Reach Us</h3>
                    <div className="space-y-2 text-gray-400 text-sm">
                      <p className="flex items-center">
                        <Mail size={16} className="mr-2 text-teal-500" />
                        support@visiona.ai
                      </p>
                      <p className="flex items-center">
                        <MessageCircle size={16} className="mr-2 text-teal-500" />
                        Live chat available Monday-Friday, 9am-5pm EST
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <Badge variant="info" className="flex items-center">
                      <Info size={14} className="mr-1" />
                      Typical response time: 24 hours
                    </Badge>
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

