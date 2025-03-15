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
  CreditCard,
  Check,
  Star,
  Shield,
  Zap,
  Clock,
  Info,
  ChevronRight,
  AlertTriangle,
  Award,
  Download,
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
  label: string
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
}) => {
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, "-")}`
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={inputId} className="block text-sm font-medium text-gray-300 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full bg-gray-900 border ${
          error ? "border-red-500" : "border-gray-700"
        } rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition duration-200`}
      />
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
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium z-10 ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  )
}

// Separator Component
const Separator: React.FC<{ className?: string }> = ({ className = "" }) => {
  return <div className={`border-t border-gray-800/50 my-4 ${className}`}></div>
}

// Credit Card Input Component
type CreditCardInputProps = {
  cardNumber: string
  setCardNumber: (value: string) => void
  cardName: string
  setCardName: (value: string) => void
  expiryDate: string
  setExpiryDate: (value: string) => void
  cvv: string
  setCvv: (value: string) => void
  errors: {
    cardNumber?: string
    cardName?: string
    expiryDate?: string
    cvv?: string
  }
}

const CreditCardInput: React.FC<CreditCardInputProps> = ({
  cardNumber,
  setCardNumber,
  cardName,
  setCardName,
  expiryDate,
  setExpiryDate,
  cvv,
  setCvv,
  errors,
}) => {
  // Format card number with spaces
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, "")
    if (value.length <= 16 && /^\d*$/.test(value)) {
      // Format with spaces every 4 digits
      const formatted = value.replace(/(\d{4})(?=\d)/g, "$1 ")
      setCardNumber(formatted)
    }
  }

  // Format expiry date as MM/YY
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 4) {
      const formatted = value.length > 2 ? `${value.slice(0, 2)}/${value.slice(2)}` : value
      setExpiryDate(formatted)
    }
  }

  // Limit CVV to 3-4 digits
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 4) {
      setCvv(value)
    }
  }

  return (
    <div className="mt-4 mb-6">
      <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800/50">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white font-medium">Payment Details</h3>
          <div className="flex space-x-2">
            <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-xs text-white font-bold">VISA</span>
            </div>
            <div className="w-8 h-5 bg-orange-600 rounded flex items-center justify-center">
              <span className="text-xs text-white font-bold">MC</span>
            </div>
          </div>
        </div>

        <Input
          label="Card Number"
          value={cardNumber}
          onChange={handleCardNumberChange}
          placeholder="1234 5678 9012 3456"
          required
          error={errors.cardNumber}
        />

        <Input
          label="Cardholder Name"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          placeholder="John Smith"
          required
          error={errors.cardName}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Expiry Date"
            value={expiryDate}
            onChange={handleExpiryChange}
            placeholder="MM/YY"
            required
            error={errors.expiryDate}
          />

          <Input
            label="CVV"
            value={cvv}
            onChange={handleCvvChange}
            placeholder="123"
            type="password"
            required
            error={errors.cvv}
          />
        </div>

        <div className="mt-4 flex items-start">
          <Shield size={16} className="text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
          <p className="text-xs text-gray-400">
            Your payment information is encrypted and secure. We never store your full card details.
          </p>
        </div>
      </div>
    </div>
  )
}

// PlanCard Component
type PlanCardProps = {
  title: string
  price: string
  period: string
  features: string[]
  isPopular?: boolean
  isSelected?: boolean
  onSelect: () => void
}

const PlanCard: React.FC<PlanCardProps> = ({
  title,
  price,
  period,
  features,
  isPopular = false,
  isSelected = false,
  onSelect,
}) => {
  return (
    <div
      className={`${
        isSelected ? "border-teal-500 ring-2 ring-teal-500/20" : "border-gray-800/50 hover:border-gray-700"
      } bg-black border rounded-lg p-6 transition-all duration-200 cursor-pointer relative`}
      onClick={onSelect}
    >
      {isPopular && (
        <Badge variant="info" className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3">
          Most Popular
        </Badge>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-white">{price}</span>
          <span className="text-sm text-gray-400 ml-1">/{period}</span>
        </div>
      </div>

      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check size={16} className="text-teal-500 mt-0.5 mr-2 flex-shrink-0" />
            <span className="text-sm text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <Button variant={isSelected ? "primary" : "outline"} full>
          {isSelected ? "Selected" : "Select Plan"}
        </Button>
      </div>
    </div>
  )
}

// BillingHistory Component
type BillingHistoryItemProps = {
  date: string
  amount: string
  status: "paid" | "pending" | "failed"
  invoiceUrl: string
}

const BillingHistoryItem: React.FC<BillingHistoryItemProps> = ({ date, amount, status, invoiceUrl }) => {
  const statusStyles = {
    paid: "text-green-500",
    pending: "text-yellow-500",
    failed: "text-red-500",
  }

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-800/50 last:border-b-0">
      <div>
        <p className="text-sm text-white">{date}</p>
        <p className="text-xs text-gray-400">Premium Plan</p>
      </div>
      <div className="text-right">
        <p className="text-sm text-white">{amount}</p>
        <p className={`text-xs ${statusStyles[status]}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</p>
      </div>
      <Button variant="ghost" size="sm" icon={<Download size={14} />}>
        Receipt
      </Button>
    </div>
  )
}

// Main Subscription Page Component
export default function SubscriptionPage() {
  // Navigation state
  const [activeNav, setActiveNav] = useState("subscriptions")

  // User profile state (mock data)
  const [userProfile, setUserProfile] = useState({
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    avatarUrl: "",
    plan: "premium",
  })

  // Plans data
  const plans = [
    {
      id: "free",
      title: "Free",
      price: "$0",
      period: "forever",
      features: [
        "5 AI models lifetime",
        "20 generations per day",
        "Standard generation quality",
        "Community support",
        "Basic prompt enhancement",
      ],
      isPopular: false,
    },
    {
      id: "premium",
      title: "Premium",
      price: "$19.99",
      period: "month",
      features: [
        "Unlimited AI models",
        "100 generations per day",
        "High-quality generation",
        "Priority processing",
        "Advanced prompt enhancement",
        "24/7 support",
      ],
      isPopular: true,
    },
    {
      id: "pro",
      title: "Professional",
      price: "$49.99",
      period: "month",
      features: [
        "Unlimited AI models",
        "Unlimited generations",
        "Highest quality generation",
        "Priority processing",
        "Advanced prompt enhancement",
        "Custom trigger words",
        "API access",
        "Dedicated support",
      ],
      isPopular: false,
    },
  ]

  // Billing history data
  const billingHistory = [
    {
      id: "inv_001",
      date: "Mar 1, 2025",
      amount: "$19.99",
      status: "paid" as const,
      invoiceUrl: "#",
    },
    {
      id: "inv_002",
      date: "Feb 1, 2025",
      amount: "$19.99",
      status: "paid" as const,
      invoiceUrl: "#",
    },
    {
      id: "inv_003",
      date: "Jan 1, 2025",
      amount: "$19.99",
      status: "paid" as const,
      invoiceUrl: "#",
    },
  ]

  // Selected plan state
  const [selectedPlan, setSelectedPlan] = useState("premium")

  // Billing cycle state
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")

  // Credit card form state
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })

  // Form errors state
  const [formErrors, setFormErrors] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })

  // Handlers
  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
  }

  const handleBillingCycleChange = (cycle: "monthly" | "annual") => {
    setBillingCycle(cycle)
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Validate form
    const errors = {
      cardNumber:
        cardDetails.cardNumber.replace(/\s/g, "").length !== 16 ? "Please enter a valid 16-digit card number" : "",
      cardName: !cardDetails.cardName ? "Please enter the cardholder name" : "",
      expiryDate: !/^\d{2}\/\d{2}$/.test(cardDetails.expiryDate) ? "Please enter a valid expiry date (MM/YY)" : "",
      cvv: !/^\d{3,4}$/.test(cardDetails.cvv) ? "Please enter a valid CVV code" : "",
    }

    setFormErrors(errors)

    // Check if there are any errors
    if (!Object.values(errors).some((error) => error)) {
      // Submit form logic would go here
      console.log("Subscription submitted")
      // Show success message or redirect
    }
  }

  const calculateSavings = () => {
    const monthlyRate = 19.99
    const annualRate = 199.99
    const annualSavings = monthlyRate * 12 - annualRate
    return annualSavings.toFixed(2)
  }

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <Home size={20} /> },
    { id: "train-model", label: "Train Model", icon: <Cpu size={20} /> },
    { id: "generate-images", label: "Generate Images", icon: <Image size={20} /> },
    { id: "gallery", label: "Gallery", icon: <Grid size={20} /> },
    { id: "settings", label: "Settings", icon: <Settings size={20} /> },
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
            <h1 className="text-xl font-semibold">Subscription & Billing</h1>
            <div className="flex items-center space-x-4">
              <Badge variant="success" className="hidden sm:flex">
                <Clock size={12} className="mr-1" />
                22 days remaining
              </Badge>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 max-w-6xl mx-auto">
          {/* Current Subscription Overview */}
          <Card className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-white mb-2">Current Plan: Premium</h2>
                <p className="text-sm text-gray-400 mb-4">
                  Your subscription renews on <span className="text-white">April 15, 2025</span>
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="info" className="flex items-center">
                    <Zap size={12} className="mr-1" />
                    100 generations/day
                  </Badge>
                  <Badge variant="info" className="flex items-center">
                    <Star size={12} className="mr-1" />
                    Unlimited models
                  </Badge>
                  <Badge variant="info" className="flex items-center">
                    <Award size={12} className="mr-1" />
                    Priority processing
                  </Badge>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
                <Button variant="outline" icon={<CreditCard size={16} />}>
                  Manage Payment
                </Button>
                <Button variant="secondary" icon={<Settings size={16} />}>
                  Change Plan
                </Button>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              {/* Plan Selector */}
              <Card
                title="Choose Your Plan"
                subtitle="Select the plan that best fits your creative needs"
                className="mb-6"
              >
                <div className="flex justify-center mb-6">
                  <div className="inline-flex rounded-md shadow-sm bg-gray-900 p-1">
                    <button
                      type="button"
                      className={`px-4 py-2 text-sm font-medium rounded-md ${
                        billingCycle === "monthly" ? "bg-teal-500 text-white" : "text-gray-300 hover:bg-gray-800"
                      }`}
                      onClick={() => handleBillingCycleChange("monthly")}
                    >
                      Monthly
                    </button>
                    <button
                      type="button"
                      className={`px-4 py-2 text-sm font-medium rounded-md ${
                        billingCycle === "annual" ? "bg-teal-500 text-white" : "text-gray-300 hover:bg-gray-800"
                      }`}
                      onClick={() => handleBillingCycleChange("annual")}
                    >
                      Annual <span className="text-xs opacity-80">Save ${calculateSavings()}</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {plans.map((plan) => (
                    <PlanCard
                      key={plan.id}
                      title={plan.title}
                      price={
                        billingCycle === "annual"
                          ? plan.id === "free"
                            ? "$0"
                            : plan.id === "premium"
                              ? "$199.99"
                              : "$499.99"
                          : plan.price
                      }
                      period={billingCycle === "annual" ? "year" : plan.period}
                      features={plan.features}
                      isPopular={plan.isPopular}
                      isSelected={selectedPlan === plan.id}
                      onSelect={() => handlePlanSelect(plan.id)}
                    />
                  ))}
                </div>
              </Card>

              {/* Payment Form */}
              {selectedPlan !== "free" && (
                <Card title="Payment Information" className="mb-6">
                  <form onSubmit={handleSubscribe}>
                    <CreditCardInput
                      cardNumber={cardDetails.cardNumber}
                      setCardNumber={(value) => setCardDetails({ ...cardDetails, cardNumber: value })}
                      cardName={cardDetails.cardName}
                      setCardName={(value) => setCardDetails({ ...cardDetails, cardName: value })}
                      expiryDate={cardDetails.expiryDate}
                      setExpiryDate={(value) => setCardDetails({ ...cardDetails, expiryDate: value })}
                      cvv={cardDetails.cvv}
                      setCvv={(value) => setCardDetails({ ...cardDetails, cvv: value })}
                      errors={formErrors}
                    />

                    <div className="flex items-center bg-gray-900/30 p-4 rounded-md mb-6">
                      <Info size={18} className="text-teal-500 mr-3 flex-shrink-0" />
                      <p className="text-sm text-gray-300">
                        You're subscribing to the {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} plan,
                        billed {billingCycle === "monthly" ? "monthly" : "annually"}. You can cancel or change your
                        subscription at any time.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                      <Button type="submit" variant="primary" size="lg" icon={<CreditCard size={18} />}>
                        Subscribe Now
                      </Button>
                      <p className="text-xs text-gray-400">
                        By subscribing, you agree to our Terms of Service and Privacy Policy.
                      </p>
                    </div>
                  </form>
                </Card>
              )}
            </div>

            <div className="lg:col-span-1">
              {/* Usage Stats */}
              <Card title="Current Usage" className="mb-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-300">AI Models Created</span>
                      <span className="text-sm text-white">
                        8 <span className="text-gray-400">/ Unlimited</span>
                      </span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div className="bg-teal-500 h-2 rounded-full" style={{ width: "20%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-300">Daily Generations</span>
                      <span className="text-sm text-white">
                        42 <span className="text-gray-400">/ 100</span>
                      </span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div className="bg-teal-500 h-2 rounded-full" style={{ width: "42%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-300">Storage Used</span>
                      <span className="text-sm text-white">
                        1.2 GB <span className="text-gray-400">/ 10 GB</span>
                      </span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div className="bg-teal-500 h-2 rounded-full" style={{ width: "12%" }}></div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Billing History */}
              <Card title="Billing History" className="mb-6">
                <div className="space-y-1">
                  {billingHistory.map((item) => (
                    <BillingHistoryItem
                      key={item.id}
                      date={item.date}
                      amount={item.amount}
                      status={item.status}
                      invoiceUrl={item.invoiceUrl}
                    />
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="ghost" size="sm" full>
                    View All Invoices
                  </Button>
                </div>
              </Card>

              {/* Need Help */}
              <Card className="mb-6">
                <div className="flex items-start">
                  <div className="bg-gray-800/50 rounded-full p-3 mr-4">
                    <AlertTriangle size={20} className="text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Need Help?</h3>
                    <p className="text-sm text-gray-400 mb-3">
                      Our support team is available 24/7 to assist you with any questions.
                    </p>
                    <Button variant="outline" size="sm">
                      Contact Support
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

