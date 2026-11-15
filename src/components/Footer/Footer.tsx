/**
 * Footer - the hand-drawn "Doodle Crew" sign-off, configured for Raduan:
 * RADUAN stamped in ink, a crew of doodles living on the letters (click one
 * to hear its line), site + project + contact links, and the site palette.
 */
import DoodleCrewFooter, {
  type CrewMember,
  type DoodleKind,
  type FooterAction,
  type FooterColumn,
  type FooterLink,
} from "@/components/DoodleCrewFooter/DoodleCrewFooter";

const EMAIL = "mailto:raduanridu2669@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/raduan-rahman-redu/";
const GITHUB = "https://github.com/Rad-47";
const SCHOLAR = "https://scholar.google.ca/citations?user=VGhsMZgAAAAJ&hl=en&oi=ao";

// One character per letter of R-A-D-U-A-N (index = letter).
const CREW: CrewMember[] = [
  { kind: "yeti", letter: 0, seat: "front", offset: -0.32, name: "Bruno", says: "Hire Raduan. I'd vouch for him." },
  { kind: "bird", letter: 1, seat: "top", offset: 0.02, name: "Pip", says: "Find him on LinkedIn!" },
  { kind: "mushroom", letter: 2, seat: "front", offset: 0.12, scale: 0.95, name: "Morel", says: "Rooted in Next.js." },
  { kind: "kid", letter: 3, seat: "top", offset: -0.05, name: "Juno", says: "Best view of the roadmap up here." },
  { kind: "ghost", letter: 4, seat: "behind", offset: 0, name: "Boo", says: "Boo! Seen the AI pipeline?" },
  { kind: "cat", letter: 5, seat: "front", offset: 0.42, flip: true, name: "Patch", says: "Nice cursor. Say hello?" },
];

const COLUMNS: FooterColumn[] = [
  {
    title: "Explore",
    links: [
      { label: "Profile", href: "#profile" },
      { label: "Experience", href: "#experience" },
      { label: "Work", href: "#work" },
      { label: "Skills", href: "#skills" },
    ],
  },
  {
    title: "Built",
    links: [
      { label: "FanLinc", href: "#work" },
      { label: "AI Lesson Generator", href: "#work" },
      { label: "QRsnapp", href: "https://qrsnapp.com/" },
      { label: "untilthe.day", href: "https://untilthe.day/" },
    ],
  },
  {
    title: "Websites",
    links: [
      { label: "Sparcks", href: "https://www.sparcksglobal.com/" },
      { label: "Aurelion Global", href: "https://www.aurelionglobal.in/" },
      { label: "SubTrack", href: "https://subcription-tracker-project.vercel.app/" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Email", href: EMAIL },
      { label: "LinkedIn", href: LINKEDIN },
      { label: "GitHub", href: GITHUB },
      { label: "Google Scholar", href: SCHOLAR },
    ],
  },
];

const ACTIONS: FooterAction[] = [
  { label: "View my work", href: "#work", icon: "star", variant: "outline" },
  { label: "Say hello", href: EMAIL, icon: "plane", variant: "solid" },
];

const SOCIALS: FooterLink[] = [
  { label: "LinkedIn", href: LINKEDIN },
  { label: "GitHub", href: GITHUB },
  { label: "X", href: "https://x.com/RaduanRidu51641" },
];

const DOODLES: DoodleKind[] = ["star", "sparkle", "bolt", "heart", "plane", "spiral", "star", "sparkle"];

export function Footer() {
  return (
    <DoodleCrewFooter
      wordmark="RADUAN"
      brand="Raduan Rahman"
      blurb="Software developer and product owner in Toronto. I build web, mobile and AI products people actually use."
      tagline="Thanks for scrolling all the way down. Let's build something people actually use."
      columns={COLUMNS}
      actions={ACTIONS}
      copyright={`© ${new Date().getFullYear()} Raduan Rahman. Designed and built in Toronto.`}
      legal={[]}
      socials={SOCIALS}
      crew={CREW}
      doodles={DOODLES}
      doodleCount={10}
      palette={{ background: "var(--bg-primary)", ink: "var(--text-primary)", accent: "var(--accent)" }}
      serifFamily="var(--font-instrument-serif), Georgia, serif"
      height="640px"
    />
  );
}
