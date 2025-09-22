# Adding Notes to Your Website

This guide explains how to add new markdown notes to your academic website.

## Overview

The notes system allows you to organize and display mathematical notes, tutorials, and research observations in markdown format. Each note is:

- Written in standard markdown with LaTeX math support
- Organized by categories (Mathematical Analysis, Algorithms, Tutorials, Research Notes)
- Searchable by title, description, or tags
- Displayed in an attractive card layout
- Opened in a dedicated page with full markdown rendering

## Quick Start

### 1. Create a New Markdown File

Create your markdown file in the `notes/` directory:

```
notes/your-note-name.md
```

### 2. Write Your Note

Use standard markdown syntax with LaTeX math expressions:

```markdown
# Your Note Title

## Introduction

This is a sample note with math: $E = mc^2$

## Mathematical Expression

Display math using double dollar signs:

$$\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$$

## Code Examples

```python
def factorial(n):
    return 1 if n <= 1 else n * factorial(n-1)
```

## Lists and Tables

- Item 1
- Item 2

| Column 1 | Column 2 |
|----------|----------|
| Data 1   | Data 2   |
```

### 3. Add Metadata to notes.json

Add an entry to `notes.json`:

```json
{
  "id": "your-note-id",
  "title": "Your Note Title",
  "category": "tutorials",
  "description": "Brief description of your note",
  "file": "notes/your-note-name.md",
  "date": "2024-02-15",
  "tags": ["tag1", "tag2", "tag3"]
}
```

## Available Categories

- `analysis` - Mathematical Analysis
- `algorithms` - Algorithms  
- `tutorials` - Tutorials
- `research` - Research Notes

## Example Note Entry

```json
{
  "id": "linear-algebra-basics",
  "title": "Linear Algebra Basics",
  "category": "tutorials", 
  "description": "Introduction to vectors, matrices, and linear transformations",
  "file": "notes/linear-algebra-basics.md",
  "date": "2024-02-15",
  "tags": ["linear-algebra", "vectors", "matrices", "tutorial"]
}
```

## Mathematical Expressions

The system supports LaTeX math through MathJax:

- Inline math: `$x^2 + y^2 = z^2$`
- Display math: `$$\sum_{i=1}^{n} i = \frac{n(n+1)}{2}$$`

## Features

### Search and Filter
- **Search**: Users can search by title, description, or tags
- **Filter**: Users can filter by category
- **Combined**: Search and filter work together

### Responsive Design  
- Cards automatically adjust to screen size
- Mobile-friendly note pages
- Touch-friendly interface

### Organization
- Notes are sorted by date (newest first)
- Each note shows category, date, and tags
- Clean, academic styling matches your website

## File Structure

```
your-website/
├── index.html          # Main page with notes section
├── note.html           # Individual note page template
├── styles.css          # Styling including notes styles  
├── script.js           # JavaScript for notes functionality
├── notes.json          # Notes metadata
└── notes/              # Directory for markdown files
    ├── calculus-fundamentals.md
    ├── fourier-transform.md
    ├── sorting-algorithms.md
    ├── matrix-operations.md
    └── research-optimization.md
```

## Tips

1. **Consistent Naming**: Use kebab-case for file names (e.g., `fourier-transform.md`)
2. **Good Descriptions**: Write clear, concise descriptions for better searchability  
3. **Relevant Tags**: Use specific tags that users might search for
4. **Date Format**: Use YYYY-MM-DD format for dates
5. **Math Expressions**: Test complex LaTeX expressions to ensure they render correctly

## Example Workflow

1. Write your note in markdown: `notes/probability-theory.md`
2. Add metadata to `notes.json`:
   ```json
   {
     "id": "probability-theory",
     "title": "Probability Theory Fundamentals", 
     "category": "analysis",
     "description": "Basic concepts in probability theory and statistics",
     "file": "notes/probability-theory.md",
     "date": "2024-02-15", 
     "tags": ["probability", "statistics", "random-variables"]
   }
   ```
3. Refresh your website - the note will appear automatically!

The notes system will handle loading, rendering, and displaying your new note in the grid with full search and filter functionality.