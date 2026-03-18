// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        const toggleMenu = () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        };

        hamburger.addEventListener('click', toggleMenu);
        hamburger.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Active navigation highlighting on scroll (throttled)
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    let scrollTicking = false;

    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        scrollTicking = false;
    }

    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            window.requestAnimationFrame(updateActiveNav);
            scrollTicking = true;
        }
    }, { passive: true });

    // Mathematics rendering check
    if (typeof MathJax !== 'undefined' && MathJax.startup) {
        MathJax.startup.promise.then(() => {
            console.log('MathJax loaded successfully');
        }).catch(() => {
            console.log('MathJax failed to load; math expressions may not render');
        });
    }

    // Notes System
    initializeNotesSystem();
});

// Notes System Implementation
function initializeNotesSystem() {
    let notesData = [];
    let filteredNotes = [];

    fetch('notes.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            notesData = data;
            filteredNotes = [...notesData];
            displayNotes(filteredNotes);
            setupNotesControls();
        })
        .catch(error => {
            console.error('Error loading notes:', error);
            const grid = document.getElementById('notes-grid');
            if (grid) {
                grid.innerHTML = `<div class="no-notes">Failed to load notes: ${error.message}</div>`;
            }
        });

    function displayNotes(notes) {
        const notesGrid = document.getElementById('notes-grid');
        if (!notesGrid) return;

        if (notes.length === 0) {
            notesGrid.innerHTML = '<div class="no-notes">No notes found matching your criteria.</div>';
            return;
        }

        notesGrid.innerHTML = notes.map(note => `
            <a class="note-card" href="note.html?file=${encodeURIComponent(note.file)}&title=${encodeURIComponent(note.title)}">
                <h3>${note.title}</h3>
                <p>${note.description}</p>
                <div class="note-tags">
                    ${note.tags.map(tag => `<span class="note-tag">${tag}</span>`).join('')}
                </div>
                <div class="note-meta">
                    <span class="note-category">${getCategoryName(note.category)}</span>
                    <span class="note-date">${formatDate(note.date)}</span>
                </div>
            </a>
        `).join('');
    }

    function setupNotesControls() {
        const searchInput = document.getElementById('notes-search');
        const filterSelect = document.getElementById('notes-filter');
        if (!searchInput || !filterSelect) return;

        searchInput.addEventListener('input', debounce(filterNotes, 300));
        filterSelect.addEventListener('change', filterNotes);

        function filterNotes() {
            const searchTerm = searchInput.value.toLowerCase();
            const selectedCategory = filterSelect.value;

            filteredNotes = notesData.filter(note => {
                const matchesSearch = note.title.toLowerCase().includes(searchTerm) ||
                                     note.description.toLowerCase().includes(searchTerm) ||
                                     note.tags.some(tag => tag.toLowerCase().includes(searchTerm));
                const matchesCategory = selectedCategory === 'all' || note.category === selectedCategory;
                return matchesSearch && matchesCategory;
            });

            displayNotes(filteredNotes);
        }
    }

    function getCategoryName(category) {
        const categoryMap = {
            'analysis': 'Mathematical Analysis',
            'analysis-geometry': 'Analysis & Geometry',
            'analysis-bie': 'BIE Methods',
            'algorithms': 'Algorithms',
            'tutorials': 'Tutorials',
            'research': 'Research Notes'
        };
        return categoryMap[category] || category;
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
}

function openNote(filePath, title) {
    const noteUrl = `note.html?file=${encodeURIComponent(filePath)}&title=${encodeURIComponent(title)}`;
    window.location.href = noteUrl;
}

// Simple markdown to HTML converter
function simpleMarkdownToHtml(markdown) {
    let html = markdown;

    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    html = html.replace(/\|(.+)\|\n\|([|\-\s]+)\|\n((?:\|.+\|\n?)*)/g, function(match, header, separator, rows) {
        let tableHtml = '<table><thead><tr>';
        header.split('|').forEach(cell => {
            if (cell.trim()) tableHtml += '<th>' + cell.trim() + '</th>';
        });
        tableHtml += '</tr></thead><tbody>';
        rows.split('\n').forEach(row => {
            if (row.trim()) {
                tableHtml += '<tr>';
                row.split('|').forEach(cell => {
                    if (cell.trim()) tableHtml += '<td>' + cell.trim() + '</td>';
                });
                tableHtml += '</tr>';
            }
        });
        tableHtml += '</tbody></table>';
        return tableHtml;
    });

    html = html.replace(/^\d+\. (.+$)/gim, '<li>$1</li>');
    html = html.replace(/^[\-\*] (.+$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
    html = html.replace(/<\/ul>\s*<ul>/g, '');

    html = html.replace(/\n\n/g, '</p><p>');
    html = '<p>' + html + '</p>';
    html = html.replace(/<p><\/p>/g, '');
    html = html.replace(/<p>(<h[1-6]>)/g, '$1');
    html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1');
    html = html.replace(/<p>(<ul>)/g, '$1');
    html = html.replace(/(<\/ul>)<\/p>/g, '$1');
    html = html.replace(/<p>(<table>)/g, '$1');
    html = html.replace(/(<\/table>)<\/p>/g, '$1');
    html = html.replace(/<p>(<pre>)/g, '$1');
    html = html.replace(/(<\/pre>)<\/p>/g, '$1');

    return html;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}