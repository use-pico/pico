import { useGSAP } from "@gsap/react";
import { gsap as coolGsap } from "gsap";

import { Draggable } from "gsap/Draggable";
import { EaselPlugin } from "gsap/EaselPlugin";
import { Flip } from "gsap/Flip";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";

coolGsap.registerPlugin(
	useGSAP,
	Draggable,
	EaselPlugin,
	Flip,
	InertiaPlugin,
	MotionPathPlugin,
	ScrollTrigger,
	ScrollSmoother,
	ScrollToPlugin,
	SplitText,
	TextPlugin,
);

coolGsap.defaults({
	duration: 0.5,
	ease: "power4.inOut",
});

export { useGSAP as useAnim, coolGsap as anim };
