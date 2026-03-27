import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Router, Route, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { I18nProvider } from "@/contexts/I18nContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Rooms from "@/pages/Rooms";
import Booking from "@/pages/Booking";
import Services from "@/pages/Services";
import DiningMenu from "@/pages/DiningMenu";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Account from "@/pages/Account";
import Gallery from "@/pages/Gallery";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Privacy from "@/pages/Privacy";
import Refund from "@/pages/Refund";
import Terms from "@/pages/Terms";
import NotFound from "@/pages/NotFound";

// Use hash-based routing (/#/) to support opening index.html directly via file:// protocol
function AppRouter() {
  return (
    <Router hook={useHashLocation}>
      <Layout>
        <Switch>
          <Route path="/">{() => <Home />}</Route>
          <Route path="/rooms" component={Rooms} />
          <Route path="/booking" component={Booking} />
          <Route path="/services" component={Services} />
          <Route path="/dining" component={DiningMenu} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/account" component={Account} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/blog" component={Blog} />
          <Route path="/blog/:slug">{(p) => <BlogPost slug={p.slug} />}</Route>
          <Route path="/privacy" component={Privacy} />
          <Route path="/refund" component={Refund} />
          <Route path="/terms" component={Terms} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  );
}

// Note on theming:
// - Choose defaultTheme based on your design (light or dark background)
// - Update the color palette in index.css to match
// - If you want switchable themes, add `switchable` prop and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <I18nProvider>
          <CurrencyProvider>
            <AuthProvider>
              <TooltipProvider>
                <Toaster />
                <AppRouter />
              </TooltipProvider>
            </AuthProvider>
          </CurrencyProvider>
        </I18nProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

