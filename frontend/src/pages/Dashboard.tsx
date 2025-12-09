import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
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
  ChevronRight,
  Mail,
  Moon,
  Sun,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { useTheme } from "@/lib/theme";
import mockApi from "@/mock/mockApi";

type TabType = "overview" | "evaluations" | "alerts" | "settings";

export default function Dashboard() {
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [evaluations, setEvaluations] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme, setTheme } = useTheme();

  const userId = "user-001"; // Using mock user ID

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Use mock API instead of fetch
      const [evalsData, alertsData] = await Promise.all([
        mockApi.getUserEvaluations(userId),
        mockApi.getUserAlerts(userId)
      ]);

      setEvaluations(evalsData);
      setAlerts(alertsData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAlertStatus = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === "active" ? "paused" : "active";
      // Use mock API instead of fetch
      await mockApi.updateAlertStatus(id, newStatus);
      await loadData();
    } catch (error) {
      console.error("Error toggling alert:", error);
    }
  };

  const deleteEvaluation = async (id: string) => {
    if (!confirm("Are you sure you want to delete this evaluation?")) return;

    try {
      // Use mock API instead of fetch
      await mockApi.deleteEvaluation(id);
      await loadData();
    } catch (error) {
      console.error("Error deleting evaluation:", error);
    }
  };

  const deleteAlert = async (id: string) => {
    if (!confirm("Are you sure you want to delete this alert?")) return;

    try {
      // Use mock API instead of fetch
      await mockApi.deletePriceAlert(id);
      await loadData();
    } catch (error) {
      console.error("Error deleting alert:", error);
    }
  };

  const stats = [
    { label: "Total Evaluations", value: evaluations.length, icon: Car },
    { label: "Active Alerts", value: alerts.filter((a) => a.status === "active").length, icon: Bell },
    { label: "Triggered Alerts", value: alerts.filter((a) => a.status === "triggered").length, icon: CheckCircle2 },
  ];

  const sidebarItems = [
    { icon: BarChart3, label: "Overview", value: "overview" as TabType },
    { icon: Car, label: "My Evaluations", value: "evaluations" as TabType },
    { icon: Bell, label: "Price Alerts", value: "alerts" as TabType },
    { icon: Settings, label: "Settings", value: "settings" as TabType },
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
                          onClick={() => setActiveTab(item.value)}
                          isActive={activeTab === item.value}
                          data-testid={`link-sidebar-${item.label.toLowerCase().replace(/\s/g, "-")}`}
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
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

              {/* Evaluations Section */}
              {(activeTab === "overview" || activeTab === "evaluations") && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Car className="h-5 w-5 text-primary" />
                    Recent Evaluations
                  </h2>
                  <div className="space-y-4">
                    {loading ? (
                      <Card><CardContent className="p-12 text-center text-muted-foreground">Loading...</CardContent></Card>
                    ) : evaluations.length === 0 ? (
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
                    ) : (
                      evaluations.slice(0, activeTab === "overview" ? 3 : undefined).map((evaluation) => (
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
                                    <Badge variant="outline" className="text-xs">
                                      <Clock className="h-3 w-3 mr-1" />
                                      {new Date(evaluation.createdAt).toLocaleDateString()}
                                    </Badge>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-4">
                                <div className="text-right">
                                  <p className="text-sm text-muted-foreground">Suggested Price</p>
                                  <p className="text-xl font-bold text-primary" data-testid={`text-price-${evaluation.id}`}>
                                    {formatPrice(evaluation.suggestedPrice)}
                                  </p>
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
                                    <DropdownMenuItem
                                      className="gap-2"
                                      onClick={() => navigate(`/results?id=${evaluation.id}&make=${evaluation.make}&model=${evaluation.model}&variant=${evaluation.variant}&year=${evaluation.year}&mileage=${evaluation.mileage}&transmission=${evaluation.transmission}&fuelType=${evaluation.fuelType}&interiorCondition=${evaluation.interiorCondition || ""}&exteriorCondition=${evaluation.exteriorCondition || ""}&isAccidental=${evaluation.isAccidental ? "yes" : "no"}&modificationStatus=${evaluation.modificationStatus}&aiAnalysis=${evaluation.aiAnalysis || ""}`)}
                                      data-testid={`button-view-details-${evaluation.id}`}
                                    >
                                      <Eye className="h-4 w-4" />
                                      View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="gap-2 text-destructive"
                                      onClick={() => deleteEvaluation(evaluation.id)}
                                      data-testid={`button-delete-${evaluation.id}`}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Alerts Section */}
              {(activeTab === "overview" || activeTab === "alerts") && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    Price Alerts
                  </h2>
                  <div className="space-y-4">
                    {loading ? (
                      <Card><CardContent className="p-12 text-center text-muted-foreground">Loading...</CardContent></Card>
                    ) : alerts.length === 0 ? (
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
                    ) : (
                      alerts.slice(0, activeTab === "overview" ? 3 : undefined).map((alert) => (
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
                                      Target: <span className="font-medium text-foreground" data-testid={`text-target-price-${alert.id}`}>
                                        {formatPrice(alert.targetPrice)}
                                      </span>
                                    </span>
                                    <span className="text-muted-foreground">
                                      Current: <span className="font-medium text-foreground" data-testid={`text-current-price-${alert.id}`}>
                                        {formatPrice(alert.currentPrice)}
                                      </span>
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Clock className="h-3 w-3 text-muted-foreground" />
                                    <span className="text-xs text-muted-foreground" data-testid={`text-created-at-${alert.id}`}>
                                      Created {new Date(alert.createdAt).toLocaleDateString()}
                                    </span>
                                    {alert.status === "triggered" && alert.triggeredAt && (
                                      <>
                                        <span className="text-xs text-muted-foreground">|</span>
                                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                                        <span className="text-xs text-green-600" data-testid={`text-triggered-at-${alert.id}`}>
                                          Triggered {new Date(alert.triggeredAt).toLocaleDateString()}
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
                                      onCheckedChange={() => toggleAlertStatus(alert.id, alert.status)}
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
                                    <DropdownMenuItem
                                      className="gap-2 text-destructive"
                                      onClick={() => deleteAlert(alert.id)}
                                      data-testid={`button-delete-alert-${alert.id}`}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Settings Section */}
              {activeTab === "settings" && (
                <div>
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    Settings
                  </h2>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Profile Settings</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" defaultValue="Ahmed Khan" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" defaultValue="ahmed@example.com" />
                        </div>
                        <Button>Save Changes</Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Appearance</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                            <Label>Dark Mode</Label>
                          </div>
                          <Switch
                            checked={theme === "dark"}
                            onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Notification Preferences</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            <Label>Email Notifications</Label>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Bell className="h-4 w-4" />
                            <Label>Price Alert Notifications</Label>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
