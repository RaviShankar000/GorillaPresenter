; A line that begins with an octothorpe (#), like the next one, begins a new slide.
# Gorilla Presenter

// The line below will be explained later. For now, don't worry about how it works.
{{{image Bob | Our Founder Says "Hi"}}}

* 100% self-contained
* No app
* No server 
* No net connection needed



# Gorilla Presenter

* Produces a standard HTML file
* Compatible with all standard modern browsers

(iOS and iPadOS require adding a home screen shortcut)

# Gorilla Presenter

* Fast text-based editing.
* Can be edited anywhere --- desktop, tablet -- even on a phone in a pinch.
* Get your presentation done and be off enjoying a tasty beverage while your rivals are still playing pointy-clicky.

# How do I get it?

You're soaking in it, mang! 
* Control+click (long press on mobile) 
* Choose "Save Presentation"
* That's it! You can open this file on your local computer or mobile device and have a full working copy of Gorilla Presenter.

# Editing Slides

* Control-click/long press
* Choose "Edit Slides"
* Use standard Markdown formatting
* Switch back to the Slide Show to see your changes.

# New Slides

An octophorpe, #, (aka "hash mark", "pound sign") at the beginning of a new line begins a new slide.


# Bold and Italic
* Italic text segments are surrounded by \* (for instance, *This is italic*)
* Bold text segments are surrounded by \*\* (for instance, **This is Bold**)
* Bold text segments are surrounded by \*\*\* (for instance, ***This is Bold Italic***)
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

# Comments

Lines that begin with a semicolon (;) will not appear on the slide, but will appear in the speaker notes.
; This line will appear in the speaker notes, but not on the slide.

Lines that begin with two slashes (//) will only appear in the editor text. They will not appear on the slide *or* in the speaker notes.
// This line will only appear in the editor.

# Advanced Functions and Directives

None of information on the following slides is required for basic functionality. You definitely *don't*  need to memorize all the directives to use Gorilla Presenter. Think of the following as reference material. 

# Mathematics

Gorilla Presenter uses \\(\KaTeX\\) to render \\(\LaTeX\\) math on your slides, in either inline format \\(x^2)\\  or display format: 

$$\int_a^b x^2 dx  = \frac{x^3}{3}\LARGE{|}{_{\small a}^{\small b}}$$

A full tutorial on \\(\KaTeX\\)and \\(\LaTeX\\) is way beyond the scope of this presentation. There are many excellent resources on the web for learning these packages.


# Media Resources

You can upload and manage media files from the Media Library (accessible from the main menu). There are a few samples in there to get you started. One nice feature is that you can give your media files human-friendly names, for example, TalkingHead rather than "userdata/media/testvideo.mp4" or some similar gibberish. Media directives (see the next slide) will use the first matching name they find, meaning that you could use just "Talking" or "Head", if you had no other media files containing those text strings in their names. Of course the full "TalkingHead" will also work. 

At present, Gorilla Presenter supports .jpg,.gif,.png, and .svg images, .mp3 audio, and .mp4 video. The goal here was to restrict media formats to those that are viewable/playable on the widest possible variety of systems.

Media files are stored within your presentation bundle, meaning that they can potentially make the bundle quite large (especially for video). There's no real way around this.

You can also embed external media files using standard HTML methods (for example, the embed code from a YouTube video) Of course, going that way means that your presentation will not work offline. You win some, you lose some.


# Media directives

The format for all of these is:

\{{{type name | description}}}. Examples:


\{{{image Bob | Our Founder Says "Hi"}}}

produces:

{{{image Bob | Our Founder Says "Hi"}}}

\{{{audio BWV764 | Excerpt from Wie schön leuchtet der Morgenstern, BWV 764, Johann Sebastian Bach (variation of completion, performed by Thomas A. Schneider)}}} produces:

{{{audio BWV764 | Excerpt from Wie schön leuchtet der Morgenstern, BWV 764, Johann Sebastian Bach (variation of completion, performed by Thomas A. Schneider)}}}

\{{{video TalkingHead | Video sample}}} produces:

{{{video TalkingHead | Video sample}}}


# The isbn directive

This generates a menu of sources for books with a specific ISBN.

For example, \{{{isbn 0440001358|The Moon is a Harsh Mistress}}} produces:

{{{isbn 0440001358|The Moon is a Harsh Mistress}}}

# The mailto directive

Send email to an address of your choice. The format is:

\{{{mailto prompt|address|subject|body}}}

Example:  \{{{mailto Send some mail|example@example.com|This is a test|This is the test body. Please attach (something) to this email. Thanks!}}} produces:

{{{mailto Send some mail|example@example.com|This is a test|This is the test body. Please attach (something) to this email. Thanks!}}}

# The fontsize directive

The fontsize directive lets you alter the font size of a run of text.

Example: \{{{fontsize tiny This is tiny text.}}} produces:

{{{fontsize tiny This is tiny text.}}}

Available sizes are tiny, footnotesize, small, normalsize, large, Large, LARGE, huge, Huge, and HUGE.

These are designed to match the corresponding font sizes in \\(\LaTeX\\). For example, fontsize Large  should produce text of approximately the same size as \Large in \\(\LaTeX\\).

# The selftest directive

This lets you add a self-test "quiz" to a slide (note: these are *not* intended to be used for grading purposes).
The first line should contain the test title, right after the directive.
Subsequent lines have the questions and answers. The first line has the question text, while succeeding lines have answer candidates.
The correct answer (or answers) should be preceded by an asterisk (*). Add a blank line to begin a new question/answers set.

{{{selftest A self test on the selftest directive
The selftest directive allows you to add a self test to a slide.
* True
False
LOL WAT?

How do you separate question/answer sets from each other?
With an asterisk
* With a blank line
By hitting enter enough times to go to a new page
It can't be done. A self-test can only have one question and answer set.
}}}

# The selftestresponses directive

This lets you customize the correct/incorrect responses for self tests. The body of the directive consists of the correct response and the incorrect response, separated with a pipe ("|") character. Example:

\{{{setselftestresponses Cool beans! | Sorry, man.}}}

would change the default responses of "Woohoo! That is correct!" and ""I'm sorry. That is incorrect." to "Cool beans!" and "Sorry, man." respectively. This is a global setting (i.e., it affects all the slides, regardless of which slide contains the directive).

# The transition directive

Allows you to use a custom transition when moving between slides. The format is:

\{{{transition (transition name)}}}

This slide contains a \{{{transition zoom}}} directive, so navigating to it will use a zoom effect.
{{{transition zoom}}} 
Available transitions are: swiperight, swipeleft, swipetop, swipebottom, cut, crossdissolve, iris, spin, and zoom.
   