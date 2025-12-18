import React from "react";
import HeroImage from "../assets/Hero.png";
import { FaBook, FaUsers, FaHeart, FaRocket, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const teamMembers = [
  {
    name: "Nethsara Shyamika",
    role: "Founder & Developer",
    image: "images/Nethsara.jpg",
    bio: "Passionate about connecting readers with amazing stories",
    social: {
      linkedin: "#",
      github: "#",
      twitter: "#"
    }
  },
];

const features = [
  {
    icon: <FaBook className="text-4xl" />,
    title: "Vast Collection",
    description: "Access thousands of books across all genres"
  },
  {
    icon: <FaUsers className="text-4xl" />,
    title: "Community Driven",
    description: "Join a vibrant community of book lovers"
  },
  {
    icon: <FaHeart className="text-4xl" />,
    title: "Curated Content",
    description: "Discover handpicked recommendations"
  },
  {
    icon: <FaRocket className="text-4xl" />,
    title: "Easy Discovery",
    description: "Find your next favorite story effortlessly"
  }
];

const stats = [
  { number: "10K+", label: "Books Available" },
  { number: "5K+", label: "Active Readers" },
  { number: "50+", label: "Genres" },
  { number: "4.8", label: "User Rating" }
];

const AboutUs = () => {
  return (
    <div className="bg-linear-to-b from-gray-50 to-white">
      <div
        className="relative h-[700px] bg-cover bg-center flex flex-col items-center justify-center text-white px-4 text-center overflow-hidden"
        style={{ backgroundImage: `url(${HeroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative z-10 max-w-5xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl animate-fade-in">
            About StorySeeker
          </h1>
          <p className="text-xl md:text-2xl mb-8 drop-shadow-lg">
            Where Every Story Finds Its Reader
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
              <h2 className="text-3xl font-bold mb-4 text-yellow-300">Our Mission</h2>
              <p className="text-lg leading-relaxed">
                To connect readers with the stories they love and provide a platform
                where every story matters.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
              <h2 className="text-3xl font-bold mb-4 text-blue-300">Our Vision</h2>
              <p className="text-lg leading-relaxed">
                To become the go-to online community for story lovers, where
                discovering, reading, and sharing stories is simple and enjoyable.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            Why Choose StorySeeker?
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg max-w-2xl mx-auto">
            We're more than just a bookstore - we're a community of readers passionate about stories
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-linear-to-br from-gray-50 to-gray-100 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center"
              >
                <div className="text-blue-600 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-linear-to-b from-gray-50 to-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            Meet Our Team
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">
            The passionate individuals behind StorySeeker
          </p>

          <div className="flex flex-wrap justify-center gap-10">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 w-full sm:w-80"
              >
                <div className="relative mb-6">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-40 w-40 rounded-full mx-auto object-cover border-4 border-blue-500 shadow-lg"
                    />
                  ) : (
                    <div className="h-40 w-40 bg-linear-to-br from-blue-400 to-purple-500 rounded-full mx-auto border-4 border-blue-500 shadow-lg"></div>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-center mb-2 text-gray-900">
                  {member.name}
                </h3>
                <p className="text-blue-600 text-center font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-center mb-6">
                  {member.bio}
                </p>

                <div className="flex justify-center gap-4">
                  <a
                    href={member.social.linkedin}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-xl"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href={member.social.github}
                    className="text-gray-600 hover:text-gray-900 transition-colors text-xl"
                    aria-label="GitHub"
                  >
                    <FaGithub />
                  </a>
                  <a
                    href={member.social.twitter}
                    className="text-gray-600 hover:text-blue-400 transition-colors text-xl"
                    aria-label="Twitter"
                  >
                    <FaTwitter />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join Our StorySeeker Community!
          </h2>
          <p className="text-xl mb-10 leading-relaxed">
            Explore thousands of stories, share your favorites, and connect with
            fellow book enthusiasts from around the world.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Get Started Now
            </a>
            <a
              href="/all-books"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Browse Books
            </a>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
          <p className="text-gray-300 mb-8">
            Subscribe to our newsletter for the latest book recommendations and community updates
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full font-semibold transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;