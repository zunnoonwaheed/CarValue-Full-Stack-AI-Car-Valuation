import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import {
  Users,
  Car,
  Bell,
  BarChart3,
  LogOut,
  Menu,
  X,
  Search,
  Trash2,
  Eye,
  Shield,
  Mail,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth";
import mockApi from "@/mock/mockApi";
import { User } from "@/mock/mockData";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function AdminUsers() {
  const [, navigate] = useLocation();
  const { user, logout, isAdmin } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!user || !isAdmin) {
      navigate("/login");
      return;
    }
    loadUsers();
  }, [user, isAdmin, navigate]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await mockApi.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (confirm("Are you sure you want to delete this user and all their data?")) {
      await mockApi.deleteUser(id);
      await loadUsers();
    }
  };

  const filteredUsers = users.filter(u =>
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user || !isAdmin) return null;

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
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <BarChart3 className="h-5 w-5" />
              {sidebarOpen && <span>Dashboard</span>}
            </Button>
          </Link>
          <Link href="/admin/users">
            <Button variant="secondary" className="w-full justify-start gap-2">
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
          <Button variant="ghost" className="w-full justify-start gap-2 text-destructive" onClick={() => { logout(); navigate("/login"); }}>
            <LogOut className="h-5 w-5" />
            {sidebarOpen && <span>Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b bg-card flex items-center justify-between px-6">
          <div>
            <h1 className="text-2xl font-bold">User Management</h1>
            <p className="text-sm text-muted-foreground">Manage all registered users</p>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Badge variant="secondary" className="gap-2">
              <Shield className="h-3 w-3" />
              Admin
            </Badge>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search users by name, email, or username..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Badge variant="outline">{filteredUsers.length} users</Badge>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {filteredUsers.map((u) => (
                      <div key={u.id} className="p-4 flex items-center justify-between hover:bg-muted/50">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-lg font-bold text-primary">
                              {u.name?.charAt(0) || u.username.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{u.name || "Unknown"}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Mail className="h-3 w-3" />
                              <span>{u.email || u.username}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                              <Calendar className="h-3 w-3" />
                              <span>Joined {new Date(u.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="gap-2">
                            <Eye className="h-4 w-4" />
                            View
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-2 text-destructive"
                            onClick={() => handleDeleteUser(u.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
