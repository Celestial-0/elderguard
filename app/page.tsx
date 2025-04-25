'use client';
import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { Analytics } from "@vercel/analytics/react";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { BentoGridUI } from "@/components/bentoUI";
import { Divider } from "@heroui/react";

import { useUser } from "@clerk/nextjs";
import { AnimatedListUI } from "@/components/alert";

export default function Home() {

  const user = useUser();
  const userName = user.user?.fullName || "Guest";

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-full text-center justify-center gap-6">
        <span className={title()}>Elder Guard: </span>
        <span className={title({ color: "violet" })}>
          A State-of-the-Art IoT Solution&nbsp;
        </span>
        <Analytics />
        <Divider className="bg-violet" />   
        <span className={title()}>
        </span>
        <div className={subtitle({ class: "mt-6" })}>
        Providing Immediate Emergency Alerts and Real-Time Monitoring to
        Ensure Elderly Safety
        </div>
      </div>
      {user.isSignedIn && <span className="text-2xl font-semibold mb-4 text-cyan-500" >Welcome, {userName}!</span>}
      {user.isSignedIn && <BentoGridUI />}
      {!user.isSignedIn && <BentoGridUI demo={true}/>}
      {!user.isSignedIn && <div>This is a demo data. Please sign in to use the full functionality.</div>}

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
    </section>
  );
}
