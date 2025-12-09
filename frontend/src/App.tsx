import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme";
import { AuthProvider } from "@/lib/auth";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import Evaluate from "@/pages/Evaluate";
import Results from "@/pages/Results";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminUsers from "@/pages/AdminUsers";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/evaluate" component={Evaluate} />
      <Route path="/results" component={Results} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/login" component={Login} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      {/* Admin Routes */}
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/users" component={AdminUsers} />
      <Route path="/admin/evaluations" component={AdminDashboard} />
      <Route path="/admin/alerts" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
