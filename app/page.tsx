import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { BentoGridUI } from "@/components/bentoUI";
import { Divider } from "@heroui/react";
import { AnimatedListUI } from "@/components/alert";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-full text-center justify-center gap-6">
        <span className={title()}>Elder Guard: </span>
        <span className={title({ color: "violet" })}>
          A State-of-the-Art IoT Solution&nbsp;
        </span>
        <Divider className="bg-violet" />   
        <span className={title()}>
        </span>
        <div className={subtitle({ class: "mt-6" })}>
        Providing Immediate Emergency Alerts and Real-Time Monitoring to
        Ensure Elderly Safety
        </div>
      </div>
      <BentoGridUI />
      <div className="flex gap-3 mt-10 mb-20">
        <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={siteConfig.links.docs}
        >
          Documentation
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>
{/* 
      <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
            Get started by editing <Code color="primary">app/page.tsx</Code>
          </span>
        </Snippet>
      </div> */}
    </section>
  );
}
