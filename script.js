const commands = [
    { category: 'basics', command: 'git init', description: 'Initialize a new Git repository.', icon: 'fa-code-branch' },
    { category: 'basics', command: 'git clone', description: 'Clone a repository into a new directory.', icon: 'fa-clone' },
    { category: 'basics', command: 'git add', description: 'Add file contents to the index (staging area).', icon: 'fa-plus-square' },
    { category: 'basics', command: 'git commit', description: 'Record changes to the repository.', icon: 'fa-pen' },
    { category: 'basics', command: 'git push', description: 'Update remote refs along with associated objects.', icon: 'fa-upload' },
    { category: 'advanced', command: 'git rebase', description: 'Reapply commits on top of another base tip.', icon: 'fa-sync-alt' },
    { category: 'advanced', command: 'git cherry-pick', description: 'Apply changes from existing commits.', icon: 'fa-check-square' },
    { category: 'advanced', command: 'git stash', description: 'Stash changes in a dirty working directory.', icon: 'fa-archive' },
    { category: 'advanced', command: 'git merge', description: 'Join two or more development histories together.', icon: 'fa-compress-arrows-alt' },
    { category: 'advanced', command: 'git reset', description: 'Reset current HEAD to the specified state.', icon: 'fa-undo' },
];

function renderCommands() {
    ['basics', 'advanced'].forEach(category => {
        const container = document.querySelector(`.${category}`);
        container.innerHTML = '';
        commands.filter(cmd => cmd.category === category).forEach(cmd => {
            container.innerHTML += `
                <div class="command-card show" data-command="${cmd.command}" data-description="${cmd.description}">
                    <i class="fas ${cmd.icon}"></i>
                    <h3>${cmd.command}</h3>
                    <p>${cmd.description}</p>
                </div>
            `;
        });
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.opacity = 1;
    setTimeout(() => { toast.style.opacity = 0; }, 3000);
}

function setupModal() {
    const modal = document.getElementById('modal');
    const title = document.getElementById('modal-title');
    const description = document.getElementById('modal-description');
    const closeBtn = document.querySelector('.close-btn');

    document.addEventListener('click', e => {
        if (e.target.closest('.command-card')) {
            const card = e.target.closest('.command-card');
            title.textContent = card.dataset.command;
            description.textContent = card.dataset.description;
            modal.style.display = 'flex';
        }
    });

    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = e => { if (e.target === modal) modal.style.display = 'none'; };
}

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        document.querySelectorAll('.command-card').forEach(card => {
            card.style.display = (filter === 'all' || card.closest('.' + filter)) ? 'block' : 'none';
        });
        showToast(`Filter applied: ${filter}`);
    });
});

document.getElementById('search').addEventListener('input', e => {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll('.command-card').forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(query) ? 'block' : 'none';
    });
});

document.getElementById('toggle-theme').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    showToast('Theme toggled!');
});

function revealOnScroll() {
    const cards = document.querySelectorAll('.command-card');
    const windowHeight = window.innerHeight;
    cards.forEach(card => {
        const position = card.getBoundingClientRect().top;
        if (position < windowHeight - 100) card.classList.add('show');
    });
}

let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const currentScroll = window.pageYOffset;
    header.style.top = currentScroll > lastScroll ? '-80px' : '0';
    lastScroll = currentScroll;
    revealOnScroll();
});

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
    }
    renderCommands();
    setupModal();
    revealOnScroll();
});
