document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.phrase-btn');
    const toastContainer = document.getElementById('toast-container');

    buttons.forEach(button => {
        button.addEventListener('click', async () => {
            const textToCopy = button.getAttribute('data-text');
            
            try {
                await navigator.clipboard.writeText(textToCopy);
                
                // Add copied state to button
                button.classList.add('copied');
                setTimeout(() => {
                    button.classList.remove('copied');
                }, 2000);

                // Show toast
                showToast(`「${textToCopy}」をコピーしました`);
                
            } catch (err) {
                console.error('クリップボードへのコピーに失敗しました', err);
                showToast('コピーに失敗しました', true);
            }
        });
    });

    function showToast(message, isError = false) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        if (isError) {
            toast.style.background = 'rgba(239, 68, 68, 0.9)'; // Red for error
        }

        toast.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>${message}</span>
        `;

        toastContainer.appendChild(toast);

        // Trigger reflow for animation
        toast.offsetHeight;
        toast.classList.add('show');

        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300); // Wait for transition to finish
        }, 3000);
    }
});
