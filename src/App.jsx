import Navbar from "./components/Navbar";
import Features from "./components/Section.Features";
import Hero from "./components/Section.Hero";
import Highlights from "./components/Section.Highlights";
import Model from "./components/Section.Model";
import Chip from "./components/Section.Chip";
import * as Sentry from "@sentry/react";

const App = () => {
  return (
    <main className="bg-black">
      <Navbar></Navbar>
      <Hero></Hero>
      <Highlights></Highlights>
      <Model></Model>
      <Features></Features>
      <Chip></Chip>
    </main>
  );
};

export default Sentry.withProfiler(App);
