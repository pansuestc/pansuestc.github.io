// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 70;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header background change on scroll
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = '#fff';
                header.style.backdropFilter = 'none';
            }
        });
    }

    // Add animation to research items on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe research items for animation
    document.querySelectorAll('.research-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // Observe publication items for animation
    document.querySelectorAll('.publication-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid white';
        heroTitle.style.animation = 'blink 1s infinite';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                    heroTitle.style.animation = 'none';
                }, 500);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Add CSS for typing animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes blink {
            0%, 50% { border-color: white; }
            51%, 100% { border-color: transparent; }
        }
        
        .nav-menu a.active {
            color: #3498db;
            font-weight: 600;
        }
        
        .research-item:hover .math-example {
            background: #e8f4f8;
            transform: scale(1.02);
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);

    // Email protection (basic obfuscation)
    const emailLinks = document.querySelectorAll('a[href*="your.email"]');
    emailLinks.forEach(link => {
        // This is a placeholder - replace with actual email
        const email = 'your.email@university.edu';
        link.href = `mailto:${email}`;
        link.textContent = email;
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Mathematics rendering check
    if (typeof MathJax !== 'undefined' && MathJax.startup) {
        MathJax.startup.promise.then(() => {
            console.log('MathJax loaded successfully');
        }).catch(() => {
            console.log('MathJax failed to load, math expressions may not render');
        });
    } else {
        console.log('MathJax not available, math expressions may not render');
    }

    // Add copy to clipboard functionality for email
    const emailElement = document.querySelector('a[href^="mailto:"]');
    if (emailElement) {
        emailElement.addEventListener('click', function(e) {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                const email = this.href.replace('mailto:', '');
                navigator.clipboard.writeText(email).then(() => {
                    // Show temporary notification
                    const notification = document.createElement('div');
                    notification.textContent = 'Email copied to clipboard!';
                    notification.style.cssText = `
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        background: #3498db;
                        color: white;
                        padding: 10px 20px;
                        border-radius: 5px;
                        z-index: 10000;
                        font-size: 14px;
                    `;
                    document.body.appendChild(notification);
                    setTimeout(() => {
                        notification.remove();
                    }, 2000);
                });
            }
        });
    }

    // Notes System
    initializeNotesSystem();
});

// Notes System Implementation
function initializeNotesSystem() {
    let notesData = [];
    let filteredNotes = [];

    // Load notes metadata
    fetch('notes.json')
        .then(response => response.json())
        .then(data => {
            notesData = data;
            filteredNotes = [...notesData];
            displayNotes(filteredNotes);
            setupNotesControls();
        })
        .catch(error => {
            console.error('Error loading notes:', error);
            document.getElementById('notes-grid').innerHTML = 
                '<div class="no-notes">Failed to load notes. Please try again later.</div>';
        });

    function displayNotes(notes) {
        const notesGrid = document.getElementById('notes-grid');
        
        if (notes.length === 0) {
            notesGrid.innerHTML = '<div class="no-notes">No notes found matching your criteria.</div>';
            return;
        }

        notesGrid.innerHTML = notes.map(note => `
            <div class="note-card" onclick="openNote('${note.file}', '${note.title}')">
                <h3>${note.title}</h3>
                <p>${note.description}</p>
                <div class="note-tags">
                    ${note.tags.map(tag => `<span class="note-tag">${tag}</span>`).join('')}
                </div>
                <div class="note-meta">
                    <span class="note-category">${getCategoryName(note.category)}</span>
                    <span class="note-date">${formatDate(note.date)}</span>
                </div>
            </div>
        `).join('');
    }

    function setupNotesControls() {
        const searchInput = document.getElementById('notes-search');
        const filterSelect = document.getElementById('notes-filter');

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
    // Create modal if it doesn't exist
    let modal = document.getElementById('note-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'note-modal';
        modal.className = 'note-modal';
        modal.innerHTML = `
            <div class="note-modal-content">
                <div class="note-modal-header">
                    <span class="close">&times;</span>
                    <h2 id="note-modal-title">${title}</h2>
                </div>
                <div class="note-modal-body" id="note-modal-body">
                    <div class="loading">Loading note content...</div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Setup close functionality
        const closeBtn = modal.querySelector('.close');
        closeBtn.onclick = () => modal.style.display = 'none';
        
        modal.onclick = (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        };

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }

    // Update title
    document.getElementById('note-modal-title').textContent = title;
    
    // Show modal
    modal.style.display = 'block';

    // Load and render markdown content
    fetch(filePath)
        .then(response => response.text())
        .then(markdown => {
            const html = simpleMarkdownToHtml(markdown);
            document.getElementById('note-modal-body').innerHTML = html;
            
            // Re-render MathJax if available
            if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
                MathJax.typesetPromise([document.getElementById('note-modal-body')]);
            }
        })
        .catch(error => {
            console.error('Error loading note:', error);
            document.getElementById('note-modal-body').innerHTML = 
                '<p>Failed to load note content. Please try again later.</p>';
        });
}

// Simple markdown to HTML converter
function simpleMarkdownToHtml(markdown) {
    let html = markdown;
    
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Code blocks
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
    
    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    
    // Tables
    html = html.replace(/\|(.+)\|\n\|([|\-\s]+)\|\n((?:\|.+\|\n?)*)/g, function(match, header, separator, rows) {
        let tableHtml = '<table><thead><tr>';
        header.split('|').forEach(cell => {
            if (cell.trim()) {
                tableHtml += '<th>' + cell.trim() + '</th>';
            }
        });
        tableHtml += '</tr></thead><tbody>';
        
        rows.split('\n').forEach(row => {
            if (row.trim()) {
                tableHtml += '<tr>';
                row.split('|').forEach(cell => {
                    if (cell.trim()) {
                        tableHtml += '<td>' + cell.trim() + '</td>';
                    }
                });
                tableHtml += '</tr>';
            }
        });
        
        tableHtml += '</tbody></table>';
        return tableHtml;
    });
    
    // Lists
    html = html.replace(/^\d+\. (.+$)/gim, '<li>$1</li>');
    html = html.replace(/^[\-\*] (.+$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
    html = html.replace(/<\/ul>\s*<ul>/g, '');
    
    // Paragraphs
    html = html.replace(/\n\n/g, '</p><p>');
    html = '<p>' + html + '</p>';
    
    // Clean up empty paragraphs and fix math expressions
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

// Utility function for debouncing search input
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