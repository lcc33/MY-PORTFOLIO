# Grug-Minimal Design Tokens

This portfolio should feel plain, quiet, and fast. Content carries the page.

## Layout

- Content width: `min(100% - 32px, 680px)`
- One column only
- No sidebars, hero images, gradients, blur, or decorative icons
- Header: one line with name and text navigation
- Footer: one line with copyright and links

## Color

- Light background: `#FAFAFA`
- Light text: `#171717`
- Dark background: `#111111`
- Dark text: `#EEEEEE`
- Muted text: `#5D5D5D` light, `#ABABAB` dark
- Accent: `#0F766E` light, `#5EEAD4` dark

## Type

- Primary font: Grug Hand from `public/fonts`
- Fallback: Arial, Helvetica, sans-serif
- Body size: `18px`, `17px` on small screens
- Line height: `1.65`
- Headings: same font, weight `600`, tight line height

## Motion

- Short page entry fade is allowed
- No continuous animation
- Respect `prefers-reduced-motion`

## Components

- Forms are plain stacked labels
- Buttons are rectangular text buttons with the accent color
- Repeated content uses text lists with a top border
- No card-heavy layout
