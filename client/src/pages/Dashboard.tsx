import { useState } from "react";
import { Link } from "wouter";
import { 
  Car, 
  Bell, 
  Settings, 
  Plus,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  Trash2,
  Edit,
  Eye,
  Clock,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  User,
  LogOut,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Header } from "@/components/Header";
import { formatPrice } from "@/lib/carData";

const mockEvaluations = [
  {
    id: 1,
    make: "Toyota",
    model: "Corolla",
    variant: "Altis Grande 1.8",
    year: 2020,
    mileage: 45000,
    suggestedPrice: 5200000,
    minPrice: 4800000,
    maxPrice: 5600000,
    evaluatedAt: "2024-01-15",
    trend: "up",
    trendPercent: 3.2,
  },
  {
    id: 2,
    make: "Honda",
    model: "Civic",
    variant: "Oriel 1.5T",
    year: 2021,
    mileage: 28000,
    suggestedPrice: 6800000,
    minPrice: 6400000,
    maxPrice: 7200000,
    evaluatedAt: "2024-01-10",
    trend: "down",
    trendPercent: 1.5,
  },
  {
    id: 3,
    make: "Suzuki",
    model: "Swift",
    variant: "GLX CVT",
    year: 2022,
    mileage: 15000,
    suggestedPrice: 3500000,
    minPrice: 3200000,
    maxPrice: 3800000,
    evaluatedAt: "2024-01-08",
    trend: "up",
    trendPercent: 2.1,
  },
];

const mockAlerts = [
  {
    id: 1,
    carName: "2020 Toyota Corolla Altis Grande",
    targetPrice: 5000000,
    currentPrice: 5200000,
    status: "active",
    createdAt: "2024-01-15",
    notifyEmail: true,
    notifyPush: true,
  },
  {
    id: 2,
    carName: "2021 Honda Civic Oriel",
    targetPrice: 6500000,
    currentPrice: 6800000,
    status: "active",
    createdAt: "2024-01-10",
    notifyEmail: true,
    notifyPush: false,
  },
  {
    id: 3,
    carName: "2019 Toyota Yaris ATIV X",
    targetPrice: 3200000,
    currentPrice: 3100000,
    status: "triggered",
    createdAt: "2024-01-05",
    triggeredAt: "2024-01-14",
    notifyEmail: true,
    notifyPush: true,
  },
];

const sidebarItems = [
  { icon: BarChart3, label: "Overview", href: "/dashboard", active: true },
  { icon: Car, label: "My Evaluations", href: "/dashboard" },
  { icon: Bell, label: "Price Alerts", href: "/dashboard" },
  { icon: Settings, label: "Settings", href: "/dashboard" },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"evaluations" | "alerts">("evaluations");
  const [alerts, setAlerts] = useState(mockAlerts);

  const toggleAlertStatus = (id: number) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id
          ? { ...alert, status: alert.status === "active" ? "paused" : "active" }
          : alert
      )
    );
  };

  const stats = [
    { label: "Total Evaluations", value: mockEvaluations.length, icon: Car },
    { label: "Active Alerts", value: alerts.filter((a) => a.status === "active").length, icon: Bell },
    { label: "Triggered Alerts", value: alerts.filter((a) => a.status === "triggered").length, icon: CheckCircle2 },
  ];

  const sidebarStyle = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn />

      <SidebarProvider style={sidebarStyle as React.CSSProperties}>
        <div className="flex h-screen w-full pt-16 md:pt-20">
          <Sidebar className="border-r">
            <SidebarHeader className="p-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary text-primary-foreground">AK</AvatarFallback>
                </Avatar>
                <div className="overflow-hidden">
                  <p className="font-semibold truncate">Ahmed Khan</p>
                  <p className="text-xs text-muted-foreground truncate">ahmed@example.com</p>
                </div>
              </div>
            </SidebarHeader>
            
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {sidebarItems.map((item) => (
                      <SidebarMenuItem key={item.label}>
                        <SidebarMenuButton 
                          asChild 
                          isActive={item.active}
                          data-testid={`link-sidebar-${item.label.toLowerCase().replace(/\s/g, "-")}`}
                        >
                          <Link href={item.href}>
                            <item.icon className="h-4 w-4" />
                            <span>{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-4 border-t">
              <Button variant="ghost" className="w-full justify-start gap-2" data-testid="button-logout">
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </SidebarFooter>
          </Sidebar>

          <main className="flex-1 overflow-auto">
            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">Welcome back, Ahmed!</h1>
                  <p className="text-muted-foreground">Here's what's happening with your car evaluations</p>
                </div>
                <Link href="/evaluate">
                  <Button className="gap-2" data-testid="button-new-evaluation">
                    <Plus className="h-4 w-4" />
                    New Evaluation
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <Card key={stat.label} data-testid={`card-stat-${stat.label.toLowerCase().replace(/\s/g, "-")}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                          <p className="text-3xl font-bold" data-testid={`stat-value-${index}`}>{stat.value}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <stat.icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mb-6">
                <Button
                  variant={activeTab === "evaluations" ? "default" : "outline"}
                  onClick={() => setActiveTab("evaluations")}
                  className="gap-2"
                  data-testid="tab-evaluations"
                >
                  <Car className="h-4 w-4" />
                  Evaluations
                </Button>
                <Button
                  variant={activeTab === "alerts" ? "default" : "outline"}
                  onClick={() => setActiveTab("alerts")}
                  className="gap-2"
                  data-testid="tab-alerts"
                >
                  <Bell className="h-4 w-4" />
                  Alerts
                </Button>
              </div>

              {/* Evaluations Tab */}
              {activeTab === "evaluations" && (
                <div className="space-y-4">
                  {mockEvaluations.map((evaluation) => (
                    <Card key={evaluation.id} className="hover:-translate-y-0.5 transition-transform duration-200" data-testid={`card-evaluation-${evaluation.id}`}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center shrink-0">
                              <Car className="h-7 w-7 text-muted-foreground" />
                            </div>
                            <div>
                              <h3 className="font-semibold mb-1" data-testid={`text-car-name-${evaluation.id}`}>
                                {evaluation.year} {evaluation.make} {evaluation.model}
                              </h3>
                              <p className="text-sm text-muted-foreground mb-2">{evaluation.variant}</p>
                              <div className="flex flex-wrap items-center gap-2">
                                <Badge variant="outline" className="text-xs" data-testid={`badge-mileage-${evaluation.id}`}>
                                  {evaluation.mileage.toLocaleString()} km
                                </Badge>
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs ${evaluation.trend === "up" ? "text-green-600 border-green-200" : "text-red-600 border-red-200"}`}
                                  data-testid={`badge-trend-${evaluation.id}`}
                                >
                                  {evaluation.trend === "up" ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                                  {evaluation.trendPercent}%
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">Suggested Price</p>
                              <p className="text-xl font-bold text-primary" data-testid={`text-price-${evaluation.id}`}>{formatPrice(evaluation.suggestedPrice)}</p>
                              <p className="text-xs text-muted-foreground">
                                Range: {formatPrice(evaluation.minPrice)} - {formatPrice(evaluation.maxPrice)}
                              </p>
                            </div>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" data-testid={`button-evaluation-menu-${evaluation.id}`}>
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem className="gap-2" data-testid={`button-view-details-${evaluation.id}`}>
                                  <Eye className="h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2" data-testid={`button-set-alert-${evaluation.id}`}>
                                  <Bell className="h-4 w-4" />
                                  Set Alert
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 text-destructive" data-testid={`button-delete-${evaluation.id}`}>
                                  <Trash2 className="h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {mockEvaluations.length === 0 && (
                    <Card>
                      <CardContent className="p-12 text-center">
                        <Car className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                        <h3 className="text-lg font-semibold mb-2">No evaluations yet</h3>
                        <p className="text-muted-foreground mb-4">Start by evaluating your first car</p>
                        <Link href="/evaluate">
                          <Button data-testid="button-first-evaluation">Evaluate a Car</Button>
                        </Link>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {/* Alerts Tab */}
              {activeTab === "alerts" && (
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <Card 
                      key={alert.id} 
                      className={`hover:-translate-y-0.5 transition-transform duration-200 ${
                        alert.status === "triggered" ? "border-green-200 dark:border-green-900" : ""
                      }`}
                      data-testid={`card-alert-${alert.id}`}
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                              alert.status === "triggered" 
                                ? "bg-green-100 dark:bg-green-900/30" 
                                : "bg-primary/10"
                            }`}>
                              {alert.status === "triggered" ? (
                                <CheckCircle2 className="h-6 w-6 text-green-600" />
                              ) : (
                                <Bell className="h-6 w-6 text-primary" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold mb-1" data-testid={`text-alert-car-${alert.id}`}>{alert.carName}</h3>
                              <div className="flex flex-wrap items-center gap-3 text-sm">
                                <span className="text-muted-foreground">
                                  Target: <span className="font-medium text-foreground" data-testid={`text-target-price-${alert.id}`}>{formatPrice(alert.targetPrice)}</span>
                                </span>
                                <span className="text-muted-foreground">
                                  Current: <span className="font-medium text-foreground" data-testid={`text-current-price-${alert.id}`}>{formatPrice(alert.currentPrice)}</span>
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mt-2">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground" data-testid={`text-created-at-${alert.id}`}>
                                  Created {alert.createdAt}
                                </span>
                                {alert.status === "triggered" && alert.triggeredAt && (
                                  <>
                                    <span className="text-xs text-muted-foreground">|</span>
                                    <CheckCircle2 className="h-3 w-3 text-green-600" />
                                    <span className="text-xs text-green-600" data-testid={`text-triggered-at-${alert.id}`}>
                                      Triggered {alert.triggeredAt}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            {alert.status !== "triggered" && (
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground" data-testid={`text-status-${alert.id}`}>
                                  {alert.status === "active" ? "Active" : "Paused"}
                                </span>
                                <Switch
                                  checked={alert.status === "active"}
                                  onCheckedChange={() => toggleAlertStatus(alert.id)}
                                  data-testid={`switch-alert-${alert.id}`}
                                />
                              </div>
                            )}

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" data-testid={`button-alert-menu-${alert.id}`}>
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem className="gap-2" data-testid={`button-edit-alert-${alert.id}`}>
                                  <Edit className="h-4 w-4" />
                                  Edit Alert
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 text-destructive" data-testid={`button-delete-alert-${alert.id}`}>
                                  <Trash2 className="h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {alerts.length === 0 && (
                    <Card>
                      <CardContent className="p-12 text-center">
                        <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                        <h3 className="text-lg font-semibold mb-2">No alerts yet</h3>
                        <p className="text-muted-foreground mb-4">Create price alerts from your evaluations</p>
                        <Link href="/evaluate">
                          <Button data-testid="button-create-alert">Evaluate a Car</Button>
                        </Link>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
