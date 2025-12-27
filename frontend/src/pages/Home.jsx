import React, { useState, useEffect } from "react";
import Hero from "../components/Home/Hero";
import RecentlyAdded from "../components/Home/RecentlyAdded";
import {
  FaBook,
  FaUsers,
  FaStar,
  FaTrophy,
  FaArrowUp,
  FaQuoteLeft,
} from "react-icons/fa";
import { TrendingUp, Award, BookOpen, Users } from "lucide-react";

const Home = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [bookCount, setBookCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchBookCount = async () => {
      try {
        const res = await fetch("http://localhost:1000/api/v1/get-all-books");
        const json = await res.json();
        setBookCount(json.data.length);
      } catch (error) {
        console.error("Failed to fetch book count", error);
      }
    };

    fetchBookCount();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatBookCount = (count, step = 25) => {
  if (count < step) return `${count}+`;

  const rounded = Math.floor(count / step) * step;
  return `${rounded}+`;
};

  const stats = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      value: formatBookCount(bookCount),
      label: "Books Available",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <Users className="w-8 h-8" />,
      value: "5,000+",
      label: "Active Readers",
      color: "from-green-500 to-green-600",
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: "500+",
      label: "Authors",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: "4.8/5",
      label: "User Rating",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  const features = [
    {
      icon: <FaBook className="text-4xl" />,
      title: "Vast Collection",
      description: "Explore thousands of books across all genres",
      color: "bg-blue-500/10 border-blue-500/50 hover:border-blue-500",
    },
    {
      icon: <FaUsers className="text-4xl" />,
      title: "Community",
      description: "Join a vibrant community of book lovers",
      color: "bg-green-500/10 border-green-500/50 hover:border-green-500",
    },
    {
      icon: <FaStar className="text-4xl" />,
      title: "Top Rated",
      description: "Discover highly rated and reviewed books",
      color: "bg-yellow-500/10 border-yellow-500/50 hover:border-yellow-500",
    },
    {
      icon: <FaTrophy className="text-4xl" />,
      title: "Best Sellers",
      description: "Access bestselling titles from top authors",
      color: "bg-purple-500/10 border-purple-500/50 hover:border-purple-500",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Book Enthusiast",
      content:
        "StorySeeker has completely transformed my reading experience. The collection is amazing!",
      rating: 5,
      avatar: "SJ",
    },
    {
      name: "Michael Chen",
      role: "Regular Reader",
      content:
        "Best online bookstore I've used. Fast delivery and great customer service.",
      rating: 5,
      avatar: "MC",
    },
    {
      name: "Emma Wilson",
      role: "Fiction Lover",
      content:
        "I love the curated recommendations. Found so many hidden gems here!",
      rating: 5,
      avatar: "EW",
    },
  ];

  const genres = [
    {
      name: "Fiction",
      count: "2,500+",
      gradient: "from-pink-500 to-rose-600",
      icon: "📚",
    },
    {
      name: "Non-Fiction",
      count: "1,800+",
      gradient: "from-blue-500 to-cyan-600",
      icon: "📖",
    },
    {
      name: "Mystery",
      count: "1,200+",
      gradient: "from-purple-500 to-indigo-600",
      icon: "🔍",
    },
    {
      name: "Romance",
      count: "1,500+",
      gradient: "from-red-500 to-pink-600",
      icon: "💖",
    },
    {
      name: "Sci-Fi",
      count: "900+",
      gradient: "from-green-500 to-teal-600",
      icon: "🚀",
    },
    {
      name: "Fantasy",
      count: "1,100+",
      gradient: "from-violet-500 to-purple-600",
      icon: "🐉",
    },
  ];

  return (
    <div className="bg-zinc-900 text-white min-h-screen">
      <div className="px-4 sm:px-6 lg:px-10 py-8">
        <Hero />
      </div>

      <div className="px-4 sm:px-6 lg:px-10 py-16 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`relative bg-linear-to-br ${stat.color} p-6 md:p-8 rounded-2xl text-center transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl group overflow-hidden`}
              >
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="relative z-10">
                  <div className="flex justify-center mb-3 text-white/90 group-hover:text-white transition-colors">
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold mb-2 text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-white/80">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-10 py-12">
        <RecentlyAdded />
      </div>

      <div className="px-4 sm:px-6 lg:px-10 py-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-300 text-sm font-semibold">
                Why Choose Us
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-white to-zinc-300 bg-clip-text text-transparent">
              Why Choose StorySeeker?
            </h2>
            <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto">
              Discover what makes us the preferred choice for book lovers
              worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`${feature.color} border-2 p-8 rounded-2xl hover:scale-105 transition-all duration-300 backdrop-blur-sm group cursor-pointer`}
              >
                <div className="mb-6 text-white transform group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-10 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-300 text-sm font-semibold">
                Browse Categories
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-white to-zinc-300 bg-clip-text text-transparent">
              Explore by Genre
            </h2>
            <p className="text-zinc-400 text-lg md:text-xl">
              Find your next favorite book in any category
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {genres.map((genre, index) => (
              <button
                key={index}
                className={`relative bg-linear-to-br ${genre.gradient} p-6 md:p-8 rounded-2xl hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl group overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="relative z-10">
                  <div className="text-4xl mb-3 group-hover:scale-125 transition-transform">
                    {genre.icon}
                  </div>
                  <div className="text-lg md:text-xl font-bold mb-2 text-white">
                    {genre.name}
                  </div>
                  <div className="text-sm text-white/80">
                    {genre.count} books
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-10 py-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-300 text-sm font-semibold">
                Testimonials
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-white to-zinc-300 bg-clip-text text-transparent">
              What Our Readers Say
            </h2>
            <p className="text-zinc-400 text-lg md:text-xl">
              Join thousands of satisfied book lovers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-zinc-800/50 backdrop-blur-sm p-8 rounded-2xl border border-zinc-700 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/10 group"
              >
                <FaQuoteLeft className="text-3xl text-yellow-500 mb-6 opacity-50 group-hover:opacity-100 transition-opacity" />
                <p className="text-zinc-300 mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-linear-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
                    {testimonial.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-lg text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-zinc-400 text-sm">
                      {testimonial.role}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-500 text-sm" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-10 py-24 bg-linear-to-r from-slate-800 via-yellow-600 to-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-6xl font-bold mb-6 text-white leading-tight">
            Start Your Reading Journey Today
          </h2>
          <p className="text-xl md:text-2xl mb-10 text-white/90">
            Join our community and discover your next favorite book
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => (window.location.href = "/all-books")}
              className="px-5 py-3 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-1"
            >
              Browse Collection →
            </button>
            <button
              onClick={() => (window.location.href = "/signup")}
              className="px-5 py-3 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-1"
            >
              Sign Up Free
            </button>
          </div>
        </div>
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 bg-linear-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 z-50 group"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="w-6 h-6 text-white group-hover:animate-bounce" />
        </button>
      )}
    </div>
  );
};

export default Home;
