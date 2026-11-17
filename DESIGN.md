---
name: abhibhaw.com
description: The portfolio of a product manager who builds, documented like a component datasheet.
colors:
  graphite-ink: "#1d2330"
  datasheet-stock: "#f5f6f8"
  plate-grey: "#e9ecf1"
  slate-muted: "#545b6b"
  hairline: "color-mix(in oklab, #1d2330 11%, transparent)"
  rule-strong: "color-mix(in oklab, #1d2330 20%, transparent)"
  paper-white: "#ffffff"
  devtron-cobalt: "#1f5fd1"
  devtron-cobalt-text: "#1a52b8"
  devtron-tint: "#eaf0fb"
  bharatpe-amber: "#f7941d"
  bharatpe-amber-on: "#1f2b4d"
  bharatpe-amber-text: "#9a5300"
  bharatpe-tint: "#fef1e0"
  independent-green: "#17734c"
  independent-tint: "#e6f2ec"
  correction-red: "#c8261a"
  before-grey: "#d5d8e0"
  old-path-grey: "#8b92a6"
typography:
  display:
    fontFamily: "Sofia Sans Condensed, Hanken Grotesk, system-ui, sans-serif"
    fontSize: "clamp(52px, 6.4vw, 104px)"
    fontWeight: 600
    lineHeight: 0.92
    letterSpacing: "-0.015em"
  page-title:
    fontFamily: "Sofia Sans Condensed, Hanken Grotesk, system-ui, sans-serif"
    fontSize: "clamp(44px, 5vw, 76px)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Sofia Sans Condensed, Hanken Grotesk, system-ui, sans-serif"
    fontSize: "clamp(30px, 1.72vw + 23.3px, 48px)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Sofia Sans Condensed, Hanken Grotesk, system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.005em"
  figure:
    fontFamily: "Sofia Sans Condensed, Hanken Grotesk, system-ui, sans-serif"
    fontSize: "clamp(34px, 3.2vw, 48px)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.01em"
    fontFeature: "pnum"
  body:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
    fontFeature: "tnum"
  lead:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 400
    lineHeight: 1.5
  prose:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.35
  mono:
    fontFamily: "IBM Plex Mono, ui-monospace, Menlo, monospace"
    fontSize: "14.5px"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: "8px"
  md: "12px"
  lg: "20px"
  btn: "8px"
spacing:
  s-1: "4px"
  s-2: "8px"
  s-3: "12px"
  s-4: "16px"
  s-5: "24px"
  s-6: "32px"
  s-7: "48px"
  s-8: "64px"
  s-9: "96px"
  s-10: "128px"
  gutter: "24px"
  gut: "80px"
components:
  button-primary:
    backgroundColor: "{colors.graphite-ink}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.btn}"
    padding: "0 24px"
    height: "44px"
  button-secondary:
    backgroundColor: "{colors.datasheet-stock}"
    textColor: "{colors.graphite-ink}"
    rounded: "{rounded.btn}"
    padding: "0 24px"
    height: "44px"
  nav:
    backgroundColor: "{colors.datasheet-stock}"
    textColor: "{colors.graphite-ink}"
    height: "72px"
  family-field-devtron:
    backgroundColor: "{colors.devtron-cobalt}"
    textColor: "{colors.paper-white}"
    padding: "32px 0"
    width: "100vw"
  family-field-bharatpe:
    backgroundColor: "{colors.bharatpe-amber}"
    textColor: "{colors.bharatpe-amber-on}"
    padding: "32px 0"
    width: "100vw"
  family-field-independent:
    backgroundColor: "{colors.independent-green}"
    textColor: "{colors.paper-white}"
    padding: "32px 0"
    width: "100vw"
  part-row:
    typography: "{typography.title}"
    padding: "16px 0"
  case-band:
    rounded: "{rounded.md}"
    padding: "12px 24px"
    typography: "{typography.label}"
  chart:
    backgroundColor: "{colors.plate-grey}"
    textColor: "{colors.graphite-ink}"
    rounded: "{rounded.lg}"
    padding: "32px"
  spec-figure:
    typography: "{typography.figure}"
    padding: "16px 0"
  flow-lane-after:
    rounded: "{rounded.lg}"
    padding: "24px"
  flow-node:
    backgroundColor: "{colors.datasheet-stock}"
    rounded: "{rounded.sm}"
    padding: "12px 16px"
  gate:
    backgroundColor: "{colors.independent-tint}"
    rounded: "{rounded.lg}"
    padding: "24px 32px"
---

# Design System: abhibhaw.com

## Overview

**Creative North Star: "The Datasheet"**

Each shipped product is documented like an electronic part.
A part has a characteristic curve of what it changed, a block diagram of how it works, and a spec table of what was decided and removed.
The page reads as a technical sheet on cool off-white stock with graphite ink.
Proof sits in numbers, plots and ruled tables, not in adjectives or decoration.

Colour is functional, never ornamental.
Three organization families own whole regions of the page: Devtron cobalt, BharatPe amber and independent green.
One red has one job: it strikes the value that was removed.
Everything people read is graphite on stock.

Density is moderate and editorial.
Home sections are one or two screens tall, with a big plotted chart in the first viewport.
Inner pages are documents: sections take their content height, and prose runs at a reading measure.
The site is built on the taste-skill kit, which owns the grid, the spacing scale, the base type scale, buttons, links and the hover layer.
This system adds the datasheet world on top of that kit.

**Key Characteristics:**
- Cool off-white stock, graphite ink, no dark mode.
- Three peer family colours, each with an "on", a "text" and a "tint" variant.
- The correction mark: old value struck in red, new value beside it.
- Condensed technical grotesk for names and values, humanist grotesk for reading.
- Measured plots and block diagrams drawn in CSS, not images.
- Flat surfaces: depth comes from tone and colour fields, never from shadow.

## Colors

A cool graphite-on-stock base, with three organization colours that own regions and one red reserved for removal.

### Primary
- **Graphite Ink** (`graphite-ink`): Body text, headings, the primary button fill, the focus ring and chart tick marks. It is the action colour as well as the ink.

### Family colours (peers, not a hierarchy)
Each family has four values.
The field colour fills a region.
The "on" colour is text on that field.
The "text" colour is the family colour used as text on stock, darkened to pass contrast.
The tint is a pale ground for diagrams in that family.
- **Devtron Cobalt** (`devtron-cobalt`, text `devtron-cobalt-text`, tint `devtron-tint`): The Devtron band, its after-bars in the chart, and Devtron case figures. White text on the field.
- **BharatPe Amber** (`bharatpe-amber`, on `bharatpe-amber-on`, text `bharatpe-amber-text`, tint `bharatpe-tint`): The BharatPe band and figures. Amber is light, so text on the field is deep navy, not white.
- **Independent Green** (`independent-green`, tint `independent-tint`): The "Building now" band and independent project pages. The same green serves as field and as text. White text on the field.

### Tertiary
- **Correction Red** (`correction-red`): Only the line-through on a removed value. It is never a fill, a heading, an alert or a link colour.

### Neutral
- **Datasheet Stock** (`datasheet-stock`): The page ground, the nav bar, flow nodes and the gate track.
- **Plate Grey** (`plate-grey`): The chart plate, inline code and code blocks, the method loop tiles, and the frame behind product screenshots.
- **Slate Muted** (`slate-muted`): Secondary text, captions, labels, axis text and struck values.
- **Hairline** (`hairline`): Row dividers inside tables, lists and spec blocks.
- **Rule Strong** (`rule-strong`): The top rule of a table or list, link underlines at rest, and the dashed border of an old-path lane.
- **Before Grey** (`before-grey`): The "before" bar in the wait-time chart and the vertical plotting grid behind it.
- **Old Path Grey** (`old-path-grey`): Dashed connectors in the old lane of a block diagram.
- **Paper White** (`paper-white`): Text on cobalt and green fields, the primary button label, and the small white plate behind tool logos on a band.

### Named Rules
**The Red Means Removed Rule.** Correction Red appears only as the strike line through a value that no longer exists. If a red element does not mark a removal, it is wrong.

**The Family Owns The Region Rule.** A family colour fills a whole region or draws that family's data. It never decorates a neutral element. Unscoped elements fall back to graphite ink and plate grey.

**The Readable Family Rule.** Family colour as text uses the "text" variant, never the field value. Amber text on stock uses `bharatpe-amber-text`.

## Typography

**Display Font:** Sofia Sans Condensed (with Hanken Grotesk, system-ui)
**Body Font:** Hanken Grotesk (with system-ui)
**Label/Mono Font:** IBM Plex Mono, for code only

**Character:** A narrow technical grotesk names parts and states values, like a part number on a sheet. A warm humanist grotesk carries everything a person reads at length. All three faces are self-hosted variable WOFF2 files.

### Hierarchy
- **Display** (600, clamp 52px-104px, line-height 0.92): The home hero headline only, at most 11 characters per line.
- **Page Title** (600, clamp 44px-76px, line-height 0.98): The h1 of a case, project, note or list page, at most 20ch.
- **Headline** (500, kit h2 scale clamp 30px-48px, line-height 1.1): Section headings. A muted second sentence may follow in the same heading.
- **Title** (600, 24px, line-height 1.2): Part names in a family band. The chart title (22px) and family name (20px) sit just below it. Prose h2 inside a case is 34px in this face.
- **Figure** (600, clamp 34px-48px, line-height 1.1, proportional numerals): The key characteristics of a case. A part row's figure is 28px in the same face.
- **Body** (400, 16px, line-height 1.55, tabular numerals): Default text and part summaries.
- **Lead** (400, 18px under 1024px, 20px above, line-height 1.5): The sentence under a headline, at most 46ch-58ch.
- **Prose** (400, 18px, 17px on a phone, line-height 1.65): Case and note bodies at 68ch.
- **Label** (600, 14px): Band text, spec block headings, lane labels and the table header column. Chart axes and keys use 13px at weight 400-600.

### Named Rules
**The Two Faces Rule.** Condensed for names and values, Hanken for reading. A paragraph is never set in the condensed face, and a part name or figure is never set in Hanken.

**The Numeral Rule.** Running text and tables use tabular numerals. Headings use normal numerals. Display figures use proportional numerals so a big number does not look gappy.

**The Sentence Case Rule.** Labels are short sentence-case words in weight 600. There is no uppercase tracking anywhere in this system.

## Layout

The kit grid governs every page: one `.wrap` 1280px wide, with an 80px side gutter at 1024px and up, 48px from 640px, and 24px on a phone.
Columns are a 12-column grid with a 24px gutter (12px on a phone).
Spacing follows the kit's 4/8 scale (`s-1` to `s-10`).

The home hero splits 6/6: copy on the left, the wait-time chart on the right.
A case top splits 7/1/4: the page title and lead on the left, the key characteristics block on the right.
Below 1024px both collapse to one column.

Family fields on the home page are full-bleed bands.
They break out of the wrap to the viewport edge, while their content stays aligned to the container.
Consecutive bands touch with no gap, so the families read as one continuous sheet.

Home sections follow the kit rhythm: each is one or two screens tall.
Inner pages switch to document flow: sections take their content height, with 96px below the body.
Prose runs at 68ch.
Block diagrams inside prose break out to the full container width.

Breakpoints: 1023px (two columns to one, part rows to two columns), 720px (diagrams turn vertical), 639px (phone: single-column rows, spec table stacks, tighter padding).

### Named Rules
**The Ruled Sheet Rule.** Lists, tables and spec blocks are separated by 1px hairlines with a stronger top rule, not by cards or gaps.

## Elevation & Depth

The system is flat.
There are no shadows anywhere in the datasheet layer.
Depth comes from three tonal moves: plate grey under a chart or code, a family tint under a diagram, and a full family colour field for a region.
Hover on a part row is an 8% tint of the "on" colour, not a lift.

### Named Rules
**The Flat Sheet Rule.** Surfaces never cast a shadow. If an element needs to stand apart, give it a plate grey or tint ground, or a rule.

## Shapes

The radius scale is the kit's "soft" setting: 8px small, 12px medium, 20px large, 8px buttons.
Large radius goes on whole figures: the chart plate, the flow lane and the gate.
Medium radius goes on the case band, screenshots inside prose, and code blocks.
Small radius goes on flow nodes.
Chart bars have a 3px radius only on their leading end, like a plotted bar.
The full-bleed home bands and the part rows on them have no radius.
Portraits are circles.

Lines carry meaning.
A solid 1.5px line in the family colour is the current path in a diagram.
A dashed line in old path grey is the old path.
A 2px family-colour top rule opens a spec block and closes a case.

## Components

### Buttons
Quiet and solid, from the kit's "solid" look.
- **Shape:** gently rounded (8px), 44px tall, 24px side padding, Hanken 500 16px.
- **Primary:** graphite ink fill, white label, a drawn SVG arrow after the label. One primary per view, usually "Email me".
- **Secondary:** stock fill, graphite label, a strong-rule border. On a phone it becomes an underlined text link under the full-width primary.
- **Hover / Focus:** the primary's fill does not visibly change, because action and ink are the same graphite. The drawn arrow's stem grows and its head moves 3px. The secondary darkens its fill and border slightly. Press scales to 98.5% and drops 1px. Focus is a 2px graphite outline at 2px offset.

### Text links
Graphite, weight 500, underlined in rule strong at a 4px offset. The underline turns solid on hover. Prose links use a 3px offset and a 1px line.

### Navigation
A fixed 72px bar (56px on a phone) on stock with a hairline bottom border. The logo is the circular portrait plus the name in the condensed face. Links are 15px Hanken 500. Hover draws a 2px line under the word from the left. The current page keeps that line. "Resume" is a text link and "Email me" is a small primary button on the right.

### Family Field (signature)
A full-bleed band in one family colour. A head row carries the family name (condensed 20px) and a one-line context. Below it, products sit as ruled part rows.

### Part Row (signature)
One product as a transparent row on its family band, separated by hairlines of the "on" colour at 30%. Three columns: name with tool logos, summary, and the headline figure. The figure can carry a correction mark. Tool logos sit on a small white plate so they stay legible on any family colour. Hover tints the row 8% and underlines the name. On a phone the columns stack.

### Wait-Time Chart (signature)
The characteristic plot. A plate grey figure with a condensed title, a muted subline, a log-like axis (Minutes, Hours, Days, Weeks) and one series per product. Each series has a grey "before" bar with its value struck in red and a family colour "after" bar. The after-bar's fill grows from the left over 900ms on load, and its label never scales. Reduced motion shows the final state.

### Case Band and Key Characteristics
On a case page, a rounded family-colour band runs across the top of the sheet with the section, organization, role and dates. It replaces any label above the title. The key characteristics block opens with a 2px family rule and lists figures in the family text colour, each with a muted label.

### Spec Table
A two-column definition table: a 160px label column in weight 600 and a 17px answer column at 72ch, ruled with hairlines. On a phone it stacks.

### Block Diagram (signature)
A flow of nodes and drawn connectors. The current lane sits on the family tint with solid family-colour arrows. The old lane has a dashed border, dashed grey arrows and the removed block struck through. Below 720px the flow turns vertical.

### Release Gate
A family tint figure that draws targets, never results. Each row has a name, a white track, a family-colour pass zone and a graphite tick labelled with the threshold.

### Correction Mark
The old value in slate muted with a 2px red line-through, a space, then the new value in weight 600. Screen readers hear "was" and "now". On a cobalt or green band, red has too little contrast, so the strike takes the band's "on" colour at 80% opacity. On stock and on amber the strike stays red.

## Do's and Don'ts

### Do:
- **Do** strike every replaced value with the correction mark: muted text, 2px Correction Red line-through, new value beside it in weight 600. On a cobalt or green band, strike in the band's "on" colour instead.
- **Do** scope a region to its organization with `data-org` so it inherits the family field, on, text and tint values.
- **Do** set part names, chart titles, figures and prose h2 in Sofia Sans Condensed, and all reading text in Hanken Grotesk.
- **Do** separate rows with 1px hairlines under a stronger top rule.
- **Do** draw charts, diagrams and gates in HTML and CSS from front matter data, so numbers stay real and readable.
- **Do** put tool logos on the small white plate when they sit on a family band.
- **Do** honour reduced motion: every load animation must show its final state without movement.

### Don't:
- **Don't** use Correction Red for anything except a removed value: no red errors, buttons, links or highlights.
- **Don't** use a family colour on an element that does not belong to that family.
- **Don't** put white text on BharatPe amber; use the deep navy "on" colour.
- **Don't** add shadows, glows or lifted cards.
- **Don't** nest cards inside a family band; products are ruled rows on the band.
- **Don't** put a small label or eyebrow above a page title; on case pages the family band carries that context.
- **Don't** use uppercase tracked labels.
- **Don't** draw results on a release gate or a project that is still in development; show targets and status only.
