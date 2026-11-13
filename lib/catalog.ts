export const categories = [
  { id: 'web', name: 'Web Templates', caption: 'Portfolios & websites', image: 'portfolio' },
  { id: 'canva', name: 'Canva Templates', caption: 'Invitations & seasonal sets', image: 'invitations' },
  { id: 'assets', name: 'Design Assets', caption: 'UI kits & social graphics', image: 'ui-kit' },
  { id: 'planners', name: 'Planners', caption: 'Budgets, content & routines', image: 'budget' },
] as const;

export type Category = (typeof categories)[number]['id'];
type Product = {
  id: string;
  name: string;
  category: Category;
  format: string;
  price: number;
  image: string;
  detail: string;
  features: string[];
};

export const products: Product[] = [
  { id: 'minimalist-budget-planner', name: 'Minimalist Budget Planner', category: 'planners', format: 'PDF', price: 189, image: 'budget', detail: 'A pared-back set of worksheets for seeing where your money goes and planning the month ahead.', features: ['Monthly budget layout', 'Expense and savings trackers', 'Printable pages'] },
  { id: 'modern-portfolio-template', name: 'Modern Portfolio Template', category: 'web', format: 'HTML', price: 289, image: 'portfolio', detail: 'An editorial portfolio layout that gives project imagery space and makes it easy to tell the story behind your work.', features: ['Homepage and project layouts', 'Responsive page structure', 'Editable HTML and CSS'] },
  { id: 'website-ui-design-kit', name: 'Website UI Design Kit', category: 'assets', format: 'Figma', price: 199, image: 'ui-kit', detail: 'Build landing pages from a coordinated system of buttons, cards, navigation, and form components.', features: ['Reusable Figma components', 'Color and type styles', 'Desktop and mobile layout examples'] },
  { id: 'social-media-planner', name: 'Social Media Planner', category: 'planners', format: 'PDF', price: 259, image: 'social-planner', detail: 'Plan a month of posts in one place, from the first idea to the published caption.', features: ['Monthly content calendar', 'Caption and campaign worksheets', 'Publishing checklist'] },
  { id: 'canva-invitation-bundle', name: 'Canva Invitation Bundle', category: 'canva', format: 'Canva', price: 239, image: 'invitations', detail: 'A set of editable invitations for birthdays, showers, and dinner parties. Start with a layout and make the colors, wording, and type your own.', features: ['Editable invitation designs', 'Coordinated stationery layouts', 'Digital and print-ready layouts'] },
  { id: 'christmas-money-holder-kit', name: 'Christmas Money Holder Kit', category: 'canva', format: 'Canva', price: 189, image: 'christmas', detail: 'Folded cards with festive artwork that turn a cash gift into something personal.', features: ['Seasonal gift-card designs', 'Editable text and colors', 'Print and fold guides'] },
  { id: 'instagram-post-templates', name: 'Instagram Post Templates', category: 'assets', format: 'Canva', price: 129, image: 'instagram', detail: 'Coordinated square layouts for quotes, announcements, and launches.', features: ['Square post layouts', 'Editable typography', 'Photo and text variants'] },
  { id: 'notion-daily-journal', name: 'Notion Daily Journal', category: 'planners', format: 'Notion', price: 120, image: 'notion', detail: 'A simple daily workspace for setting priorities, making notes, and keeping a record of what worked.', features: ['Daily writing prompts', 'Priority tracker', 'Weekly review layout'] },
  { id: 'holiday-ornament-templates', name: 'Holiday Ornament Templates', category: 'canva', format: 'Canva', price: 150, image: 'ornaments', detail: 'A collection of festive shapes and customizable labels for printable holiday ornaments.', features: ['Printable ornament shapes', 'Editable artwork', 'Personalized labels'] },
  { id: 'pinterest-pin-collection', name: 'Pinterest Pin Collection', category: 'assets', format: 'Canva', price: 100, image: 'pinterest', detail: 'Portrait layouts for sharing projects, articles, and products on Pinterest.', features: ['Vertical pin layouts', 'Editable colors and type', 'Layouts for text and photos'] },
];

export const articles = [
  { id: 'first-impressions', title: 'Beautiful design leaves a lasting impression', image: 'portfolio', topic: 'Web design', paragraphs: ['A portfolio is often the first place someone meets your work. Choose one project to lead with and make its outcome visible before getting into the process.', 'Give the reader an easy route from the project preview to the full story. A useful case study explains what changed, what you did, and what you would do differently.'] },
  { id: 'editable-brand-assets', title: 'Build a distinctive brand with editable assets', image: 'ui-kit', topic: 'Design systems', paragraphs: ['Choose one typeface pairing and a small color palette before customizing a collection of templates. Reuse those decisions across the set so individual pieces feel like they belong together.', 'Start with the layout you use most often. Once it works with your real copy and photos, duplicate it and adapt it for the rest of your formats.'] },
  { id: 'a-calendar-you-will-use', title: 'Make a content calendar you’ll actually use', image: 'social-planner', topic: 'Planning', paragraphs: ['Start with the days you can realistically publish. Add one idea to each slot and give every idea a deadline for its first draft.', 'Leave room for timely posts, and use a weekly review to move unfinished ideas forward or retire them. The calendar should make deciding what to do next easier.'] },
];

export function categoryName(id: Category) {
  return categories.find((category) => category.id === id)?.name ?? '';
}

export function money(price: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
}

export function art(name: string) {
  return (process.env.NEXT_PUBLIC_BASE_PATH || '') + '/art/' + name + '.webp';
}
