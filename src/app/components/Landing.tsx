import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { ArrowRight, Beef, Users, TrendingUp, Award, Heart, Shield } from "lucide-react";
import logoIcon from "figma:asset/836753629ce820953d30091a24b438821c096c54.png";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Landing() {
  const navigate = useNavigate();

  const values = [
    {
      icon: Award,
      title: "Premium Quality",
      description: "Only the finest cuts, sourced from trusted local farms with the highest standards.",
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Building lasting relationships through exceptional service and personalized care.",
    },
    {
      icon: Shield,
      title: "Trust & Transparency",
      description: "Complete traceability from farm to table, ensuring quality at every step.",
    },
  ];

  const features = [
    {
      icon: Beef,
      title: "Inventory Management",
      description: "Real-time tracking of products, categories, and stock levels.",
    },
    {
      icon: Users,
      title: "Client Subscriptions",
      description: "Manage recurring deliveries and premium client relationships.",
    },
    {
      icon: TrendingUp,
      title: "Sales Analytics",
      description: "Track performance with target vs actual insights and detailed reports.",
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f5ede4" }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: "#c9a876", backgroundColor: "#ffffff" }}>
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <img src={logoIcon} alt="Amani Brew" className="h-12 w-12" />
            <div>
              <h1 className="text-xl" style={{ color: "#3d2817" }}>Amani Brew</h1>
              <p className="text-xs" style={{ color: "#6b5d52" }}>Premium Butchery</p>
            </div>
          </div>
          <Button
            onClick={() => navigate("/login")}
            className="text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: "#3d2817" }}
          >
            Staff Login
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left content */}
            <div className="space-y-8">
              <div className="inline-block rounded-full px-4 py-1 text-sm" style={{ backgroundColor: "#c9a876", color: "#3d2817" }}>
                Since 1985 • Tanzania's Premier Butchery
              </div>
              
              <h2 className="text-4xl leading-tight lg:text-5xl" style={{ color: "#3d2817" }}>
                Where Quality Meets <span className="inline-block" style={{ color: "#c9a876" }}>Tradition</span>
              </h2>
              
              <p className="text-lg leading-relaxed" style={{ color: "#6b5d52" }}>
                Amani Brew has been serving Tanzania with the finest quality meats for over three decades. 
                Our commitment to excellence, sustainable practices, and customer satisfaction has made us 
                the trusted choice for families and businesses alike.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => navigate("/login")}
                  size="lg"
                  className="text-white transition-colors hover:opacity-90"
                  style={{ backgroundColor: "#3d2817" }}
                >
                  Access Management System
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div>
                  <p className="text-3xl" style={{ color: "#3d2817" }}>35+</p>
                  <p className="text-sm" style={{ color: "#6b5d52" }}>Years Experience</p>
                </div>
                <div>
                  <p className="text-3xl" style={{ color: "#3d2817" }}>5,000+</p>
                  <p className="text-sm" style={{ color: "#6b5d52" }}>Happy Clients</p>
                </div>
                <div>
                  <p className="text-3xl" style={{ color: "#3d2817" }}>100%</p>
                  <p className="text-sm" style={{ color: "#6b5d52" }}>Quality Guarantee</p>
                </div>
              </div>
            </div>

            {/* Right image */}
            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-2xl" style={{ borderColor: "#c9a876", borderWidth: "8px" }}>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1722581248341-de9b34c116bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwYnV0Y2hlciUyMG1lYXQlMjBjb3VudGVyfGVufDF8fHx8MTc3NDMyOTExMHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Premium meat counter"
                  className="h-full w-full object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-2xl" style={{ backgroundColor: "#c9a876" }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20" style={{ backgroundColor: "#ffffff" }}>
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="mb-4 text-3xl lg:text-4xl" style={{ color: "#3d2817" }}>Our Philosophy</h3>
            <div className="mb-12 text-lg leading-relaxed" style={{ color: "#6b5d52" }}>
              <p className="mb-6">
                At Amani Brew, we believe that great food starts with great relationships. 
                "Amani" means <span className="italic" style={{ color: "#c9a876" }}>"peace"</span> in Swahili, 
                reflecting our commitment to harmony in every aspect of our business—from 
                the farmers we partner with to the families we serve.
              </p>
              <p className="mb-6">
                We don't just sell meat; we provide peace of mind. Every cut is carefully selected, 
                expertly prepared, and delivered with the respect it deserves. Our butchers are craftsmen 
                who understand that their work feeds communities and creates memories around dinner tables.
              </p>
              <p>
                Through sustainable practices and ethical sourcing, we honor the land and animals 
                that sustain us, ensuring future generations can enjoy the same quality we provide today.
              </p>
            </div>
          </div>

          {/* Values grid */}
          <div className="grid gap-8 md:grid-cols-3">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="rounded-xl p-8 text-center transition-transform hover:scale-105"
                  style={{ backgroundColor: "#f5ede4" }}
                >
                  <div
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                    style={{ backgroundColor: "#c9a876" }}
                  >
                    <Icon className="h-8 w-8" style={{ color: "#3d2817" }} />
                  </div>
                  <h4 className="mb-3 text-xl" style={{ color: "#3d2817" }}>{value.title}</h4>
                  <p style={{ color: "#6b5d52" }}>{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Management System Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <h3 className="mb-4 text-3xl lg:text-4xl" style={{ color: "#3d2817" }}>
              Advanced Management System
            </h3>
            <p className="mx-auto max-w-2xl text-lg" style={{ color: "#6b5d52" }}>
              Our comprehensive platform streamlines operations, enabling us to maintain 
              the highest standards while serving you better.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Image */}
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1763140446057-9becaa30b868?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHF1YWxpdHklMjBiZWVmJTIwY3V0c3xlbnwxfHx8fDE3NzQzMjkxMTF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Quality beef cuts"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Features */}
            <div className="flex flex-col justify-center space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex gap-4 rounded-xl p-6"
                    style={{ backgroundColor: "#ffffff", border: "2px solid #c9a876" }}
                  >
                    <div
                      className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: "#c9a876" }}
                    >
                      <Icon className="h-6 w-6" style={{ color: "#3d2817" }} />
                    </div>
                    <div>
                      <h4 className="mb-2 text-lg" style={{ color: "#3d2817" }}>{feature.title}</h4>
                      <p className="text-sm" style={{ color: "#6b5d52" }}>{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: "#3d2817" }}>
        <div className="container mx-auto px-6 text-center">
          <div className="mx-auto max-w-2xl">
            <h3 className="mb-4 text-3xl lg:text-4xl" style={{ color: "#f5ede4" }}>
              Ready to Get Started?
            </h3>
            <p className="mb-8 text-lg" style={{ color: "#c9a876" }}>
              Access our management system to streamline your operations and deliver excellence.
            </p>
            <Button
              onClick={() => navigate("/login")}
              size="lg"
              className="transition-colors hover:opacity-90"
              style={{ backgroundColor: "#c9a876", color: "#3d2817" }}
            >
              Access System
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8" style={{ borderColor: "#c9a876", backgroundColor: "#ffffff" }}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-3">
              <img src={logoIcon} alt="Amani Brew" className="h-10 w-10" />
              <div>
                <p className="text-sm" style={{ color: "#3d2817" }}>© 2026 Amani Brew</p>
                <p className="text-xs" style={{ color: "#6b5d52" }}>Premium Butchery Management</p>
              </div>
            </div>
            <p className="text-sm" style={{ color: "#6b5d52" }}>
              Dar es Salaam, Tanzania • +255 XXX XXX XXX
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
