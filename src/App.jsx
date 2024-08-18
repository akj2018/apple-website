import Navbar from "./components/Navbar";
import Features from "./components/Section.Features";
import Hero from "./components/Section.Hero";
import Highlights from "./components/Section.Highlights";
import Model from "./components/Section.Model";
import * as Sentry from "@sentry/react";

const App = () => {
  return (
    <main className="bg-black">
      <Navbar></Navbar>
      <Hero></Hero>
      <Highlights></Highlights>
      <Model></Model>
      <Features></Features>
    </main>
  );
};

export default Sentry.withProfiler(App);
