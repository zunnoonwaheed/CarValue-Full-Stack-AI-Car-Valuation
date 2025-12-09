import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import {
  Users,
  Car,
  Bell,
  TrendingUp,
  Activity,
  DollarSign,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  ChevronRight,
  Shield,
  CheckCircle2,
  AlertCircle,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/auth";
import mockApi from "@/mock/mockApi";
import { AdminStats, AdminActivity } from "@/mock/adminMockData";
import { formatPrice } from "@/lib/carData";
import { useTheme } from "@/lib/theme";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function AdminDashboard() {
  const [, navigate] = useLocation();
  const { user, logout, isAdmin } = useAuth();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [activity, setActivity] = useState<AdminActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Redirect if not admin
    if (!user || !isAdmin) {
      navigate("/login");
      return;
    }

    loadData();
  }, [user, isAdmin, navigate]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsData, activityData] = await Promise.all([
        mockApi.getAdminStats(),
        mockApi.getRecentActivity()
      ]);

      setStats(statsData);
      setActivity(activityData);
    } catch (error) {
      console.error("Error loading admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user || !isAdmin) {
    return null;
  }

  const statCards = stats ? [
    {
      title: "Total Users",
      value: stats.totalUsers,
      change: `+${stats.newUsersThisMonth} this month`,
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      title: "Total Evaluations",
      value: stats.totalEvaluations,
      change: `+${stats.evaluationsThisMonth} this month`,
      icon: Car,
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      title: "Active Alerts",
      value: stats.activeAlerts,
      change: `${stats.triggeredAlerts} triggered`,
      icon: Bell,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    },
    {
      title: "Total Alerts",
      value: stats.totalAlerts,
      change: `${Math.round((stats.activeAlerts / stats.totalAlerts) * 100)}% active`,
      icon: BarChart3,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    }
  ] : [];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "evaluation":
        return Car;
      case "alert":
        return Bell;
      case "user":
        return Users;
      default:
        return Activity;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "evaluation":
        return "text-green-500 bg-green-500/10";
      case "alert":
        return "text-orange-500 bg-orange-500/10";
      case "user":
        return "text-blue-500 bg-blue-500/10";
      default:
        return "text-gray-500 bg-gray-500/10";
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-64" : "w-20"} border-r bg-card transition-all duration-300 flex flex-col`}>
        <div className="h-16 flex items-center justify-between px-4 border-b">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold">Admin Panel</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin">
            <Button variant="secondary" className="w-full justify-start gap-2">
              <BarChart3 className="h-5 w-5" />
              {sidebarOpen && <span>Dashboard</span>}
            </Button>
          </Link>
          <Link href="/admin/users">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Users className="h-5 w-5" />
              {sidebarOpen && <span>Users</span>}
            </Button>
          </Link>
          <Link href="/admin/evaluations">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Car className="h-5 w-5" />
              {sidebarOpen && <span>Evaluations</span>}
            </Button>
          </Link>
          <Link href="/admin/alerts">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Bell className="h-5 w-5" />
              {sidebarOpen && <span>Price Alerts</span>}
            </Button>
          </Link>
        </nav>

        <div className="p-4 border-t space-y-2">
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Car className="h-5 w-5" />
              {sidebarOpen && <span>View Site</span>}
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            {sidebarOpen && <span>Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b bg-card flex items-center justify-between px-6">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome back, {user.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Badge variant="secondary" className="gap-2">
              <Shield className="h-3 w-3" />
              Admin
            </Badge>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading dashboard...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            {stat.title}
                          </p>
                          <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                          <p className="text-xs text-muted-foreground">{stat.change}</p>
                        </div>
                        <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                          <stat.icon className={`h-6 w-6 ${stat.color}`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest system events and user actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activity.map((item) => {
                      const Icon = getActivityIcon(item.type);
                      const colorClass = getActivityColor(item.type);

                      return (
                        <div key={item.id} className="flex items-start gap-4">
                          <div className={`p-2 rounded-lg ${colorClass}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">{item.action}</p>
                            <p className="text-sm text-muted-foreground truncate">
                              {item.user} • {item.details}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(item.timestamp).toLocaleString()}
                            </p>
                          </div>
                          <Badge variant="outline" className="capitalize">
                            {item.type}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <Link href="/admin/users">
                      <Button variant="outline" className="w-full justify-between h-auto py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-blue-500/10">
                            <Users className="h-5 w-5 text-blue-500" />
                          </div>
                          <div className="text-left">
                            <p className="font-medium">Manage Users</p>
                            <p className="text-xs text-muted-foreground">View all users</p>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <Link href="/admin/evaluations">
                      <Button variant="outline" className="w-full justify-between h-auto py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-green-500/10">
                            <Car className="h-5 w-5 text-green-500" />
                          </div>
                          <div className="text-left">
                            <p className="font-medium">View Evaluations</p>
                            <p className="text-xs text-muted-foreground">All car evaluations</p>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <Link href="/admin/alerts">
                      <Button variant="outline" className="w-full justify-between h-auto py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-orange-500/10">
                            <Bell className="h-5 w-5 text-orange-500" />
                          </div>
                          <div className="text-left">
                            <p className="font-medium">Manage Alerts</p>
                            <p className="text-xs text-muted-foreground">Price alerts</p>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
