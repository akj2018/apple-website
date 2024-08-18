import { footerLinks } from "../constants";

const Footer = () => {
  return (
    <footer className="py-5 sm:px-10 px-5">
      <div className="screen-max-width">
        <div>
          <p className="font-semibold text-gray text-xs">
            More ways to shop:{" "}
            <span className="underline text-blue cursor-pointer">
              Find an Apple Store
            </span>{" "}
            or{" "}
            <span className="underline text-blue cursor-pointer">
              other retailer
            </span>{" "}
            near you
          </p>
          <p className="font-semibold text-gray text-xs my-2">
            Or Call 000-000-0000
          </p>
        </div>

        <div className="bg-neutral-700 my-5 h-[1px]"></div>

        <div className="flex flex-col justify-between md:flex-row md:items-center ">
          <p className="font-semibold text-gray text-xs my-1">
            Copyright @ 2024 Apple Inc. All Rights Reserved
          </p>
          <div className="flex">
            {footerLinks.map((linkItem, index) => (
              <p
                key={linkItem}
                className="font-semibold text-gray text-xs cursor-pointer"
              >
                {linkItem}{" "}
                {index != footerLinks.length - 1 ? (
                  <span className="mx-2">|</span>
                ) : (
                  <span></span>
                )}
              </p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
