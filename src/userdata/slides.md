// Lines that begin with // (like this one) are comments and only appear in the slide editor. They don't appear on the slides.
// A line that begins with an octothorpe (#), like the next one, begins a new slide.
# Gorilla Presenter

// The line below will be explained later. For now, don't worry about how it works.

{{{image Bob | Our Founder Says "Hi"}}}

// Markdown uses lines beginning with * to create a bulleted (unnumbered) list. 

* 100% self-contained
* No app
* No server 
* No net connection needed

# Gorilla Presenter

// Markdown uses lines beginning with a number and a closing parenthesis to create a numbered list.
// The numbers do NOT have to be sequential. Markdown figures that out for you.
1) Produces a standard HTML file
1) Compatible with all standard modern browsers

# Gorilla Presenter

* Fast text-based editing.
* Can be edited anywhere --- desktop, tablet -- even on a phone in a pinch.
* Get your presentation done and be off enjoying a tasty beverage while your rivals are still playing pointy-clicky.

# How do I get it?

You're soaking in it, mang! 
* Control+click (long press on mobile) 
* Choose "Save Presentation"
* That's it! Look wherever your machine puts downloaded files and you should see a copy of this file. Open it and you have a full working copy of Gorilla Presenter.
// See the discussion on Apple mobile devices at the end of this slide deck for more information on this.
(iOS and iPadOS require adding a home screen shortcut)

# Editing Slides

* Control-click/long press
* Choose "Edit Slides"
* Use standard Markdown formatting, plus GorillaPresenter extensions (discussed later in this deck)
* To see your changes, switch back to the Slide Show from the menu, or click the check button at the top of the editor.

In general, just open the editor to see how a specific effect is carried out.

# New Slides

// Whatever is after the # becomes the slide title (in this case, "New Slides")
An octophorpe, #, (aka "hash mark", "pound sign") at the beginning of a new line begins a new slide.

# New Paragraphs

To separate paragraphs, use blank lines. This is in one paragraph.

This is in another.

# Bold and Italic
* *This is italic*
* **This is Bold**
*  ***This is Bold Italic***
; You can use either * or _, i.e., *This is Italic* and _This is Italic_ produce the same output.

# Lists

Bulleted list items begin with \*. Numbered list  items begin with a number followed by a parenthesis.

* Bullet Point 1
* Bullet Point 2

1) Numbered Point 1
2) Numbered Point 2

# Paragraphs

Paragraphs are created simply by adding a blank line between them.

For instance, this line is in a new paragraph.

# Block Quotes

> This is a block quote

# Code
```
Code
```

# Advanced Functions and Directives

None of information on the following slides is required for basic functionality. You definitely *don't*  need to memorize all the directives to use Gorilla Presenter. Think of the following as reference material. 

# Speaker Notes

Lines that begin with a semicolon (;) will not appear on the slide, but will appear in the speaker notes.

; This line will appear in the speaker notes, but not on the slide.

This is not the same as a normal comment. Lines that begin with two slashes (//) will only appear in the editor. They will not appear on the slide *or* in the speaker notes.

// This line will only appear in the editor.

You can view the speaker notes by choosing that option in the main menu.

# Mathematics

Gorilla Presenter uses \\(\KaTeX\\) to render \\(\LaTeX\\) math on your slides, in either inline format \\(x^2)\\  or display format: 

$$\int_a^b x^2 dx  = \frac{x^3}{3}\LARGE{|}{_{\small a}^{\small b}}$$

A full tutorial on \\(\KaTeX\\)and \\(\LaTeX\\) is way beyond the scope of this presentation. There are many excellent resources on the web for learning these packages.

# Media Resources

You can upload and manage media files from the Media Library (accessible from the main menu). There are a few samples in there to get you started. One nice feature is that you can give your media files human-friendly names, for example, TalkingHead rather than "userdata/media/testvideo.mp4" or some similar gibberish. Media directives will use the first matching name they find, meaning that you could use just "Talking" or "Head", if you had no other media files containing those text strings in their names. Of course the full "TalkingHead" will also work. 

At present, Gorilla Presenter supports .jpg,.gif,.png, and .svg images, .mp3 audio, and .mp4 video. The goal here was to restrict media formats to those that are viewable/playable on the widest possible variety of systems.

Media files are stored within your presentation bundle, meaning that they can potentially make the bundle quite large (especially for video). There's no real way around this.

You can also embed external media files using standard HTML methods (for example, the embed code from a YouTube video) Of course, going that way means that your presentation will not work offline. You win some, you lose some.

# image
// Use {{{image (image name) | (image description)}}}

{{{image Bob | Our Founder Says "Hi"}}}

# audio

{{{audio BWV764 | Excerpt from Wie schön leuchtet der Morgenstern, BWV 764, Johann Sebastian Bach (variation of completion, performed by Thomas A. Schneider)}}}

# video

{{{video TalkingHead | Video sample}}}


# isbn

Given an International Standard Book Number (ISBN) this generates a menu of potential sources for the book.

{{{isbn 978-0743261692|Gilgamesh: A New English Version}}}

# mailto

{{{mailto Send some mail|example@example.com|This is the test subject|This is the test body. Please attach (something) to this email. Thanks!}}}

# fontsize

{{{fontsize tiny This is tiny text.}}}

Available sizes are tiny, footnotesize, small, normalsize, large, Large, LARGE, huge, Huge, and HUGE.

These are designed to match the corresponding font sizes in \\(\LaTeX\\). For example, fontsize Large  should produce text of approximately the same size as \Large in \\(\LaTeX\\).

# quiz

This lets you add a self-test quiz to a slide (note: these are *not* intended to be used for grading purposes).
The first line should contain the quiz title, right after the directive.
Subsequent lines have the questions and answers. The first line has the question text, while succeeding lines have answer candidates.
The correct answer (or answers) should be preceded by an asterisk (*). Add a blank line to begin a new question/answers set.

{{{quiz This is the quiz title
The quiz directive allows you to add a quiz to a slide.
* True
False
LOL WAT?

How do you separate question/answer sets from each other?
With an asterisk
* With a blank line
By hitting enter enough times to go to a new page
It can't be done. A self-test can only have one question and answer set.
}}}

# quizresponses

This lets you customize the correct/incorrect responses for quizzes. 

{{{quizresponses "Woohoo! That is correct!" | "I'm sorry. That is incorrect."}}}

would change the default responses of "Correct" and "Incorrect"  to "Woohoo! That is correct! and "I'm sorry. That is incorrect." respectively. This is a global setting (i.e., it affects all the slides, regardless of which slide contains the directive). This behavior may change at a future time.

# transition

{{{transition zoom}}} 
Allows you to use a custom transition when moving between slides.
Navigating to this slide will produce a zoom effect.

Available transitions are: swiperight, swipeleft, swipetop, swipebottom, cut, crossdissolve, iris, spin, and zoom.

# externallinks

Provides a menu of clickable links to external resources. These open in a new window or tab (depending on how the user's browser is configured).

{{{externallinks Reference/Search Engine Resources
DuckDuckGo|https://duckduckgo.com/
Google|https://google.com
Wikipedia|https://en.wikipedia.com
Archive.org|https://archive.org
}}}

# branch

This lets you navigate within the slide show. As with media files, you only have to use enough of the slide's name to make it unique.

{{{branch Directives Table of Contents
The image directive|image
The audio directivedirective|audio
The video directive|video
The isbn directive|isbn
The mailto directive|mailto
The fontsize directive|fontsize
The fontfamily directive|fontfamily
The quiz directive|quiz
The quizresponses directive|quizresponses
The transition directive|transition
The externallinks directive|externallinks
The branch directive|branch
}}}

# Special instructions for Apple mobile devices

For whatever reason, Apple doesn't allow direct opening of HTML files (like a GorillaPresenter presentation) from the the file system of a mobile device (iPhone or iPad). To get around this, you need to add the GorillaPresenter Launcher web app to your home screen. This will allow you to choose a presentation to open.
