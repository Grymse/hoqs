const content = `# Markdown Test File

## Headers
# H1
## H2
### H3
#### H4


---

## Emphasis
**Bold text**

*Italic text*

***Bold and Italic text***

~~Strikethrough text~~

---

## Lists

### Unordered List
- Item 1
- Item 2
  - Subitem 2.1
  - Subitem 2.2
- Item 3

### Ordered List
1. First item
2. Second item
3. Third item
   1. Subitem 3.1
   2. Subitem 3.2

---

## Links
[OpenAI](https://www.openai.com)
[myLink](google.com "myLink")

### Link with Title
[Markdown Guide](https://www.markdownguide.org "Visit Markdown Guide")

---

## Images
![Markdown Logo](https://markdown-here.com/img/icon256.png)

### Image with Title
![Markdown Logo](https://markdown-here.com/img/icon256.png "Markdown")

---

## Code

### Inline Code
Here is some \`inline code\`.

### Code Block
\`\`\`python
def hello_world():
    print("Hello, World!")
\`\`\`

### Fenced Code Block with Syntax Highlighting
\`\`\`javascript
function greet(name) {
    console.log('Hello, ' + name + '!');
}
\`\`\`

---

## Blockquotes
> This is a blockquote.
>
> Another line in the same blockquote.

---

## Tables

| Header 1 | Header 2 | Header 3 |
| -------- | -------- | -------- |
| Row 1, Col 1 | Row 1, Col 2 | Row 1, Col 3 |
| Row 2, Col 1 | Row 2, Col 2 | Row 2, Col 3 |

---

## Horizontal Rules

---

***

___

---

## Task Lists
- [x] Task 1
- [ ] Task 2
- [ ] Task 3

---

## HTML Elements
<p>This is a paragraph in HTML.</p>

---

## Escaping Characters
*This text is not italicized.*

# This is not a header.

---

## Footnotes
Here is a simple footnote[^1].

[^1]: This is the footnote.

---

## Inline HTML

<div style="color: red; font-weight: bold;">
This text should be red and bold.
</div>

---

## Automatic Links
https://www.openai.com

---

## Definition Lists
Term 1
: Definition 1

Term 2
: Definition 2

---

## Abbreviations
The HTML specification is maintained by the W3C.

*[W3C]: World Wide Web Consortium

---

## Superscript and Subscript
Superscript: H<sup>2</sup>O

Subscript: CO<sub>2</sub>
`;

export default content;
