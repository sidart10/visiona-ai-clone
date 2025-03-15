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
  Camera,
  LogOut,
  CreditCard,
  Key,
  Trash2,
  Save,
  Bell,
  InfoIcon,
  ChevronRight,
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

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
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
}

const Card: React.FC<CardProps> = ({ children, className = "", title }) => {
  return (
    <div className={`bg-black border border-gray-800/50 rounded-lg overflow-hidden ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-gray-800/50">
          <h3 className="text-lg font-medium text-white">{title}</h3>
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

// Toggle Component
type ToggleProps = {
  checked: boolean
  onChange: () => void
  label?: string
  disabled?: boolean
}

const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label, disabled = false }) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <div className="relative">
        <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} disabled={disabled} />
        <div
          className={`block w-10 h-6 rounded-full ${checked ? "bg-teal-500" : "bg-gray-700"} transition duration-200`}
        ></div>
        <div
          className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${
            checked ? "transform translate-x-4" : ""
          } ${disabled ? "opacity-50" : ""}`}
        ></div>
      </div>
      {label && <span className="ml-3 text-sm text-gray-300">{label}</span>}
    </label>
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

// Main Account Page Component
const AccountPage: React.FC = () => {
  // Navigation state
  const [activeNav, setActiveNav] = useState("settings")

  // User profile state (mock data)
  const [userProfile, setUserProfile] = useState({
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    avatarUrl: "",
    plan: "premium",
    notifications: {
      email: true,
      modelCompletion: true,
      marketingUpdates: false,
    },
    apiKey: "vsk_live_J63tHu29sdGj23kLm...",
  })

  // Form states
  const [profileForm, setProfileForm] = useState({
    name: userProfile.name,
    email: userProfile.email,
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Payment method state (mock data)
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: "pm_1",
      type: "visa",
      last4: "4242",
      expMonth: 12,
      expYear: 2024,
      isDefault: true,
    },
  ])

  // Handlers
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Update profile logic would go here
    setUserProfile({
      ...userProfile,
      name: profileForm.name,
      email: profileForm.email,
    })
    // Show success notification logic
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Password update logic would go here
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
    // Show success notification logic
  }

  const handleNotificationToggle = (key: keyof typeof userProfile.notifications) => {
    setUserProfile({
      ...userProfile,
      notifications: {
        ...userProfile.notifications,
        [key]: !userProfile.notifications[key],
      },
    })
  }

  const regenerateApiKey = () => {
    // API key regeneration logic would go here
    setUserProfile({
      ...userProfile,
      apiKey: "vsk_live_" + Math.random().toString(36).substring(2, 15),
    })
    // Show success notification logic
  }

  const handleDeletePaymentMethod = (id: string) => {
    // Delete payment method logic would go here
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id))
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
          <Button variant="ghost" size="sm" className="w-full justify-start text-gray-400" icon={<LogOut size={16} />}>
            Sign out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-black border-b border-gray-800/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Account Settings</h1>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" icon={<Bell size={18} />}>
                Notifications
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Settings Navigation */}
            <div className="md:col-span-1">
              <Card>
                <nav className="space-y-1">
                  <a
                    href="#profile"
                    className="flex items-center justify-between px-3 py-2 rounded-md text-teal-500 bg-teal-500/10"
                  >
                    <div className="flex items-center">
                      <User size={18} className="mr-2" />
                      <span>Profile</span>
                    </div>
                    <ChevronRight size={16} />
                  </a>
                  <a
                    href="#billing"
                    className="flex items-center justify-between px-3 py-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800/50"
                  >
                    <div className="flex items-center">
                      <CreditCard size={18} className="mr-2" />
                      <span>Billing & Plan</span>
                    </div>
                    <ChevronRight size={16} />
                  </a>
                  <a
                    href="#security"
                    className="flex items-center justify-between px-3 py-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800/50"
                  >
                    <div className="flex items-center">
                      <Key size={18} className="mr-2" />
                      <span>Security</span>
                    </div>
                    <ChevronRight size={16} />
                  </a>
                  <a
                    href="#notifications"
                    className="flex items-center justify-between px-3 py-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800/50"
                  >
                    <div className="flex items-center">
                      <Bell size={18} className="mr-2" />
                      <span>Notifications</span>
                    </div>
                    <ChevronRight size={16} />
                  </a>
                  <a
                    href="#api"
                    className="flex items-center justify-between px-3 py-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800/50"
                  >
                    <div className="flex items-center">
                      <Cpu size={18} className="mr-2" />
                      <span>API Access</span>
                    </div>
                    <ChevronRight size={16} />
                  </a>
                </nav>
              </Card>

              <div className="mt-6">
                <Card className="bg-gray-900/50">
                  <div className="flex items-start">
                    <InfoIcon size={20} className="text-teal-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-white mb-1">Need help?</h4>
                      <p className="text-xs text-gray-400 mb-2">
                        Check our documentation or contact support for assistance.
                      </p>
                      <Button variant="ghost" size="sm" className="text-xs p-0 h-auto">
                        View documentation
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Main settings area */}
            <div className="md:col-span-2 space-y-6">
              {/* Profile Section */}
              <Card title="Profile Information" id="profile">
                <form onSubmit={handleProfileSubmit}>
                  <div className="flex items-center mb-6">
                    <Avatar size="lg" alt={userProfile.name} />
                    <div className="ml-4">
                      <Button variant="secondary" size="sm" icon={<Camera size={14} />}>
                        Change Photo
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      required
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Button type="submit" variant="primary" icon={<Save size={16} />}>
                      Save Changes
                    </Button>
                  </div>
                </form>
              </Card>

              {/* Security */}
              <Card title="Password & Security" id="security">
                <form onSubmit={handlePasswordSubmit}>
                  <Input
                    label="Current Password"
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    required
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="New Password"
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      required
                    />
                    <Input
                      label="Confirm Password"
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Button type="submit" variant="primary" icon={<Key size={16} />}>
                      Update Password
                    </Button>
                  </div>
                </form>
              </Card>

              {/* Notifications */}
              <Card title="Notification Preferences" id="notifications">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-white">Email Notifications</h4>
                      <p className="text-xs text-gray-400">Receive email updates about your account</p>
                    </div>
                    <Toggle
                      checked={userProfile.notifications.email}
                      onChange={() => handleNotificationToggle("email")}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-white">Model Training Completion</h4>
                      <p className="text-xs text-gray-400">Get notified when your AI model training completes</p>
                    </div>
                    <Toggle
                      checked={userProfile.notifications.modelCompletion}
                      onChange={() => handleNotificationToggle("modelCompletion")}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-white">Marketing Updates</h4>
                      <p className="text-xs text-gray-400">Receive news and promotional offers</p>
                    </div>
                    <Toggle
                      checked={userProfile.notifications.marketingUpdates}
                      onChange={() => handleNotificationToggle("marketingUpdates")}
                    />
                  </div>
                </div>
              </Card>

              {/* Billing & Plan */}
              <Card title="Subscription & Billing" id="billing">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-sm font-medium text-white">Current Plan</h4>
                      <div className="flex items-center mt-1">
                        <Badge variant="success" className="mr-2">
                          Premium
                        </Badge>
                        <span className="text-xs text-gray-400">Renews on April 15, 2025</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Change Plan
                    </Button>
                  </div>

                  <Separator />

                  <h4 className="text-sm font-medium text-white mt-4 mb-2">Payment Methods</h4>

                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className="flex items-center justify-between bg-gray-900/30 p-3 rounded-md mb-2"
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs mr-3">
                          {method.type.toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm text-white">•••• {method.last4}</p>
                          <p className="text-xs text-gray-400">
                            Expires {method.expMonth}/{method.expYear}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:bg-red-500/10"
                        onClick={() => handleDeletePaymentMethod(method.id)}
                        icon={<Trash2 size={14} />}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}

                  <Button variant="outline" size="sm" className="mt-2" icon={<CreditCard size={14} />}>
                    Add Payment Method
                  </Button>
                </div>
              </Card>

              {/* API Access */}
              <Card title="API Access" id="api">
                <div>
                  <p className="text-sm text-gray-400 mb-4">
                    Use this API key to access Visiona programmatically. Keep it secure and do not share it publicly.
                  </p>

                  <div className="flex items-center mb-4">
                    <input
                      type="text"
                      value={userProfile.apiKey}
                      readOnly
                      className="bg-gray-900 border border-gray-700 rounded-l-md py-2 px-3 text-white w-full focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                    />
                    <button
                      className="bg-gray-800 border border-l-0 border-gray-700 rounded-r-md py-2 px-3 text-gray-300 hover:bg-gray-700"
                      onClick={() => navigator.clipboard.writeText(userProfile.apiKey)}
                    >
                      Copy
                    </button>
                  </div>

                  <Button variant="secondary" size="sm" onClick={regenerateApiKey} className="text-xs">
                    Regenerate API Key
                  </Button>
                </div>
              </Card>

              {/* Danger Zone */}
              <Card className="border-red-500/20 bg-red-500/5">
                <h3 className="text-lg font-medium text-red-500 mb-2">Danger Zone</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Once you delete your account, there is no going back. This action is permanent.
                </p>
                <Button variant="danger" size="sm" icon={<Trash2 size={14} />}>
                  Delete Account
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AccountPage

