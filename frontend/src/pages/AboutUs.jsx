import React from "react";
import HeroImage from "../assets/Hero.png";

const teamMembers = [
  {
    name: "Nethsara Shyamika",
    role: "Founder & Developer",
    image: "images/Nethsara.jpg",
  },
];

const AboutUs = () => {
  return (
    <div className="bg-gray-50">
      <div
        className="h-[600px] bg-cover bg-center flex flex-col items-center justify-center text-white px-4 text-center"
        style={{ backgroundImage: `url(${HeroImage})` }}
      >
        <h1 className="text-5xl font-bold mb-6 drop-shadow-lg">
          About StorySeeker
        </h1>

        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-8 mt-5 max-w-3xl shadow-lg text-black">
          <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
          <p className="mb-4 text-lg">
            To connect readers with the stories they love and provide a platform
            where every story matters.
          </p>

          <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
          <p className="mb-4 text-lg">
            To become the go-to online community for story lovers, where
            discovering, reading, and sharing stories is simple and enjoyable.
          </p>
        </div>
      </div>

      <div className="bg-white py-12">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Meet Our Team
        </h2>
        <div className="flex flex-wrap justify-center gap-8 px-4">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-lg shadow-lg w-64 text-center"
            >
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-32 w-32 rounded-full mx-auto mb-4 object-cover"
                />
              ) : (
                <div className="h-32 w-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
              )}
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center py-12 px-4">
        <h2 className="text-3xl font-semibold mb-4">
          Join Our StorySeeker Community!
        </h2>
        <p className="text-gray-700 mb-6">
          Explore stories, share your favorite ones, and be part of a growing
          community of readers.
        </p>
        <a
          href="/"
          className="bg-zinc-800 text-white px-6 py-3 rounded-lg hover:bg-zinc-600 transition"
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default AboutUs;
